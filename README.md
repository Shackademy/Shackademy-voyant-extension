# Shackademy Voyant Help

A browser extension that adds contextual guidance to the Voyant financial planning platform, built for Shackademy members.

Voyant is a powerful tool, but it was designed for financial advisers working with clients. Most Shackademy members are using it on their own, without an adviser sitting alongside them to explain what each field is asking for. This extension fills that gap. It adds plain-English tooltips to fields, short descriptions to sections and tabs, and links through to the relevant Shackademy lesson where one exists.

## Not affiliated with Voyant

This is an independent tool built by Shackademy. It is not affiliated with, endorsed by, supported by, or connected to Voyant or its parent company in any way. "Voyant" is the trademark of its respective owner and is used here only to identify the platform the extension works with.

If something in this extension does not work, please do not contact Voyant about it. Contact us instead, using the details below.

## Not financial advice

The guidance in this extension is educational. It explains what a field is asking for so you can fill it in accurately. It does not tell you what to enter, does not interpret your results, and does not recommend any course of action.

The extension deliberately avoids stating allowances, thresholds, rates, limits or any other figures, and it does not explain how Voyant performs its calculations. That is not an oversight. Figures change, and a stale number in a tooltip could mislead someone into a decision that costs them money.

If you need advice about your own circumstances, speak to a regulated financial adviser. For questions about a specific product you hold, your provider is usually the fastest route.

## Installing

Installation instructions, including the store links for Chrome and Firefox, are in the Shackademy lesson:

https://shackademy.com/path-player?courseid=voyant&unit=6a2b6f59783648b9870a4f3cUnit

The extension is published as unlisted listings on the Chrome Web Store and on Mozilla Add-ons, which means it will not appear in store search results. The lesson is the only place the links are published. You will need to be signed in to your Shackademy account to view it.

Once installed, updates arrive automatically through the browser. You do not need to reinstall when a new version is released.

## What it does

- Adds a help icon to fields on Voyant's data entry screens. Tapping it shows a short explanation of what the field is asking for.
- Adds a description to each section and tab, explaining what that part of Voyant is for and when you would use it.
- Adds guidance to the Year View column headers.
- Links to the relevant Shackademy lesson where one covers the topic in more depth.
- Can be switched off entirely from the extension's toolbar icon if you would rather work without it.

## What it does not do

- It does not read, store, transmit or have any access to your financial plan data.
- It does not change anything you have entered, and it cannot submit or alter your plan.
- It does not track your usage or send analytics anywhere.
- It only runs on planwithvoyant.co.uk. On every other website it does nothing at all.

Our privacy policy is at https://shackademy.com/privacy

## Why this repository is public

The extension runs on a page where you enter detailed personal financial information. You are entitled to see exactly what it does before you trust it there. Publishing the source means you, or anyone you ask, can verify the claims made above rather than taking our word for them.

It also means the help text itself is open to scrutiny. If you think a tooltip is unclear, misleading, or says something it should not, we would rather hear about it.

## Reporting a problem

For anything wrong with the extension, including help text you think is inaccurate or confusing:

- Post in the Shackademy community: [\[VOYANT SPACE\]](https://community.shackademy.com/c/voyant-b35bda)
- Or email: support@shackademy.com

Please include your browser, the Voyant screen you were on, and what you expected to see. A screenshot helps.

For anything with a security or privacy dimension, please use the process in [SECURITY.md](SECURITY.md) rather than posting publicly.

We do not accept pull requests. The help text goes through a compliance review before publication, so changes need to come through the process described in [CONTENT-POLICY.md](CONTENT-POLICY.md).

## What is in this repository

| File            | Purpose                                                          |
| --------------- | ---------------------------------------------------------------- |
| `manifest.json` | Extension configuration, permissions and version number          |
| `content.js`    | Main orchestrator, injects the help elements into Voyant's pages |
| `fields.js`     | The help text for individual fields                              |
| `sections.js`   | Descriptions for sections and tabs                               |
| `lessons.js`    | Mapping from topics to Shackademy lessons                        |
| `background.js` | Handles the on/off toggle                                        |
| `styles.css`    | Appearance of the injected elements                              |

## Licence

All rights reserved. See [LICENSE](LICENSE). The source is published so it can be inspected, not so it can be reused.
