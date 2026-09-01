# Content policy

This document sets out the rules the help text in this extension is written to, and how it is reviewed before publication.

It exists for two reasons. It keeps the guidance consistent as the extension grows, and it lets members see the standard the content is held to rather than having to infer it.

## The principle

The extension explains **what a field is asking for**. It does not explain the rules behind the field, and it does not tell anyone what to enter.

The distinction matters. Telling someone that a box wants the annual amount before deductions is a description of an input. Telling someone how much they are allowed to contribute, or what happens to their tax position if they contribute more, is something else entirely. Only the first belongs here.

## Rules

### Figures

No specific figures. This covers allowances, thresholds, limits, rates, percentages, bands, caps and any other number that describes a rule rather than a field.

Figures date. A tooltip stating a threshold that changed at the last Budget is worse than no tooltip at all, because it carries the authority of appearing inside the tool at the moment of decision. Where a number is genuinely needed, the member is pointed to the current official source instead.

Where a date or tax year must appear, it is generated dynamically through token interpolation rather than typed in, so it cannot go stale.

### Calculation mechanics

No descriptions of what the platform does with the numbers entered. The extension does not explain how projections are produced, how growth is applied, or how any output is arrived at.

This is partly accuracy, since we do not control that logic and it can change beneath us, and partly scope. Explaining the engine invites the reader to act on our characterisation of it.

### Framing

Neutral, conditional framing throughout. The pattern is "if this applies to you, enter it here", not "you should enter" or "most people put".

Guidance never states or implies that an entry is typical, sensible, or what someone in a given position would do. Nothing in the extension should read as a recommendation.

### Assuming no adviser

Most members using this tool do not have a financial adviser. Content is written on that assumption.

Where a member needs information we cannot give, they are directed to the party who actually holds it, with an adviser mentioned as an option rather than a default. The standard construction is "check with your pension provider, or a financial adviser if you have one", not "ask your adviser".

### Voice

Second person or passive construction. The reader is addressed directly as "you", or the sentence is written without a subject.

Ownership language such as "the owner" is avoided. It reads as adviser-facing jargon to someone filling in their own details, and it introduces ambiguity in joint scenarios.

Compliance and policy statements, including this document and the disclaimers, use the third person: "Shackademy accepts", not "we accept".

### Tone

Warm and plain-spoken, without being casual about accuracy. Instructional steps are precise. Everything else can breathe.

Jargon is either avoided or explained on first use. If a term appears on the Voyant screen itself, the tooltip may use it, but should say what it means.

## Higher risk areas

Some topics carry more regulatory weight than others and get a closer read before publication:

- Pension contribution and benefit limits
- Inheritance tax thresholds and reliefs
- ISA allowances and subscription rules
- AIM shares and Business Property Relief
- State pension and the Triple Lock
- Anything touching drawdown, annuitisation, or the sequencing of withdrawals

Content in these areas stays strictly descriptive of the field. Where the temptation to explain the underlying rule is strongest, the answer is a lesson link, not a longer tooltip.

## Review process

Help text is not published on the author's judgement alone.

1. Content is drafted against the rules above.
2. It is reviewed by the Content Reviewer for clarity and accuracy.
3. It is reviewed by the Content and Compliance Lead against this policy.
4. Only then is it included in a release.

Content is also reviewed on an annual cycle, alongside the technical, store listing and disclaimer workstreams, to catch guidance that has drifted out of date rather than waiting for someone to report it.

## Reporting content you think is wrong

If a tooltip reads as advice, states something it should not, or is simply unclear, please say so. The routes are in the README. Content reports are treated the same as bug reports, because that is what they are.
