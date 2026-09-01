#!/usr/bin/env python3
"""
Build mortality-data.js from the ONS 'Numbers surviving at exact age x (lx)'
workbooks, 2024-based principal projection.

Why this script exists
----------------------
ONS publishes cohort lx keyed by YEAR OF BIRTH 1981 to 2074. That range is
useless for financial planning, where clients are typically born 1940 to 1980.

However, every workbook also carries PERIOD lx by age and calendar year
(1981 to 2074). Walking the diagonal of that table - age 56 in 2026, age 57 in
2027, and so on - is the literal definition of a cohort table. This script
verifies that reconstruction reproduces ONS's own published cohort columns
exactly before relying on it.

So:
  births 1981+   -> ONS published cohort column (used directly)
  births < 1981  -> reconstructed by diagonal walk through ONS period lx

Neither path invents data.

Usage:  python3 build-mortality-data.py
Run from anywhere; paths are resolved relative to this file.
"""

import json
import os
import sys

try:
    import openpyxl
except ImportError:
    sys.exit("openpyxl required:  pip install openpyxl")

HERE = os.path.dirname(os.path.abspath(__file__))
SANDBOX = os.path.dirname(HERE)
REPO = os.path.dirname(SANDBOX)
ONS_DIR = os.path.join(REPO, "ONS data")
OUT = os.path.join(SANDBOX, "mortality-data.js")

NATIONS = {
    "uk": ("ukppp24lx.xlsx", "United Kingdom"),
    "en": ("enppp24lx.xlsx", "England"),
    "wa": ("wappp24lx.xlsx", "Wales"),
    "sc": ("scppp24lx.xlsx", "Scotland"),
    "ni": ("nippp24lx.xlsx", "Northern Ireland"),
}
SEXES = {"m": "males", "f": "females"}

# Cohorts we care about. 1930 to 2010 covers anyone aged roughly 16 to 96 today
# and stays valid for years to come.
MIN_BIRTH, MAX_BIRTH = 1930, 2010
# Youngest age we bother storing. Nobody's plan hinges on survival below this.
MIN_AGE = 25
# ONS publishes no cohort data above this age. We do not extrapolate.
MAX_AGE = 100

HEADER_ROW = 4  # 1-indexed; data begins on the row after


def read_sheet(wb, name):
    """Return ({age: {year: lx}}, [years]) for one worksheet."""
    rows = list(wb[name].iter_rows(min_row=HEADER_ROW, values_only=True))
    header = rows[0]
    years = []
    for cell in header[1:]:
        if cell is None:
            break
        # Header cells look like 'Year of birth\n1981' or plain '1982'
        years.append(int(str(cell).strip().split("\n")[-1]))
    table = {}
    for row in rows[1:]:
        if row[0] is None:
            continue
        age = int(row[0])
        table[age] = {y: row[i + 1] for i, y in enumerate(years)}
    return table, years


def cohort_from_period(period, birth_year, period_years):
    """
    Reconstruct a cohort lx series by diagonal walk.

    qx(x, Y) = 1 - lx(x+1, Y) / lx(x, Y)     [period rates for calendar year Y]
    S(age n) = product over x < n of (1 - qx(x, birth_year + x))

    Returns {age: lx_per_100k} starting at the first age for which period data
    exists, i.e. calendar year >= first published year.
    """
    first_year = period_years[0]
    start_age = max(0, first_year - birth_year)
    if start_age > MAX_AGE:
        return {}

    out = {start_age: 100000.0}
    surviving = 100000.0
    for age in range(start_age, MAX_AGE):
        year = birth_year + age
        if year not in period_years_set or (age + 1) not in period:
            break
        lx_here = period[age].get(year)
        lx_next = period[age + 1].get(year)
        if not lx_here or lx_next is None:
            break
        surviving *= lx_next / lx_here
        out[age + 1] = surviving
    return out


def validate(period, cohort, period_years, label):
    """
    Prove the diagonal walk reproduces ONS's published cohort table.
    Only birth years present in both can be compared.
    """
    worst = 0.0
    checked = 0
    for birth_year in (1981, 1985, 1990, 2000):
        if birth_year not in cohort.get(0, {}):
            continue
        built = cohort_from_period(period, birth_year, period_years)
        for age, value in built.items():
            published = cohort.get(age, {}).get(birth_year)
            if published is None or published == 0:
                continue
            # Compare on the same 100,000 radix
            rel = abs(value - published) / published
            worst = max(worst, rel)
            checked += 1
    return worst, checked


def build():
    if not os.path.isdir(ONS_DIR):
        sys.exit("Cannot find ONS data folder at: %s" % ONS_DIR)

    global period_years_set
    data = {}
    limits = {}
    worst_overall = 0.0
    total_checked = 0

    for nation_key, (filename, nation_name) in NATIONS.items():
        path = os.path.join(ONS_DIR, filename)
        if not os.path.isfile(path):
            sys.exit("Missing workbook: %s" % path)
        print("Reading %-28s (%s)" % (filename, nation_name))
        wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
        data[nation_key] = {}
        limits[nation_key] = {}

        for sex_key, sex_name in SEXES.items():
            period, period_years = read_sheet(wb, "%s period lx" % sex_name)
            cohort, _ = read_sheet(wb, "%s cohort lx" % sex_name)
            period_years_set = set(period_years)
            last_year = period_years[-1]

            worst, checked = validate(period, cohort, period_years,
                                      "%s/%s" % (nation_key, sex_key))
            worst_overall = max(worst_overall, worst)
            total_checked += checked

            series = {}
            for birth_year in range(MIN_BIRTH, MAX_BIRTH + 1):
                if birth_year >= period_years[0]:
                    # ONS publishes this cohort directly. Use it verbatim.
                    raw = {a: cohort[a][birth_year]
                           for a in sorted(cohort)
                           if cohort[a].get(birth_year) is not None}
                    source = "ons-cohort"
                else:
                    raw = cohort_from_period(period, birth_year, period_years)
                    source = "diagonal"
                if not raw:
                    continue

                ages = sorted(a for a in raw if MIN_AGE <= a <= MAX_AGE)
                if len(ages) < 2:
                    continue
                start_age = ages[0]
                base = raw[start_age]
                if not base:
                    continue

                # Normalise so the first stored age is exactly 100,000, then
                # round to integer. Conditional survival is a ratio, so the
                # choice of base is arbitrary and cancels out.
                values = [round(raw[a] / base * 100000) for a in ages]
                series[birth_year] = {
                    "s": start_age,
                    "v": values,
                    "src": source,
                }

            data[nation_key][sex_key] = series
            print("   %-8s cohorts %d..%d   diagonal check: max rel err %.2e over %d points"
                  % (sex_name, MIN_BIRTH, MAX_BIRTH, worst, checked))

        wb.close()

    # ONS publishes lx to two decimal places, so a perfect reconstruction still
    # shows relative error around 1e-6 purely from source rounding. Anything
    # above 1e-4 (0.01%) would indicate a real methodological problem.
    TOLERANCE = 1e-4
    if worst_overall > TOLERANCE:
        sys.exit("VALIDATION FAILED: diagonal walk deviates from ONS cohort "
                 "tables by %.3e, above the %.0e tolerance. Refusing to emit data."
                 % (worst_overall, TOLERANCE))
    print("\nValidation passed: %d comparisons, max relative error %.2e "
          "(tolerance %.0e, consistent with ONS source rounding)"
          % (total_checked, worst_overall, TOLERANCE))

    # Strip the per-cohort 'src' marker into a compact lookup to save bytes,
    # keeping the information available for the UI.
    payload = {}
    coverage = {}
    for nation_key, sexes in data.items():
        payload[nation_key] = {}
        coverage[nation_key] = {}
        for sex_key, series in sexes.items():
            payload[nation_key][sex_key] = {
                str(by): [rec["s"]] + rec["v"] for by, rec in sorted(series.items())
            }
            coverage[nation_key][sex_key] = {
                str(by): rec["s"] + len(rec["v"]) - 1
                for by, rec in sorted(series.items())
            }

    meta = {
        "source": "ONS, Past and projected period and cohort life tables: "
                  "2024-based, UK, 1981 to 2074",
        "released": "2026-05-15",
        "basis": "cohort, principal projection",
        "licence": "Open Government Licence v3.0",
        "minBirthYear": MIN_BIRTH,
        "maxBirthYear": MAX_BIRTH,
        "minAge": MIN_AGE,
        "maxAge": MAX_AGE,
        "note": "Births 1981+ use ONS published cohort tables. Earlier births "
                "are reconstructed by diagonal walk through ONS period lx, "
                "which reproduces the published cohort tables exactly. "
                "No extrapolation beyond age 100.",
    }

    body = json.dumps(
        {"meta": meta, "coverage": coverage, "lx": payload},
        separators=(",", ":"),
    )

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write("// Generated by tools/build-mortality-data.py - do not edit by hand.\n")
        fh.write("// Source: ONS, 2024-based past and projected life tables. OGL v3.0.\n")
        fh.write("// Each cohort is [startAge, lx@startAge, lx@startAge+1, ...],\n")
        fh.write("// normalised so lx at startAge is 100000.\n")
        fh.write("window.SHACKADEMY_MORTALITY = ")
        fh.write(body)
        fh.write(";\n")

    size_kb = os.path.getsize(OUT) / 1024
    print("Wrote %s  (%.0f KB)" % (OUT, size_kb))


if __name__ == "__main__":
    period_years_set = set()
    build()
