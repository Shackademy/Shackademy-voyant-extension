// =============================================================================
// SHACKADEMY - SECTIONS CONFIGURATION
// =============================================================================
// Maps Voyant sections to panel descriptions and lessons.
//
// Structure:
//   name          - display name, used to auto-build tab titles
//   typeIndicator - label for/id that identifies this section in the DOM
//                   (only present on the Basics tab - context persists via URL)
//   route         - for screens without an edit form, the URL route after the
//                   plan ID, e.g. "insights/monte-carlo" or "year-view". The
//                   longest matching route wins. Query strings are ignored.
//   tabSource     - "yearView" if the section's tabs come from Year View's
//                   own tab buttons rather than the URL
//   titleOnly     - true to show just the name as the panel title, with no
//                   " - Tab" suffix (for single-screen sections)
//   headingButton - true to add a Shackademy Guide button to the screen's
//                   heading, which opens this guide in the side panel
//   lessons       - array of lesson keys from lessons.js (shown for whole section)
//   tabs          - one entry per tab, keyed by Voyant's URL hash segment in
//                   lower case, e.g. "basics", "timing", "payment-sources"
//
// Tab titles are built automatically as: "{name} - {Tab}"
// You only need to write 'name' once.
//
// High-risk guides (Chrome Extension Monitoring Plan) are preceded by
//   // HIGH-RISK: review on regulatory change (<topic>)
// Search for "HIGH-RISK" during an interim review. No figures are stated.
//
// Reusable tab descriptions are defined at the top as TAB_DESCRIPTIONS.
// Override any of them inline for a specific section if needed.
// =============================================================================

// -----------------------------------------------------------------------------
// Tab display name overrides
// Maps URL hash segments (lower case) to human-readable tab names.
// Any segment not listed here will be capitalised automatically.
// -----------------------------------------------------------------------------

window.TAB_LABELS = {
  basics: "Basics",
  timing: "Timing",
  growth: "Growth",
  fees: "Fees",
  steps: "Steps",
  transfers: "Transfers",
  drawdowns: "Planned Withdrawals",
  "liquidation-limits": "Withdrawal Limit",
  "payment-sources": "Payment Sources",
  "expense-details": "Details",
  crystallizations: "Crystallisations",
  beneficiaries: "Beneficiaries",
  annuity: "Annuitization",
  "linked-debts": "Linked Debts",
  "linked-expenses": "Linked Expenses",
  "linked-income": "Linked Income",
  "linked-reverse-mortgage": "Linked Equity Release",
  exercise: "Exercise",
  "vested-shares": "Vested / Exercised Shares",
  "future-vesting": "Future Vesting",
  liquidation: "Liquidation",
  "future-grant": "Future Grant",
  "onetime-payments": "One Time Payments",
  links: "Linked Property",
  "debt-payouts": "Debt Payouts",
  maturity: "Term Maturity",
  "assets-designation": "Asset Distribution",
  defaultages: "Default Ages",
  assetallocation: "Asset Allocation",
  marketassumptions: "Market Assumptions",
  majorloss: "Major Loss",
  savings: "Savings Order",
  calcs: "Calculation Settings",
  // Year View tabs (from Voyant's data-test-tab buttons)
  cashflow: "Cash Flow",
  expenses: "Expenses",
  investments: "Investments",
  retirements: "Pensions",
  properties: "Property",
  debts: "Debt",
  insurances: "Protection",
  taxdetails: "Taxes",
};

// -----------------------------------------------------------------------------
// Reusable tab descriptions
// Used wherever a tab's description is consistent across sections.
// Override inline in a specific section's tabs entry if needed.
// -----------------------------------------------------------------------------

window.TAB_DESCRIPTIONS = {
  timing: `
    <p>The Timing tab controls <strong>when this item starts and ends</strong> in your plan. Voyant uses timeline events - milestones you define, like Retirement or a specific age - rather than fixed calendar dates, so your plan stays dynamic as assumptions change.</p>
    <p>Make sure the start and end events reflect your real expectations as accurately as possible, as they have a significant impact on your projections.</p>
  `,

  growth: `
    <p>The Growth tab sets the <strong>assumed annual rate of return</strong> for this item. Voyant uses this to project its future value over time.</p>
    <p>If this item is on the default, changing the rate in Plan Settings changes it here too. Once you enter your own figure here, the item keeps it, even if you later enter the same figure as the default.</p>
    <p>Shackademy's suggested approach is to use Entered Growth Rate, and to choose a rate you think is realistic for this account. A projection is only as reliable as the growth rates behind it, so you can test higher and lower rates in a What If.</p>
    <ul>
      <li>Any fees on the account's Fees tab are taken in addition to this growth rate. If the rate you're using already allows for fees, entering them on the Fees tab as well counts them twice.</li>
      <li>If you switch to Portfolio/Holdings, the allocation starts at 100% cash, and the dataset's expected returns can be much higher than an entered rate.</li>
    </ul>
  `,

  steps: `
    <p>Steps allow you to model <strong>changes to this item at a future point in time</strong></p>
    <p>Each step is triggered by a timeline event. You can add as many steps as needed to reflect how this item is expected to change throughout the plan.</p>
    <ul>
      <li>A Step can't be placed in the plan's first year.</li>
      <li>On an account, a Step changes an existing contribution, so first set a contribution and its Contributions Start and End events on the account's <strong>Timing</strong> tab.</li>
    </ul>
  `,

  fees: `
    <p>The Fees tab lets you model <strong>product fees and advice fees</strong> associated with this account.</p>
    <ul>
      <li><strong>Product fee</strong> - deducted from the gross growth rate.</li>
      <li><strong>Ongoing advice fee</strong> - taken out of the account as a withdrawal, so it shows in the account's Withdrawals in Year View rather than in Net Growth.</li>
    </ul>
    <p>The Product Fee and Ongoing Advice Fee show the default from Plan Settings > Fees. Click Edit to enter your own figure for this account. Once edited, the account keeps its own figure, even if you click Use Defaults, so later changes in Plan Settings won't reach it.</p>
    <p>Fees are taken in addition to the account's growth rate. If the growth rate you're using already allows for fees, entering them here as well counts them twice.</p>
  `,

  transfers: `
    <p>The Transfers tab is where you model <strong>one-off or regular movements of money between accounts</strong> already in your plan - for example, moving funds from a savings account into an ISA, or from one pension to another.</p>
    <p>Transfers do not create new income or expenses - they simply redistribute existing assets within the plan.</p>
    <ul>
      <li>Both the source and destination accounts must already exist in the plan before setting up a transfer</li>
      <li>Transfers are linked to timeline events so you can model them at a specific future date</li>
      <li>Transfers can also be used to invest surplus income by selecting 'All Surplus' as the 'Transfer From' account</li>
      <li>Money can go into a pension by a Transfer from All Surplus, or from an account such as a GIA or ISA. A Default Surplus Account (your cash) can't be the source of a transfer into a pension: pensions aren't offered as a destination when cash is the source.</li>
      <li>Check Year View after saving to confirm the source and destination balances move as expected</li>
    </ul>
  `,

  "liquidation-limits": `
    <p>The Withdrawal Limit tab controls <strong>how and when Voyant is allowed to access this account</strong> to meet expenses when other income falls short.</p>
    <p>Ensure the timing reflects when you want to allow access to this account</p>
    <p>The default setting is <em>As Needed</em>, meaning Voyant will draw from this account according to the liquidation order. You can restrict this - for example, to ringfence an emergency fund or prevent access until a specific life event.</p>
    <p>Note: withdrawal limits control <em>ad hoc</em> access. To model a planned, scheduled withdrawal regardless of whether it is needed, use the Planned Withdrawals screen instead.</p>
  `,

  drawdowns: `
    <p>Planned Withdrawals are <strong>scheduled withdrawals from a specific account</strong> that happen regardless of whether there is a shortfall to meet. This is different from the Withdrawal Limit tab, which only controls ad hoc access when income falls short.</p>
    <p>Use Planned Withdrawals when you want to model a deliberate strategy - for example, drawing a fixed annual income from a drawdown pension, or systematically running down an investment account over a set period.</p>
    <ul>
      <li>The 'Selected Account' will default to the plan you were in when you chose to add a planned withdrawal</li>
      <li>For a pension, the Pension Strategy field on the Planned Withdrawal itself (it appears when a pension is selected) sets whether the withdrawal is UFPLS or Flexible Access Drawdown</li>
      <li>Check Year View > Cash Flow to confirm the withdrawal is appearing correctly</li>
    </ul>
  `,
};

// -----------------------------------------------------------------------------
// Shared text
// -----------------------------------------------------------------------------

const PAYMENT_SOURCES_PREFERRED_NOTE = `
  <li>With 'Only Use Preferred Payment Sources' ticked, Voyant only uses your preferred sources. If they can't cover the whole amount, it uses what they have, and the rest shows as Unfulfilled in Year View > Expenses.</li>
`;

const YEAR_VIEW_NAVIGATION = `
  <p><strong>Moving between years:</strong> use the arrow keys, the floating arrows either side of the screen, the slider under the chart, or the year selector at the top right.</p>
  <p><strong>Real Money:</strong> to see these figures in today's money, go to the Dashboard, select the three vertical dots in the top right corner (next to 'Year View') and select 'Real Money' - you can't make this change in Year View itself. In Real Money, goals can show slightly below the amount you entered, even in the first year. Voyant treats each year's figures as happening at the end of the year, so even the first year's figures are reduced by a year's inflation when they're turned back into today's money.</p>
`;

const INSIGHT_LESSONS = ["insights"];

// -----------------------------------------------------------------------------
// Sections
// -----------------------------------------------------------------------------

window.SHACKADEMY_SECTIONS = {
  // ============================================================
  // People
  // ============================================================

  people: {
    name: "People",
    typeIndicator: "personInputTypeLabel",
    lessons: ["people-timeline"],
    tabs: {
      basics: {
        description: `
          <p>This is where you set up the <strong>people in your financial plan</strong>. Every plan needs at least one person - the plan owner - and you can add a partner or spouse as a second person.</p>
          <p>Getting the basics right here is important as Voyant uses this information - particularly date of birth and retirement age - throughout all projections.</p>
          <p>Date of birth drives every age-based event, including State Pension timing. Voyant doesn't apply a minimum pension age automatically. Instead, each pension's Withdrawal Limit tab controls when it can be accessed. This means you can set the right age for each pension, for example if one has a protected pension age.</p>
          <p>If you are planning for yourself, you are the plan owner. Add your partner as a second person if you want to model your finances jointly.</p>
          <ul>
            <li>Adding a partner or child also creates their own Default Surplus Account (cash) and events on the Timeline. Check each person's Mortality event there, because the base plan's primary person and a partner added later can have different defaults.</li>
            <li>For a birthday between 1 January and 5 April, the age Voyant shows for a plan year is one less than the age you'll reach during that tax year. Check events by their year on the Timeline.</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Pre-Retirement & Retirement Goals
  // ============================================================

  goals: {
    name: "Goals",
    typeIndicator: "basicExpenseInputOwnerLabel",
    lessons: ["income-expenses", "occassional-expenditure"],
    tabs: {
      basics: {
        description: `
          <p>Goals are how you model <strong>expenses and financial objectives</strong> in your plan - anything from school fees and holidays to home renovations or retirement spending. Each goal is an expense that Voyant will try to meet from your income and assets.</p>
          <p>Enter an annual amount and use the model to assess the impact on your plan. If a goal creates a shortfall, you can explore alternatives using What If scenarios.</p>
          <p>We suggest using <strong>Goals rather than Expenses</strong> in Voyant as that then means you can easily track the progress on the Dashboard and Timeline tabs</p>
          <ul>
            <li>Use a name that's meaningful to you - it will appear on the timeline and in reports</li>
            <li>Check Year View > Expenses after saving to confirm the goal is appearing correctly</li>
            <li>Each goal has a priority, set with the slider (the highest is on the left, and new goals start there). If there isn't enough money, lower-priority goals are cut first. Year View > Expenses shows each goal's priority in the Category column.</li>
            <li>Some costs are already included elsewhere in your plan: contributions are set on each savings, investment or pension account, insurance premiums on each policy, and debt repayments on each debt. Check your spending goals don't include these as well, or they'll be counted twice.</li>
          </ul>
        `,
      },
      "expense-details": {
        description: `
          <p>The Details tab allows you to set a <strong>more specific expense amount or structure</strong> for this goal - including itemising the expenditure or making it a % of your income.</p>
          <p>Anything entered here will override what you entered in the Basics tab, so only use this tab if you need more precise control than the Basics tab allows.</p>
        `,
      },
      timing: {
        description: `
          <p>The Timing tab controls <strong>when this goal starts and ends</strong> in your plan, and how frequently it occurs.</p>
          <p>Goals are linked to timeline events - so if your retirement date changes, any goals tied to it will move automatically. You can also set a goal to repeat less frequently than annually - for example, every two years for a biennial expense.</p>
          <ul>
            <li>Use the Expense Frequency field to model less-than-annual goals</li>
            <li>Check the Shackademy lesson for a step-by-step walkthrough</li>
          </ul>
        `,
      },
      "payment-sources": {
        description: `
          <p>The Payment Sources tab lets you specify <strong>which account or asset Voyant should use to pay for this goal</strong>. By default, Voyant will use whatever is available according to the liquidation order specified in plan settings.</p>
          <p>Use this tab if you want a specific account to fund a specific goal - for example, using a dedicated savings account for school fees.</p>
          <p>Use the "Only Use Preferred Sources" option very sparingly as it can create artificial shortfalls if the nominated account is insufficient.</p>
          <ul>${PAYMENT_SOURCES_PREFERRED_NOTE}</ul>
        `,
      },
      steps: {
        description: window.TAB_DESCRIPTIONS.steps,
      },
    },
  },

  // ============================================================
  // Milestone Goal
  // ============================================================

  "milestone-goal": {
    name: "Milestone Goal",
    typeIndicator: "milestoneExpenseInputOwnerLabel",
    lessons: ["income-expenses", "occassional-expenditure"],
    tabs: {
      basics: {
        description: `
          <p>A Milestone Goal models a <strong>one-off or specific expense</strong> tied to a particular life event - such as a wedding, a car purchase, or a home renovation.</p>
          <p>Enter the amount and use the model to assess the impact on your plan. If the goal creates a shortfall, you can explore alternatives using What If scenarios.</p>
          <p>We suggest using <strong>Goals rather than Expenses</strong> in Voyant as that then means you can easily track the progress on the Dashboard and Timeline tabs</p>
          <ul>
            <li>Use a name that's meaningful to you - it will appear on the timeline and in reports</li>
            <li>Check Year View > Expenses after saving to confirm the goal is appearing correctly</li>
          </ul>
        `,
      },
      timing: {
        description: `
          <p>The Timing tab controls <strong>when this goal occurs</strong> in your plan.</p>
          <p>Goals are linked to timeline events - so if a related event date changes, this goal will move automatically.</p>
          <ul>
            <li>The event defaults to the primary person's retirement. Change it to the event the goal belongs to.</li>
            <li>Check the Shackademy lesson for a step-by-step walkthrough</li>
          </ul>
        `,
      },
      "payment-sources": {
        description: `
          <p>The Payment Sources tab lets you specify <strong>which account or asset Voyant should use to pay for this goal</strong>. By default, Voyant will use whatever is available according to the liquidation order specified in plan settings.</p>
          <p>Use this tab if you want a specific account to fund this goal - for example, using a dedicated savings account.</p>
          <p>Use the "Only Use Preferred Sources" option very sparingly as it can create artificial shortfalls if the nominated account is insufficient.</p>
          <ul>${PAYMENT_SOURCES_PREFERRED_NOTE}</ul>
        `,
      },
    },
  },

  // ============================================================
  // Net Worth Goal
  // ============================================================

  "networth-goal": {
    name: "Net Worth Goal",
    typeIndicator: "networthGoalInput",
    lessons: ["income-expenses"],
    tabs: {
      basics: {
        description: `
          <p>The Net Worth Goal works differently from other goals - it tracks progress towards a <strong>target Net Worth amount</strong> by a chosen point in the plan, rather than modelling an expense.</p>
          <p>Net Worth includes property and liquid assets, less debts. It does not include assets held in Trust (these appear in the Plan Worth chart instead).</p>
          <p>We suggest using <strong>Goals rather than Expenses</strong> in Voyant as that then means you can easily track the progress on the Dashboard and Timeline tabs</p>
          <ul>
            <li>The Net Worth goal amount is a <strong>future value</strong></li>
            <li>Select an Event in the Timing section for when this goal should be assessed</li>
            <li>Track progress towards this goal in the Dashboard, Timeline, and Financial Summary / Events & Goals reports</li>
            <li>A result over 100% means the goal is exceeded by that amount</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Education Goal
  // ============================================================

  "education-goal": {
    name: "Education Goal",
    typeIndicator: "collegeExpenseInputOwnerLabel",
    lessons: ["income-expenses", "occassional-expenditure"],
    tabs: {
      basics: {
        description: `
          <p>An Education Goal models the <strong>cost of education</strong> in your plan - such as school or university fees - as an expense that Voyant will try to meet from your income and assets.</p>
          <p>We suggest using <strong>Goals rather than Expenses</strong> in Voyant as that then means you can easily track the progress on the Dashboard and Timeline tabs</p>
          <ul>
            <li>Use a name that's meaningful to you - it will appear on the timeline and in reports, e.g. "Emma - University Fees"</li>
            <li>Check Year View > Expenses after saving to confirm the goal is appearing correctly</li>
          </ul>
        `,
      },
      timing: {
        description: `
          <p>The Timing tab controls <strong>when this goal starts and ends</strong> in your plan, and how frequently it occurs.</p>
          <p>Goals are linked to timeline events - so if the relevant milestones change, any goals tied to it will move automatically.</p>
          <p>Voyant will often suggest creating events for education goals. You can accept, or create/link your own manually.</p>
          <ul>
            <li>Education goals occur annually by default, if you want a frequency less regular than annual, use a Pre-Retirement or Retirement goal</li>
            <li>Check the Shackademy lesson for a step-by-step walkthrough</li>
          </ul>
        `,
      },
      "payment-sources": {
        description: `
          <p>The Payment Sources tab lets you specify <strong>which account or asset Voyant should use to pay for this goal</strong>. By default, Voyant will use whatever is available according to the liquidation order specified in plan settings.</p>
          <p>Use this tab if you want a specific account to fund this goal - for example, a dedicated savings account for school fees.</p>
          <p>Use the "Only Use Preferred Sources" option very sparingly as it can create artificial shortfalls if the nominated account is insufficient.</p>
          <ul>${PAYMENT_SOURCES_PREFERRED_NOTE}</ul>
        `,
      },
      steps: {
        description: window.TAB_DESCRIPTIONS.steps,
      },
    },
  },

  // ============================================================
  // Gifting Goal
  // ============================================================

  "gifting-goal": {
    name: "Gifting Goal",
    typeIndicator: "legacyExpenseInputOwnerLabel",
    lessons: ["income-expenses"],
    tabs: {
      // HIGH-RISK: review on regulatory change (IHT)
      basics: {
        description: `
          <p>A Gifting Goal models a <strong>gift made by the owner/s</strong> - to another person in the plan, a person outside the plan, or a charity - as an expense that Voyant will try to meet from your income and assets.</p>
          <p>Enter the amount and use the model to assess the impact on your plan. If the goal creates a shortfall, you can explore alternatives using What If scenarios.</p>
          <p>We suggest using <strong>Goals rather than Expenses</strong> in Voyant as that then means you can easily track the progress on the Dashboard and Timeline tabs</p>
          <ul>
            <li>Choose a Recipient Type first - this determines whether you select an existing person in the plan, or enter a name for someone outside the plan or a charity</li>
            <li>Person in plan only appears once the plan has a child, grandchild, parent or other person. Your spouse or partner isn't offered.</li>
            <li>Use a name that's meaningful to you - it will appear on the timeline and in reports</li>
            <li>Check Year View > Expenses after saving to confirm the goal is appearing correctly</li>
          </ul>
        `,
      },
      timing: {
        description: `
          <p>The Timing tab controls <strong>when this gift starts and ends</strong> in your plan, and how frequently it occurs.</p>
          <p>Goals are linked to timeline events - so if your retirement date changes, any goals tied to it will move automatically.</p>
          <ul>
            <li>The timing defaults to running from Plan Start to the last death, so a gift left on the default is paid every year. For a one-off gift, use the same start and end event.</li>
            <li>Use the Expense Frequency field to model less-than-annual gifts</li>
            <li>Check the Shackademy lesson for a step-by-step walkthrough</li>
          </ul>
        `,
      },
      "payment-sources": {
        description: `
          <p>The Payment Sources tab lets you specify <strong>which account or asset Voyant should use to fund this gift</strong>. By default, Voyant will use whatever is available according to the liquidation order specified in plan settings.</p>
          <p>Use this tab if you want a specific account to fund this gift - for example, a dedicated savings account.</p>
          <p>Use the "Only Use Preferred Sources" option very sparingly as it can create artificial shortfalls if the nominated account is insufficient.</p>
          <ul>${PAYMENT_SOURCES_PREFERRED_NOTE}</ul>
        `,
      },
      steps: {
        description: window.TAB_DESCRIPTIONS.steps,
      },
    },
  },

  // ============================================================
  // Events & Stages
  // ============================================================

  events: {
    name: "Events",
    typeIndicator: "eventName",
    lessons: ["people-timeline"],
    tabs: {
      basics: {
        description: `
          <p>Events are <strong>milestones on your timeline</strong> - named points in time that Voyant uses to trigger changes in your plan. Retirement, buying a property, children leaving home, or starting a business are all examples of events.</p>
          <p>Rather than working with fixed calendar dates, Voyant links items in your plan to events. If you change when an event happens, everything connected to it moves too, so check what an event is linked to before moving it.</p>
          <p>We suggest only linking items to the same event if they should always move together, and giving things like a property sale, a DB pension start, withdrawals, contribution changes and gifts their own events. That way, changing one doesn't move the others.</p>
          <ul>
            <li>Use descriptive names - "Jane Retires" is much clearer than "Event 1"</li>
            <li>Events can be positioned by year or by the owner's age - both update each other automatically</li>
            <li>If the event is linked to anything, the top of the form says "This event affects the timing of ... items". Click <strong>Show Details</strong> to see how many of each type, then click a type (for example Income) to see each item's name and its start and end.</li>
            <li>An event linked to other items can't be deleted. First remove it from the timing of each item listed, then delete it. Some events, such as Retirement, can't be deleted at all.</li>
            <li>Changing this event's year or age moves everything linked to it.</li>
          </ul>
          <p><strong>Special events:</strong></p>
          <ul>
            <li><strong>Disability</strong> - stops that person's salary and pension contributions from that year. Without a Disability End event, the salary doesn't come back. There can only be one Disability event per person. Income protection only pays during it.</li>
            <li><strong>Critical illness</strong> - pays any critical illness cover, but doesn't stop salary. To model time off work, add a Disability event too.</li>
            <li><strong>Mortality</strong> - can't be set before that person's retirement age. To look at an early death, use Overview > Legacy or the Life Needs insight.</li>
          </ul>
        `,
      },
    },
  },

  stages: {
    name: "Stages",
    typeIndicator: "stageInputName",
    lessons: ["people-timeline"],
    tabs: {
      basics: {
        description: `
          <p>Stages are <strong>labelled bands on your timeline</strong> that visually organise your plan into distinct life phases - such as "Working Years", "Early Retirement", or "Later Life".</p>
          <p>Stages are purely visual and don't affect any calculations, but they can make your plan easier to read and discuss. They are bounded by Events on the timeline, so set up your Events first and use Stages to label the periods between them.</p>
          <ul>
            <li>Use consistent colour schemes across What If scenarios to keep plans easy to compare</li>
            <li>Common stage names: Working Years, Pre-Retirement, Early Retirement, Later Life, Children at Home</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Employment Income
  // ============================================================

  "employment-income": {
    name: "Employment Income",
    typeIndicator: "employmentInputEmploymentSource",
    lessons: ["income-expenses", "retiring-part-way"],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter <strong>income from employment</strong> - salary, bonuses, commissions, and benefits in kind. All figures should be entered <strong>gross</strong> (before tax and National Insurance).</p>
        `,
      },
      timing: { description: window.TAB_DESCRIPTIONS.timing },
      steps: { description: window.TAB_DESCRIPTIONS.steps },
    },
  },

  // ============================================================
  // Other Income
  // ============================================================

  "other-income": {
    name: "Other Income",
    typeIndicator: "otherIncomeTaxationType",
    lessons: ["income-expenses"],
    tabs: {
      basics: {
        description: `
          <p>Other Income covers <strong>income that is not subject to National Insurance</strong> - including rental income, royalties, maintenance payments, or overseas income. It is also used for employment earnings not subject to standard UK income tax.</p>
          <p>Voyant assesses other income at the end of each plan year and applies tax as an expense in the following year.</p>
          <p>Use the Taxation Type field to tell Voyant how to tax this income - as income, property income, capital gains, or dividends.</p>
        `,
      },
      timing: {
        description: `
          <p>The Timing tab controls <strong>when this income starts and ends</strong> in your plan.</p>
          <p>Check the start and end events on this tab. The defaults may not match when this income actually starts and stops, for example if it carries on into retirement.</p>
        `,
      },
      steps: { description: window.TAB_DESCRIPTIONS.steps },
    },
  },

  // ============================================================
  // Windfall
  // ============================================================

  windfall: {
    name: "Windfall",
    typeIndicator: "windfallInputType",
    lessons: ["income-expenses"],
    tabs: {
      basics: {
        description: `
          <p>A windfall is a <strong>one-off lump sum received at a specific point in the plan</strong> - such as an inheritance.</p>
          <p>Voyant treats windfalls as a cash inflow at the date you specify. Set the Taxable field and Taxation Type carefully to ensure Voyant applies the correct tax treatment.</p>
          <ul>
            <li>Use the Timing tab to set when the windfall is received.</li>
            <li>For inheritances, enter the net amount expected after any inheritance tax, estate liabilities, funeral costs, and any other deductions have been settled from the estate.</li>
            <li>The whole amount is paid into your Default Surplus Account (cash) at the end of that year, and stays there unless a Transfer or Sweep moves it.</li>
            <li>A windfall in the plan's first year drops out at the next plan-year update.</li>
          </ul>
        `,
      },
      timing: { description: window.TAB_DESCRIPTIONS.timing },
    },
  },

  // ============================================================
  // Savings & Investments - Savings
  // ============================================================

  savings: {
    name: "Savings",
    typeIndicator: "ukSavingInputSavingType",
    lessons: [
      "savings-investments",
      "lump-sums",
      "non-standard-assets",
      "managing-withdrawals",
    ],
    tabs: {
      // HIGH-RISK: review on regulatory change (ISA)
      basics: {
        description: `
          <p>This is where you enter <strong>cash savings accounts</strong> - current accounts, savings accounts, Cash ISAs, and National Savings Certificates.</p>
          <p>The account type matters for tax purposes. Voyant treats accounts as follows:</p>
          <ul>
            <li><strong>Current/savings accounts</strong> - interest is taxable</li>
            <li><strong>Cash ISA</strong> - tax-free; contributions limited to the annual ISA allowance</li>
            <li><strong>National Savings Certificate</strong> - tax-free; Voyant applies no contribution limit</li>
          </ul>
          <p>When income falls short of expenses, Voyant draws on savings according to the liquidation order. Check Dashboard > Plan Settings > Liquidation Order to see and adjust this.</p>
        `,
      },
      timing: {
        description: `
          <p>The Timing tab controls <strong>when contributions are allowed</strong> in this plan. Voyant uses timeline events - milestones you define, like Retirement or a specific age - rather than fixed calendar dates, so your plan stays dynamic as assumptions change.</p>
          <ul>
            <li>It is imperative that this is set if you want the account to be able to receive contributions.</li>
            <li>Contributions need both a Contributions Start and a Contributions End event, set on this <strong>Timing</strong> tab. Without both, none are made.</li>
            <li>As a baseline, you can set the start to 'Plan Start' and end to 'Plan End' to allow contributions throughout.</li>
          </ul>
        `,
      },
      fees: { description: window.TAB_DESCRIPTIONS.fees },
      steps: { description: window.TAB_DESCRIPTIONS.steps },
      transfers: { description: window.TAB_DESCRIPTIONS.transfers },
      drawdowns: { description: window.TAB_DESCRIPTIONS.drawdowns },
      "liquidation-limits": {
        description: window.TAB_DESCRIPTIONS["liquidation-limits"],
      },
    },
  },

  // ============================================================
  // Savings & Investments - Investments
  // ============================================================

  investments: {
    name: "Investments",
    typeIndicator: "investmentInputInvesmentType",
    lessons: [
      "savings-investments",
      "lump-sums",
      "non-standard-assets",
      "managing-withdrawals",
    ],
    tabs: {
      // HIGH-RISK: review on regulatory change (ISA/bonds)
      basics: {
        description: `
          <p>This is where you enter <strong>investment accounts and wrappers</strong> - Stocks & Shares ISAs, Lifetime ISAs, onshore and offshore bonds, unwrapped investments, trusts, EIS, SEIS, VCTs, and more.</p>
          <p>The Type field is critical - it determines Voyant's tax treatment and whether Voyant will access the account automatically or only via planned withdrawals. Voyant treats accounts as follows:</p>
          <ul>
            <li><strong>Stocks & Shares ISA / Lifetime ISA</strong> - tax-free growth and withdrawals</li>
            <li><strong>Unwrapped investments</strong> - subject to Capital Gains Tax on gains</li>
            <li><strong>Onshore/Offshore bonds</strong> - tax-deferred. Voyant applies the bond withdrawal allowance; see Year View > Taxes</li>
            <li><strong>Trusts, EIS, SEIS, VCTs</strong> - not accessed automatically; require planned withdrawals</li>
          </ul>
          <p>For investment bonds, make sure you enter the Purchase Value and Year Purchased accurately as these affect Voyant's tax calculations.</p>
        `,
      },
      growth: { description: window.TAB_DESCRIPTIONS.growth },
      timing: {
        description: `
          <p>The Timing tab controls <strong>when contributions are allowed</strong> in this plan. Voyant uses timeline events - milestones you define, like Retirement or a specific age - rather than fixed calendar dates, so your plan stays dynamic as assumptions change.</p>
          <ul>
            <li>It is imperative that this is set if you want the account to be able to receive contributions.</li>
            <li>Contributions need both a Contributions Start and a Contributions End event, set on this <strong>Timing</strong> tab. Without both, none are made.</li>
            <li>Onshore and offshore bonds also need a Bond Start and a Bond End event.</li>
            <li>As a baseline, you can set the start to 'Plan Start' and end to 'Plan End' to allow contributions throughout.</li>
          </ul>
        `,
      },
      fees: { description: window.TAB_DESCRIPTIONS.fees },
      steps: { description: window.TAB_DESCRIPTIONS.steps },
      transfers: { description: window.TAB_DESCRIPTIONS.transfers },
      drawdowns: { description: window.TAB_DESCRIPTIONS.drawdowns },
      "liquidation-limits": {
        description: window.TAB_DESCRIPTIONS["liquidation-limits"],
      },
    },
  },

  // ============================================================
  // Property
  // ============================================================

  property: {
    name: "Property",
    typeIndicator: "propertyInputAssetType",
    lessons: ["property-basics", "what-if-downsizing", "what-if-upsizing"],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter <strong>property and other physical assets</strong> - your main home, buy-to-let properties, holiday homes, vehicles, collectables, or business property. Enter the current market value.</p>
          <p>The Asset Type field is important for tax. Voyant assesses this as follows:</p>
          <ul>
            <li><strong>Main Residence</strong> - treated as your home, so no Capital Gains Tax is charged on sale</li>
            <li><strong>All other property</strong> - gains on sale are subject to CGT</li>
          </ul>
          <p>If the property has not yet been purchased, toggle <em>Is this a Future Purchase?</em> to Yes and use the Timing tab to set the buy and sell events.</p>
          <p>You can link associated debts (mortgages), expenses (maintenance), and income (rental) to the property so they appear and disappear in the plan alongside the property itself.</p>
          <p>Only enter a business here if it has a material value that you will realise and you want this included in your plan.</p>
        `,
      },
      timing: {
        description: `
          <p>The Timing tab for property sets the <strong>buy and sell events</strong> - the timeline milestones at which Voyant models the property being purchased and disposed of.</p>
          <p>If you are modelling a property that is already owned and not being sold within the plan, leave the Buy Event as 'Plan Start' and the Sell Event as 'Plan End'.</p>
          <p>If you are modelling a future purchase or a planned sale - such as downsizing in retirement - set both events carefully. Voyant will model the purchase cost as an expense and any sale proceeds as an inflow, with CGT applied where applicable.</p>
          <p>Check out the linked lesson to understand how to include Stamp Duty Land Tax.</p>
          <ul>
            <li>Sale proceeds first pay that year's spending. The rest goes into cash, split by ownership share, and any Capital Gains Tax shows the following year. A linked mortgage is repaid from the sale. Check Year View &gt; Cash Flow and Property in the year of sale.</li>
          </ul>
        `,
      },
      steps: { description: window.TAB_DESCRIPTIONS.steps },
      "payment-sources": {
        description: `
          <p>The Payment Sources tab lets you control <strong>which accounts or assets are used to fund a future property purchase</strong>.</p>
          <p>By default, Voyant will normally fund payments from available income and assets according to the liquidation order, set in 'Plan Settings'. Use this tab if you need to direct payments from a specific source.</p>
          <ul>
            <li>Use cautiously, as restricting payment sources can create artificial shortfalls</li>
            <li>Check Year View after saving to make sure payments are being funded as intended</li>
            <li>In testing on a property purchase, with 'Only Use Preferred Payment Sources' ticked, nothing was paid if the preferred sources couldn't cover the whole price, and the full cost showed as Unfulfilled in Year View &gt; Expenses.</li>
          </ul>
        `,
      },
      "linked-debts": {
        description: `
          <p>The Linked Debts tab lets you link an existing debt or create a new one.</p>
          <p>If the property is sold (Timing tab) then the linked debt will be paid down with the proceeds of the sale.</p>
        `,
      },
      "linked-expenses": {
        description: `
          <p>The Linked Expenses tab lets you link existing expenses or create new ones e.g. ongoing maintenance costs.</p>
          <p>If the property is sold (Timing tab) then the linked expenses will cease accordingly.</p>
        `,
      },
      "linked-income": {
        description: `
          <p>The Linked Income tab lets you link existing income or add new ones e.g. rental income.</p>
          <p>If the property is sold (Timing tab) then the linked income will cease accordingly.</p>
          <ul>
            <li>Linked rent is split between the property's owners in the same proportions as the property itself, and stops automatically when the property is sold. To see the split, click the property's name in Year View &gt; Property.</li>
          </ul>
        `,
      },
      "linked-reverse-mortgage": {
        description: `
          <p>The Linked Equity Release tab lets you link an existing equity release mortgage, or create a new one.</p>
          <p>This is not something currently covered in the Shackademy lessons, but please get in touch if you would like help adding these details.</p>
        `,
      },
    },
  },

  // ============================================================
  // Money Purchase Pension
  // ============================================================

  "pension-money-purchase": {
    name: "Money Purchase Pension",
    typeIndicator: "ukMoneyPurchaseInputType",
    lessons: ["pension-basics", "lump-sums", "pension-withdrawals"],
    tabs: {
      // HIGH-RISK: review on regulatory change (pension allowances/relief)
      basics: {
        description: `
          <p>This is where you enter a <strong>defined contribution (money purchase) pension</strong> - including personal pensions, SIPPs, workplace pensions, and GPPs.</p>
          <p>The pension <strong>Type</strong> decides how Voyant gives tax relief on contributions:</p>
          <ul>
            <li><strong>Personal Pension, Group Personal Pension, SIPP, Group SIPP</strong> - relief at source. Year View &gt; Expenses shows the contribution at its net cost, and any higher-rate relief comes back the following year as a Tax Credit in Cash Flow.</li>
            <li><strong>Occupational Pension, SSAS</strong> - net pay. Expenses shows the full contribution, and income tax is worked out on the salary minus the contribution.</li>
            <li><strong>Salary sacrifice</strong> set to Yes overrides the Type: income tax and National Insurance are both worked out on the salary minus the contribution.</li>
          </ul>
          <p>Choose the Type that matches how the scheme really gives relief. That's a question for the employer or the scheme.</p>
          <p>Key things to check:</p>
          <ul>
            <li>Enter the amount going into the pension. For a relief at source Type, Voyant adds the basic-rate relief itself, so Expenses shows less than the pot receives.</li>
            <li>If employer contributions apply, toggle the Employer Contribution section and link to the relevant employment</li>
            <li>Ensure the withdrawal limit tab reflects at least the minimum pension access age for your pension</li>
            <li>Saving a money purchase pension also creates a linked 'Drawdown - (pension name)' pot at nil. It's used for money that's crystallised but not yet taken. It has its own Growth tab, which doesn't automatically follow the main pension.</li>
          </ul>
        `,
      },
      growth: { description: window.TAB_DESCRIPTIONS.growth },
      fees: { description: window.TAB_DESCRIPTIONS.fees },
      timing: {
        description: `
          <p>The Timing tab controls <strong>when contributions are allowed</strong> in this plan. Voyant uses timeline events - milestones you define, like Retirement or a specific age - rather than fixed calendar dates, so your plan stays dynamic as assumptions change.</p>
          <ul>
            <li>For a pension, contributions default to running from Plan Start to your Retirement event. Change the events if your contributions stop at a different time.</li>
            <li>Contributions need both a Contributions Start and a Contributions End event. Without both, none are made.</li>
          </ul>
        `,
      },
      steps: { description: window.TAB_DESCRIPTIONS.steps },
      // HIGH-RISK: review on regulatory change (pension allowances/relief)
      crystallizations: {
        description: `
          <p>The Crystallisations tab allows you to model <strong>specific pension crystallisation events</strong> - the point at which pension benefits are formally accessed and tax-free cash is taken.</p>
          <p>Use this tab for a specific crystallisation, such as taking tax-free cash at an event. Tick 'Apply Crystallisation Instructions', and check the crystallisation is listed after saving.</p>
          <ul>
            <li>Crystallising 100% closes the pension to further contributions. Voyant suggests a Flexi Planned Withdrawal, or crystallising 99%, if contributions need to carry on.</li>
            <li>When to take money out is set on the Withdrawal Limit and Planned Withdrawals tabs, not Timing.</li>
            <li>If you want to model regular, consistent crystallisation events then it may be easier to manage that using the 'Planned Withdrawals' tab.</li>
          </ul>
        `,
      },
      beneficiaries: {
        description: `
          <p>The Beneficiaries tab reflects what happens to your pension when you die.</p>
          <p>Refer to the tooltip for more details on the options available.</p>
          <ul>
            <li>Beneficiary percentages default to 0%. Set them to match your nomination with the provider.</li>
          </ul>
        `,
      },
      transfers: { description: window.TAB_DESCRIPTIONS.transfers },
      "liquidation-limits": {
        description: window.TAB_DESCRIPTIONS["liquidation-limits"],
      },
      drawdowns: { description: window.TAB_DESCRIPTIONS.drawdowns },
      annuity: {
        description: `
          <p>The Annuitization tab allows you to model the <strong>conversion of some or all of this pension pot into a guaranteed annuity income</strong> at a future point.</p>
          <p>You can specify the percentage of the fund to annuitise, the timing, escalation rate, and whether it pays on a single or joint life basis.</p>
          <p>If you are not planning to purchase an annuity, you can leave this tab as default. Voyant will model the pension as remaining in drawdown.</p>
        `,
      },
    },
  },

  // ============================================================
  // DB Pension
  // ============================================================

  "pension-defined-benefit": {
    name: "Final Salary Pension",
    typeIndicator: "ukFinalSalaryInputStatus",
    lessons: ["pension-basics"],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter a <strong>defined benefit pension</strong> - common in the public sector (NHS, teachers, civil service, armed forces) and some older workplace schemes.</p>
          <p>Unlike defined contribution pensions, the benefit is a guaranteed income based on your salary and years of service - not a pot of money.</p>
          <p>The Status field is critical as it will determine how Voyant treats the plan:</p>
          <ul>
            <li><strong>Active</strong> - you are still building up benefits; link to your employment entry</li>
            <li><strong>Deferred</strong> - you have left the scheme but not yet started taking benefits; enter the known deferred benefit amount</li>
            <li><strong>In Payment</strong> - benefits are already being received; enter the current annual amount</li>
          </ul>
          <p>Check your pension scheme statement carefully for the benefit amount, accrual rate, and normal retirement age - these vary significantly between schemes.</p>
        `,
      },
      timing: {
        description: `
          <p>The Timing tab for a Final Salary pension sets <strong>when you intend to start drawing an income</strong> from the plan. This is typically your planned retirement date or a specific age event.</p>
          <p>If you start taking benefits before the scheme's Normal Retirement Age (entered in the Basics tab), Voyant will apply the actuarial reduction rate automatically.</p>
          <ul>
            <li>Start Pension defaults to your Retirement event. Giving the pension its own event means retirement can move without moving it.</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Annuity
  // ============================================================

  annuity: {
    name: "Annuity",
    typeIndicator: "ukAnnuityInputStatus",
    tabs: {
      basics: {
        description: `
          <p>This is where you enter an <strong>existing or future annuity</strong> - a financial product that converts a lump sum into a guaranteed income, either for life or a fixed term.</p>
          <p>The Status field determines how Voyant models it:</p>
          <ul>
            <li><strong>In Payment</strong> - currently paying income; enter the annual amount</li>
            <li><strong>Deferred</strong> - purchased but not yet paying; enter the future income amount and set the start date in Timing</li>
            <li><strong>Future</strong> - not yet purchased; enter the expected purchase value and Voyant will calculate the projected income</li>
          </ul>
        `,
      },
      timing: {
        description: `
          <p>The Timing tab for an annuity sets <strong>when you intend to start drawing an income</strong> from the plan.</p>
        `,
      },
      "payment-sources": {
        description: `
          <p>The Payment Sources tab lets you control <strong>which accounts or assets are used to fund a future annuity purchase</strong>.</p>
          <p>By default, Voyant will normally fund payments from available income and assets according to the liquidation order, set in 'Plan Settings'. Use this tab if you need to direct payments from a specific source.</p>
          <ul>
            <li>Use cautiously, as restricting payment sources can create artificial shortfalls</li>
            <li>Check Year View after saving to make sure payments are being funded as intended</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Drawdown Pension
  // ============================================================

  drawdown: {
    name: "Drawdown Pension",
    typeIndicator: "ukUnsecuredPensionInputOwnerLabel",
    lessons: ["pension-basics", "pension-withdrawals"],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter an <strong>existing drawdown pension</strong> - a crystallised pension pot that is already in drawdown at the plan start date.</p>
          <p>If you are modelling a pension that will move into drawdown during the plan, enter it as a Money Purchase pension instead - Voyant will create the drawdown pot automatically.</p>
          <ul>
            <li>The Initial Balance field is needed for Voyant to correctly calculate the Lump Sum Death Benefit Allowance on growth</li>
            <li>Check the Type and Tax Status (if relevant) carefully</li>
            <li>For 'Linked Drawdown' plans i.e. those created automatically when a Money Purchase pension is entered, review the growth tab to ensure it reflects what you expect.</li>
            <li>A Linked Drawdown pension only becomes relevant if you take tax free cash without taking the full taxable element of the pension.</li>
            <li>Saving a money purchase pension also creates a linked 'Drawdown - (pension name)' pot at nil. It's used for money that's crystallised but not yet taken. It has its own Growth tab, which doesn't automatically follow the main pension.</li>
          </ul>
        `,
      },
      growth: { description: window.TAB_DESCRIPTIONS.growth },
      fees: { description: window.TAB_DESCRIPTIONS.fees },
      beneficiaries: {
        description: `
          <p>The Beneficiaries tab reflects what happens to your pension when you die.</p>
          <p>Refer to the tooltip for more details on the options available.</p>
        `,
      },
      steps: { description: window.TAB_DESCRIPTIONS.steps },
      "liquidation-limits": {
        description: window.TAB_DESCRIPTIONS["liquidation-limits"],
      },
      drawdowns: { description: window.TAB_DESCRIPTIONS.drawdowns },
      annuity: {
        description: `
          <p>The Annuitization tab allows you to model the <strong>conversion of some or all of this pension pot into a guaranteed annuity income</strong> at a future point.</p>
          <p>You can specify the percentage of the fund to annuitise, the timing, escalation rate, and whether it pays on a single or joint life basis.</p>
          <p>If you are not planning to purchase an annuity, you can leave this tab as default. Voyant will model the pension as remaining in drawdown.</p>
        `,
      },
    },
  },

  // ============================================================
  // State Pension
  // ============================================================

  "state-pension": {
    name: "State Pension",
    typeIndicator: "ukStatePensionInputOwnerLabel",
    lessons: ["pension-basics"],
    tabs: {
      // HIGH-RISK: review on regulatory change (State Pension)
      basics: {
        description: `
          <p>This is where you enter the <strong>UK State Pension</strong> for each person in the plan.</p>
          <p>Get the State Pension forecast for each person at <a href="https://www.gov.uk/check-state-pension" target="_blank" rel="noopener noreferrer">gov.uk/check-state-pension</a> - this gives you the projected amount and exact State Pension Age based on date of birth.</p>
          <ul>
            <li>Voyant increases the State Pension each year using the earnings and price inflation rates in Plan Settings. Check Plan Settings if you want to see or change them.</li>
            <li>You can model deferral by setting a Start Age later than the specified State Pension Age</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Stock Grant
  // ============================================================

  "stock-grant": {
    name: "Stock Grant",
    typeIndicator: "stockGrantInputOwnerLabel",
    lessons: [],

    tabs: {
      basics: {
        description: `
          <p>This is where you model <strong>share-based compensation</strong> such as Restricted Stock Units (RSUs) and share options.</p>
          <p>The key inputs here determine <strong>how the grant behaves over time</strong> within Voyant - including how it vests, whether it can be exercised, and how it links to your employment.</p>
          <ul>
            <li><strong>Grant Type</strong> affects how the grant is treated and whether an exercise price applies</li>
            <li><strong>Current Price</strong> and <strong>Growth</strong> assumptions drive the future value of the shares</li>
            <li><strong>Linked Employment</strong> helps align the grant with your working timeline</li>
          </ul>
          <p>Stock grants can be complex, particularly where tax treatment differs between grant types. Check outputs carefully in Year View.</p>
        `,
      },

      growth: {
        description: `
          <p>The Growth tab controls <strong>how the underlying share price is projected over time</strong>.</p>
          <p>This has a direct impact on the value of both vested and unvested shares.</p>
          <ul>
            <li><strong>Growth Rate Type</strong> determines how returns are applied</li>
            <li><strong>Stock Growth Rate</strong> sets the assumed annual increase in share value</li>
          </ul>
        `,
      },

      exercise: {
        description: `
          <p>The Exercise tab applies to <strong>option-based grants</strong> and controls when and how shares are exercised.</p>
          <p>Exercising an option means purchasing shares at the exercise price. This can create both a <strong>cashflow requirement</strong> and a <strong>taxable event</strong>, depending on the scheme.</p>
          <ul>
            <li><strong>Exercise Timing</strong> determines whether options are exercised at vesting or at a chosen event</li>
            <li><strong>Funding Method</strong> controls how the cost of exercise is covered</li>
          </ul>
          <p>Check the results in Year View to confirm the behaviour matches your expectations.</p>
        `,
      },

      "vested-shares": {
        description: `
          <p>This section captures <strong>shares that have already vested or been exercised</strong> at the start of the plan.</p>
          <p>This allows you to reflect your current position accurately before modelling future vesting and exercise.</p>
          <ul>
            <li>Enter shares that are already <strong>vested</strong> or <strong>exercised</strong></li>
            <li>Include the <strong>fair market value</strong> at vesting or exercise where relevant</li>
          </ul>
          <p>Make sure these shares are not duplicated in the Future Vesting Schedule, as this may overstate your holdings.</p>
        `,
      },

      "future-vesting": {
        description: `
          <p>The Future Vesting Schedule models <strong>how unvested shares become available over time</strong>.</p>
          <p>Within Voyant, vesting determines when shares move from being conditional to being fully owned. Until shares vest, they are typically not accessible or realisable.</p>
          <ul>
            <li><strong>Number of Shares Remaining</strong> in the 'Basics' tab reflects the unvested portion of the grant</li>
            <li><strong>Remaining Vesting Period</strong> in the 'Basics' tab spreads vesting across future years</li>
            <li>You can use <strong>Estimate Schedule</strong> to provide a starting point</li>
            <li>Estimate Schedule splits the shares evenly across the years. For cliff or uneven vesting, use Add Year.</li>
            <li>After a plan-year update, remove any vest years now in the past, or the chart shows an error.</li>
          </ul>
          <p>Voyant uses this information to introduce shares into your plan gradually. Check the timing carefully to ensure vesting aligns with your expectations.</p>
        `,
      },

      liquidation: {
        description: `
          <p>The Liquidation tab controls <strong>how and when shares are sold</strong> once they are available.</p>
          <p>This determines whether shares are retained for growth or converted into cash to support spending.</p>
          <ul>
            <li><strong>Sell all available</strong> will realise all shares at a chosen event</li>
            <li><strong>Recurring strategies</strong> allow you to model ongoing income from share sales</li>
            <li><strong>None</strong> means shares are retained unless accessed elsewhere</li>
            <li>The default, None, keeps vested shares invested for the whole plan.</li>
          </ul>
          <p>Check the impact in Year View to ensure sales occur at the expected times and that the remaining share balance behaves as intended.</p>
        `,
      },

      "future-grant": {
        description: `
          <p>The Future Grant tab allows you to model <strong>ongoing or additional stock awards</strong> beyond the current grant.</p>
          <p>This is useful where stock-based compensation is expected to continue, such as annual RSU awards or recurring option grants.</p>
          <ul>
            <li>Grants can be modelled as a <strong>percentage of salary</strong>, a <strong>fixed number of shares</strong>, or a <strong>fixed value</strong></li>
            <li>This helps project how future compensation may build over time</li>
          </ul>
        `,
      },

      steps: { description: window.TAB_DESCRIPTIONS.steps },
    },
  },

  // ============================================================
  // Debts
  // ============================================================

  debt: {
    name: "Debt",
    typeIndicator: "debtInputOwnerLabel",
    lessons: ["property-basics", "overpayments", "paydown-mortgage"],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter a <strong>debt that needs to be repaid</strong>, such as a mortgage, loan, credit card, or other borrowing.</p>
          <p>The key inputs are the current balance, interest rate, payment type, and payment amount or duration. Together, these determine how the debt changes over time in Voyant.</p>
          <ul>
            <li>Use <strong>Repayment</strong> where payments reduce the capital balance over time</li>
            <li>Use <strong>Interest Only</strong> where the capital balance remains outstanding unless repaid separately</li>
            <li>Check Year View to confirm the debt reduces, remains level, or is paid off as expected</li>
          </ul>
        `,
      },
      timing: {
        description: window.TAB_DESCRIPTIONS.timing,
      },
      steps: {
        description: `
          ${window.TAB_DESCRIPTIONS.steps}
          <ul>
            <li>Changing only the interest rate in a Step doesn't change the payment. Tick Payment in the same Step and enter the new payment too.</li>
          </ul>
        `,
      },
      "payment-sources": {
        description: `
          <p>The Payment Sources tab lets you control <strong>which accounts or assets are used to make debt payments</strong>.</p>
          <p>By default, Voyant will normally fund payments from available income and assets according to the liquidation order, set in 'Plan Settings'. Use this tab if you need to direct payments from a specific source.</p>
          <ul>
            <li>Use cautiously, as restricting payment sources can create artificial shortfalls</li>
            <li>Check Year View after saving to make sure payments are being funded as intended</li>
          </ul>
        `,
      },
      "onetime-payments": {
        description: `
          <p>The One Time Payments tab lets you model <strong>one-off repayments</strong> against the debt.</p>
          <p>This is especially useful for lump sum repayments, clearing an interest-only mortgage, or paying off the full balance at a particular event.</p>
          <p>If the debt is linked to a property (Linked Property tab) then the sale of the linked property will automatically pay down the debt.</p>
          <ul>
            <li><strong>Specified Amount</strong> lets you enter a partial one-off repayment</li>
            <li><strong>Payoff</strong> clears the full outstanding balance at the selected time</li>
            <li>Use the timing settings to control when the payment happens</li>
          </ul>
        `,
      },
      links: {
        description: `
          <p>The Linked Property tab lets you connect this debt to a property in the plan.</p>
          <p>This is typically relevant for mortgages or other debts secured against a property. Linking the debt helps Voyant treat the borrowing alongside the asset it relates to.</p>
          <ul>
            <li>If the linked property is sold, you can use Year View to check whether the debt is repaid as expected</li>
          </ul>
        `,
      },
    },
  },

  "line-of-credit": {
    name: "Line of Credit",
    typeIndicator: "lineOfCreditInputOwnerLabel",
    lessons: ["property-basics", "overpayments", "paydown-mortgage"],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter a <strong>line of credit</strong> - flexible borrowing that can be drawn from over time.</p>
          <p>The credit limit can be entered as a fixed amount or based on a percentage of equity in a linked asset. The current balance reflects how much has already been borrowed.</p>
          <ul>
            <li>Use <strong>Fixed</strong> if the credit limit is a set amount</li>
            <li>Use <strong>Percent of Equity</strong> if the available credit depends on the value of a linked property or asset</li>
            <li>Check the Withdrawal Limit tab, as the default may prevent Voyant from drawing from the facility</li>
          </ul>
        `,
      },
      timing: {
        description: window.TAB_DESCRIPTIONS.timing,
      },
      steps: {
        description: window.TAB_DESCRIPTIONS.steps,
      },
      "payment-sources": {
        description: `
          <p>The Payment Sources tab lets you control <strong>which accounts or assets are used to make payments on the line of credit</strong>.</p>
          <p>Use this if payments need to come from a particular account rather than the plan's usual funding order.</p>
          <ul>
            <li>Restricting payment sources can create shortfalls if the selected source is not sufficiently funded</li>
            <li>Check Year View &gt; Debts to confirm the line of credit is being paid down or maintained as expected</li>
          </ul>
        `,
      },
      "onetime-payments": {
        description: `
          <p>The One Time Payments tab lets you model <strong>one-off repayments</strong> against the line of credit.</p>
          <p>This can be useful if you expect to reduce or clear the balance at a future event.</p>
          <p>If the debt is linked to a property (Linked Property tab) then the sale of the linked property will automatically pay down the debt.</p>
          <ul>
            <li>Use a specified amount for a partial repayment</li>
            <li>Use payoff if the full balance is expected to be cleared</li>
            <li>Check the debt balance after the payment in Year View</li>
          </ul>
        `,
      },
      links: {
        description: `
          <p>The Linked Property tab lets you connect the line of credit to a property in the plan.</p>
          <p>This is particularly important if the credit limit is based on a <strong>percentage of equity</strong>, because Voyant needs to know which property value to reference.</p>
          <ul>
            <li>Link the relevant property if using Percent of Equity</li>
            <li>Remember that property growth assumptions may affect future borrowing capacity</li>
            <li>Check Year View to confirm the credit limit and balance behave as expected</li>
          </ul>
        `,
      },
      "liquidation-limits": {
        description: `
          <p>The Withdrawal Limit tab controls <strong>whether and when Voyant can borrow from this line of credit</strong> to meet expenses.</p>
          <p>For a line of credit, this defaults to Do Not Allow, so Voyant won't borrow from it. As Needed lets Voyant borrow to cover any shortfall once other accessible assets have run out, which can make a plan look funded while the debt grows.</p>
          <ul>
            <li>Check Year View &gt; Debts to see how the balance changes over time</li>
          </ul>
        `,
      },
      drawdowns: {
        description: window.TAB_DESCRIPTIONS.drawdowns,
      },
    },
  },

  "equity-release": {
    name: "Equity Release",
    typeIndicator: "reverseMortgageOwnerLabel",
    lessons: [],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter an <strong>equity release or reverse mortgage arrangement</strong>.</p>
          <p>The key inputs include whether the arrangement is new or existing, the mortgage amount, interest rate, any lump sum taken, annual advances, credit limit, and credit limit growth rate.</p>
          <ul>
            <li>This type of borrowing requires a linked property in Voyant</li>
            <li>Check Year View &gt; Debts and Cash Flow to confirm the arrangement behaves as expected</li>
          </ul>
        `,
      },
      links: {
        description: `
          <p>The Linked Property tab connects the equity release arrangement to the property it relates to.</p>
          <ul>
            <li>Make sure the linked property is the correct one</li>
            <li>Check ownership is consistent between the property and equity release arrangement (this should automatically filter through to the Basics tab)</li>
            <li>Review Year View to compare the projected property value and equity release balance over time and ensure this behaves as expected</li>
          </ul>
        `,
      },
      timing: {
        description: `
          ${window.TAB_DESCRIPTIONS.timing}
          <ul>
            <li>For a new arrangement, the timing defaults to the primary person's retirement.</li>
          </ul>
        `,
      },
      "onetime-payments": {
        description: `
          <p>The One Time Payments tab lets you model <strong>one-off payments</strong> against the equity release arrangement.</p>
          <p>This may be useful if the arrangement is expected to be partly or fully repaid at a future event.</p>
          <ul>
            <li>Use a specified amount for a partial repayment</li>
            <li>Use payoff if the full outstanding balance is expected to be cleared</li>
          </ul>
        `,
      },
    },
  },

  loan: {
    name: "Loan",
    typeIndicator: "loanInputOwnerLabel",
    lessons: [],
    tabs: {
      basics: {
        description: `
          <p>This is for money you have lent to someone else. For money you owe, use Debt.</p>
          <p>This is where you enter a <strong>loan owed to someone in the plan</strong>.</p>
          <p>In this section, the lender is the person in the plan who has lent the money, and the borrower is the person who will repay it. Repayments are treated as money coming back into the plan.</p>
          <ul>
            <li>Use <strong>Existing Loan</strong> if the loan is already in place at the start of the plan</li>
            <li>Use <strong>Future Loan</strong> if the loan will begin later</li>
            <li>Check Year View &gt; Cash Flow to see repayments coming into the plan</li>
            <li>Check Year View &gt; Debt to see whether the loan is being paid off as expected</li>
          </ul>
        `,
      },
      timing: {
        description: window.TAB_DESCRIPTIONS.timing,
      },
      steps: {
        description: window.TAB_DESCRIPTIONS.steps,
      },
      "onetime-payments": {
        description: `
          <p>The One Time Payments tab lets you model <strong>one-off loan repayments</strong>.</p>
          <p>This is useful where the borrower is expected to make an additional lump sum repayment or clear the loan at a particular time.</p>
          <ul>
            <li>Use the amount field for a specified one-off repayment</li>
            <li>Use the payment timing field to choose whether the payment happens at the start or end of the year</li>
            <li>Check Year View &gt; Cash Flow and Year View &gt; Debt after saving</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Protection
  // ============================================================

  "term-endowment": {
    name: "Term & Endowment",
    typeIndicator: "ukTermProtectinInputOwnerLabel",
    lessons: ["insurance", "modelling-illness"],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter <strong>term assurance, endowment-style policies, death-in-service cover, and family income benefit</strong>.</p>
          <p>The key inputs determine who owns the policy, who is insured, what type of benefit is paid, how long the cover lasts, and how premiums are modelled.</p>
          <ul>
            <li>Use <strong>Employee</strong> insurance where cover is linked to employment, such as death-in-service cover based on a salary multiple</li>
            <li>Use <strong>Personal</strong> insurance where you are entering a policy benefit directly</li>
            <li>Check Year View or Life Needs Insight to confirm the policy pays out as expected</li>
            <li>A payout goes into the beneficiary's cash. It's listed in Year View &gt; Cash Flow under Not Displayed on Chart, not as an income bar.</li>
          </ul>
        `,
      },

      maturity: {
        description: `
          <p>The Term Maturity tab is used where the policy has a <strong>maturity value or end-of-term payout</strong>.</p>
          <p>This may be relevant for endowment-style policies where the policy has an investment value as well as protection features.</p>
          <ul>
            <li>Use <strong>Receive Payout at end of term</strong> if a maturity value is expected</li>
            <li>Enter the current maturity value and choose how it should grow</li>
            <li>Set the correct tax treatment if the payout happens before death</li>
            <li>Check the maturity payout in Year View after saving</li>
          </ul>
        `,
      },

      beneficiaries: {
        description: `
          <p>The Beneficiaries tab controls <strong>who receives the policy proceeds</strong> if the policy pays out.</p>
          <ul>
            <li>Beneficiaries may include a spouse, estate, another person in the plan, someone outside the plan, or a charity</li>
            <li>If the policy is held in trust, make sure the beneficiaries reflect the trust arrangement</li>
            <li>All beneficiaries default to 0%. Set them to match the policy. If they're left at 0%, the payout goes into the insured person's estate.</li>
          </ul>
        `,
      },

      timing: {
        description: `
          <p>The Timing tab controls <strong>when the policy starts and ends</strong> in the plan.</p>
          <p>The policy start event and the remaining term work together to determine whether a payout is made if the insured person dies during the plan.</p>
          <ul>
            <li>Set the Protection Starts event to match when cover begins. Use 'Plan Start' if the policy is already in force</li>
            <li>Use the term remaining (Basics tab) to control how long the policy remains in force</li>
            <li>Once outside the policy term, Voyant won't make a payout</li>
          </ul>
        `,
      },

      "debt-payouts": {
        description: `
          <p>The Debt Payouts tab lets you link the insurance payout to <strong>liabilities in the plan</strong>.</p>
          <p>This is useful where the policy is intended to clear debts rather than provide a wider surplus to beneficiaries.</p>
          <ul>
            <li>Use this where the payout should be limited to debts outstanding at death or maturity</li>
            <li>Make sure the relevant liabilities are entered correctly</li>
          </ul>
        `,
      },
    },
  },

  "whole-life": {
    name: "Whole Life",
    typeIndicator: "ukWholeLifeProtectionInputOwnerLabel",
    lessons: ["insurance", "modelling-illness"],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter a <strong>whole life policy</strong> - cover designed to remain in force for life rather than for a fixed term.</p>
          <ul>
            <li>Enter the policy owner, premium, and benefit amount</li>
            <li>Check whether the policy is single or joint</li>
            <li>Confirm whether the policy is held in trust</li>
          </ul>
        `,
      },

      beneficiaries: {
        description: `
          <p>The Beneficiaries tab controls <strong>who receives the whole life policy proceeds</strong>.</p>
          <ul>
            <li>Make sure the beneficiaries reflect the actual policy or trust arrangement</li>
            <li>Check whether proceeds are intended for a spouse, estate, other beneficiaries, or charity</li>
            <li>All beneficiaries default to 0%. Set them to match the policy. If they're left at 0%, the payout goes into the insured person's estate.</li>
          </ul>
        `,
      },

      timing: {
        description: `
          <p>The Timing tab controls <strong>when the policy is introduced into the plan</strong>.</p>
          <p>Whole life cover usually remains in force for life, but the start date and premium timing still need to be modelled correctly.</p>
          <ul>
            <li>Use the timing settings to control when premiums begin</li>
            <li>Check Year View &gt; Expenses to confirm premiums appear when expected</li>
            <li>Check the payout assumptions if the policy starts in the future</li>
          </ul>
        `,
      },
    },
  },

  "income-protection": {
    name: "Income Protection",
    typeIndicator: "ukIncomeProtectionInputOwnerLabel",
    lessons: ["insurance", "modelling-illness"],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter an <strong>income protection policy</strong>, designed to replace income if the insured person cannot work because of illness or injury.</p>
          <p>The key inputs determine the premium, coverage type, benefit amount, benefit duration, and how the cover increases over time.</p>
          <ul>
            <li>Use <strong>Fixed Amount</strong> where the policy pays a set benefit</li>
            <li>Use <strong>Percent of Income</strong> where the benefit is linked to earnings</li>
            <li>Link to employment where the cover is employment-related</li>
          </ul>
        `,
      },

      timing: {
        description: `
          <p>The Timing tab controls <strong>when income protection cover and premiums apply</strong>, from the <strong>Protection Starts</strong> event to the <strong>Protection Ends</strong> event.</p>
          <p>This matters because the policy should only provide cover during the period it is active.</p>
          <ul>
            <li>Set these to match the policy's actual cover period</li>
            <li>Benefits also stop at the Benefit Duration or Max Benefit Age on the Basics tab, whichever comes first (tested). In testing, the benefit was still paid in the year the Max Benefit Age was reached.</li>
            <li>Check Year View to confirm premiums and benefits appear in the right years</li>
          </ul>
        `,
      },
    },
  },

  "critical-illness": {
    name: "Critical Illness",
    typeIndicator: "ukCriticalIllnessProtectionInputOwnerLabel",
    lessons: ["insurance", "modelling-illness"],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter a <strong>critical illness policy</strong>, which pays a benefit if the insured person suffers a qualifying critical illness under the policy terms.</p>
          <p>The key inputs are the policy owner, premium, benefit amount, and remaining term.</p>
        `,
      },

      timing: {
        description: `
          <p>The Timing tab controls <strong>when the critical illness policy is active</strong>.</p>
          <p>The timing settings and remaining term determine whether the policy provides cover at different points in the plan.</p>
          <ul>
            <li>Set the start event to match when cover begins</li>
            <li>If the policy is already in force, leave this as 'Plan Start'</li>
          </ul>
        `,
      },
    },
  },

  "long-term-care": {
    name: "Long Term Care",
    typeIndicator: "ukLongTermCareProtectionInputOwnerLabel",
    lessons: ["insurance", "modelling-illness", "aged-care"],
    tabs: {
      basics: {
        description: `
          <p>This is where you enter a <strong>long-term care insurance policy</strong>, designed to provide benefits if care is needed later in life.</p>
          <p>The key inputs determine the benefit amount, benefit period, premiums, payment duration, and whether benefits increase over time.</p>
          <ul>
            <li>Check whether benefits are lifetime or limited to a fixed period</li>
            <li>Enter premium details and whether payments continue for life or a fixed number of years</li>
            <li>Use benefit inflation settings if the policy benefit increases over time</li>
          </ul>
        `,
      },

      timing: {
        description: `
          <p>The Timing tab controls <strong>when the long-term care policy is active</strong>.</p>
          <p>This sets when premiums are paid. Voyant doesn't pay out a benefit from a long-term care policy, so only the premiums affect the plan. To model care, add the cost as a goal and any expected payout as Other Income. The Aged Care lesson covers this.</p>
          <ul>
            <li>Set the policy start timing to match the actual or expected policy start date</li>
            <li>Check whether premium payments are lifetime or for a fixed period</li>
            <li>Use Year View to confirm premiums appear in the expected years</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Transfers
  // ============================================================

  transfer: {
    name: "Transfer",
    typeIndicator: "transferType",
    lessons: ["lump-sums"],
    tabs: {
      basics: {
        description: `
          <p>Transfers let you move money <strong>between accounts</strong>, or <strong>from surplus income/lump sums into a savings or investment account</strong>.</p>
          <ul>
            <li>To invest a one-off lump sum (e.g. a windfall or property sale proceeds), set 'Transfer From' to 'All Surplus' and 'Transfer To' the receiving account</li>
            <li>To move money regularly between two accounts (e.g. GIA to ISA), select both accounts and tick 'Recurring'</li>
            <li>A transfer can be entered from either side - as a transfer-in to the receiving account, or a transfer-out from the source account</li>
            <li>Use 'Transfer Before Paying Expenses' if you want to prevent a lump sum being used to meet expenses first</li>
            <li>Money can go into a pension by a Transfer from All Surplus, or from an account such as a GIA or ISA. A Default Surplus Account (your cash) can't be the source of a transfer into a pension: pensions aren't offered as a destination when cash is the source.</li>
          </ul>
        `,
      },
      timing: {
        description: `
          <p>The Timing tab controls <strong>when this transfer occurs</strong>.</p>
          <ul>
            <li>For a one-off transfer, select the event marking when the funds become available (e.g. a windfall payout)</li>
            <li>For a recurring transfer, select a start event and an end event on the Timeline - e.g. 'Start' and 'Retirement'</li>
            <li>Check the Shackademy lesson for a step-by-step walkthrough</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Planned Withdrawals
  // ============================================================

  "planned-withdrawals": {
    name: "Planned Withdrawals",
    typeIndicator: "drawdownInputName",
    lessons: [
      "managing-withdrawals",
      "pension-withdrawals",
      "utilising-tax-bands",
      "lump-sums",
    ],
    tabs: {
      basics: {
        description: `
          <p>Planned Withdrawals let you take a <strong>hands-on approach</strong> to scheduling future income from accounts, rather than relying on Voyant's default liquidation order.</p>
          <ul>
            <li>It's good practice to select the source account/s under 'Available Accounts' first, as this can release additional fields (e.g. for pensions)</li>
            <li>If you select multiple accounts, use 'Distribution Type' to control whether the amount is taken from 'Each' account or 'Total'led across them in order</li>
            <li>Amounts are always entered as an annual figure</li>
            <li>For money purchase pensions, you can also choose between Flexible Access Drawdown (tax-free first) and UFPLS (mixed taxable/tax-free)</li>
          </ul>
        `,
      },
      timing: {
        description: `
          <p>The Timing tab controls <strong>when this withdrawal occurs</strong>.</p>
          <ul>
            <li>For a one-off withdrawal, drag the relevant event into the Withdrawal Timing box</li>
            <li>For a recurring withdrawal, drag events into the Withdrawal Starts and Withdrawal Ends boxes</li>
            <li>You can add a new event to the timeline directly from this screen if needed by double clicking the relevant year</li>
          </ul>
        `,
      },
      steps: {
        description: `
          <p>Steps let you <strong>increase or decrease</strong> a recurring planned withdrawal at a future point.</p>
          <ul>
            <li>Steps can only occur in years between the withdrawal's start and end events - not in the start or end year itself</li>
            <li>Only one step is allowed per year</li>
            <li>Only recurring withdrawals can be stepped - one-off withdrawals cannot</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Estate Plan
  // ============================================================

  "estate-plan": {
    name: "Estate Plan",
    typeIndicator: "estatePlanInputOwnerLabel",
    lessons: ["estate-plan", "asset-distribution"],
    tabs: {
      // HIGH-RISK: review on regulatory change (IHT)
      basics: {
        description: `
          <p>An Estate Plan lets you override Voyant's <strong>default estate distribution logic</strong> to reflect the owner's actual will - for example, if part of the estate is bequeathed to children on first death rather than passing entirely to the spouse.</p>
          <ul>
            <li>Select the owner and give the plan a name</li>
            <li>Decide whether designated assets (set up in Asset Distribution) should be liquidated to pay any IHT due, or passed on as-is</li>
            <li>Only one Estate Plan can be set up per person</li>
            <li>By default, the estate goes 100% to your spouse or partner, after any Charity and Other lines</li>
            <li>The distribution order is Charity, Other, then Spouse, so the residual beneficiary (typically the spouse) comes last</li>
            <li>Click each row to enter its details, choosing 'Percentage', 'Amount', or (for 'Other') 'Percentage of Threshold'</li>
            <li>For 'Other', use the Distribution Breakdown to split the bequest between named people, 'Person Outside of Plan', or a Trust</li>
            <li>Pensions aren't distributed here. Each pension's own Beneficiaries tab decides who receives it. Voyant includes unused pensions in the estate for inheritance tax in line with announced rules. Check the current rules on GOV.UK.</li>
            <li>Check Overview &gt; Legacy to confirm the distribution is working as expected</li>
          </ul>
        `,
      },
      "assets-designation": {
        description: `
          <p>The Asset Distribution tab is where you leave <strong>a specific asset to a specific person</strong>.</p>
          <ul>
            <li>Click Add Distribution, then select the asset</li>
            <li>'Contingent inherited assets' are your spouse's or partner's assets, listed in case they die first</li>
            <li>Check Overview &gt; Legacy afterwards</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Plan Settings
  // ============================================================

  "plan-settings": {
    name: "Plan Settings",
    typeIndicator: "rateOfInflation",
    lessons: ["intro-to-voyant"],
    tabs: {
      defaultages: {
        description: `
          <p>Sets default age-related assumptions used across the plan.</p>
          <ul>
            <li>'Default Mortality Age' is now reference-only - to change when an individual's plan ends, edit it in the Timeline</li>
            <li>'Child Owned Accounts Available in Plan Until Age' controls when a child's own accounts (e.g. a Junior ISA) drop out of the plan's calculations</li>
          </ul>
        `,
      },
      // HIGH-RISK: review on regulatory change (IHT/tax thresholds)
      basics: {
        description: `
          <p>Sets the default <strong>Inflation and Growth</strong> assumptions used throughout the plan. Individual items can use their own figure instead.</p>
          <ul>
            <li>The Inflation Rate is also used for any 'Present Value' entry, and to escalate amounts entered in Steps</li>
            <li>National Average Earnings escalates Employment and Other Income, and is one of the rates Voyant uses to increase the State Pension</li>
            <li>Nil Rate Band Escalation and IHT Property Exemption Escalation Rate: Voyant applies legislated freezes first. These rates are used after a freeze ends.</li>
            <li>The two toggles at the bottom: when switched on, every investment and pension account (or every savings and cash account) grows by asset allocation, and the growth choice on each account is locked.</li>
          </ul>
          <p>Changing a rate here updates every item in this plan that's still on the default. Once you've entered your own figure on an item, it no longer follows this setting, even if you later change it back to the same figure.</p>
        `,
      },
      fees: {
        description: `
          <p>Sets default <strong>Product Fees</strong> and <strong>Ongoing Advice Fees</strong> by account type (Cash Savings, Taxable, Tax-Deferred, Tax-Free), plus default Taxable Investment assumptions.</p>
          <ul>
            <li>The Product Fee is deducted from growth. The Ongoing Advice Fee is treated as a withdrawal: it's taken out of the account each year and included in the account's Withdrawals in Year View. It's also listed under Not Displayed on Chart in Year View &gt; Cash Flow and Expenses.</li>
            <li>Changing a fee here updates every account of this type in this plan that's still on the default. Once you've edited an account's fee, it no longer follows this setting, even if you click Use Defaults.</li>
            <li>'Account Liquidation Annually' sets the default 'Capital Gains Realized Annually' figure for taxable investments</li>
            <li>'Onshore Bond Default Internal Tax Rate' applies only to growth on onshore bonds, to better reflect their relative tax treatment versus offshore bonds</li>
          </ul>
          <p>Shackademy's suggested approach is to leave these defaults at 0% and enter fees on each account instead. Fees usually differ between accounts and providers, and a default here applies to every account of that type, including any that don't charge it.</p>
          <p>Fees are taken in addition to the account's growth rate. If the growth rate you're using already allows for fees, entering them here as well counts them twice.</p>
        `,
      },
      assetallocation: {
        description: `
          <p>This tab defines the <strong>default asset allocation</strong> used when setting an asset to grow using Portfolio/Holdings, rather than a fixed growth rate. This can be changed on an individual plan level.</p>
          <ul>
            <li>Used in conjunction with the Market Assumptions tab, which sets the underlying expected returns for each asset class</li>
            <li>If 'Grow all investment and retirement accounts using asset allocation' is switched on (Inflation/Growth tab), every investment and pension account (or every savings and cash account, for the other toggle) grows by asset allocation, and the growth choice on each account is locked</li>
            <li>Individual accounts can have their own asset allocation set on their Growth tab</li>
          </ul>
        `,
      },
      marketassumptions: {
        description: `
          <p>This tab shows the <strong>market assumptions dataset</strong> the plan uses: an expected return, standard deviation and yield for each asset class. These are used when accounts grow by asset allocation.</p>
          <ul>
            <li>These assumptions work together with the Asset Allocation tab</li>
            <li>Switching dataset changes the asset classes. The default allocation then becomes 100% cash, so allocations need re-entering here and on each Portfolio/Holdings account.</li>
          </ul>
        `,
      },
      majorloss: {
        description: `
          <p>This tab lets you define a <strong>custom market crash / major loss scenario</strong> that can be applied to a plan via a Timeline event, or used by the Market Crash Insight.</p>
          <ul>
            <li>'Default Age' sets the age of the primary client at which the loss begins by default - this can be changed when the event is added to the Timeline</li>
            <li>'Number of Years' (1-5) sets how long the loss period runs for, with the growth for that year entered for each year</li>
            <li>Fixed Growth replaces the growth rate of accounts on an entered rate. Allocation Percentile applies to Portfolio/Holdings accounts. Accounts with Growth is Fixed ticked aren't affected.</li>
            <li>To apply: add a 'Major Loss' Special Event to the Timeline, then check Year View &gt; Investments and Pensions &gt; Net Growth to confirm the loss has been applied and that growth returns to normal afterwards</li>
          </ul>
        `,
      },
      liquidation: {
        description: `
          <p>The Liquidation Order sets the <strong>default order in which assets are drawn upon</strong> when income and cash savings aren't sufficient to meet expenses.</p>
          <ul>
            <li>This order can be reordered by dragging account types into your preferred sequence</li>
            <li>Individual goals can override this via their own Payment Sources tab</li>
            <li>Cash in the Default Surplus Accounts is used first. Within each account type, the primary person's accounts are used before their partner's, and withdrawals aren't split between you.</li>
            <li>Trusts, EIS, SEIS and VCTs are never used to cover a shortfall.</li>
          </ul>
        `,
      },
      savings: {
        description: `
          <p>The Savings Order sets which <strong>account types receive priority</strong> when multiple contributions are due to be made in the same year.</p>
          <ul>
            <li>This order can be reordered by dragging account types into your preferred sequence</li>
          </ul>
        `,
      },
      calcs: {
        description: `
          <p>These settings control a number of <strong>plan-wide calculation behaviours</strong>.</p>
          <ul>
            <li>'Transfer all excess income / credits to savings' and 'Save excess income after retirement' control whether unallocated surplus is assumed spent (the default) or saved. Each setting is described in its own tooltip. Check Year View after changing either one.</li>
            <li>'Assume predeceased upon simultaneous death' affects how IHT and estate calculations treat a couple who die in the same year</li>
            <li>'Crystallise final salary before money purchase' relates to the historic Lifetime Allowance test ordering and is rarely needed</li>
            <li>The remaining toggles control what's shown on the Cashflow chart and Income vs Expenditure Overview by default - they affect display only, not the underlying calculations</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Carryover Assumptions
  // ============================================================

  "carry-over": {
    name: "Carryover Assumptions",
    typeIndicator: "ukTaxAndAllowanceInfoInputExpectedRebate",
    lessons: ["intro-to-voyant"],
    tabs: {
      // HIGH-RISK: review on regulatory change (pension allowances/IHT/CGT)
      basics: {
        description: `
          <p>Carryover Assumptions are used to capture <strong>tax-related details that predate the start of the plan</strong>.</p>
          <p>Select the relevant person at the top left before entering details, as these assumptions are entered per-person.</p>
          <ul>
            <li><strong>Basics</strong> - any outstanding tax rebates or amounts due from before the plan starts, and the person's Country (England, Scotland, Wales or Northern Ireland). Country is set for each person, and it decides which income tax bands apply to them, including on rent. Shackademy sets this when your plan is created, so you only need to change it if your circumstances change.</li>
            <li><strong>Pension Allowance & Carry Forward</strong> - any pension protections, allowances, or carry forward from before the plan starts</li>
            <li><strong>Nil Rate Band Carry Forward & Previous Transfers</strong> - any Inheritance Tax allowances inherited from a previously deceased spouse or civil partner, and any gifts made before the plan starts that may still be relevant for IHT</li>
            <li><strong>Capital Gains</strong> - any gains already realised, losses carried forward, or relief previously claimed before the plan starts</li>
            <li><strong>Tax Deductions</strong> and <strong>Tax Credits</strong> - any recurring deductions or credits not captured elsewhere in the plan</li>
          </ul>
          <p>Where it's unclear whether any of these apply or what figures to use, providers, account statements, previous tax returns, and the Shackademy community can be useful resources.</p>
        `,
      },
    },
  },

  // ============================================================
  // Year View (route-detected; one guide per Year View tab)
  // ============================================================

  yearView: {
    name: "Year View",
    route: "year-view",
    tabSource: "yearView",
    lessons: ["year-view"],
    tabs: {
      basics: {
        description: `
          <p>Year View shows a <strong>year by year breakdown</strong> of every account in the plan, split across separate tables for Cash Flow (income), Expenses, Investments, Pensions, Property, Debts, Protection (insurance), and Taxes.</p>
          <ul>
            <li>Each table shows the account's balance at the end of that year, along with growth, contributions, and withdrawals where relevant</li>
            <li>This is a useful place to check that transfers, withdrawals, and growth assumptions are behaving as expected</li>
          </ul>
          ${YEAR_VIEW_NAVIGATION}
        `,
      },
      cashflow: {
        description: `
          <p>Cash Flow lists the <strong>money coming into the plan this year</strong>: income, plus any withdrawals from accounts used to meet spending. The Category column shows what kind each one is.</p>
          <ul>
            <li>Items under <strong>Not Displayed on Chart</strong>, such as insurance payouts and estate credits, are real money coming in. They just aren't drawn as bars on the chart.</li>
            <li>A windfall or property sale shows here in the year it's received.</li>
          </ul>
          ${YEAR_VIEW_NAVIGATION}
        `,
      },
      expenses: {
        description: `
          <p>Expenses lists <strong>what the plan pays out this year</strong>: goals, debt payments, contributions into accounts, fees and tax.</p>
          <ul>
            <li>The <strong>Category</strong> column shows each goal's priority. If money runs short, lower-priority goals are cut first.</li>
            <li>The <strong>Unfulfilled</strong> column shows any amount the plan couldn't pay.</li>
            <li>Items under <strong>Not Displayed on Chart</strong> are real payments that aren't drawn on the chart, for example an Ongoing Advice Fee (category Fees).</li>
          </ul>
          ${YEAR_VIEW_NAVIGATION}
        `,
      },
      investments: {
        description: `
          <p>Investments shows <strong>each savings and investment account</strong> at the end of this tax year, with its growth, contributions and withdrawals.</p>
          <ul>
            <li><strong>Click an account's name</strong> to see the detail:
              <ul>
                <li><strong>Balance:</strong> yield, the growth rates that make up Net Growth, the product fee and ongoing advice fee rates, and Net Growth After Annual Fees.</li>
                <li><strong>Allocation:</strong> how the account is invested.</li>
                <li><strong>Contributions:</strong> planned and actual amounts, unscheduled contributions, transfers in and out, and Contribution Sources (where the money came from).</li>
                <li><strong>Withdrawals:</strong> actual and scheduled.</li>
              </ul>
            </li>
            <li>Net Growth includes any yield and is after the product fee but before the ongoing advice fee, so it can differ from the rate you entered.</li>
            <li>An Ongoing Advice Fee is taken out of the account as a withdrawal, not deducted from growth. It's included in the account's <strong>Withdrawals</strong> figure, and the detail panel lists it under <strong>Fees</strong>. It also appears under <strong>Not Displayed on Chart</strong> in both Cash Flow and Expenses, with the category Fees.</li>
            <li>If contributions aren't going in as you expected, check the account's <strong>Timing</strong> tab: contributions need both a start and an end event.</li>
            <li>Use this tab to check that Transfers, Sweeps and Planned Withdrawals move money as you expected.</li>
          </ul>
          ${YEAR_VIEW_NAVIGATION}
        `,
      },
      retirements: {
        description: `
          <p>Pensions shows <strong>each pension</strong> at the end of this tax year, with its growth, contributions and withdrawals.</p>
          <ul>
            <li><strong>Click a pension's name</strong> for the same detail as on Investments. As on Investments, an Ongoing Advice Fee is taken out as a withdrawal and is included in the pension's Withdrawals figure. Contribution Sources shows your own and your employer's contributions separately, including any employer NI saving added to the pension.</li>
            <li>If contributions aren't going in as you expected, check the pension's <strong>Timing</strong> tab.</li>
            <li>If a pension isn't being drawn when you expect, check its Withdrawal Limit start event.</li>
            <li>If you've crystallised money without taking it, it sits in the pension's linked "Drawdown" pot, which has its own growth rate.</li>
          </ul>
          ${YEAR_VIEW_NAVIGATION}
        `,
      },
      properties: {
        description: `
          <p>Property shows <strong>each property's value</strong> at the end of this tax year, any debt linked to it, and the equity left.</p>
          <ul>
            <li><strong>Click a property's name</strong> to see each owner's cost base, value and ownership share, at the start and end of the year.</li>
            <li>In the year a property is sold, check that any linked mortgage is cleared and the proceeds appear in Cash Flow.</li>
          </ul>
          ${YEAR_VIEW_NAVIGATION}
        `,
      },
      debts: {
        description: `
          <p>Debt shows <strong>each debt's</strong> required payment, the payment made, any extra payment, the balance at the end of this tax year and the interest rate.</p>
          <ul>
            <li><strong>Click a debt's name</strong> to see how the payment splits between interest and capital.</li>
            <li>Use it to check that a mortgage reduces as expected, and is cleared by any one-off payment or linked property sale.</li>
          </ul>
          ${YEAR_VIEW_NAVIGATION}
        `,
      },
      insurances: {
        description: `
          <p>Protection shows <strong>each policy in force this year</strong>, with its type, premium and benefit amount. A policy that has ended no longer appears.</p>
          <ul>
            <li>A payout appears in Cash Flow under Not Displayed on Chart, in the year it's paid.</li>
          </ul>
          ${YEAR_VIEW_NAVIGATION}
        `,
      },
      // HIGH-RISK: review on regulatory change (income tax/CGT)
      taxdetails: {
        description: `
          <p>Taxes shows <strong>the tax worked out for each person this year</strong>. <strong>Expand All</strong> opens every section.</p>
          <ul>
            <li><strong>Click a rate row</strong> in Tax Summary (for example Income Tax Brackets) to see the bands and rates Voyant uses.</li>
            <li>To see how your own income falls into those bands, click <strong>Tax on Non-Savings Income</strong> under Taxes.</li>
            <li>Some other rows open a breakdown too:
              <ul>
                <li><strong>Non-Savings Income</strong> shows where the income came from.</li>
                <li><strong>Income Deductions</strong> lists the deductions, such as net pay and salary sacrifice pension contributions. Relief at source contributions show as <strong>Relief At Source Pension Contributions</strong> and <strong>Tax Credits</strong> instead.</li>
                <li><strong>Other Taxes (NIC, Bonds)</strong> shows which income it applies to.</li>
              </ul>
            </li>
            <li>PAYE tax on salary shows as paid at source in the same year. Tax on other income shows as due the following year.</li>
            <li>Check the rates and bands Voyant uses against GOV.UK if you need to rely on a figure.</li>
          </ul>
          ${YEAR_VIEW_NAVIGATION}
        `,
      },
    },
  },

  // ============================================================
  // Insights (route-detected; one guide per insight)
  // ============================================================

  insights: {
    name: "Insights",
    route: "insights",
    titleOnly: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      basics: {
        description: `
          <p>Insights give you many ways to <strong>stress test and review your plan</strong>. For example: how much more you'd need to save, what return your investments would need, how a market crash or higher inflation could affect you, or how much you could spend in retirement.</p>
          <p>Running an insight doesn't change your plan, so you can explore as many as you like. Choose one to see what it does, and the Shackademy guide for that insight will appear here.</p>
        `,
      },
    },
  },

  "insight-annual-savings": {
    name: "Annual Savings",
    route: "insights/annual-savings",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      basics: {
        description: `
          <p>Annual Savings works out <strong>how much extra you'd need to save each year</strong>, between the Start Event and End Event, so the plan has no shortfall after the End Event.</p>
          <ul>
            <li>Check both events before you run it. The defaults may not be the period you have in mind.</li>
            <li>The result doesn't say which account the savings would go into. To test it, add the contribution to an account yourself, ideally in a What If.</li>
          </ul>
        `,
      },
    },
  },

  "insight-goal-priority": {
    name: "Goal Priority Analysis",
    route: "insights/goal-priority",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      basics: {
        description: `
          <p>Goal Priority Analysis shows <strong>what happens to your other goals if you leave some out</strong>. Untick individual goals, or whole priority levels, and compare the Original and Simulated results.</p>
          <ul>
            <li>Each goal's priority is set on its Basics tab. New goals start at the highest priority.</li>
            <li>Unticking a goal here doesn't remove it from your plan.</li>
          </ul>
        `,
      },
    },
  },

  "insight-historical": {
    name: "Historic",
    route: "insights/historical",
    titleOnly: true,
    headingButton: true,
    lessons: [...INSIGHT_LESSONS, "monte-carlo"],
    tabs: {
      basics: {
        description: `
          <p>Historic applies <strong>past stock market returns</strong> to your plan, year by year, over the period you choose.</p>
          <ul>
            <li>It only affects accounts that grow by Portfolio/Holdings. If none do, the result won't change and Voyant opens the "Accounts Using Asset Allocation" window.</li>
            <li>There are no extra outputs. Read the chart, or Year View and Table View.</li>
          </ul>
        `,
      },
    },
  },

  "insight-inflation": {
    name: "Inflation Adjustment",
    route: "insights/inflation",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      basics: {
        description: `
          <p>Inflation Adjustment adds <strong>extra inflation</strong>, on top of the plan's own rates, either for the whole plan or for a range of years you set with the slider.</p>
          <ul>
            <li>The Results table lists every rate it raised. Check it to see what is and isn't included.</li>
            <li>To see the effect, switch the chart from Cash Flow to another view, such as Assets, or open Year View or Table View.</li>
          </ul>
        `,
      },
    },
  },

  "insight-investment-returns": {
    name: "Investment Returns",
    route: "insights/investment-returns",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      basics: {
        description: `
          <p>Investment Returns works out <strong>the average yearly return, after fees,</strong> that your existing investments would need between the Start Event and End Event for the plan to avoid a shortfall.</p>
          <ul>
            <li>Because it's an average, choosing a later End Event can hide a shortfall early in the plan.</li>
            <li>"Include Cash Accounts" counts cash savings as investments. Leave it unticked for a figure that applies to your investments only.</li>
          </ul>
        `,
      },
    },
  },

  "insight-life-needs": {
    name: "Life Needs",
    route: "insights/life-needs",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      basics: {
        description: `
          <p>Life Needs estimates <strong>how much extra life cover each partner would need</strong> for the survivor not to run out of money. It has no inputs.</p>
          <ul>
            <li>As Voyant's description says, it assumes death at the start of the plan's second year.</li>
            <li>It takes account of the cover already in the plan.</li>
          </ul>
        `,
      },
    },
  },

  "insight-annuity": {
    name: "Longevity Risk",
    route: "insights/annuity",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      // HIGH-RISK: review on regulatory change (pension allowances/relief)
      basics: {
        description: `
          <p>Longevity Risk shows <strong>how buying an annuity with part of your pensions could affect the plan</strong>, including if you live longer than planned.</p>
          <ul>
            <li>Choose who buys the annuity, how the rate is set, and what share of pensions to use.</li>
            <li>Generate Plan from Results creates a separate plan with the annuity in it. Your current plan isn't changed.</li>
          </ul>
        `,
      },
    },
  },

  "insight-loss-capacity": {
    name: "Loss Capacity",
    route: "insights/loss-capacity",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      basics: {
        description: `
          <p>Loss Capacity works out <strong>how much of your invested assets you could lose</strong> at the Loss Event and still meet your goals.</p>
          <ul>
            <li>If the plan already has a shortfall, the result is nil. Fix the shortfall first, or use a What If.</li>
          </ul>
        `,
      },
    },
  },

  "insight-lump-sum-savings": {
    name: "Lump Sum Savings",
    route: "insights/lump-sum-savings",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      basics: {
        description: `
          <p>Lump Sum Savings works out <strong>the one-off amount needed at the chosen event</strong> to prevent shortfalls after it. For example, it can show what a property or business would need to sell for.</p>
        `,
      },
    },
  },

  "insight-market-crash": {
    name: "Market Crash",
    route: "insights/market-crash",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      basics: {
        description: `
          <p>Market Crash applies <strong>the Major Loss scenario set in Plan Settings &gt; Major Loss</strong>, starting at the age you choose.</p>
          <ul>
            <li>Accounts with "Growth is Fixed" ticked aren't affected. Cash accounts have it ticked by default.</li>
            <li>Accounts on an entered growth rate and accounts on Portfolio/Holdings are affected differently. The Plan Settings &gt; Major Loss guide explains how.</li>
          </ul>
        `,
      },
    },
  },

  "insight-monte-carlo": {
    name: "Monte Carlo",
    route: "insights/monte-carlo",
    titleOnly: true,
    headingButton: true,
    lessons: [...INSIGHT_LESSONS, "monte-carlo"],
    tabs: {
      basics: {
        description: `
          <p>A normal projection assumes your investments grow at a steady rate every year. Real markets don't: some years are good, some bad, and the order they come in matters, especially once you're drawing money out.</p>
          <p>Monte Carlo analysis <strong>tests your plan against that uncertainty</strong>. It runs the plan many times (each run is an "iteration"), each with a different random sequence of investment returns based on the expected return and volatility of each asset class in your plan's market assumptions. It then shows the share of runs in which your goals are met, as a probability of success, and the range of outcomes on the chart.</p>
          <ul>
            <li>Only accounts that grow by Portfolio/Holdings are randomised. Check "Account(s) Affected" first. With none, the result has no meaning.</li>
            <li>More iterations give a steadier result. Shackademy suggests 1,000 for any result you plan to rely on.</li>
            <li>The overall figure counts a run as a success only if every goal is met. Check the per-goal results too.</li>
            <li>The "Accounts Using Asset Allocation" window can switch every account to asset allocation at once, and this locks each account's growth choice. To undo it, open the window and set the toggles back to No.</li>
            <li>Reports only include Monte Carlo results that you've saved with Save Results.</li>
          </ul>
        `,
      },
    },
  },

  "insight-performance": {
    name: "Performance",
    route: "insights/performance",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      basics: {
        description: `
          <p>Performance moves <strong>the growth rates of all your accounts up or down</strong> with the slider, so you can see whether your goals are still met. The Results table shows each account's original and simulated rate, and the chart shows the outcome.</p>
        `,
      },
    },
  },

  "insight-iht": {
    name: "Potential IHT",
    route: "insights/iht",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      // HIGH-RISK: review on regulatory change (IHT)
      basics: {
        description: `
          <p>Potential IHT shows <strong>estimated inheritance tax over the life of the plan</strong>. Choose a Comparison Plan to compare it with a What If.</p>
          <ul>
            <li>Use Table View &gt; Details to see the figures for a particular year.</li>
            <li>Voyant applies announced changes to inheritance tax rules in the years they take effect, so the estimate can change sharply in those years. Check the current rules on GOV.UK.</li>
          </ul>
        `,
      },
    },
  },

  "insight-retirement-spending": {
    name: "Retirement Spending",
    route: "insights/retirement-spending",
    titleOnly: true,
    headingButton: true,
    lessons: INSIGHT_LESSONS,
    tabs: {
      basics: {
        description: `
          <p>Retirement Spending works out <strong>the level of yearly spending, rising with inflation, the plan could support</strong> from the Retirement Event. If you've already retired, it works from the start of the plan.</p>
          <ul>
            <li>For the analysis, your other spending goals and expenses are set to end at the Retirement Event, and the result takes their place. The five toggles decide which goals and costs stay in the plan alongside the result. Each toggle has its own Shackademy tooltip.</li>
            <li>Milestone, gifting and education goals only count here if they're entered as goals, not as expenses.</li>
            <li>Use Year View &gt; Expenses inside the insight to see exactly which goals and costs were included.</li>
            <li>The result doesn't change your goals. To use it, adjust your retirement goals yourself, ideally in a What If.</li>
            <li>The result is a level amount that rises with inflation each year. If you expect your spending to change during retirement, for example more in the early years and less later on, you can use the result as a starting point. Build that shape into your retirement goals, then check the plan still holds up.</li>
          </ul>
        `,
      },
    },
  },

  // ============================================================
  // Other route-detected screens
  // ============================================================

  "wealth-flow": {
    name: "Wealth Flow",
    route: "wealth-flow",
    titleOnly: true,
    lessons: ["lets-see"],
    tabs: {
      basics: {
        description: `
          <p>Wealth Flow shows, for the year selected, <strong>where each income came from and where it went</strong>: spending, tax, saving or debt. It's the best screen for "where did my money go?" questions, for example after a property sale or windfall.</p>
        `,
      },
    },
  },

  "lets-see": {
    name: "Let's See",
    route: "letssee",
    titleOnly: true,
    lessons: ["lets-see"],
    tabs: {
      basics: {
        description: `
          <p>Let's See shows your plan as <strong>one large chart over its whole life</strong>.</p>
          <ul>
            <li>Use the drop-down above the chart to switch between views such as Cash Flow, Assets, Expenses, Debts, Net Worth, Plan Worth and Taxes.</li>
            <li>On Cash Flow, click the legend items (Total Need, Basic Need, All Shortfall, All Inflows) to show or hide each line.</li>
            <li>Details, Year View and Table View show the figures behind the chart.</li>
          </ul>
        `,
      },
    },
  },

  "dual-chart": {
    name: "Dual Chart",
    route: "dual",
    titleOnly: true,
    lessons: ["lets-see"],
    tabs: {
      basics: {
        description: `
          <p>Dual Chart shows <strong>two charts, one above the other</strong>, so you can look at two views of your plan at once, for example Cash Flow and Assets. Choose each chart's view with its own drop-down.</p>
        `,
      },
    },
  },

  legacy: {
    name: "Legacy",
    route: "overview/legacy",
    titleOnly: true,
    tabs: {
      basics: {
        description: `
          <p>Legacy shows <strong>what would pass on, and any inheritance tax</strong>, under three scenarios: the plan as it stands, if one of you died today, and if you both died today. Use it to check your estate plan, life cover held in trust or not, and pensions in the estate.</p>
          <ul>
            <li>The "today" figures and the Reports estate figures can differ. Compare like with like.</li>
          </ul>
        `,
      },
    },
  },

  "plan-differences": {
    name: "Plan Differences",
    route: "overview/plan-differences",
    titleOnly: true,
    tabs: {
      basics: {
        description: `
          <p>Plan Differences lists <strong>every item that differs between two plans</strong>: added, removed or changed. It's the quickest way to see what a What If changed, or what changed since last year's plan.</p>
          <ul>
            <li>Changing Current Plan here also switches the plan you're working in. Check the plan name at the top afterwards.</li>
          </ul>
        `,
      },
    },
  },

  "what-if": {
    name: "What If",
    route: "what-if",
    titleOnly: true,
    lessons: ["what-if"],
    tabs: {
      basics: {
        description: `
          <p>What Ifs are <strong>separate copies of a plan for testing changes</strong>.</p>
          <ul>
            <li>Opening a guided What If creates a new plan straight away, even if you leave without finishing. Delete unwanted ones in Manage Plans.</li>
            <li>A What If doesn't pick up later changes to the plan it was copied from.</li>
          </ul>
        `,
      },
    },
  },

  timeline: {
    name: "Timeline",
    route: "timeline",
    titleOnly: true,
    lessons: ["people-timeline"],
    tabs: {
      basics: {
        description: `
          <p>The Timeline shows <strong>every event and stage in your plan</strong>. Click an event to open it.</p>
          <ul>
            <li>If it's linked to anything, the top of the event shows "This event affects the timing of ... items". Click <strong>Show Details</strong> to see what.</li>
            <li>Moving an event moves everything linked to it.</li>
          </ul>
        `,
      },
    },
  },
};
