// =============================================================================
// SHACKADEMY - SECTIONS CONFIGURATION
// =============================================================================
// Maps Voyant sections to panel descriptions and lessons.
//
// Structure:
//   name          - display name, used to auto-build tab titles
//   typeIndicator - label for/id that identifies this section in the DOM
//                   (only present on the Basics tab - context persists via URL)
//   lessons       - array of lesson keys from lessons.js (shown for whole section)
//   tabs          - one entry per tab, keyed by Voyant's URL hash segment
//                   e.g. "basics", "timing", "growth", "contribution", "steps"
//
// Tab titles are built automatically as: "{name} - {Tab}"
// You only need to write 'name' once.
//
// Reusable tab descriptions are defined at the top as TAB_DESCRIPTIONS.
// Override any of them inline for a specific section if needed.
// =============================================================================

// -----------------------------------------------------------------------------
// Reusable tab descriptions
// Used wherever a tab's description is consistent across sections.
// Override inline in a specific section's tabs entry if needed.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Tab display name overrides
// Maps URL hash segments to human-readable tab names.
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
};

window.TAB_DESCRIPTIONS = {
  timing: `
    <p>The Timing tab controls <strong>when this item starts and ends</strong> in your plan. Voyant uses timeline events - milestones you define, like Retirement or a specific age - rather than fixed calendar dates, so your plan stays dynamic as assumptions change.</p>
    <p>Make sure the start and end events reflect your real expectations as accurately as possible, as they have a significant impact on your projections.</p>
  `,

  growth: `
    <p>The Growth tab sets the <strong>assumed annual rate of return</strong> for this item. Voyant uses this to project its future value over time.</p>
    <p>If left unchanged, Voyant uses the default growth assumption from Plan Settings. You can override it here for this specific item.</p>
    <p>Please note, once a plan is created this is the only place to update growth assumptions - the Plan Settings will only impact <strong>new</strong> plans created.</p>
    <p>Consider using a cautious assumption as your base case, and model a more optimistic scenario using a What If scenario to understand the range of possible outcomes.</p>
    <p>Our suggestion is to leave this on the default Entered Growth Rate until you're comfortable with Voyant.</p>
  `,

  steps: `
    <p>Steps allow you to model <strong>changes to this item at a future point in time</strong></p>
    <p>Each step is triggered by a timeline event. You can add as many steps as needed to reflect how this item is expected to change throughout the plan.</p>
  `,

  fees: `
    <p>The Fees tab lets you model <strong>product fees and advice fees</strong> associated with this account.</p>
    <ul>
      <li><strong>Product fee</strong> - deducted from the gross growth rate.</li>
      <li><strong>Ongoing advice fee</strong> - modelled as a withdrawal from the account. Will generate a tax event where applicable (e.g. Capital Gains Tax for unwrapped investments).</li>
    </ul>
    <p>Ensure the entered growth rate factors in any account fees. For example, if using the default growth rate of 5% you may want to gross this up to offset the fee reduction.</p>
  `,

  transfers: `
    <p>The Transfers tab is where you model <strong>one-off or regular movements of money between accounts</strong> already in your plan - for example, moving funds from a savings account into an ISA, or from one pension to another.</p>
    <p>Transfers do not create new income or expenses - they simply redistribute existing assets within the plan.</p>
    <ul>
      <li>Both the source and destination accounts must already exist in the plan before setting up a transfer</li>
      <li>Transfers are linked to timeline events so you can model them at a specific future date</li>
      <li>Transfers can also be used to invest surplus income by selecting 'All Surplus' as the 'Transfer From' account</li>
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
      <li>For pension planned withdrawals, the Pension Strategy field on the pension entry determines whether withdrawals are UFPLS or Flexible Access Drawdown</li>
      <li>Check Year View > Cash Flow to confirm the withdrawal is appearing correctly</li>
    </ul>
  `,
};

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
          <p>Information such as tax allowances, State Pension timing and pension access ages may be modelled using these details.</p>
          <p>If you are planning for yourself, you are the plan owner. Add your partner as a second person if you want to model your finances jointly.</p>
        `,
      },
    },
  },

  // ============================================================
  // Pre-Retirenment & Retirement Goals
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
          </ul>
        `,
      },
      "expense-details": {
        description: `
          <p>The Details tab allows you to set a <strong>more specific expense amount or structure</strong> for this goal - including itemising the expediture or making it a % of your income.</p>
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
      "payment sources": {
        description: `
          <p>The Payment Sources tab lets you specify <strong>which account or asset Voyant should use to pay for this goal</strong>. By default, Voyant will use whatever is available according to the liquidation order specified in plan settings.</p>
          <p>Use this tab if you want a specific account to fund a specific goal - for example, using a dedicated savings account for school fees.</p>
          <p>Use the "Only Use Preferred Sources" option very sparingly as it can create artificial shortfalls if the nominated account is insufficient.</p>
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
            <li>Check the Shackademy lesson for a step-by-step walkthrough</li>
          </ul>
        `,
      },
      "payment sources": {
        description: `
          <p>The Payment Sources tab lets you specify <strong>which account or asset Voyant should use to pay for this goal</strong>. By default, Voyant will use whatever is available according to the liquidation order specified in plan settings.</p>
          <p>Use this tab if you want a specific account to fund this goal - for example, using a dedicated savings account.</p>
          <p>Use the "Only Use Preferred Sources" option very sparingly as it can create artificial shortfalls if the nominated account is insufficient.</p>
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
      "payment sources": {
        description: `
          <p>The Payment Sources tab lets you specify <strong>which account or asset Voyant should use to pay for this goal</strong>. By default, Voyant will use whatever is available according to the liquidation order specified in plan settings.</p>
          <p>Use this tab if you want a specific account to fund this goal - for example, a dedicated savings account for school fees.</p>
          <p>Use the "Only Use Preferred Sources" option very sparingly as it can create artificial shortfalls if the nominated account is insufficient.</p>
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
      basics: {
        description: `
          <p>A Gifting Goal models a <strong>gift made by the owner/s</strong> - to another person in the plan, a person outside the plan, or a charity - as an expense that Voyant will try to meet from your income and assets.</p>
          <p>Enter the amount and use the model to assess the impact on your plan. If the goal creates a shortfall, you can explore alternatives using What If scenarios.</p>
          <p>We suggest using <strong>Goals rather than Expenses</strong> in Voyant as that then means you can easily track the progress on the Dashboard and Timeline tabs</p>
          <ul>
            <li>Choose a Recipient Type first - this determines whether you select an existing person in the plan, or enter a name for someone outside the plan or a charity</li>
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
            <li>Use the Expense Frequency field to model less-than-annual gifts</li>
            <li>Check the Shackademy lesson for a step-by-step walkthrough</li>
          </ul>
        `,
      },
      "payment sources": {
        description: `
          <p>The Payment Sources tab lets you specify <strong>which account or asset Voyant should use to fund this gift</strong>. By default, Voyant will use whatever is available according to the liquidation order specified in plan settings.</p>
          <p>Use this tab if you want a specific account to fund this gift - for example, a dedicated savings account.</p>
          <p>Use the "Only Use Preferred Sources" option very sparingly as it can create artificial shortfalls if the nominated account is insufficient.</p>
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
          <p>Rather than working with fixed calendar dates, Voyant links items in your plan to events. This means if you change when an event happens, everything connected to it updates automatically - making it much easier to model scenarios like "what if I retire two years earlier?"</p>
          <ul>
            <li>Use descriptive names - "Jane Retires" is much clearer than "Event 1"</li>
            <li>Events can be positioned by year or by the owner's age - both update each other automatically</li>
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
    typeIndicator: "otherIncomeInputTaxationType",
    lessons: ["income-expenses"],
    tabs: {
      basics: {
        description: `
          <p>Other Income covers <strong>income that is not subject to National Insurance</strong> - including rental income, royalties, maintenance payments, or overseas income. It is also used for employment earnings not subject to standard UK income tax.</p>
          <p>Voyant assesses other income at the end of each plan year and applies tax as an expense in the following year.</p>
          <p>Use the Taxation Type field to tell Voyant how to tax this income - as income, property income, capital gains, or dividends.</p>
        `,
      },
      timing: { description: window.TAB_DESCRIPTIONS.timing },
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
      basics: {
        description: `
          <p>This is where you enter <strong>investment accounts and wrappers</strong> - Stocks & Shares ISAs, Lifetime ISAs, onshore and offshore bonds, unwrapped investments, trusts, EIS, SEIS, VCTs, and more.</p>
          <p>The Type field is critical - it determines Voyant's tax treatment and whether Voyant will access the account automatically or only via planned withdrawals. Voyant treats accounts as follows:</p>
          <ul>
            <li><strong>Stocks & Shares ISA / Lifetime ISA</strong> - tax-free growth and withdrawals</li>
            <li><strong>Unwrapped investments</strong> - subject to Capital Gains Tax on gains</li>
            <li><strong>Onshore/Offshore bonds</strong> - tax-deferred; 5% tax deferred annual withdrawal allowance based on the original investment amount for each policy year</li>
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
            <li><strong>Main Residence</strong> - exempt from Capital Gains Tax on sale (if toggled on)</li>
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
      basics: {
        description: `
          <p>This is where you enter a <strong>defined contribution (money purchase) pension</strong> - including personal pensions, SIPPs, workplace pensions, and GPPs.</p>
          <p>The pension Type field is largely informational, but there is one important distinction: personal pensions (PPP/GPP/SIPP) and occupational schemes have different rules for how tax relief on contributions is applied.</p>
          <p>Key things to check:</p>
          <ul>
            <li>Enter contributions gross - Voyant applies tax relief automatically</li>
            <li>If employer contributions apply, toggle the Employer Contribution section and link to the relevant employment</li>
            <li>Ensure the withdrawal limit tab reflects at least the minimum pension access age for your pension</li>
          </ul>
        `,
      },
      growth: { description: window.TAB_DESCRIPTIONS.growth },
      fees: { description: window.TAB_DESCRIPTIONS.fees },
      timing: {
        description: `
          <p>The Timing tab controls <strong>when contributions are allowed</strong> in this plan. Voyant uses timeline events - milestones you define, like Retirement or a specific age - rather than fixed calendar dates, so your plan stays dynamic as assumptions change.</p>
          <ul>
            <li>It is imperative that this is set if you want the account to be able to receive contributions.</li>
            <li>As a baseline, you can set the start to 'Plan Start' and end to 'Plan End' to allow contributions throughout.</li>
          </ul>
        `,
      },
      steps: { description: window.TAB_DESCRIPTIONS.steps },
      crystallisations: {
        description: `
          <p>The Crystallisations tab allows you to model <strong>specific pension crystallisation events</strong> - the point at which pension benefits are formally accessed and tax-free cash is taken.</p>
          <p>For regular income in retirement, Voyant handles crystallisation automatically when the pension begins drawdown according to the Timing settings.</p>
          <p>Use this tab if you need to model a specific partial crystallisation at a known future date or event.</p>
          <p>If you want to model regular, consistent crystallisation events then it may be easier to manage that using the 'Planned Withdrawals' tab.</p>
        `,
      },
      beneficiaries: {
        description: `
          <p>The Beneficiaries tab reflects what happens to your pension when you die.</p>
          <p>Refer to the tooltip for more details on the options available.</p>
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
          <p>The Status field is critical as it will determind how Voyant treats the plan:</p>
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
      basics: {
        description: `
          <p>This is where you enter the <strong>UK State Pension</strong> for each person in the plan.</p>
          <p>Get the State Pension forecast for each person at <a href="https://www.gov.uk/check-state-pension" target="_blank" rel="noopener noreferrer">gov.uk/check-state-pension</a> - this gives you the projected amount and exact State Pension Age based on date of birth.</p>
          <ul>
            <li>Voyant escalates the State Pension automatically using the Triple Lock assumption from Plan Settings</li>
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
    lessons: ["property-basics", "overpayment", "paydown-mortgage"],
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
        description: window.TAB_DESCRIPTIONS.steps,
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
    lessons: ["property-basics", "overpayment", "paydown-mortgage"],
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
        description: window.TAB_DESCRIPTIONS["liquidation-limits"],
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
        description: window.TAB_DESCRIPTIONS.timing,
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
          <p>The Timing tab controls <strong>when income protection cover and premiums apply</strong>.</p>
          <p>This matters because the policy should only provide cover during the period it is active.</p>
          <ul>
            <li>Set the policy start and end timing to match the actual cover period</li>
            <li>Review Year View to confirm premiums and benefits appear in the right years</li>
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
          <p>This affects when premiums are paid and when benefits may be available in the plan.</p>
          <ul>
            <li>Set the policy start timing to match the actual or expected policy start date</li>
            <li>Check whether premium payments are lifetime or for a fixed period</li>
            <li>Use Year View to confirm premiums and benefits appear in the expected years</li>
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
    lessons: ["managing-withdrawals", "pension-withdrawals"],
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
      basics: {
        description: `
          <p>An Estate Plan lets you override Voyant's <strong>default estate distribution logic</strong> to reflect the owner's actual will - for example, if part of the estate is bequeathed to children on first death rather than passing entirely to the spouse.</p>
          <ul>
            <li>Select the owner and give the plan a name</li>
            <li>Decide whether designated assets (set up in Asset Distribution) should be liquidated to pay any IHT due, or passed on as-is</li>
            <li>Only one Estate Plan can be set up per person</li>
            <li>Pensions are not normally part of the estate - their distribution is set on each pension's own Beneficiaries screen</li>
          </ul>
        `,
      },
      "assets-designation": {
        description: `
          <p>The Asset Distribution tab is where you set <strong>who receives what</strong> from the estate, and in what order.</p>
          <ul>
            <li>Set the Distribution order so that the residual beneficiary (typically the spouse) is last - e.g. Other > Charity > Spouse</li>
            <li>Click each row to enter its details, choosing 'Percentage', 'Amount', or (for 'Other') 'Percentage of Threshold'</li>
            <li>For 'Other', use the Distribution Breakdown to split the bequest between named people, 'Person Outside of Plan', or a Trust</li>
            <li>Specific items bequeathed to specific beneficiaries can also be modelled here</li>
            <li>Check Overview > Legacy to confirm the distribution is working as expected</li>
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
      defaultAges: {
        description: `
          <p>Sets default age-related assumptions used across the plan.</p>
          <ul>
            <li>'Default Mortality Age' is now reference-only - to change when an individual's plan ends, edit it in the Timeline</li>
            <li>'Child Owned Accounts Available in Plan Until Age' controls when a child's own accounts (e.g. a Junior ISA) drop out of the plan's calculations</li>
          </ul>
        `,
      },
      basics: {
        description: `
          <p>Sets the default <strong>Inflation and Growth</strong> assumptions used throughout the plan - these apply to new items as they're added, and can be overridden at the individual item level.</p>
          <ul>
            <li>The Inflation Rate is also used for any 'Present Value' entry, and to escalate amounts entered in Steps</li>
            <li>National Average Earnings escalates Employment and Other Income, and forms part of the Triple Lock used for the State Pension</li>
            <li>Nil Rate Band Escalation and IHT Property Exemption Escalation Rate only take effect once the relevant frozen thresholds start to escalate (Nil Rate Band from 2030)</li>
            <li>The two toggles at the bottom control whether all investment/retirement and savings/cash accounts default to growing via asset allocation rather than a fixed rate - changing these only affects new accounts going forward</li>
          </ul>
          <p>Changing these settings only affects <strong>new plans</strong> created after the change - for existing plans, growth assumptions can only be updated at the individual item level.</p>
        `,
      },
      fees: {
        description: `
          <p>Sets default <strong>Product Fees</strong> and <strong>Ongoing Advice Fees</strong> by account type (Cash Savings, Taxable, Tax-Deferred, Tax-Free), plus default Taxable Investment assumptions.</p>
          <ul>
            <li>All fees are deducted from capital growth, and can be overridden at the individual account level</li>
            <li>'Account Liquidation Annually' sets the default 'Capital Gains Realized Annually' figure for taxable investments</li>
            <li>'Onshore Bond Default Internal Tax Rate' applies only to growth on onshore bonds, to better reflect their relative tax treatment versus offshore bonds</li>
          </ul>
        `,
      },
      assetAllocation: {
        description: `
          <p>This tab defines the <strong>default asset allocation</strong> used when setting an asset to grow using Portfolio/Holdings, rather than a fixed growth rate. This can be changed on an individual plan level.</p>
          <ul>
            <li>Used in conjunction with the Market Assumptions tab, which sets the underlying expected returns for each asset class</li>
            <li>If 'Grow all investment and retirement accounts using asset allocation' is switched on (Inflation/Growth tab), all <strong>accounts set up after the change</strong> will use these allocations by default</li>
            <li>Individual accounts can have their own asset allocation set on their Growth tab</li>
          </ul>
        `,
      },
      marketAssumptions: {
        description: `
          <p>This tab sets the <strong>expected return, volatility, and correlation assumptions</strong> for each asset class, used when accounts are grown via asset allocation.</p>
          <ul>
            <li>These assumptions work together with the Asset Allocation tab</li>
            <li>Voyant provides a default set of market assumptions, which can be reviewed and changed for the plan if a different house view is preferred</li>
            <li>These are the only Plan Settings assumptions that Voyant may periodically update on your behalf</li>
          </ul>
        `,
      },
      majorLoss: {
        description: `
          <p>This tab lets you define a <strong>custom market crash / major loss scenario</strong> that can be applied to a plan via a Timeline event, or used by the Market Crash Insight.</p>
          <ul>
            <li>'Default Age' sets the age of the primary client at which the loss begins by default - this can be changed when the event is added to the Timeline</li>
            <li>'Number of Years' (1-5) sets how long the loss period runs for, with a separate growth deviation entered for each year</li>
            <li>Deviations can be set as a 'Fixed Growth' adjustment, an 'Allocation Percentile' adjustment, or both - fixed growth affects accounts using a set growth rate, while allocation percentile affects accounts grown via asset allocation</li>
            <li>To apply: add a 'Major Loss' Special Event to the Timeline, then check Year View > Investments and Pensions > Net Growth to confirm the deviation has been applied and that growth returns to normal afterwards</li>
          </ul>
        `,
      },
      liquidation: {
        description: `
          <p>The Liquidation Order sets the <strong>default order in which assets are drawn upon</strong> when income and cash savings aren't sufficient to meet expenses.</p>
          <ul>
            <li>This order can be reordered by dragging account types into your preferred sequence</li>
            <li>Individual goals can override this via their own Payment Sources tab</li>
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
            <li>'Transfer all excess income / credits to savings' and 'Save excess income after retirement' control whether unallocated surplus is assumed spent (the default) or saved - these can be combined to cover both pre- and post-retirement</li>
            <li>'Assume predeceased upon simultaneous death' affects how IHT and estate calculations treat a couple who die in the same year</li>
            <li>'Crystallise final salary before money purchase' relates to the historic Lifetime Allowance test ordering and is rarely needed</li>
            <li>The remaining toggles control what's shown on the Cashflow chart and Income vs Expenditure Overview by default - they affect display only, not the underlying calculations</li>
          </ul>
        `,
      },
    },
  },

  yearView: {
    name: "Year View",
    lessons: ["year-view"],
    tabs: {
      basics: {
        description: `
          <p>Year View shows a <strong>year by year breakdown</strong> of every account in the plan, split across separate tables for Cash Flow (income), Expenses, Investments, Pensions, Property, Debts, Protection (insurance), and Taxes.</p>
          <p>You can navigate through years in any of the following ways:</p>
          <ul>
            <li>Use the arrow keys on your keyboard</li>
            <li>Use the floating arrows on the left and right of the screen</li>
            <li>Use the slider in the middle of the page (under the graph, and above the tab headings)</li>
            <li>Use the year selector at the top right of the page</li>
          </ul>
          <p>Other notes:</p>
          <ul>
            <li>Each table shows the account's balance at the end of that year, along with growth, contributions, and withdrawals where relevant</li>
            <li>This is a useful place to check that transfers, withdrawals, and growth assumptions are behaving as expected</li>
            <li>To view these figures in real money terms, navigate to Dashboard, select the three vertical dots in the top right corner (next to 'Year View') and select 'Real Money' - you can't make this change in Year View itself</li>
          </ul>
        `,
      },
    },
  },

  "carry-over": {
    name: "Carryover Assumptions",
    typeIndicator: "ukTaxAndAllowanceInfoInputExpectedRebate",
    lessons: ["intro-to-voyant"],
    tabs: {
      basics: {
        description: `
          <p>Carryover Assumptions are used to capture <strong>tax-related details that predate the start of the plan</strong>.</p>
          <p>Select the relevant person at the top left before entering details, as these assumptions are entered per-person.</p>
          <ul>
            <li><strong>Basics</strong> - any outstanding tax rebates or amounts due from before the plan starts, and which country's tax rules should apply (England/Wales, Scotland, or Northern Ireland)</li>
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
};
