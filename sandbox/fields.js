// =============================================================================
// SHACKADEMY - VOYANT HELP FIELD CONFIGURATION
// =============================================================================
// Each entry needs:
//   key      - the value of the parent <label>'s `for` attribute, or its `id`
//              if it has no `for`. Find it by inspecting the label in DevTools.
//   label    - human-readable name, for the modal heading only (not used in logic)
//   helpText - HTML string. Use <h3>, <p>, <ul>, <li>, <strong> etc. freely.
//              This is hardcoded content so HTML is safe here.
//
// Optional:
//   lessonUrl - Shackademy lesson link. Omit if none.
//   videoUrl  - YouTube link in any format (will be auto-converted to embed).
//
// If both lessonUrl and videoUrl are absent, the modal shows text only (no tabs).
// If only lessonUrl is present, a button appears in the Details panel (no tabs).
// If videoUrl is present, a Video tab appears alongside Details.
//
// EXAMPLES:
//
// Field with lesson but no video:
// {
//   key: "employmentInputBonuses",
//   label: "Bonus",
//   helpText: `
//     <p>Enter any <strong>expected annual bonus</strong> here.</p>
//     <ul>
//       <li>Use an average figure if it varies year to year</li>
//       <li>Leave blank if no bonus is expected</li>
//     </ul>
//   `,
//   lessonUrl: "https://shackademy.com/...",
// },
//
// Text only, no lesson or video:
// {
//   key: "employmentInputStatePensionAge",
//   label: "State Pension Age",
//   helpText: `
//     <p>Voyant pre-fills this based on current UK government projections.</p>
//     <p>Only change it if the client has a specific reason to expect a different age.</p>
//   `,
// },
//
// Same visible label, different section:
// {
//   key: "spouseInputSalary",
//   label: "Salary (partner)",
//   helpText: `
//     <h3>Partner's salary</h3>
//     <p>Enter the partner's <strong>gross annual salary</strong> before deductions.</p>
//   `,
//   lessonUrl: "https://shackademy.com/...",
// },
// =============================================================================

window.SHACKADEMY_FIELDS = [
  // ============================================================
  // CATEGORY: People
  // ============================================================

  // ------------------------------------------------------------
  // SUB-CATEGORY: N/A
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "personInputTypeLabel",
    label: "Person type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select your relationship to this person. Voyant uses this information to model applicable tax allowances, pension rules, and income calculations for each person.</p>
    `,
  },
  {
    key: "personInputFirstName",
    label: "First name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the first name of the person you're adding. Voyant uses this throughout the plan to label charts, reports, and projections.</p>
    `,
  },
  {
    key: "personInputLastName",
    label: "Last name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the last name of the person you're adding. This only flows through to Voyant reports, so if you prefer you can just use an initial.</p>
    `,
  },
  {
    key: "alreadyRetiredDropdown",
    label: "Is this person already retired?",
    helpText: `
      <h3>What to enter</h3>
      <p>Select <strong>Yes</strong> if the person has already stopped working. Select <strong>No</strong> if they are still working, even part-time.</p>
      <h3>Tips</h3>
      <ul>
        <li>If semi-retired but still earning any employment income, select No</li>
        <li>This affects how Voyant models their income and can be tricky to change to 'No' if you select 'Yes' accidentally</li>
        <li>You can adjust retirement timing later using the timeline</li>
        <li>If you have any issues with this, please ask in the community or get in touch</li>
      </ul>
    `,
  },
  {
    key: "retirementAge",
    label: "Retirement Age",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the age at which the person plans to fully stop working. Voyant uses this as the point at which employment income ends by default.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use a realistic target age rather than an aspirational one - you can always model alternatives later using Voyant's 'What if' tools</li>
        <li>You can adjust retirement timing later using the timeline</li>
      </ul>
    `,
  },

  // ============================================================
  // CATEGORY: Goals
  // ============================================================

  // ------------------------------------------------------------
  // SUB-CATEGORY: Pre-Retirement & Retirement
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "basicExpenseInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner/s of the goal by expanding the menu and selecting / deselecting individuals by clicking on their names. You will see your selection/s in the owner window.</p>
    `,
  },
  {
    key: "basicExpenseInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Use a name that resonates with you - this will show on multiple insights & when you view the timeline</p>
      <h3>Tips</h3>
      <ul>
        <li>If this is a goal that relates to a specific person, consider starting with their name</li>
        <li>e.g. "John - MBA fees"</li>
      </ul>
    `,
  },
  {
    key: "basicExpenseInputAmountLabel",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the value of this goal. For example, if you need £10,000 per year for school fees, enter £10,000 here.</p>
      <h3>Tips</h3>
      <ul>
        <li>The default is 'Annual' but you can change this on the right of the input box</li>
        <li>Check 'Expenses' in the 'Year View' to validate this entry</li>
      </ul>
    `,
  },
  {
    key: "interestTaxDeductible",
    label: "Tax Deductible",
    helpText: `
      <h3>What to enter</h3>
      <p>If this expense is tax deductible please ensure this is ticked and the owner is correct</p>
    `,
  },
  {
    key: "basicExpenseGrowthLabel",
    label: "Inflation Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>This expense will increase over time at this rate.</p>
      <h3>Tips</h3>
      <ul>
        <li>The default inflation rate is found in Dashboard view > Plan Settings > Inflation/Growth > Inflation Rate</li>
        <li>Changing the default rate will only affect new plans created, you will need to manually change the rate for any existing plans</li>
      </ul>
    `,
  },
  {
    key: "basicExpensePresentFutureValue",
    label: "Goal entered as",
    helpText: `
      <h3>Tips</h3>
      <ul>
        <li><strong>Present Value:</strong> If you want the expense to increase with inflation from <strong>today</strong>, choose this</li>
        <li><strong>Future Value:</strong> If you want the expense to increase with inflation from <strong>the chosen start date (Timing tab)</strong>, choose this</li>
      </ul>
    `,
  },

  // ── Tab: Details ──────────────────────────────────────────────

  {
    key: "goalExpenseContainerInputExpenseAmount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>If you entered an amount you're happy with in the 'Basics' tab, you don't have to enter anything here</p>
      <h3>Tips</h3>
      <ul>
        <li>Whatever you enter in this section will overwrite the 'Basics' tab</li>
      </ul>
    `,
  },
  {
    key: "preRetirementExpenseGrowthLabel",
    label: "Inflation Rate",
    helpText: `
    <h3>What to enter</h3>
    <p>If you entered an inflation rate you're happy with in the 'Basics' tab, you don't have to enter anything here</p>
    <h3>Tips</h3>
    <ul>
      <li>Whatever you enter in this section will overwrite the 'Basics' tab</li>
    </ul>
  `,
  },
  {
    key: "goalsIncomeSlider",
    label: "Percentage of Income",
    helpText: `
    <h3>What to enter</h3>
    <p>Depending on who you select in the Owner field the relevant income/s will be shown above. You can choose to create this expenses as a percentage of these income/s.</p>
    <h3>Tips</h3>
    <ul>
      <li>Whatever you enter in this section will overwrite the 'Basics' tab</li>
    </ul>
  `,
  },

  // ── Tab: Timing ──────────────────────────────────────────────

  {
    key: "expenseFrequency",
    label: "Expense Frequency",
    helpText: `
    <h3>What to enter</h3>
    <p>This is where you can change the goal so it occurs on a less frequent basis</p>
    <h3>Tips</h3>
    <ul>
      <li>For example, enter '2' for a biennial expense. The amount you entered will apply for each occurrence.</li>
      <li>Check out the lesson in the sidebar for additional details.</li>
    </ul>
  `,
  },

  // ── Tab: Payment Sources ──────────────────────────────────────────────

  {
    key: "usePreferredFundingItemOnly",
    label: "Preferred Payment Sources",
    helpText: `
    <h3>What to enter</h3>
    <p>If setting a preferred payment source, use the "Only Use Preferred Sources" to Pay the Expense very sparingly, if at all.
    <br>
    When ticked, this setting can create artificial shortfalls if the preferred source is inadequately funded to pay the linked expense. These artificial shortfalls can prevent Voyant’s need analysers from returning results.
    <br>
    <strong>When might you tick the “Only Use…”option? </strong>
    <br>
    In most cases, we recommend only using this setting in a what-if scenario.
    <br>
    For example, suppose you are saving for your children’s university fees and you want to run a test to determine if you are saving enough to a particular account.
    <br>
    Even if the account is set as a preferred payment source, income and other assets sources will be used if the account does not have the funds to meet the linked expense.
    <br>
    However, by selecting the “Only Use Preferred Payment Sources” option, you could, in this scenario, test the account for adequate funding.
    </p>
    <h3>Tips</h3>
    <ul>
      <li><a href="https://support.planwithvoyant.com/hc/en-us/articles/15113841453083-How-to-set-up-a-Payment-Source-on-a-Expense-UK" target="_blank">Voyant's lesson on using Payment Sources</a></li>
    </ul>
  `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Milestone Goal
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "milestoneExpenseInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner/s of the goal by expanding the menu and selecting / deselecting individuals by clicking on their names. You will see your selection/s in the owner window.</p>
    `,
  },
  {
    key: "milestoneExpenseInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Use a name that resonates with you - this will show on multiple insights & when you view the timeline</p>
      <h3>Tips</h3>
      <ul>
        <li>If this is a goal that relates to a specific person, consider starting with their name</li>
        <li>e.g. "John - Wedding"</li>
      </ul>
    `,
  },
  {
    key: "milestoneExpenseInputAmount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the value of this goal. For example, if the milestone will cost £10,000, enter £10,000 here.</p>
      <h3>Tips</h3>
      <ul>
        <li>The default is 'Annual' but you can change this on the right of the input box</li>
        <li>Check 'Expenses' in the 'Year View' to validate this entry</li>
      </ul>
    `,
  },
  {
    key: "milestoneExpenseGrowthLabel",
    label: "Inflation Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>This expense will increase over time at this rate.</p>
      <h3>Tips</h3>
      <ul>
        <li>The default inflation rate is found in Dashboard view > Plan Settings > Inflation/Growth > Inflation Rate</li>
        <li>Changing the default rate will only affect new plans created, you will need to manually change the rate for any existing plans</li>
      </ul>
    `,
  },
  {
    key: "milestoneExpensePresentFutureValue",
    label: "Goal entered as",
    helpText: `
      <h3>Tips</h3>
      <ul>
        <li><strong>Present Value:</strong> If you want the expense to increase with inflation from <strong>today</strong>, choose this</li>
        <li><strong>Future Value:</strong> If you want the expense to increase with inflation from <strong>the chosen start date (Timing tab)</strong>, choose this</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Education Goal
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "collegeExpenseInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner/s of the goal by expanding the menu and selecting / deselecting individuals by clicking on their names. You will see your selection/s in the owner window.</p>
    `,
  },
  {
    key: "collegeExpenseInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Use a name that resonates with you - this will show on multiple insights & when you view the timeline</p>
      <h3>Tips</h3>
      <ul>
        <li>If this is a goal that relates to a specific person, consider starting with their name</li>
        <li>e.g. "Emma - University Fees"</li>
      </ul>
    `,
  },
  {
    key: "expenseInputAmount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the value of this goal. For example, if the education cost is £10,000 per year, enter £10,000 here.</p>
      <h3>Tips</h3>
      <ul>
        <li>The default is 'Annual' but you can change this on the right of the input box</li>
        <li>Check 'Expenses' in the 'Year View' to validate this entry</li>
      </ul>
    `,
  },
  {
    key: "collegeExpenseInputGrowthLabel",
    label: "Inflation Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>This expense will increase over time at this rate.</p>
      <h3>Tips</h3>
      <ul>
        <li>The default inflation rate is found in Dashboard view > Plan Settings > Inflation/Growth > Inflation Rate</li>
        <li>Changing the default rate will only affect new plans created, you will need to manually change the rate for any existing plans</li>
      </ul>
    `,
  },
  {
    key: "collegeExpensePresentFutureValue",
    label: "Goal entered as",
    helpText: `
      <h3>Tips</h3>
      <ul>
        <li><strong>Present Value:</strong> If you want the expense to increase with inflation from <strong>today</strong>, choose this</li>
        <li><strong>Future Value:</strong> If you want the expense to increase with inflation from <strong>the chosen start date (Timing tab)</strong>, choose this</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Net Worth Goal
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "networthGoalInput",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Use a name that resonates with you - this will show on multiple insights & when you view the timeline</p>
      <h3>Tips</h3>
      <ul>
        <li>This goal relates to the owner/s' overall net worth, so a name describing the target is helpful</li>
        <li>e.g. "Net worth target by retirement"</li>
      </ul>
    `,
  },
  {
    key: "networthGoalAmountInput",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the net worth value the owner/s would like to achieve by the goal date.</p>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Gifting Goal
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "legacyExpenseInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner/s of the goal by expanding the menu and selecting / deselecting individuals by clicking on their names. You will see your selection/s in the owner window.</p>
    `,
  },
  {
    key: "legacyExpenseInputRecipientType",
    label: "Recipient Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether the recipient of this gift is a person already included in the plan, a person outside of the plan, or a charity.</p>
    `,
  },
  {
    key: "legacyExpenseInputName",
    label: "Recipient Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the name of the recipient. This field appears when the recipient type is set to 'Person outside of plan' or 'Charity'.</p>
    `,
  },
  {
    key: "legacyExpenseInputRecipientRef",
    label: "Recipient",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the recipient from the people already included in the plan. This field appears when the recipient type is set to 'Person in plan'.</p>
    `,
  },
  {
    key: "legacyExpenseInputAmount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the value of this gift. For example, if the gift will be £10,000, enter £10,000 here.</p>
      <h3>Tips</h3>
      <ul>
        <li>The default is 'Annual' but you can change this on the right of the input box</li>
        <li>For a one-off goal, you can set the timing to start in one year and end in the following, or consider using a 'Milestone' goal</li>
        <li>Check 'Expenses' in the 'Year View' to validate this entry</li>
      </ul>
    `,
  },
  {
    key: "legacyExpenseGrowthLabel",
    label: "Inflation Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>This gift will increase over time at this rate.</p>
      <h3>Tips</h3>
      <ul>
        <li>The default inflation rate is found in Dashboard view > Plan Settings > Inflation/Growth > Inflation Rate</li>
        <li>Changing the default rate will only affect new plans created, you will need to manually change the rate for any existing plans</li>
      </ul>
    `,
  },
  {
    key: "legacyExpensePresentFutureValue",
    label: "Goal entered as",
    helpText: `
      <h3>Tips</h3>
      <ul>
        <li><strong>Present Value:</strong> If you want the gift to increase with inflation from <strong>today</strong>, choose this</li>
        <li><strong>Future Value:</strong> If you want the gift to increase with inflation from <strong>the chosen start date (Timing tab)</strong>, choose this</li>
      </ul>
    `,
  },

  // ============================================================
  // CATEGORY: Events
  // ============================================================

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "eventName",
    label: "Event Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear, descriptive name for this event. The name appears on the timeline and throughout the plan wherever this event is referenced.</p>
      <h3>Tips</h3>
      <ul>
        <li>Be specific - e.g. "Jane Retires", "Buy Holiday Home", "Children Leave Home" rather than just "Event 1"</li>
        <li>Events are used to trigger changes in the plan - a well-named event makes it much easier to understand the plan at a glance</li>
      </ul>
    `,
  },
  {
    key: "eventEditorInputOwner",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the person this event relates to. The owner determines which person's age Voyant uses when positioning the event on the timeline.</p>
      <h3>Tips</h3>
      <ul>
        <li>For joint events (e.g. "Buy a property together"), select the person whose age is most relevant for timing - you can always adjust the year directly using the Year or Age fields</li>
        <li>For events that don't relate to a specific person (e.g. a general financial milestone), select either person - the year will override the age calculation</li>
      </ul>
    `,
  },
  {
    key: "editTiming",
    label: "Edit Timing",
    helpText: `
      <h3>What to enter</h3>
      <p>Drag this slider to select the appropriate timing for the event.</p>
      <h3>Tips</h3>
      <ul>
        <li>This will automatically update the 'Year' and 'Age' fields below, and will in turn be updated if you directly edit those fields.</li>
      </ul>
    `,
  },
  {
    key: "eventEditorInputYears",
    label: "Year",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the tax year in which this event occurs. Voyant will position the event on the timeline at the start of this year.</p>
      <h3>Tips</h3>
      <ul>
        <li>The Voyant 'Year' reflects the first of the calendar years in the tax year... e.g. 2034 = the 2034/35 tax year</li>  
        <li>Changing the year will automatically update the Age field based on the selected owner's date of birth</li>
      </ul>
    `,
  },
  {
    key: "eventEditorInputAge",
    label: "Age",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the age of the selected owner at which this event occurs. Voyant converts this to a tax year automatically.</p>
      <h3>Tips</h3>
      <ul>
        <li>Changing the age will automatically update the Year field based on the owner's date of birth</li>
        <li>If the plan has more than one person, make sure the correct owner is selected above so the age calculation is based on the right date of birth</li>
      </ul>
    `,
  },

  // ============================================================
  // CATEGORY: Stages
  // ============================================================

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "stageInputName",
    label: "Stage Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a name for this stage. Stages appear as labelled bands on the timeline, helping to visually organise the plan into distinct life phases.</p>
      <h3>Tips</h3>
      <ul>
        <li>Common stage names include "Working Years", "Early Retirement", "Later Life", or "Children at Home" - use names that are meaningful for this plan</li>
        <li>Stages are purely visual and organisational - they don't affect any calculations, but they make the plan much easier to read and discuss with the people in it</li>
        <li>Stages are bounded by Events on the timeline - set up your Events first, then use Stages to label the periods between them</li>
      </ul>
    `,
  },
  {
    key: "stageColorInput",
    label: "Stage Colour",
    helpText: `
      <h3>What to enter</h3>
      <p>Select a colour for this stage band on the timeline.</p>
      <h3>Tips</h3>
      <ul>
        <li>Using distinct colours for each stage makes the timeline much easier to read at a glance</li>
        <li>Consider using a consistent colour scheme across 'What if' scenarios - for example, always using green for working years and blue for retirement - to make plans feel familiar and consistent</li>
      </ul>
    `,
  },

  // ============================================================
  // CATEGORY: Employment
  // ============================================================

  // ------------------------------------------------------------
  // SUB-CATEGORY: Employment
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "employmentInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner of this employment. Only one owner can be selected per employment entry - if both people in the plan are employed, set up a separate employment record for each.</p>
    `,
  },
  {
    key: "employmentInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear, recognisable name for this employment.</p>
      <h3>Tips</h3>
      <ul>
        <li>Including the owner's name and employer makes it easier to identify later - e.g. "Jane - Acme Ltd"</li>
        <li>If there are multiple employments for the same person, be specific so they're easy to distinguish</li>
      </ul>
    `,
  },
  {
    key: "employmentInputEmploymentSource",
    label: "Source",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the employment type. This determines the tax treatment applied to the earnings and may unlock additional fields.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Employed</strong> - standard PAYE employment. Income Tax and National Insurance are deducted via payroll in reality (though paid via Self Assessment in Voyant)</li>
        <li><strong>Self-Employed</strong> - income from self-employment or sole trading. Tax is assessed via Self Assessment and Class 4 NI applies</li>
        <li><strong>Company Owner</strong> - director or shareholder of a company. Unlocks the Dividend field and applies dividend tax treatment to any dividend income entered</li>
      </ul>
    `,
  },
  {
    key: "employmentInputSalary",
    label: "Salary",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the gross annual salary before pension contributions and taxes. Voyant handles all the tax calculations for you.</p>
      <h3>Tips</h3>
      <ul>
        <li>If the owner receives a net salary (e.g. after salary sacrifice), gross it up before entering - Voyant works in gross figures throughout</li>
        <li>For a salary that varies, use a realistic average or current year figure</li>
        <li>Salary growth can be set in the Growth Rate field below</li>
      </ul>
    `,
  },
  {
    key: "employmentInputBonus",
    label: "Bonuses / Commissions",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter an annual average total for any expected bonus or commission income. This is added to salary and taxed as earned income.</p>
      <h3>Tips</h3>
      <ul>
        <li>If bonuses vary significantly year to year, consider using a conservative average rather than the best year</li>
        <li>If bonuses are likely to stop at a certain point (e.g. when a role changes), you can use Steps to reduce or remove this amount at a future date</li>
      </ul>
    `,
  },
  {
    key: "employmentInputBenefitsInKind",
    label: "Benefits in Kind",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual value of any taxable benefits in kind received from the employer - such as a company car, private medical insurance, or interest-free loans above the HMRC threshold.</p>
      <h3>Tips</h3>
      <ul>
        <li>Enter as an annual total - the P11D value is a good source for this figure</li>
        <li>If no benefits are received, leave this field blank</li>
      </ul>
    `,
  },
  {
    key: "ignoreDisability",
    label: "Continue to Receive Income While Disabled",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if the person would continue to receive this employment income even if a disability event occurs in the plan.</p>
      <h3>Tips</h3>
      <ul>
        <li>By default, Voyant will stop employment income at a disability event - toggle this on if, for example, their employment contract includes long-term sick pay</li>
      </ul>
    `,
  },
  {
    key: "taxAsPAYE",
    label: "Tax as PAYE",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if, despite being self-employed, the owner's income is taxed through PAYE rather than Self Assessment.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is generally relevant for contractors or sole traders who operate through an umbrella company or who have agreed to be taxed at source</li>
        <li>If unsure, leave this off - self-employed income is generally reported via Self Assessment</li>
      </ul>
    `,
  },
  {
    key: "employmentInputAnnualDividend",
    label: "Dividend",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual dividend income drawn from the company.</p>
      <h3>Tips</h3>
      <ul>
        <li>Enter the gross annual dividend amount - the dividend allowance is applied automatically by Voyant</li>
        <li>Dividends are typically drawn in addition to a salary - make sure the salary is entered separately above</li>
      </ul>
    `,
  },
  {
    key: "employmentGrowthLabel",
    label: "Growth Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual rate at which this employment income is expected to grow. By default this is linked to the inflation figure entered in Plan Settings.</p>
      <h3>Tips</h3>
      <ul>
        <li>Override this if a specific salary progression is expected at a defined % rate</li>
        <li>You can also use Steps to model discrete salary changes at specific points in time</li>
      </ul>
    `,
  },
  {
    key: "employmentPresentFutureValue",
    label: "Income Entered As",
    helpText: `
      <h3>Tips</h3>
      <ul>
        <li><strong>Present Value</strong> - the salary grows from today at the Growth Rate. Use this when entering today's salary figure</li>
        <li><strong>Future Value</strong> - the salary is treated as already inflated to its value at the start date. Use this when entering a salary that applies at a future point and should not be further inflated from today</li>
      </ul>
    `,
  },

  // ============================================================
  // CATEGORY: Other Income
  // ============================================================

  // ------------------------------------------------------------
  // SUB-CATEGORY: Other Income
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "otherIncomeInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner of this income.</p>
      <h3>Tips</h3>
      <ul>
        <li>Multiple owners can be selected, this will distribute the income evenly between each.</li>
      </ul>
    `,
  },
  {
    key: "otherIncomeInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear, recognisable name for this income source.</p>
      <h3>Tips</h3>
      <ul>
        <li>Be specific enough to distinguish it from other entries - e.g. "Rental Income - Leeds Flat" or "Trust Income - Family Settlement"</li>
      </ul>
    `,
  },
  {
    key: "otherIncomeInputAnnualIncome",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the gross annual amount of this Other Income.</p>
      <h3>What counts as Other Income?</h3>
      <p>Other Income is used for any income that doesn't fit the Employment or Pension categories - for example: rental income (this can be linked to a property later), trust distributions, maintenance payments, freelance income not entered as employment, or overseas income. It can be set as taxable or non-taxable depending on its nature.</p>
      <h3>Tips</h3>
      <ul>
        <li>Unlike employment income, within Voyant, 'Other Income' is not subject to National Insurance</li>
        <li>Set the Tax Status below to match how this income is actually taxed</li>
      </ul>
    `,
  },
  {
    key: "otherIncomeTaxationType",
    label: "Taxation Type",
    helpText: `
      <h3>What to enter</h3>
      <p>If this income is taxable, select how it should be taxed. If the income is non-taxable, change the 'Tax Status' field and you can ignore this section.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Income</strong> - taxed at the owner's marginal income tax rate</li>
        <li><strong>Capital Gains</strong> - treated as a capital gain and taxed at the applicable CGT rate</li>
        <li><strong>Dividends</strong> - taxed at dividend tax rates, with the annual dividend allowance applied first</li>
      </ul>
    `,
  },
  {
    key: "otherIncomeIsTaxable",
    label: "Tax Status",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether this income is <strong>Taxable</strong> or <strong>Non-Taxable</strong>.</p>
      <h3>Tips</h3>
      <ul>
        <li>If set to Taxable, the tax is not deducted via PAYE - it is assessed via Self Assessment and shown as a tax liability in the Year View</li>
        <li>If unsure of the tax status, check with a tax adviser before selecting Non-Taxable</li>
      </ul>
    `,
  },
  {
    key: "otherIncomeIsEarnedIncome",
    label: "Is Earned Income",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if this income counts as <strong>earned income</strong> for pension contribution purposes.</p>
      <h3>Tips</h3>
      <ul>
        <li>Investment income, rental income, and trust distributions are generally not earned income</li>
      </ul>
    `,
  },
  {
    key: "otherIncomeGrowthLabel",
    label: "Growth Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual rate at which this income is expected to grow. By default this is linked to the inflation figure entered in Plan Settings.</p>
      <h3>Tips</h3>
      <ul>
        <li>Changing the default rate in Plan Settings will only affect new plans created, you will need to manually change the rate for any existing income</li>
        <li>For income that is expected to remain flat (e.g. a fixed trust distribution), enter 0%</li>
        <li>For rental income, consider using an assumption that reflects realistic long-term rental growth rather than the earnings default</li>
      </ul>
    `,
  },
  {
    key: "otherIncomePresentFutureValue",
    label: "Income Entered As",
    helpText: `
      <h3>Tips</h3>
      <ul>
        <li><strong>Present Value</strong> - the income grows from today at the Growth Rate. Use this when entering today's amount</li>
        <li><strong>Future Value</strong> - the income is treated as already at its future value. Use this when the amount applies at a future start date and should not be further inflated from today</li>
      </ul>
    `,
  },
  {
    key: "continueAfterMortality",
    label: "Income Survives Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if this income would continue to be received after the owner's death - for example, a trust income that passes to a beneficiary, or a maintenance payment that continues to a surviving partner.</p>
      <h3>Tips</h3>
      <ul>
        <li>By default, Voyant stops Other Income at the owner's mortality event - toggle this on if the income genuinely continues</li>
        <li>This does not change the owner of the income in the plan - it simply instructs Voyant to keep paying it after the death event</li>
      </ul>
    `,
  },

  // ============================================================
  // CATEGORY: Windfall
  // ============================================================

  // ------------------------------------------------------------
  // SUB-CATEGORY: Windfall
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "windfallInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner of this windfall. Only one owner can be selected per entry - if both people in the plan receive separate windfalls, set up a separate record for each.</p>
    `,
  },
  {
    key: "windfallInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear, recognisable name for this windfall.</p>
      <h3>Tips</h3>
      <ul>
        <li>Be descriptive - e.g. "Inheritance - Aunt Mary"</li>
      </ul>
    `,
  },
  {
    key: "windfallInputType",
    label: "Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the category that best describes this windfall. This is for reference and labelling purposes rather than affecting the tax treatment directly - the tax treatment is controlled by the Taxation Type and Taxable fields below.</p>
      <h3>Tips</h3>
      <ul>
        <li>If none of the options precisely match, select the closest category</li>
      </ul>
    `,
  },
  {
    key: "windfallInputValue",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the windfall amount. Windfalls are assumed to be received tax-free or net of any taxes and costs - Voyant will not deduct further taxes from this figure unless you set the Taxable option below.</p>
      <h3>Tips</h3>
      <ul>
        <li>If the windfall is subject to tax, enter the gross amount and set the Taxation Type and Taxable fields accordingly so Voyant can model the tax correctly</li>
        <li>For an inheritance, enter the net amount expected after IHT and other costs have been settled from the estate</li>
        <li>Be cautious when entering future inheritances or other uncertain windfalls. Consider only including amounts that are reasonably expected to be received</li>
      </ul>
    `,
  },
  {
    key: "taxationType",
    label: "Taxation Type",
    helpText: `
      <h3>What to enter</h3>
      <p>If this windfall is taxable, select how it should be taxed.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Income</strong> - taxed at the owner's marginal income tax rate</li>
        <li><strong>Capital Gains</strong> - treated as a capital gain and taxed at the applicable CGT rate</li>
      </ul>
    `,
  },
  {
    key: "isTaxable",
    label: "Taxable",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether this windfall is taxable or non-taxable in the hands of the owner.</p>
      <h3>Tips</h3>
      <ul>
        <li>If the windfall is taxable, ensure you choose the appropriate Taxation Type above</li>
      </ul>
    `,
  },
  {
    key: "windfallPresentFutureValue",
    label: "Income Entered As",
    helpText: `
      <h3>Tips</h3>
      <ul>
        <li><strong>Present Value</strong> - the amount is expressed in today's money and will be inflated to its value at the date it is received</li>
        <li><strong>Future Value</strong> - the amount is already expressed in the money of the year it will be received, so no further inflation is applied</li>
      </ul>
      <h3>Which should I choose?</h3>
      <p>If you know the approximate amount in today's money and expect this to increase in line with inflation, use Present Value. If you have a specific future figure (e.g. a known inheritance amount) or you don't want inflation applied, use Future Value.</p>
    `,
  },

  // ============================================================
  // CATEGORY: Savings & Investments
  // ============================================================

  // ------------------------------------------------------------
  // SUB-CATEGORY: Savings
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "ukSavingInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner/s of the Savings account by expanding the menu and selecting / deselecting individuals by clicking on their names. You will see your selection/s in the owner window.</p>
      <h3>Tips</h3>
      <ul>
        <li>Ownership defaults to the principal person. Check correct ownership for each product.</li>
      </ul>
    `,
  },
  {
    key: "ukSavingInputName",
    label: "Savings Account Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a distinguishable name for the account</p>
      <h3>Tips</h3>
      <ul>
        <li>It may make it easier later to include the owner's name in the name</li>
        <li>e.g. "Jane ABC current account"</li>
        <li>Ensure you don't include any identifiable information like account numbers</li>
      </ul>
    `,
  },
  {
    key: "ukSavingInputSavingType",
    label: "Account Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the type of savings account you wish to enter. This is for tax and contribution rules purposes.
      <br>
      The account type also determines when these assets will be accessed if needed in the plan.
      <br>
      <a href="https://shackademy.com/path-player?courseid=voyant&unit=67734dec1c6b5ca11b094f0cUnit" target="_blank">Learn more about the default selldown order here</a>
      </p>
      <h3>Account types & tax treatment within Voyant</h3>
      <ul>
        <li><strong>Current accounts</strong> - A Cash Account - Interest is taxable.</li>
        <li><strong>Savings accounts</strong> - A Cash Account - Interest is taxable.</li>
        <li><strong>Cash ISAs</strong> - Treated as a Tax Free asset. Contributions will be limited to the ISA allowance</li>
        <li><strong>National Savings Certificate</strong> - Treated as a Tax Free asset. Voyant sets no contribution limits on this type of account.</li>
      </ul>
    `,
  },
  {
    key: "ukSavingsInputBalance",
    label: "Balance",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the balance of the account as at today</p>
      <h3>Tips</h3>
      <ul>
        <li>The plan start date is 6th April each year</li>
        <li>This is updated to the following tax year in October each year</li>
        <li>This means there is only ever at maximum a 6 month differential in account balances</li>
        <li>You will spend 6 months of the year working in arrears, and 6 months working in advance</li>
        <li>The easiest way to approach this is to update your account balances in October and April each year</li>
        <li><a href="https://shackademy.com/path-player?courseid=voyant&unit=68e5b24f932f5484590240fdUnit" target="_blank">Our lesson on how plan years are updated is here</a></li>
      </ul>
    `,
  },
  {
    key: "growthInputGrowthType",
    label: "Grow this account by",
    helpText: `
      <h3>What to enter</h3>
      <p>Grow the account by Entered Interest Rate which you enter in the next field or by Portfolio/Holdings which will assume 100% cash growth rates on accounts in this 'Savings' section.</p>
      <h3>Tips</h3>
      <ul>
        <li>Our suggestion is to use <strong>Entered Interest Rate</strong> for all accounts until you're familiar with the impact of changing to Portfolio/Holdings.</li>
      </ul>
    `,
  },
  {
    key: "toggleGrowthRateInputRate",
    label: "Interest Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>This is the amount the account will be assumed to grow by each year compounded if there are no withdrawals i.e. the Interest rate of the savings account.</p>
    `,
  },
  {
    key: "contributionType",
    label: "Contribution Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how you wish to calculate regular contributions, either as a fixed amount (with or without inflation) or as a percentage of income.</p>
    `,
  },
  {
    key: "contributionAmount",
    label: "Contribution Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter here the value of any regular contributions into this account.</p>
      <h3>Tips</h3>
      <ul>
        <li>Default is set to 'Annually' but you can change this on the right hand side of the input box</li>
      </ul>
      <h3>Where can I see these contributions after I've set them up?</h3>
      <ul>
        <li>Contributions are included in the black line of the Let's See chart, so setting up contributions when you didn't have them previously will push the black line up higher</li>
        <li>You will also see contributions in the Year View > Expenses tab</li>
      </ul>
    `,
  },
  {
    key: "formContributionPresentFutureValue",
    label: "Contribution Entered As",
    helpText: `
      <h3>Tips</h3>
      <ul>
        <li><strong>Present Value:</strong> If you want the expense to increase with inflation from <strong>today</strong>, choose this</li>
        <li><strong>Future Value:</strong> If you want the expense to increase with inflation from <strong>the chosen start date (Timing tab)</strong>, choose this</li>
      </ul>
    `,
  },
  {
    key: "contributionPercent",
    label: "Percent of Salary",
    helpText: `
      <h3>What to enter</h3>
      <p>This will be relative to the <strong>gross</strong> salary of the owner chosen at the top of the page</p>
    `,
  },

  // ── Tab: Withdrawal Limit ──────────────────────────────────────────────

  {
    key: "drawdownType",
    label: "Withdrawal Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Withdrawal types allow you to specify the limit up to which withdrawals may be made.
      <br>
      If you would like a set amount to be withdrawn from the account each year, regardless of whether Voyant classes it 'As Needed', set this up in the Planned Withdrawals screen.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Do Not Allow</strong> - Selecting 'Do Not Allow' will not allow any withdrawals from this account. The whole value of the growing account will be ringfenced from any spending. This is useful for setting up an Emergency Fund.</li>
        <li><strong>Scheduled only</strong> - This option is relevant in conjunction with a Planned Withdrawal which has selected this account. This will prevent the account being used in any other way except for the Planned withdrawal.</li>
        <li><strong>Minimum Balance</strong> - Will withdraw from the account, but not let the account go lower than the minimum balance. The Minimum Balance option is a fixed amount which does not inflate. Depending on your growth settings this account will also grow and anything above the minimum balance can be used. Also useful for setting up an Emergency Fund.</li>
        <li><strong>As Needed</strong> - This is the default option and means this account will be accessed when required and as according to the liquidation order (after the Event specified on the Timeline).*</li>
        <li><strong>Percentage</strong> - Limits the withdrawals to a maximum of this percentage out of this account annually if needed.*</li>
        <li><strong>Fixed with Inflation</strong> - Limits the withdrawals to a maximum of this fixed value if needed in the plan and also inflates the value over time.*</li>
        <li><strong>Fixed without inflation</strong> - Limits the withdrawals to a maximum of this fixed value if needed in the plan and does not inflate the value over time.*</li>
        <li><strong>Max without penalty</strong> - For bonds there is an additional option of Maximum withdrawals without penalty. This means it will limits the withdrawals to the 5%/ year for 20 years where available and if needed in the plan. *</li>
      </ul>
      <p>*Note: These payments are the maximum amount Voyant is allowed to take from the account. The withdrawals will not be used if, for example, there isn't a shortfall to be met by using savings.</p>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Investments
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "investmentInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner/s of the Investment account by expanding the menu and selecting / deselecting individuals by clicking on their names. You will see your selection/s in the owner window.</p>
      <h3>Tips</h3>
      <ul>
        <li>Ownership defaults to the principal person. Check correct ownership for each product.</li>
      </ul>
    `,
  },
  {
    key: "investmentInputName",
    label: "Investment Account Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a distinguishable name for the account</p>
      <h3>Tips</h3>
      <ul>
        <li>It may make it easier later to include the owner's name in the name</li>
        <li>e.g. "Jane ABC ISA"</li>
        <li>Ensure you don't include any identifiable information like account numbers</li>
      </ul>
    `,
  },
  {
    key: "investmentInputInvesmentType",
    label: "Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the type of Investment accounts you wish to enter. This is for tax and contribution rules purposes. The account type also determines when these assets will be accessed if needed in the plan.</p>
      <h3>Types of Account</h3>
      <ul>
        <li><strong>Bypass Trust & Loan Trusts</strong> - Trusts do not form part of the liquidation order. Voyant will not take adhoc/as needed withdrawals to fulfil expenses.</li>
        <li><strong>Discounted Gift Trusts (DGT)</strong> - A DGT does not form part of the liquidation order however Voyant will make automatic planned withdrawals from the investment.<sup>1</sup></li>
        <li><strong>Enterprise Investment Schemes (EIS)</strong> - EIS investments do not form part of the liquidation order. Adhoc withdrawals will not be taken from these investments. If withdrawals are needed these will need to be set up as Planned Withdrawals.<sup>2</sup></li>
        <li><strong>Lifetime ISA</strong> - Treated as a Tax Free asset. Voyant will not access until the owner is over the required age.</li>
        <li><strong>Onshore bond</strong> - Treated as a Tax Deferred asset. Voyant will treat withdrawals as tax deferred up to the allowance.</li>
        <li><strong>Offshore bond</strong> - Treated as a Tax Deferred asset. Voyant will treat withdrawals as tax deferred up to the allowance.</li>
        <li><strong>Offshore Taxable</strong> - Treated as a Tax Deferred asset. With this investment you can set the level of taxation as you choose.<sup>3</sup></li>
        <li><strong>Stocks Market ISA/ Junior ISA</strong> - Treated by Voyant as a Tax Free asset. Voyant will use the appropriate ISA allowance depending on whether an adult or child is selected as the owner.</li>
        <li><strong>Unwrapped investments</strong> - Treated as a Taxable asset. Voyant use unwrapped investments as the catch-all category for all manner of Taxable investments that are not subject to the special tax treatments. OEICs, unit trusts, equity holdings, stocks and shares, individual equities, businesses and even properties can all be modelled under the guise of unwrapped investments.</li>
        <li><strong>Venture Capital Trusts (VCT)</strong> - VCT's do not form part of the liquidation order. Adhoc withdrawals will not be taken from these investments. If withdrawals are needed these will need to be set up as Planned Withdrawals.<sup>4</sup></li>
      </ul>
      <p><sup>1</sup><a href="https://support.planwithvoyant.com/hc/en-us/articles/4409206089499-Adding-Trusts-Loan-Trusts-DGTs-and-Other-Trusts" target="_blank">This article</a> will help explain how to enter Loan Trusts, DGT's and Other Trusts in more detail
      <br>
      <sup>2</sup><a href="https://support.planwithvoyant.com/hc/en-us/articles/200870009-EISs-How-to-enter-and-tax-treatment-of-Enterprise-Investment-Schemes-UK" target="_blank">This article</a> will explain how to enter an EIS and the tax treatment applicable;
      <br>
      <sup>3</sup><a href="https://support.planwithvoyant.com/hc/en-us/articles/38738632029723-Offshore-taxable-Investment-UK" target="_blank">This article</a> will explain how to model offshore taxable investments;
      <br>
      <sup>4</sup><a href="https://support.planwithvoyant.com/hc/en-us/articles/4406520094107-VCTs-How-to-enter-and-tax-treatment-of-Venture-Capital-Trusts-UK" target="_blank">This article</a> will explain how to enter an VCT and the tax treatment applicable;
      </p>
    `,
  },
  {
    key: "investmentInputBalanceLabel",
    label: "Balance",
    helpText: `
      <h3>What to enter</h3>  
      <p>Enter the balance of the account as at today</p>
      <h3>Tips</h3>
      <ul>
        <li>The plan start date is 6th April each year</li>  
        <li>This is updated to the following tax year in October each year</li>
        <li>This means there is only ever at maximum a 6 month differential in account balances</li>
        <li>You will spend 6 months of the year working in arrears, and 6 months working in advance</li>
        <li>The easiest way to approach this is to update your account balances in October and April each year</li>
        <li><a href="https://shackademy.com/path-player?courseid=voyant&unit=68e5b24f932f5484590240fdUnit" target="_blank">Our lesson on how plan years are updated is here</a></li>
      </ul>
      <h3>Additional Notes</h3>
      <ul>
        <li><strong>VCT/EIS</strong> - Enter the balance as at the start of the plan if the investment is an existing investment. For new purchases leave the balance at £0</li>
        <li><strong>Bypass Trusts</strong> - Balance would usually be £0 as this is a Trust set up to receive pension benefits on death. The Loan amount will be the original amount inherited in the Bypass Trust.</li>
        <li><strong>Loan Trusts</strong> - Enter the current balance of the trust itself under Balance and the Balance of the Loan under Loan Balance.</li>
      </ul>
    `,
  },
  {
    key: "InputIsExistingInvestment",
    label: "Is this an existing investment?",
    helpText: `
      <h3>What to enter</h3>
      <p>Select <strong>Yes</strong> if this trust or DGT already exists and has been funded. Select <strong>No</strong> if you are modelling a future or proposed arrangement.</p>
      <h3>Tips</h3>
      <ul>
        <li>For an existing Bypass Trust, the balance would normally be £0 with the original inherited amount entered as the Loan Amount</li>
        <li>For an existing DGT, enter the current investment value as the Balance and the original premium as the Purchase Value</li>
      </ul>
    `,
  },
  {
    key: "investmentBypassTrustLoanAmount",
    label: "Loan Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the original amount that was inherited into the Bypass Trust. Voyant uses this to calculate the IHT position on second death.</p>
      <h3>Tips</h3>
      <ul>
        <li>The Balance of a Bypass Trust is typically £0 - it is this Loan Amount field that records the original inheritance</li>
        <li>Within Voyant, the loan is repaid to the estate on second death and is not subject to IHT</li>
      </ul>
    `,
  },
  {
    key: "investmentInputPurchaseYear",
    label: "Year Purchased",
    helpText: `
      <h3>What to enter</h3>  
      <p>Enter the year the bond was originally purchased. This is needed for tax calculations.</p>
    `,
  },
  {
    key: "investmentInputPurchaseValue",
    label: "Purchase Value",
    helpText: `
      <h3>What to enter</h3>  
      <p>Enter the original purchase value. This is needed for Voyant's tax calculations.</p>
      <h3>Additional notes</h3>
      <ul>
        <li><strong>Investment Bond</strong> - Enter the original investment amount.</li>
        <li><strong>Unwrapped Investments</strong> - This field helps Voyant determine the Capital Gains Tax (CGT) applicable to any gains within the investment. If this box is left blank Voyant will assume that the whole amount is liable to CGT.</li>
        <li><strong>Loan Balance (applicable to Loans Trusts only)</strong> - Input the balance of the loan as at the start date of the plan under 'Loan Balance'.</li>
        <li><strong>Discounted Gift Trust</strong> - Enter the original investment amount</li>
      </ul>
    `,
  },
  {
    key: "investmentInputDeathPayoutType",
    label: "Insurance Payout",
    helpText: `
      <h3>What to enter</h3>  
      <p>Select how the bond value is treated on death. For single-life bonds, the full value is paid out on death and will appear in the Legacy screen. For jointly-owned bonds with 'Last to Die' selected, the payout will not appear in the cash flow - check the Legacy screen to see this.</p>
    `,
  },
  {
    key: "investmentIhtExemptYear",
    label: "Year qualifying for IHT exemption",
    helpText: `
      <h3>What to enter</h3>  
      <p><strong>Existing Investments</strong></p>
      <p>The date in the 'Qualifies for IHT Relief' only applies to existing investments. This field is not relevant to Transfers and New/Regular contributions into a BPR/APR investment.
      <p>'Year Qualifying for IHT Exemption' this is the date that the relief will be given i.e. after the 2 year qualifying period.</p>
      <p><strong>New Investments</strong></p>
      <p>For new, qualifying investments, IHT relief typically occurs 2 years after the transfer or contribution made into the investment.</p>
      <p>The 'Year Qualifying for IHT Exemption' field can be left blank in this instance and Voyant will determine the year in which IHT relief will apply.</p>
      <p>If you are entering multiple transfers into a new investment, these may be best entered as separate investments to allow Voyant to start the IHT exemption clock after each investment.</p>
      <p>Please bear in mind that in Voyant, mortality is assumed to occur at the start of the year, whereas transfers occur at the end of the year.</p>
      <p>This means that for a qualifying investment set up by a transfer in 2024, IHT relief will apply in Voyant from the end of 2026 (2 years) i.e. showing on Voyant at the start of 2027.</p>
    `,
  },
  {
    key: "ihtExemptionApplies",
    label: "Qualifies for IHT Relief (BPR/APR)",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if this investment qualifies for Business Property Relief (BPR) or Agricultural Property Relief (APR), which can reduce or eliminate the IHT liability on this asset.</p>
    `,
  },
  {
    key: "investmentInputCurrentSegments",
    label: "Current Segments",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the number of segments currently in force or, if it is a new purchase, to be purchased.</p>
      <h3>Tips</h3>
      <ul>
        <li>The system will always default to 1 segment. If you are unsure of the number of segments within the Bond we would suggest that you enter 100 segments as a starting point, and follow up with your provider.</li>
      </ul>
    `,
  },
  {
    key: "investmentInputRemainingCostBasis",
    label: "Remaining Principal/Cost Basis",
    helpText: `
      <h3>What to enter</h3>
      <p>This is the total remaining value of all invested principal, i.e. original investment, plus any top-ups, less tax-deferred withdrawals.
      <br>
      This value should reflect the 'cost basis' of the asset as at the plan start date.
      <br>
      You may find this article useful when you are entering an existing Investment Bond: <a href="https://support.planwithvoyant.com/hc/en-us/articles/15359426508443-Enter-an-existing-Investment-Bond-Life-Fund-Segments-Previous-Withdrawals-Top-Ups" target="_blank">Entering an Existing Investment Bond</a></p>
      `,
  },
  {
    key: "investmentInputMostRecentExcessWithdrawalYear",
    label: "Most recent excess withdrawal (year)",
    helpText: `
      <h3>What to enter</h3>
      <p>If you have taken a taxable (excess) withdrawal from this bond at any point, enter the year that withdrawal occurred. This affects how Voyant calculates any top-slicing relief on future gains.</p>
    `,
  },
  {
    key: "otherCapGainsTaxRate",
    label: "Capital Gains Tax Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the Capital Gains Tax rate that applies to gains within this offshore taxable investment. This overrides Voyant's standard CGT calculation for this asset.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use this where the gains are subject to a known fixed rate rather than the UK standard CGT rates - for example, where the investment is held in a foreign jurisdiction with its own tax treatment</li>
      </ul>
    `,
  },
  {
    key: "otherIncomeTaxRate",
    label: "Income Tax Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the Income Tax rate that applies to income distributions from this offshore taxable investment. This overrides Voyant's standard income tax calculation for this asset.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use this where income from the investment is subject to a specific overseas rate rather than UK marginal rates</li>
      </ul>
    `,
  },
  {
    key: "investmentTrustStructure",
    label: "Trust Structure",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the legal structure of the trust. This determines how Voyant treats the assets for IHT and income tax purposes.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Absolute / Bare Trust</strong> - the beneficiary has an immediate and irrevocable right to both the capital and income. The assets are treated as belonging to the beneficiary for tax purposes</li>
        <li><strong>Discretionary Trust</strong> - the trustees have discretion over how income and capital are distributed among the beneficiaries. Subject to relevant property IHT charges</li>
        <li><strong>Interest in Possession</strong> - a named beneficiary (life tenant) has the right to income from the trust but not capital. The capital passes to remainder beneficiaries on the life tenant's death</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>The trust structure affects IHT treatment, including periodic and exit charges - confirm the structure with the trust deed before selecting</li>
      </ul>
    `,
  },
  {
    key: "investmentDiscountAmount",
    label: "Discount Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the discounted amount - the portion of the initial DGT investment that is estimated to fall immediately outside your estate for IHT purposes. This is calculated by the provider at outset based on your age, health, and the income being withdrawn.</p>
      <h3>Tips</h3>
      <ul>
        <li>This figure should be shown on the DGT illustration or confirmation from the product provider</li>
        <li>If the discount amount is not known, the provider can recalculate it</li>
      </ul>
    `,
  },
  {
    key: "investmentIncomeAmount",
    label: "Income Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual income amount being drawn from the Discounted Gift Trust. This is the regular payment the settlor receives from the trust and is a key input for calculating the discount.</p>
      <h3>Tips</h3>
      <ul>
        <li>This amount generally cannot be changed once the trust is established, so it should match the figure set at outset</li>
        <li>Voyant will model this as a regular annual payment to the settlor within the plan's cash flow</li>
      </ul>
    `,
  },
  {
    key: "ihtAlternativeMarketApplies",
    label: "Is this an AIM?",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if this EIS or SEIS investment is also listed on the Alternative Investment Market (AIM).</p>
      <h3>Tips</h3>
      <ul>
        <li>From April 2026, AIM-listed investments are subject to a reduced rate of IHT relief under BPR - check current HMRC guidance for the applicable rate. Voyant uses this toggle to apply the correct relief level</li>
        <li>Non-AIM EIS and SEIS investments are not affected by this change and continue to qualify for full BPR relief (subject to the two-year holding period)</li>
      </ul>
    `,
  },
  {
    key: "propertyInputCapGainsReliefApplies",
    label: "Gains Qualify for Entrepreneur's Relief",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if the gains on this unwrapped investment qualify for Business Asset Disposal Relief (formerly known as Entrepreneur's Relief). This reduces the effective CGT rate on qualifying gains.</p>
      <h3>Tips</h3>
      <ul>
        <li>This relief typically applies to disposals of shares in personal trading companies, business assets, or qualifying partnership interests - not to passive investment portfolios</li>
        <li>Confirm eligibility with your tax adviser before toggling this on</li>
      </ul>
    `,
  },
  {
    key: "investmentLifeFundWithdrawalStrategy",
    label: "Withdrawal Strategy",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how withdrawals should be taken from this investment bond - either by <strong>encashing segments</strong> or by taking a <strong>partial withdrawal</strong> across all segments.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Segment Encashment</strong> - whole segments are surrendered. Each segment has its own 5% per annum tax-deferred allowance and its own gain calculation</li>
        <li><strong>Partial Withdrawal</strong> - withdrawals are taken from across all segments proportionally. This draws down the tax-deferred 5% allowance across the whole policy simultaneously</li>
      </ul>
    `,
  },
  {
    key: "investmentInputOriginalSegments",
    label: "Original Segments",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the total number of segments the bond was originally divided into at outset.</p>
      <h3>Tips</h3>
      <ul>
        <li>Voyant uses this alongside the Current Segments figure to determine how many segments have already been encashed and to calculate the remaining tax-deferred allowance correctly</li>
        <li>If you are unsure, check your bond documentation or contact the provider - the system defaults to 1 if left blank</li>
      </ul>
    `,
  },

  {
    key: "specialContributionType",
    label: "Contribution Type",
    helpText: `
    <h3>What to enter</h3>
    <p>This section is allowing you to tell Voyant that your ISA would qualify to receive the inherited ISA allowance from your spouse if they passed away.</p>
    <p>In the event of death, Voyant will follow the inputs here when allocating funds from your spouse's ISA (if relevant).</p>
    <p>You can choose to either contribute a percentage of the allowance, or a set amount.</p>
    <h3>Tips</h3>
    <ul>
      <li>For example, considering the following inputs:
      <ul>
        <li>If you leave the contribution type as 'Percentage'</li>
        <li>Nominate 100% as the percentage in the next field</li>
        <li>List the number of years as '1'</li>
      </ul>
      <li>In that case, in the event of your spouse's death, their ISA would be encashed and <strong>100%</strong> of the proceeds would be contributed to this ISA over the course of <strong>1 year</strong>, by default.</li>
      <li>If you leave this as £0/0% then by default the ISA proceeds will be paid to cash upon your spouse's death.</li>
    </ul>
  `,
  },
  {
    key: "percentOfSpecialAllowanceContribution",
    label: "Percentage",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the percentage of your spouse's ISA that should be contributed to this ISA by default upon their death</p>
  `,
  },
  {
    key: "fixedSpecialContributionAmount",
    label: "",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter a specific amount of your spouse's ISA that should be contributed to this ISA by default upon their death</p>
  `,
  },
  {
    key: "specialContributionNumYears",
    label: "Number of Years",
    helpText: `
    <h3>What to enter</h3>
    <p>Over how many years will the contributions be made</p>
    <h3>Tips</h3>
    <ul>
      <li>Ensure this is in line with <a href="https://www.gov.uk/individual-savings-accounts/inheriting-an-isa-from-your-spouse-civil-partner" target="_blank">HMRC guidance</a></li>
    </ul>
  `,
  },

  // ── Tab: Growth ──────────────────────────────────────────────

  {
    key: "rateInterestInputRateType",
    label: "Grow this account by",
    helpText: `
      <h3>What to enter</h3>
      <p>Grow the account by either entered values below or by Portfolio/Holdings which you can complete via the Tabs above.</p>
      <h3>Tips</h3>
      <ul>
        <li>Our suggestion is to use <strong>Entered Growth Rate</strong> for all accounts until you're familiar with the impact of changing to Portfolio/Holdings.</li>
      </ul>
    `,
  },
  {
    key: "rateInterestInputRate",
    label: "Growth rate",
    helpText: `
      <h3>What to enter</h3>
      <p>This is the amount the account will be assumed to grow by each year compounded. It is a percentage of the account balance.</p>
    `,
  },
  {
    key: "yearlyPercentGainsTaxed",
    label: "Capital Gains Realized Annually",
    helpText: `
      <h3>What to enter</h3>
      <p>Specify a percentage of the capital gains which will be sold and reinvested within the investment each year. Gains realised within any available capital gains allowance will not be taxed by Voyant.</p>
    `,
  },
  {
    key: "dividendYieldRate",
    label: "Dividends",
    helpText: `
      <h3>What to enter</h3>
      <p>The dividends received as a percentage of the investment balance. I.e. If the investment balance is £100,000 and 2% is entered here then dividends of £2,000 will be paid annually.</p>
    `,
  },
  {
    key: "interestYieldRate",
    label: "Interest",
    helpText: `
      <h3>What to enter</h3>
      <p>Interest received as a percentage of the investment balance. I.e. is the investment balance is £100,000 and the number entered is 3% then £3,000 will be paid out in interest.</p>
    `,
  },
  {
    key: "growthReinvestYield",
    label: "Reinvest Yield?",
    helpText: `
      <h3>What to enter</h3>
      <p>If you would like Voyant to reinvest yields back into the investment then select Yes.
      <br>
      By selecting No the yields will be paid out as an annual income.
      <br>
      You will see these in Dashboard or Year View > Cash Flow tab</p>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Stock Grant
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "stockGrantInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the person this stock grant belongs to.</p>
      <h3>Tips</h3>
      <ul>
        <li>This should usually match the person whose employment created the grant.</li>
        <li>Ownership affects how the grant flows through the plan and how tax is attributed.</li>
      </ul>
    `,
  },

  {
    key: "stockGrantNameInput",
    label: "Grant Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Give the grant a clear name so it is easy to identify later.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use something recognisable, such as the employer name, grant year, or scheme type.</li>
        <li>For example: "ABC Ltd RSU 2026" or "EMI Options 2025".</li>
      </ul>
    `,
  },

  {
    key: "grantTypeInput",
    label: "Grant Type",
    helpText: `
      <h3>Basics tab</h3>
      <p>Select the type of stock grant you are entering. Voyant uses this to model the grant and apply the relevant tax treatment.</p>

      <h3>Options</h3>
      <ul>
        <li><strong>Restricted Stock Unit:</strong> shares that vest over time. There is normally no exercise price.</li>
        <li><strong>Company Share Option:</strong> an option to buy shares at a specified exercise price.</li>
        <li><strong>Enterprise Management Incentive (EMI):</strong> a UK tax-advantaged share option scheme, subject to qualifying conditions.</li>
        <li><strong>Non Tax Advantage Share Option:</strong> a share option without the EMI-style tax advantages.</li>
      </ul>

      <h3>Future Grant tab</h3>
      <p>On the Future Grant tab, this same field may be used to describe how future grants are calculated rather than the legal/tax type of the original grant.</p>

      <h3>Future Grant options</h3>
      <ul>
        <li><strong>Percent of Salary:</strong> future grants are calculated as a percentage of salary.</li>
        <li><strong>Number of Shares Granted:</strong> future grants are modelled as a fixed number of shares.</li>
        <li><strong>Fixed Amount:</strong> future grants are modelled as a fixed monetary amount.</li>
      </ul>

      <h3>Tips</h3>
      <ul>
        <li>If you are unsure how Voyant links future grants to employment or salary, test this in Year View before relying on the output.</li>
      </ul>
    `,
  },

  {
    key: "currentValueInput",
    label: "Current Price",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the current share price for the company stock.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is the starting value Voyant uses when projecting future share growth.</li>
        <li>If the share price is volatile, consider using a cautious or recent average rather than a peak value.</li>
      </ul>
    `,
  },

  {
    key: "stockGrantEmploymentId",
    label: "Linked Employment",
    helpText: `
      <h3>What to enter</h3>
      <p>Link the stock grant to the relevant employment entry.</p>
      <h3>Tips</h3>
      <ul>
        <li>This will usually be the job or employer that awarded the grant.</li>
        <li>Linking the grant to employment will help Voyant align the grant with salary and employment timing.</li>
      </ul>
    `,
  },

  {
    key: "strikePriceInput",
    label: "Exercise Price",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the price at which the shares can be purchased under the option.</p>
      <h3>When this applies</h3>
      <ul>
        <li>This is relevant for option-based grants.</li>
        <li>It does not usually apply to Restricted Stock Units, as RSUs normally vest rather than being exercised at a strike price.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>The exercise price is important because it affects the cost of acquiring the shares.</li>
      </ul>
    `,
  },

  {
    key: "expiryPeriodInput",
    label: "Expiry Period",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the period for which the option remains available before it expires.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is mainly relevant for share options rather than RSUs.</li>
        <li>Check the scheme rules or grant paperwork for the expiry period.</li>
      </ul>
    `,
  },

  {
    key: "allowEarlyExerciseInput",
    label: "Allow Early Exercise",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether the grant allows shares to be exercised before they would otherwise fully vest.</p>
      <h3>Tips</h3>
      <ul>
        <li>Only use this if the scheme rules allow early exercise.</li>
        <li>This is generally more relevant for options than RSUs.</li>
      </ul>
    `,
  },

  {
    key: "capGainsReliefApplies",
    label: "Gains Qualify for Business Asset Disposal Relief",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on only if the gains are expected to qualify for Business Asset Disposal Relief.</p>
      <h3>When this may apply</h3>
      <ul>
        <li>This may be relevant for Enterprise Management Incentive options.</li>
        <li>It may also be relevant for some non-tax-advantaged share options, depending on the circumstances.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Business Asset Disposal Relief depends on specific qualifying conditions.</li>
        <li>Do not assume it applies just because the grant is an EMI or company option.</li>
        <li>Confirm the tax position before relying on it.</li>
      </ul>
    `,
  },

  {
    key: "numberOfShares",
    label: "Number of Shares Remaining",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the number of shares that have not yet vested.</p>
      <h3>Tips</h3>
      <ul>
        <li>This should reflect the remaining unvested portion of the grant.</li>
        <li>If some shares have already vested, enter those separately in the Vested / Exercised Shares section.</li>
        <li>Check the total against the original grant paperwork so you do not double count shares.</li>
      </ul>
    `,
  },

  {
    key: "vestPeriod",
    label: "Remaining Vesting Period",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the remaining period over which the shares will vest.</p>
      <h3>Tips</h3>
      <ul>
        <li>This should reflect the vesting schedule from today onwards, not necessarily the original vesting period from the grant date.</li>
        <li>For example, if a four-year grant is already two years through vesting, the remaining vesting period may be two years.</li>
        <li>Check the timing in Year View to make sure the vesting appears when expected.</li>
      </ul>
    `,
  },

  // ── Tab: Growth ──────────────────────────────────────────────

  {
    key: "growthRateType",
    label: "Grow this account by",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how Voyant should project the future value of the shares.</p>
      <h3>Tips</h3>
      <ul>
        <li>This should broadly align with how you use growth assumptions elsewhere in the plan.</li>
        <li>If using an entered growth rate, complete the Stock Growth Rate field.</li>
        <li>Our suggestion is to use an entered growth rate as a starting point.</li>
        <li>For employer shares, be careful about using overly optimistic assumptions.</li>
      </ul>
    `,
  },

  {
    key: "rateCapitalInputGrowthRate",
    label: "Stock Growth Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the assumed annual growth rate for the underlying company shares.</p>
      <h3>Tips</h3>
      <ul>
        <li>This assumption affects the projected value of vested, exercised, and future shares.</li>
        <li>A cautious assumption may be more useful for planning than a best-case estimate.</li>
        <li>You can test more optimistic or pessimistic assumptions using What If scenarios.</li>
      </ul>
    `,
  },

  // ── Tab: Exercise ──────────────────────────────────────────────

  {
    key: "exerciseTimingInput",
    label: "Exercise Shares",
    helpText: `
      <h3>What to enter</h3>
      <p>Select when options should be exercised.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>At Vested:</strong> options are exercised when they vest.</li>
        <li><strong>At Event:</strong> options are exercised at a selected timeline event.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>This is generally not relevant for RSUs.</li>
        <li>If you select At Event, make sure the Exercise Event is set correctly.</li>
        <li>Check the cash flow impact, as exercising options may require cash or another funding method.</li>
      </ul>
    `,
  },

  {
    key: "exerciseEvent",
    label: "Exercise Event",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the timeline event that will trigger the exercise of the shares.</p>
      <h3>Tips</h3>
      <ul>
        <li>This field is relevant where Exercise Shares is set to At Event.</li>
        <li>Using an event allows the exercise timing to move dynamically if the event changes.</li>
        <li>Check the event timing carefully, especially if options have an expiry period.</li>
      </ul>
    `,
  },

  {
    key: "fundingMethodInput",
    label: "Funding Method",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how the cost of exercising the options will be funded.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Take out a loan:</strong> the exercise cost is funded by borrowing.</li>
        <li><strong>Purchase:</strong> the exercise cost is paid from available funds.</li>
        <li><strong>Sell % of shares to fund purchase:</strong> enough shares are sold to help cover the exercise cost.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>The funding method can change the cash flow impact of exercising options.</li>
        <li>Where the funding choice creates tax or debt consequences, validate the result before relying on it.</li>
      </ul>
    `,
  },

  // ── Tab: Vested / Exercised Shares ──────────────────────────────────────────────

  {
    key: "numberOfSharesInput0",
    label: "Number of Shares Vested",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the number of shares that have already vested.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use this section for shares that are already vested or exercised at the start of the plan.</li>
        <li>Do not include the same shares again in the future vesting schedule.</li>
        <li>If there are multiple tranches, ensure these are added separately.</li>
      </ul>
    `,
  },

  {
    key: "vestedInput0",
    label: "Vested?",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether this tranche of shares has vested.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use Yes for shares where the vesting conditions have already been met.</li>
        <li>Use No if the shares are listed here but have not yet vested.</li>
        <li>Make sure this is consistent with the fair market value you enter for vesting.</li>
      </ul>
    `,
  },

  {
    key: "marketValueInput0",
    label: "Fair Market Value",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the fair market value of the shares at vesting.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is relevant for the vested shares shown in this row.</li>
        <li>Use the value from the vesting date if known.</li>
        <li>If the shares vested and were exercised at the same time, this may be the same as the exercise fair market value.</li>
      </ul>
    `,
  },

  {
    key: "exercisedInput0",
    label: "Exercised?",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether this tranche of vested shares has already been exercised.</p>
    `,
  },

  {
    key: "exercisedValueInput0",
    label: "Fair Market Value",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the fair market value of the shares at exercise.</p>
      <h3>Tips</h3>
      <ul>
        <li>This may be the same as the vesting fair market value if vesting and exercise happened at the same time.</li>
        <li>If exercise happened later, you may need to use the value at the exercise date.</li>
        <li>This value is important because it may affect the gain calculated on exercise.</li>
      </ul>
    `,
  },

  // ── Tab: Liquidation ──────────────────────────────────────────────

  {
    key: "liquidationTypeInput",
    label: "Liquidation Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how Voyant should sell or retain the shares once they are available.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>All available:</strong> sells all available shares according to the selected timing.</li>
        <li><strong>Fixed amount (recurring):</strong> sells enough shares to generate a specified recurring cash amount.</li>
        <li><strong>Number of shares remaining (recurring):</strong> sells a specified number of shares on a recurring basis.</li>
        <li><strong>None:</strong> no planned liquidation is entered.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Use this to model whether shares are retained or sold over time.</li>
        <li>If shares are retained, the plan may become more exposed to the employer share price.</li>
        <li>Check Year View to confirm sales are appearing as expected.</li>
      </ul>
    `,
  },

  {
    key: "liquidationDollarsAmount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the recurring cash amount to be generated from selling shares.</p>
      <h3>When this applies</h3>
      <ul>
        <li>This applies when Liquidation Type is set to Fixed Amount (Recurring).</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Voyant will need to sell enough shares to produce this amount, subject to the shares available.</li>
        <li>Check the projected sales to make sure the account is not being depleted sooner than intended.</li>
      </ul>
    `,
  },

  {
    key: "liquidationAmountInput",
    label: "Shares",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the number of shares to sell on a recurring basis.</p>
      <h3>When this applies</h3>
      <ul>
        <li>This applies when Liquidation Type is set to sell a recurring number of shares.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>The cash generated will depend on the projected share price at each sale point.</li>
        <li>Check the remaining share balance over time so the sales pattern matches your intention.</li>
      </ul>
    `,
  },

  // ── Tab: Future Grant ──────────────────────────────────────────────

  {
    key: "hasSubsequentGrants",
    label: "Subsequent Grant Applies",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if further stock grants are expected in future years.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use this for ongoing awards rather than the existing grant already entered above.</li>
        <li>Future grants may be modelled as a percentage of salary, a number of shares, or a fixed amount depending on the option selected.</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Property
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "propertyInputAssetType",
    label: "Asset Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the category that best describes this property.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Main Residence</strong> - your primary home</li>
        <li><strong>Buy to Let</strong> - a residential property held as an investment. Voyant treats rental income as taxable and gains on disposal are subject to CGT at the residential property rate</li>
        <li><strong>Second Home / Holiday Home</strong> - a secondary property that is not your main residence. Voyant treats this as subject to CGT on disposal</li>
        <li><strong>Commercial Property</strong> - a non-residential property. Voyant treats this as subject to CGT at the standard (non-residential) rate on disposal</li>
        <li><strong>Land</strong> - undeveloped or agricultural land. Voyant treats this as subject to CGT on disposal; APR may apply if farmed</li>
      </ul>
    `,
  },
  {
    key: "propertyInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner or owners of this property. Ownership affects how rental income is taxed in Voyant and how any CGT liability is calculated on disposal.</p>
      <h3>Tips</h3>
      <ul>
        <li>If the property is jointly owned, select all relevant owners - Voyant will split income and gains proportionally</li>
        <li>Ownership defaults to the principal person - check this is correct before saving</li>
      </ul>
    `,
  },
  {
    key: "propertyInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear, recognisable name for this property.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use the address or a short description - e.g. "Main Residence - Manchester" or "BTL Flat - Leeds"</li>
        <li>Avoid including sensitive information like mortgage account numbers</li>
      </ul>
    `,
  },
  {
    key: "propertyInputOwnershipType",
    label: "Ownership Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how this property is legally owned between the named owners.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Joint Tenants</strong> - both owners hold the property equally and it passes automatically to the surviving owner on death, regardless of the will</li>
        <li><strong>Tenants in Common</strong> - each owner holds a defined share which can be left to beneficiaries via their will. Shares do not have to be equal</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Confirm the ownership structure with the title deeds or Land Registry if unsure</li>
      </ul>
    `,
  },
  {
    key: "propertyInputMarketValue",
    label: "Market Value",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the current estimated market value of the property as at today's date. Voyant uses this as the starting value from which future growth is calculated.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use a recent valuation, mortgage statement, or estate agent estimate if an exact figure isn't available</li>
        <li>For a property not yet purchased, enter the expected purchase price and toggle "Is this a Future Purchase?" to Yes</li>
      </ul>
    `,
  },
  {
    key: "propertyInputPurchaseValue",
    label: "Purchase Value",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the price originally paid for this property. Voyant uses this to calculate the capital gain on disposal for CGT purposes.</p>
      <h3>Tips</h3>
      <ul>
        <li>If you've made capital improvements (e.g. extensions, renovations), you may be able to add these costs to the base cost - check with a tax adviser</li>
        <li>For a property received as a gift or inheritance, the base cost is typically the market value at the date of acquisition - confirm with a tax adviser</li>
      </ul>
    `,
  },
  {
    key: "propertyInputNewPurchase",
    label: "Is this a Future Purchase?",
    helpText: `
      <h3>What to enter</h3>
      <p>Select <strong>Yes</strong> if this property has not yet been purchased and you are modelling a future acquisition.</p>
      <h3>Tips</h3>
      <ul>
        <li>When set to Yes, Voyant will treat the property as not yet owned and will model the purchase cost as an outgoing at the date specified in the Timing tab</li>
      </ul>
    `,
  },
  {
    key: "propertyInflationLabel",
    label: "Inflation Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>When entering a future purchase, enter the annual rate at which you expect this property's purchase price to grow. Voyant compounds this rate each year to project the property's future purchase price.</p>
      <h3>Tips</h3>
      <ul>
        <li>The inflation rate affects the property value before purchase i.e. the growth in the purchase price. The growth rate (below) affects the property value post purchase.</li>
        <li>Use a rate that reflects realistic long-term expectations for this type of property and location - past house price growth is not guaranteed to continue</li>
        <li>You can model different rates for different properties - for example, a different rate for a rural holiday home versus a city-centre flat</li>
      </ul>
    `,
  },
  {
    key: "propertyGrowthLabel",
    label: "Growth Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual rate at which you expect this property's value to grow. Voyant compounds this rate each year to project the property's future value.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use a rate that reflects realistic long-term expectations for this type of property and location - past house price growth is not guaranteed to continue</li>
        <li>You can model different rates for different properties - for example, a different rate for a rural holiday home versus a city-centre flat</li>
      </ul>
    `,
  },
  {
    key: "propertyPresentFutureValue",
    label: "Market Value entered as",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how the property purchase should be reflected.</p>
      <h3>Tips</h3>
      <ul>
        <li>If this is an <strong>existing property</strong>, you can <strong>ignore this field</strong> - just leave it as 'present value'</li>  
        <li>For a <strong>future purchase</strong>, this determines whether the purchase price is treated as a present value or future value.</li>
        <li>Use Present Value where the purchase price is expressed in today's money and should be adjusted over time.</li>
        <li>Use Future Value where the purchase price is already the value expected at the relevant future date.</li>
      </ul>
    `,
  },
  {
    key: "mainResidenceIhtExemptionApplies",
    label: "Qualifies for Main Residence IHT Exemption",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if this property qualifies for the Residence Nil-Rate Band (RNRB) - the additional IHT allowance available when a main residence is passed to direct descendants.</p>
      <h3>Based on current rules</h3>
      <ul>
        <li>To qualify, the property must have been the deceased's main home at some point and must be inherited by direct descendants (children, grandchildren, stepchildren etc.)</li>
        <li>The RNRB is tapered for large estates - Voyant will apply the taper automatically based on the total estate value</li>
        <li>Only toggle this on for the main residence - it cannot apply to buy-to-let or investment properties</li>
      </ul>
    `,
  },

  // ============================================================
  // CATEGORY: Pensions
  // ============================================================

  // ------------------------------------------------------------
  // SUB-CATEGORY: Money Purchase
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "ukMoneyPurchaseInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner of the pension by expanding the menu and selecting / deselecting individuals by clicking on their names. You will see your selection in the owner window.</p>
    `,
  },
  {
    key: "ukMoneyPurchaseInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a distinguishable name for the account</p>
      <h3>Tips</h3>
      <ul>
        <li>It may make it easier later to include the owner's name in the name</li>
        <li>e.g. "Jane ABC pension"</li>
        <li>Ensure you don't include any identifiable information like account numbers</li>
      </ul>
    `,
  },
  {
    key: "ukMoneyPurchaseInputType",
    label: "Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the type of Money Purchase pension.</p>
      <h3>Tips</h3>
      <ul>
        <li>The type is used largely for informational purposes only.</li>
        <li>The type of money purchase does not appear in reports or on the Let's See charts or general overviews.</li>
        <li>There is a difference, however, between personal pensions (PPP/GPP/SIPP) and occupational schemes (COMP/CIMP schemes, grouped together under the moniker 'Occupational Pension', and Small Self-Administered Schemes), in terms of how tax relief is granted.</li>
        <li>See <a href="https://support.planwithvoyant.com/hc/en-us/articles/360054226432-Contributions-Tax-relief-on-contributions-to-Money-Purchase-Pensions-UK" target="_blank">this article on tax relief on contributions to money purchase pensions</a> for further information.</li>
        <li>James explains the difference between 'net pay' and 'relief at source' pensions in <a href="https://shackademy.com/path-player?courseid=module-2&unit=6822ca51fae53e450e01914dUnit" target="_blank">this lesson.</a></li>
      </ul>
    `,
  },
  {
    key: "ukMoneyPurchaseInputBalanceLabel",
    label: "Balance",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the balance of the pension as at today's date.</p>
      <h3>Tips</h3>
      <ul>
        <li>The plan start date is 6th April each year</li>  
        <li>This is updated to the following tax year in October each year</li>
        <li>This means there is only ever at maximum a 6 month differential in account balances</li>
        <li>You will spend 6 months of the year working in arrears, and 6 months working in advance</li>
        <li>The easiest way to approach this is to update your account balances in October and April each year</li>
        <li><a href="https://shackademy.com/path-player?courseid=voyant&unit=68e5b24f932f5484590240fdUnit" target="_blank">Our lesson on how plan years are updated is here</a></li>
      </ul>
    `,
  },
  {
    key: "ieMoneyPurchaseEmployerContribution",
    label: "Employer Contribution",
    helpText: `
      <h3>What to enter</h3>
      <p>Whenever employer contributions are being made these should always be entered as a gross amount and they will be identified by Voyant as an 'unscheduled' contribution.</p>
    `,
  },
  {
    key: "employerContributionType",
    label: "Employer Contribution Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Our suggestion is to use 'Fixed' and enter the gross amount rather than 'Matching'</p>
    `,
  },
  {
    key: "matchingPercentContribution",
    label: "Matching Contribution",
    helpText: `
      <h3>What to enter</h3>
      <p>Specify the percentage of your contribution that your employer is willing to match. For example, enter 100% to indicate that one hundred per cent of your contributions are matched by your company.</p>
    `,
  },
  {
    key: "matchingPercentIncome",
    label: "Matching Income",
    helpText: `
      <h3>What to enter</h3>
      <p>As a percentage of income, what is the maximum amount the employer is willing to match. For example, enter 10% to indicate that your employer would match up to a maximum of 10% your salary.</p>
    `,
  },
  {
    key: "fixedContributionType",
    label: "Contribution Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how you wish to calculate regular contributions, either as a fixed amount (with or without inflation) or as a percentage of income.</p>
    `,
  },
  {
    key: "ukMoneyPurchaseInputEmployerRebatePercent",
    label: "Employer NI rebate (% of NI reduction)",
    helpText: `
      <h3>What to enter</h3>
      <p>Specify the percentage of the employer's NI savings that will be rebated to you. Any rebated NI savings will be paid by the employer into the pension.</p>
    `,
  },
  {
    key: "ukMoneyPurchaseInputEmployerNicRateCode",
    label: "Employee Code",
    helpText: `
      <h3>What to enter</h3>
      <p>Select your NI rate code. This code will be used to calculate the employer's NI savings that may then be rebated to you as an additional pension contribution, based on the percentage entered above.</p>
    `,
  },
  {
    key: "useBaseSalaryOnly",
    label: "Use Base Salary Only",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if you want Voyant to only reference your base salary when calculating contributions as a percentage of income.</p>
    `,
  },
  {
    key: "limitContributionsToAllowance",
    label: "Limit Contributions to Allowance",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if you want Voyant to automatically cap total pension contributions at the Annual Allowance for each tax year.</p>
      <h3>Tips</h3>
      <ul>
        <li>The standard Annual Allowance may be reduced to the Money Purchase Annual Allowance (MPAA) if you have flexibly accessed a pension</li>
        <li>If you are deliberately modelling a scenario where contributions exceed the allowance (e.g. to show a tax charge), toggle this off</li>
      </ul>
    `,
  },
  {
    key: "employmentId",
    label: "Linked Employment",
    helpText: `
      <h3>What to enter</h3>
      <p>Link this pension to the relevant employment entry. Voyant uses this to ensure employer contributions are tied to the correct employment income and that contributions stop when that employment ends.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is especially important where there are multiple employments - make sure each pension is linked to the right one</li>
      </ul>
    `,
  },
  {
    key: "fixedContributionAmount",
    label: "Fixed Contribution",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the gross fixed employer contribution amount per year. This is added directly to the pension and Voyant treats it as an employer contribution for tax purposes.</p>
      <h3>Tips</h3>
      <ul>
        <li>Always enter as a gross annual amount</li>
        <li>If the employer contribution is a percentage of salary rather than a fixed amount, use the 'Percent of Income' contribution type instead</li>
      </ul>
    `,
  },
  {
    key: "fixedContributionPercent",
    label: "Fixed Contribution",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the gross percentage employer contribution made to the pension.</p>
      <h3>Tips</h3>
      <ul>
        <li>If this should only take account of your base salary, ensure that is toggled on above</li>
      </ul>
    `,
  },
  {
    key: "ukMoneyPurchaseSSApply",
    label: "Does Salary Sacrifice apply?",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if your pension contributions are made via a salary sacrifice arrangement rather than net pay or relief at source.</p>
      <h3>Tips</h3>
      <ul>
        <li>Voyant will adjust the income and tax calculations accordingly when this is toggled on</li>
        <li>Salary sacrifice is not available for all pension types - check with your employer or scheme provider if unsure</li>
      </ul>
    `,
  },

  // ── Tab: Crystallisations ──────────────────────────────────────────────

  {
    key: "crystallisationApplies",
    label: "Apply Crystallisation Instructions",
    helpText: `
      <h3>What to enter</h3>
      <p>Crystallising a pension means moving it (or part of it) from uncrystallised to drawdown, which triggers access to your tax-free cash. This section is used primarily to model a one-off withdrawal or to take tax-free cash - refer to the lesson for a step-by-step walkthrough.</p>
    `,
  },

  // ── Tab: Planned Withdrawals ──────────────────────────────────────────────

  {
    key: "drawdownUspWithdrawStrategy",
    label: "Pension Strategy",
    helpText: `
      <h3>What to enter</h3>
      <p>Two options are available to set how incomes will be taken from money purchases. These are UFPLS and Flexi (Flexible Access Drawdown) and they determine whether an element of taxable income will be included in each withdrawal or if withdrawals are to be taken entirely from the pension owner’s tax-free cash allowance if available.
      <br><br>
      <strong>Flexible Access Drawdown</strong> = Allows scheduled withdrawals from money purchase pensions to be taken from the owner's tax-free cash allowance first. The total withdrawal amount specified will be tax free assuming enough tax free cash remains in the pension. With each amount withdrawn tax free, an additional 75% is crystallised and moved into a linked drawdown account, which Voyant creates automatically.
      <br><br>
      <strong>Please Note</strong> - The Flexible Access Drawdown option can only work if the amount you are withdrawing is less than the pension’s overall tax-free cash allowance, which is normally 25% of the pension’s balance.
      <br>
      For example, if you were to schedule a withdrawal of <strong>50% of a pension’s total balance</strong>, Voyant will withdraw this amount. It will not limit withdrawals to only the tax-free allowance.
      <br>
      You will receive a combination of taxable and tax-free cash, and in this example you would receive the full amount of tax free cash available (25%) with another 25% paid as a taxable amount.
      <br><br>
      <strong>UFPLS</strong> = Withdrawals the amount as 25% tax free and 75% potentially taxable. This is also Voyant’s default for 'as needed' withdrawals taken from money purchase pensions.
      <br><br>
      <strong>Please Note:</strong> The above examples do not account for any protected tax free cash you may have, in these instances the amount of tax free cash may be higher than the figures stated above.</p>      
      <br><br>
      <strong>Note:</strong> The Pension Strategy window will not appear if only drawdown accounts are selected as there is no tax free element to them so all of the withdrawal is potentially taxable.</p>
    `,
  },

  // ── Tab: Beneficiaries ──────────────────────────────────────────────

  {
    key: "pensionSurvivorshipOptions",
    label: "Survivorship Option",
    helpText: `
      <h3>What to enter</h3>
      <p>Choose between 'Lump Sum' and 'Move to Beneficiary Drawdown Pension'
      <br>
      <strong>Lump Sum</strong> - the remaining pension fund is paid as a cash lump sum to the nominated beneficiary on death.
      <br>
      <strong>Move to Beneficiary Drawdown Pension</strong> - the fund is moved into a drawdown pension in the beneficiary's name, where it can be drawn down over time.</p>
      <h3>Tips</h3>
      <ul>
        <li>James covers the difference between the two in <a href="https://shackademy.com/path-player?courseid=module-2&unit=6823c15306c62685ba04c70dUnit" target="_blank">this lesson.</a></li>
      </ul>
    `,
  },

  // ── Tab: Annuitization ──────────────────────────────────────────────

  {
    key: "annuitizationApplies",
    label: "Annuitization Applies",
    helpText: `
      <h3>What to enter</h3>
      <p>Are you intending to use any of this pension's funds to purchase an annuity? If so, toggle 'yes'</p>
    `,
  },
  {
    key: "ukAnnuityAnnuitizationTimingType",
    label: "Purchase At",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether the annuity purchase is triggered by a specific <strong>age</strong> or by a <strong>timeline event</strong>.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Age</strong> - the annuity is purchased when the owner reaches the age you enter in the Age field below</li>
        <li><strong>Event</strong> - the annuity purchase is linked to a specific event on the timeline, which you can then move around to model different scenarios</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Using an Event gives you more flexibility to test different annuity purchase timings without changing the age field each time</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityAnnuitizationAge",
    label: "Age",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the age at which you will convert pension funds into an annuity</p>
    `,
  },
  {
    key: "ukAnnuityAnnuitizationEvent",
    label: "Purchase Event",
    helpText: `
      <h3>What to enter</h3>
      <p>Link the purchase of an annuity to a timeline event which you can then move around</p>
    `,
  },
  {
    key: "annuityPercentAnnuitized",
    label: "Percent Annuitized",
    helpText: `
      <h3>What to enter</h3>
      <p>What percentage of the pension will be converted into an annuity?</p>
    `,
  },
  {
    key: "annuityAnnuitizationYearsCertain",
    label: "Years Certain",
    helpText: `
      <h3>What to enter</h3>
      <p>Is the annuity guaranteed to pay out for X years, even on death? If so, input the number of years. If not, leave as 0</p>
    `,
  },
  {
    key: "annuityLumpSumPercent",
    label: "Lump Sum",
    helpText: `
      <h3>What to enter</h3>
      <p>When converting the pension to an annuity, what percentage is to be paid out as TFC before the annuity starts</p>
      <h3>Tips</h3>
      <ul>
        <li>This is typically 25% but you should confirm with your adviser or pension provider</li>
      </ul>
    `,
  },
  {
    key: "annuityAnnuitizationEscalation",
    label: "Escalation",
    helpText: `
      <h3>What to enter</h3>
      <p>Choose how the annuity will escalate over time. If this will be a level annuity, select 'None'</p>
    `,
  },
  {
    key: "annuityAnnuitizationPayoutJoint",
    label: "Payout",
    helpText: `
      <h3>What to enter</h3>
      <p>Will this be a single or joint life annuity?</p>
    `,
  },
  {
    key: "annuityBeneficiaryLabel",
    label: "Beneficiary",
    helpText: `
      <h3>What to enter</h3>
      <p>Who will receive the benefits in the event of the death of the current pension owner?</p>
    `,
  },
  {
    key: "annuityAnnuitizationSurvivorshipPercent",
    label: "Survivorship",
    helpText: `
      <h3>What to enter</h3>
      <p>What percentage of the annuity will the beneficiary receive upon the death of the current pension owner?</p>
    `,
  },
  {
    key: "annuityAnnuitizationCalcMethod",
    label: "Annuity Rate Calculation",
    helpText: `
      <h3>What to enter</h3>
      <p>Set an Assumed Interest Rate or Specified Annuity Rate
      <br>
      <strong>Assumed Interest Rate</strong>
      <br>
      Voyant's default option allows the software to 'derive' an annuity rate by using an Assumed Interest Rate.
      <br>
      The Assumed Interest Rate on an annuity is the underlying interest rate assumption on which the annuity calculation is based (or would be based, by an actuary). It would ordinarily reflect an assumed yield on mid-dated UK Sovereign debt (Gilt Yield).
      <br>
      <a href="https://support.planwithvoyant.com/hc/en-us/articles/20098166624923-Annuity-Rates-Options-for-calculating-future-annuity-payments-UK" target="_blank">Explained further here</a>
      <br><br>
      <strong>Specified Annuity Rate</strong>
      <br>
      Where you have a reasonable idea of the applicable market (annuity) rate, taking account of the expected age and circumstances, etc, you can change the Annuity Rate Calculation option to Specified Annuity Rate.
      <br>
      If chosen, the % entered is the straightforward 'Conversion Rate', i.e. the rate at which a lump sum converts into an annuity
      <br>
      e.g. a fund of £100,000 (after tax free cash) with a specified annuity rate of 5% will produce an annuity income of £5,000.</p>
    `,
  },
  {
    key: "annuityAssumedInterestRate",
    label: "Assumed Interest Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Voyant's default option allows the software to 'derive' an annuity rate by using an Assumed Interest Rate.
      <br>
      The Assumed Interest Rate on an annuity is the underlying interest rate assumption on which the annuity calculation is based (or would be based, by an actuary). It would ordinarily reflect an assumed yield on mid-dated UK Sovereign debt (Gilt Yield).
      <br>
      It may be preferable to use Specified Annuity Rate if you wish to have more control over the level of income being received.</p>
    `,
  },
  {
    key: "annuityAnnuitizationRate",
    label: "Specified Annuity Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Where you have a reasonable idea of the applicable market (annuity) rate, taking account of the expected age and circumstances, etc, you can change the Annuity Rate Calculation option to Specified Annuity Rate.
      <br>
      If chosen, the % entered is the straightforward 'Conversion Rate', i.e. the rate at which a lump sum converts into an annuity
      <br>
      e.g. a fund of £100,000 (after tax free cash) with a specified annuity rate of 5% will produce an annuity income of £5,000.</p>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Final Salary / CARE Pension
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "ukFinalSalaryInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner of this pension. Ownership defaults to the principal person - make sure you check this is correct before saving.</p>
    `,
  },
  {
    key: "ukFinalSalaryInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear, recognisable name for this pension.</p>
      <h3>Tips</h3>
      <ul>
        <li>Including the owner's name and provider can help you identify it easily later</li>
        <li>e.g. "Jane - NHS Pension"</li>
        <li>Avoid including account numbers or other sensitive identifiers</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputStatus",
    label: "Status",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the status that best describes where this pension currently stands.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Active</strong> - you are currently accruing benefits in the scheme. You should link this to an employment so Voyant can calculate how benefits build up over time.</li>
        <li><strong>Deferred</strong> - you have left the scheme but have not yet started taking benefits. The pension is preserved and will be revalued until it comes into payment.</li>
        <li><strong>In Payment</strong> - you are already receiving pension income from this scheme. Enter the current annual amount in the Amount field.</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputEmploymentId",
    label: "Linked Employment",
    helpText: `
      <h3>What to enter</h3>
      <p>If this pension is <strong>Active</strong>, link it to the relevant employment entry. Voyant will use the salary from that employment - along with your accrual rate, salary scheme type, and years of service - to calculate your projected benefits at retirement.</p>
      <h3>Tips</h3>
      <ul>
        <li>The employment's Timing tab controls when you are treated as an active member of the scheme</li>
        <li>Any years the scheme is active within the plan are automatically added to your Years of Service to Date</li>
        <li>If no employment is linked, you can instead enter a Pensionable Salary manually below</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputUseBaseSalaryOnly",
    label: "Use Base Salary Only",
    helpText: `
      <h3>What to enter</h3>
      <p>Select <strong>Yes</strong> if only your basic salary (excluding any bonus) should be used when calculating your pension benefits.</p>
      <p>Select <strong>No</strong> if bonuses paid through the linked employment should also be included in the pensionable earnings calculation.</p>
      <h3>Tips</h3>
      <ul>
        <li>Final salary schemes are typically based on basic salary only but scheme rules can vary - check your scheme rules if you're unsure</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputPensionableSalary",
    label: "Pensionable Salary",
    helpText: `
      <h3>What to enter</h3>
      <p>This field is only relevant if you have <strong>not</strong> linked an employment above. Enter your current pensionable salary here as a future value - it will not be inflated by Voyant.</p>
      <h3>Tips</h3>
      <ul>
        <li>If a linked employment is selected, it will override anything entered here</li>
        <li>Where no employment is linked, Voyant will treat all years up to the benefit start date as active</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputEscalationTypeInDeferment",
    label: "Escalation Type in Deferment",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how your deferred pension benefits will increase between now and when they come into payment.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>None</strong> - benefits are frozen with no revaluation</li>
        <li><strong>RPI</strong> - benefits increase in line with the Retail Prices Index, using the rate set in your Plan Settings</li>
        <li><strong>LPI</strong> - benefits increase in line with Limited Price Indexation (typically capped at 5% or 2.5%)</li>
        <li><strong>CPI</strong> - benefits increase in line with the Consumer Prices Index, using the rate set in your Plan Settings</li>
        <li><strong>Other</strong> - enter a custom rate</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Check your scheme booklet or annual benefit statement for the revaluation basis that applies to your scheme</li>
        <li>Your RPI/CPI assumption can be found in Dashboard > Plan Settings > Inflation/Growth</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputEscalationType",
    label: "Escalation Type in Payment",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how your pension income will increase once it is in payment.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>None</strong> - the pension is level with no increases</li>
        <li><strong>RPI</strong> - increases in line with the Retail Prices Index, using the rate set in your Plan Settings</li>
        <li><strong>LPI</strong> - increases in line with Limited Price Indexation</li>
        <li><strong>CPI</strong> - increases in line with the Consumer Prices Index, using the rate set in your Plan Settings</li>
        <li><strong>Other</strong> - enter a custom escalation rate</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Your scheme rules will specify the escalation basis - check your annual benefit statement or member booklet</li>
        <li>Your RPI/CPI assumption can be found in Dashboard > Plan Settings > Inflation/Growth</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputSurvivorPercent",
    label: "Survivor Percent",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the percentage of your pension that would continue to be paid to a surviving spouse or partner if you were to die first.</p>
      <h3>Tips</h3>
      <ul>
        <li>A common figure is 50%, though some public sector schemes (e.g. NHS, Teachers') may pay a higher percentage - check your scheme rules</li>
        <li>In the plan, if you are the first to pass away, Voyant will show the survivor's pension being paid to your spouse at this percentage</li>
        <li>If there is no survivor's pension, enter 0%</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputAccrualRateType",
    label: "Accrual Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the accrual rate that applies to your scheme. This is the fraction of your salary you earn as pension for each year of service.</p>
      <h3>Tips</h3>
      <ul>
        <li>For example, a 1/60th accrual rate means you earn 1/60th of your final salary as pension for every year worked</li>
        <li>Common rates include 1/60th, 1/80th, and 1/49th (CARE)</li>
        <li>If your rate is not listed, select 'Other' and enter it manually</li>
        <li>You'll find your accrual rate in your scheme booklet or annual benefit statement</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputSalaryScheme",
    label: "Salary Scheme",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how your pension benefits will be calculated at retirement. This determines which salary figure Voyant uses in its benefit calculation.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Last Year</strong> - uses your salary in the final year of employment</li>
        <li><strong>Last 5 Years Average</strong> - uses the average of your last five years' salary</li>
        <li><strong>Highest 3 Years Average</strong> - uses the average of your three highest-earning years</li>
        <li><strong>CARE</strong> - Career Average Revalued Earnings. Each year's earnings are revalued (usually by CPI or a fixed rate) and averaged across your whole career</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Modern public sector schemes (NHS 2015, Teachers' 2015, LGPS) are typically CARE schemes, but you should confirm</li>
        <li>Older "final salary" sections of these schemes typically use Last Year or an average</li>
        <li>Check your annual benefit statement or scheme booklet if you are unsure</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputYearsOfService",
    label: "Years of Service to Date",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the total number of years you have been a member of this scheme <strong>before</strong> the plan start date.</p>
      <h3>Tips</h3>
      <ul>
        <li>Voyant will automatically add any future years of active membership within the plan on top of this figure</li>
        <li>You can usually find your total service to date on your annual benefit statement</li>
        <li>If you have transferred in service from a previous scheme, include that transferred service here if it counts towards your benefit</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputAccruedPensionToDate",
    label: "Accrued Pension to Date",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the value of pension benefits you have already accrued in this scheme as at the plan start date, if known.</p>
      <h3>Tips</h3>
      <ul>
        <li>This figure is typically shown on your annual benefit statement as your "pension earned to date"</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputRevaluationRate",
    label: "Revaluation Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>For CARE schemes, enter the rate at which your accrued pension earnings are revalued each year. This keeps pace with inflation or a set rate as specified by your scheme rules.</p>
      <h3>Tips</h3>
      <ul>
        <li>Many public sector CARE schemes revalue by CPI - check your scheme booklet to confirm the basis</li>
        <li>This is separate from the escalation rate in payment - it applies only while you are still accruing or in deferment</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputNormalRetirementAge",
    label: "Normal Retirement Age",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the age at which your scheme's rules say you can take your full benefits without any reduction. This is <strong>not</strong> the age at which you plan to take your pension - that is set in the Timing tab.</p>
      <h3>Tips</h3>
      <ul>
        <li>If you take benefits before this age, Voyant will apply the Actuarial Reduction Rate you enter below</li>
        <li>For example: if the Normal Retirement Age is 65 but you retire at 60, an early retirement reduction will be applied</li>
        <li>Public sector schemes typically have a Normal Retirement Age of 65 or 67 - check your scheme booklet</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputActuarialReductionRate",
    label: "Actuarial Reduction Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the percentage reduction applied to your pension for each year you take benefits before the Normal Retirement Age.</p>
      <h3>Tips</h3>
      <ul>
        <li>For example, a 5% per year reduction taken 3 years early would reduce your pension by 15%</li>
        <li>Your scheme will publish its early retirement factors - these are usually in your scheme booklet or on the scheme's website</li>
        <li>If you plan to take benefits at or after the Normal Retirement Age, this field will have no effect</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputAmount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual pension income payable from this scheme.</p>
      <h3>Tips</h3>
      <ul>
        <li>For a <strong>Deferred</strong> or <strong>In Payment</strong> pension, the benefit amount is already a known figure - enter it here and Voyant will use it directly rather than calculating it</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputLumpSumChoice",
    label: "Lump Sum Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how any tax-free lump sum from this scheme should be modelled.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>None</strong> - no lump sum is taken from this scheme</li>
        <li><strong>Declared</strong> - enter a specific lump sum amount that the scheme will pay</li>
        <li><strong>Commutation</strong> - a portion of the pension income is converted into a lump sum, using the scheme's commutation factor</li>
        <li><strong>Accrual</strong> - the lump sum is calculated automatically based on your accrual rate and years of service (common in 1/80th schemes where a separate 3/80ths lump sum is built up)</li>
        <li><strong>Maximum</strong> - Voyant models the maximum lump sum available under the scheme's commutation rules</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Many older final salary schemes (e.g. 1/80th) include a separate automatic lump sum - check whether yours does before selecting Commutation</li>
        <li>CARE and newer public sector schemes typically do not include an automatic lump sum - commutation is a common option for these, but check with your provider</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputDeclaredLumpSumAmount",
    label: "Lump Sum Amount (Declared)",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the lump sum amount that the scheme has confirmed will be paid at retirement, if you have selected <strong>Declared</strong> as the Lump Sum Type.</p>
      <h3>Tips</h3>
      <ul>
        <li>This figure is usually shown on your annual benefit statement or in a retirement quote from the scheme administrator</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputFixedLumpSumAmount",
    label: "Fixed Lump Sum Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the lump sum amount to be paid from this scheme at retirement.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is the lump sum amount, not the amount your pension will be reduced by - Voyant will calculate that based on the commutation rate below</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputCommutationRate",
    label: "Commutation Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the commutation factor your scheme uses to convert pension income into a tax-free lump sum.</p>
      <h3>Tips</h3>
      <ul>
        <li>The commutation factor represents how much lump sum you receive for every £1 of annual pension you give up</li>
        <li>For example, a factor of 12 means giving up £1,000 of annual pension produces a lump sum of £12,000</li>
        <li>Your scheme will publish its commutation factors - these are usually available from the scheme administrator or in a retirement quote</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputAccrualRateMultiplier",
    label: "Pension Multiplier",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the multiplier used to calculate the lump sum under an accrual-based lump sum arrangement.</p>
      <h3>Tips</h3>
      <ul>
        <li>For example, in a 1/80th scheme the pension accrual is 1/80th of salary per year, and the separate lump sum accrues at 3/80ths per year - the multiplier here would be 3</li>
        <li>Check your scheme booklet to confirm the lump sum accrual fraction</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputWidowsPensionApplies",
    label: "Widows / Widower's Pension Applies",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if your scheme provides a pension to your surviving spouse or partner on your death.</p>
      <h3>Tips</h3>
      <ul>
        <li>Defined benefit schemes usually include a spouse's or dependant's pension as a standard benefit - check your scheme booklet to confirm</li>
        <li>Once enabled, you can set the calculation basis and percentage below</li>
        <li>Note: this is separate from the Survivor Percent field in the Basics tab, which applies while the pension is in payment. The widow's/widower's pension here relates to the death-in-service or pre-retirement death benefit</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputWidowsPensionCalcScheme",
    label: "Final Salary Accrual Scheme",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how the widow's or widower's pension benefit should be calculated.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Service to Date</strong> - the survivor's pension is based on the pension accrued up to the date of death</li>
        <li><strong>Normal Retirement Date</strong> - the survivor's pension is based on the projected pension you would have received at your Normal Retirement Date</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Check your scheme rules to confirm which basis applies - schemes vary and it can make a significant difference to the projected benefit</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputWidowsPensionPercent",
    label: "Percent of Employee Pension",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the percentage of your pension that would be paid to your surviving spouse or partner as a widow's or widower's pension.</p>
      <h3>Tips</h3>
      <ul>
        <li>A common figure is 50%, though some public sector schemes pay higher - check your scheme rules or annual benefit statement</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputWidowsPensionEscalation",
    label: "Escalation Percent",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual rate at which the widow's or widower's pension will increase once in payment.</p>
      <h3>Tips</h3>
      <ul>
        <li>This will often mirror the escalation basis of your own pension - check your scheme booklet to confirm</li>
        <li>If the survivor's pension is level with no increases, enter 0%</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputSurvivorshipInDeferment",
    label: "Survivorship Applies",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if a survivor's pension would be payable to your spouse or partner in the event you die while the pension is still <strong>deferred</strong> (i.e. before benefits come into payment).</p>
      <h3>Tips</h3>
      <ul>
        <li>Not all schemes provide a survivor's benefit during deferment - check your scheme rules</li>
        <li>If the pension is Active or In Payment, this setting is less relevant as other survivorship options will apply</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputLumpSumPaymentApplies",
    label: "Lump Sum Benefit Applies",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if your scheme pays a lump sum death benefit - for example, a multiple of salary paid to your dependants if you die before retirement.</p>
      <h3>Tips</h3>
      <ul>
        <li>Some defined benefit schemes include a death-in-service lump sum of 2x, 3x, or 4x salary - check your scheme booklet</li>
        <li>Once enabled, enter the lump sum amount in the field below</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputLumpSumBenefitAmount",
    label: "Lump Sum Benefit Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the value of the lump sum death benefit payable from this scheme.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is typically a multiple of salary - for example, 3x your pensionable salary</li>
        <li>You can find this in your scheme booklet or on your annual benefit statement</li>
        <li>If the amount is expressed as a multiple of salary rather than a fixed figure, calculate it based on your current pensionable earnings and enter the result here</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputReturnIndividualContributions",
    label: "Return Individual Contributions",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if, on death before retirement, your scheme would return the value of your own member contributions rather than (or in addition to) paying a lump sum death benefit.</p>
      <h3>Tips</h3>
      <ul>
        <li>Some schemes offer a return of contributions as an alternative death benefit option - check your scheme rules</li>
        <li>If toggled on, enter the value of your contributions to date in the field below</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputInitialContributionValue",
    label: "Individual Contributions at Start",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the total value of your own member contributions paid into this scheme up to the plan start date.</p>
      <h3>Tips</h3>
      <ul>
        <li>This figure is typically shown on your annual benefit statement</li>
        <li>It is used by Voyant to calculate the return of contributions death benefit if that option is selected above</li>
      </ul>
    `,
  },
  {
    key: "indContributionsApply",
    label: "Individual Employee Contribution Applies",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if you are making ongoing member contributions into this scheme. This allows Voyant to model your contributions as an outgoing within the plan.</p>
      <h3>Tips</h3>
      <ul>
        <li>Active defined benefit scheme members typically pay a percentage of pensionable salary as a member contribution - check your payslip or scheme booklet for the rate</li>
        <li>Once enabled, complete the Contribution Type and amount/percentage fields below</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputIndividualContributionType",
    label: "Contribution Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether your member contribution is expressed as a <strong>percentage of salary</strong> or as a <strong>fixed amount</strong>.</p>
      <h3>Tips</h3>
      <ul>
        <li>Defined benefit scheme contributions are generally a percentage of pensionable salary</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputIndividualContributionPercent",
    label: "Individual Percent",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter your member contribution rate as a percentage of your pensionable salary.</p>
      <h3>Tips</h3>
      <ul>
        <li>Your contribution rate is usually shown on your payslip and in your scheme booklet</li>
        <li>Some schemes have tiered contribution rates based on salary - use the rate that applies to your current earnings</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputIndividualContributionAmount",
    label: "Individual Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter your annual member contribution as a fixed amount, if you have selected <strong>Amount</strong> as the contribution type.</p>
      <h3>Tips</h3>
      <ul>
        <li>You can usually find this on your payslip - multiply your monthly contribution by 12 to get the annual figure</li>
      </ul>
    `,
  },
  {
    key: "ukFinalSalaryInputIndividualEscalation",
    label: "Individual Escalation",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the rate at which your member contributions will increase each year within the plan.</p>
      <h3>Tips</h3>
      <ul>
        <li>If contributions are unlikely to change, you can leave this at 0%</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Immediate / Deferred Annuity
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "ukAnnuityInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner of this annuity. Ownership defaults to the principal person - check this is correct before saving.</p>
    `,
  },
  {
    key: "ukAnnityInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear, recognisable name for this annuity.</p>
      <h3>Tips</h3>
      <ul>
        <li>Include the owner's name and provider if helpful - e.g. "Jane - Aviva Annuity"</li>
        <li>If there are multiple annuities for the same person, be specific so they're easy to distinguish</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityInputStatus",
    label: "Status",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the status that best describes where this annuity currently stands.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>In Payment</strong> - the annuity is already paying income at the plan start date. Enter the current payment amount in the Payment Amount field</li>
        <li><strong>Deferred</strong> - the annuity has been purchased but is not yet paying income. Enter the payment amount it will pay when it starts, and use the Timing tab to set when income begins</li>
        <li><strong>Future</strong> - the annuity has not yet been purchased. Enter the expected purchase value and Voyant will model the purchase at the date you specify</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityIsPensionable",
    label: "Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether this is a <strong>Pension Annuity</strong> or a <strong>Purchase Life Annuity</strong>.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Pension</strong> - an annuity purchased from a pension fund. The full income is taxable as pension income</li>
        <li><strong>Non-Pension</strong> - an annuity purchased with non-pension money (e.g. savings or an inheritance). A portion of each payment is treated as a tax-free return of capital; only the interest element is taxable. You can set a fixed term if applicable</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityIsCapitalProtected",
    label: "Capital Protected",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if this is a capital-protected annuity - one that guarantees to pay back all or part of the original purchase price to the owner's estate if they die before the protection amount has been paid out.</p>
      <h3>Tips</h3>
      <ul>
        <li>Once enabled, enter the protected amount in the field below</li>
        <li>In Voyant, the capital protection value is paid as a lump sum to the estate on death, visible in the Legacy screen</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityCapitalProtectedValue",
    label: "Protected Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the amount guaranteed to be returned to the estate if the owner dies before this value has been paid out in income.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is typically the original purchase price of the annuity, though some policies protect a different amount - check the annuity policy document</li>
        <li>Voyant will pay this as a lump sum on the owner's death in the Legacy screen, reduced by any income already received</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityInputPaymentAmount",
    label: "Payment Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the amount this annuity pays out as income, and select the payment frequency using the dropdown at the end of the field. The default frequency is Annually.</p>
      <h3>Tips</h3>
      <ul>
        <li>For an <strong>In Payment</strong> annuity, enter the current annual income (or the equivalent based on frequency)</li>
        <li>For a <strong>Deferred</strong> annuity, enter the income it will pay when it eventually starts - check the annuity policy document for this figure</li>
        <li>You can see this income in Year View > Cash Flow once the annuity is in payment</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityInputCapitalElement",
    label: "Capital Element",
    helpText: `
      <h3>What to enter</h3>
      <p>For a Purchase Life Annuity (Non-Pension), enter the proportion of each payment that represents a tax-free return of capital. This reduces the taxable portion of each payment.</p>
      <h3>Tips</h3>
      <ul>
        <li>The capital element is calculated by HMRC and set at outset based on the annuitant's age and the purchase price - it does not change over the life of the annuity</li>
        <li>The provider will confirm the capital element at the time of purchase; it is also shown on the annuity policy document</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityPurchaseAmount",
    label: "Purchase Value",
    helpText: `
      <h3>What to enter</h3>
      <p>For a <strong>Future</strong> annuity, enter the expected purchase price. Voyant will model this as a lump sum outgoing at the date you specify, and will calculate the resulting income based on the Annuity Rate Calculation settings below.</p>
      <h3>Tips</h3>
      <ul>
        <li>If purchasing from pension funds, the purchase value should reflect the pension pot value at the point of purchase - you may want to handle this directly in the pension under the 'Annuitization' tab</li>
        <li>Voyant uses this figure along with the Assumed or Specified Annuity Rate to calculate the projected income</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityInputJoint",
    label: "Payout",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether this is a <strong>Single Life</strong> or <strong>Joint Life</strong> annuity.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Single Life</strong> - income is paid only during the owner's lifetime. Payments stop at the owner's death (subject to any Years Certain guarantee)</li>
        <li><strong>Joint Life</strong> - income continues to a named beneficiary after the owner's death, at the Survivorship Percent you specify. The income typically reduces on first death</li>
      </ul>
    `,
  },
  {
    key: "ukAnnutityInputSurvivorPercent",
    label: "Survivor Percent",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the percentage of the annuity income that will continue to be paid to the surviving beneficiary after the owner's death.</p>
      <h3>Tips</h3>
      <ul>
        <li>Common percentages are 50% or 66.67% - check the annuity policy for the exact figure</li>
        <li>This percentage applies to the income in payment at the time of death, after any escalation has been applied</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityLifetime",
    label: "Lifetime",
    helpText: `
      <h3>What to enter</h3>
      <p>Select <strong>Yes</strong> if this annuity is payable for life. Select <strong>No</strong> if it is a fixed-term annuity that pays for a set number of years only.</p>
      <h3>Tips</h3>
      <ul>
        <li>If you select No, a Term field will appear where you can enter the number of years the annuity runs</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityYearsCertain",
    label: "Guarantee (Years Certain)",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the number of years for which income is guaranteed to be paid, even if the owner (or both owners on a Joint Life policy) dies within that period.</p>
      <h3>Tips</h3>
      <ul>
        <li>For example, a 10-year guarantee means the full annuity income is paid for at least 10 years regardless of death - after which, for a Joint Life annuity, the beneficiary receives the survivor percentage</li>
        <li>If there is no guarantee period, enter 0</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityTerm",
    label: "Term",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the number of years this fixed-term annuity will pay income. After this period, payments stop regardless of whether the owner is still alive.</p>
      <h3>Tips</h3>
      <ul>
        <li>Fixed-term annuities are less common than lifetime annuities - check the policy document to confirm the term</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityInputEscalationType",
    label: "Escalation Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how the annuity income will increase each year once it is in payment.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>None</strong> - the annuity is level; the income does not increase</li>
        <li><strong>RPI</strong> - increases in line with the Retail Prices Index each year, using the rate set in your Plan Settings</li>
        <li><strong>LPI</strong> - increases in line with Limited Price Indexation, typically capped at 5% or 2.5%</li>
        <li><strong>CPI</strong> - increases in line with the Consumer Prices Index, using the rate set in your Plan Settings</li>
        <li><strong>Other</strong> - enter a fixed escalation rate of your choice</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Check the annuity policy for the escalation basis - this is typically fixed at the time of purchase and cannot be changed</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityBeneficiaryLabel",
    label: "Beneficiary",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the person who will receive any death benefits from this annuity - for example, the surviving income under a Joint Life policy, or a capital protection payout.</p>
      <h3>Tips</h3>
      <ul>
        <li>The beneficiary must already exist as a person in the plan - add them in the People section first if needed</li>
        <li>For a Single Life annuity with capital protection, the beneficiary is the person who receives the residual lump sum on death</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityAnnuitizationCalcMethod",
    label: "Calculation Method",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how Voyant should calculate the income from a <strong>Future</strong> annuity purchase.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Assumed Interest Rate</strong> - Voyant derives an annuity rate using an underlying interest rate assumption, similar to how an actuary would calculate it based on gilt yields. Use this when you don't have a specific market rate in mind</li>
        <li><strong>Specified Annuity Rate</strong> - you enter the annuity conversion rate directly. For example, a rate of 5% on a £100,000 fund produces an income of £5,000 per year. Use this when you have a known or quoted rate</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityAnnuityAssumedInterestRate",
    label: "Assumed Interest Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the underlying interest rate Voyant should use to derive the annuity rate. This typically reflects the yield on mid-dated UK gilts, which insurers use as a basis for pricing annuities.</p>
      <h3>Tips</h3>
      <ul>
        <li>A higher rate produces a higher annuity income</li>
        <li>If you have a quoted annuity rate from a provider, use the Specified Annuity Rate option instead for greater precision</li>
      </ul>
    `,
  },
  {
    key: "ukAnnuityAnnuityRate",
    label: "Specified Annuity Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annuity conversion rate - the percentage of the purchase fund that will be paid as annual income.</p>
      <h3>Tips</h3>
      <ul>
        <li>For example, entering 5% on a £200,000 purchase fund produces an annual income of £10,000</li>
        <li>Use a rate from a recent annuity quote or comparison tool - rates vary by age, health, escalation, and payout type</li>
        <li>Remember that actual rates at the time of purchase may differ from today's rates - consider using a slightly conservative figure</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Drawdown
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "ukUnsecuredPensionInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner of this drawdown pension. Ownership defaults to the principal person - check this is correct before saving.</p>
    `,
  },
  {
    key: "ukUnsecuredPensionInputDrawdownPensionType",
    label: "Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether this is an existing drawdown pension or an inherited drawdown pension.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Existing Drawdown</strong> - a pension that has already been crystallised (moved into drawdown). This is where you enter a pot that is already in drawdown at the plan start date</li>
        <li><strong>Inherited Drawdown</strong> - a drawdown pot inherited from a deceased pension holder. Inherited drawdown pots have different rules around income tax and withdrawal flexibility depending on the age at death of the original holder</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Any uncrystallised pensions that will be moved into drawdown during the plan should be entered as Money Purchase pensions - the drawdown pot will be created automatically by Voyant when crystallisation occurs</li>
      </ul>
    `,
  },
  {
    key: "ukUnsecuredPensionInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear, recognisable name for this drawdown pension.</p>
      <h3>Tips</h3>
      <ul>
        <li>Including the owner's name and provider is helpful - e.g. "Jane - Fidelity Drawdown"</li>
        <li>If this drawdown pot was created from a Money Purchase pension in the plan, Voyant will name it automatically - you only need to enter a name for drawdown pots that exist at the plan start date</li>
      </ul>
    `,
  },
  {
    key: "ukUnsecuredPensionInputBalanceLabel",
    label: "Balance",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the current balance of the existing or inherited drawdown pot as at the plan start date.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use the most recent valuation from the provider - pension statements or online accounts are usually a good source</li>
      </ul>
    `,
  },
  {
    key: "ukUnsecuredPensionInputInitialBalance",
    label: "Initial Balance",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the value of the drawdown pot at the time it was first crystallised (i.e. when it was first moved into drawdown). Voyant uses this to calculate any Lump Sum Death Benefit Allowance (LSDBA) charge on the growth of the pot.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is not the current balance - it is the historical value at the point of crystallisation</li>
        <li>For an inherited drawdown pot, enter the value at the date of inheritance</li>
        <li>If this figure is not known, use the original pension transfer value or check the crystallisation paperwork from the provider</li>
      </ul>
    `,
  },
  {
    key: "ukUnsecuredPensionTaxStatus",
    label: "Tax Status",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the tax status of this drawdown pot - specifically whether withdrawals are subject to income tax.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Taxable</strong> - the standard status for a crystallised drawdown pot. All withdrawals are subject to income tax at the owner's marginal rate</li>
        <li><strong>Tax Free</strong> - applicable in specific circumstances, such as a drawdown pot held within a certain type of trust structure or an inherited pot where the original holder died before age 75. Voyant will not apply income tax to withdrawals</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Drawdown pots are typically Taxable - only change this if you have confirmed the tax-free status applies</li>
        <li>For inherited drawdown, whether it is taxable depends on the age at death of the original holder - confirm with the scheme or a tax adviser if unsure</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: State Pension
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "ukStatePensionInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner of this State Pension. Ownership defaults to the principal person - check this is correct before saving, particularly when entering a State Pension for a partner.</p>
    `,
  },
  {
    key: "ukStatePensionCurrentlyReceiving",
    label: "Currently Receiving Benefits",
    helpText: `
      <h3>What to enter</h3>
      <p>Select <strong>Yes</strong> if the State Pension is already in payment at the plan start date. Select <strong>No</strong> if it has not yet started.</p>
      <h3>Tips</h3>
      <ul>
        <li>If Yes, enter the current annual amount in the Amount field below</li>
        <li>If No, enter the projected amount (from the owner's State Pension forecast) and set the Start Age</li>
      </ul>
    `,
  },
  {
    key: "ukStatePensionInputStartAge",
    label: "Start Age",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the age at which the State Pension is due to start. This is typically the State Pension Age set by the government, but it can be deferred to a later age if the owner chooses to delay taking it.</p>
      <h3>Tips</h3>
      <ul>
        <li>Deferring the State Pension increases the weekly amount received</li>
        <li>Check the government's personal forecast at <a href="https://www.gov.uk/check-state-pension" target="_blank">gov.uk/check-state-pension</a> for the exact date</li>
        <li>The State Pension Age field below is separate and records the statutory age from the scheme rules</li>
      </ul>
    `,
  },
  {
    key: "ukStatePensionInputNormalPensionAge",
    label: "State Pension Age",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the owner's statutory State Pension Age - the age at which they become eligible to claim their State Pension under current government rules.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is separate from the Start Age - you might choose to start the pension later (deferring) even if you are eligible earlier</li>
        <li>Check the exact State Pension Age at <a href="https://www.gov.uk/state-pension-age" target="_blank">gov.uk/state-pension-age</a>, as it depends on date of birth</li>
      </ul>
    `,
  },
  {
    key: "ukStatePensionInputAmount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual State Pension amount. For a pension not yet in payment, enter the projected amount from the government's State Pension forecast.</p>
      <h3>Tips</h3>
      <ul>
        <li>Under current government policy the State Pension escalates automatically in Voyant using the Triple Lock - the higher of National Average Earnings, CPI, or 2.5% - using assumptions from your Plan Settings</li>
        <li>Get the State Pension forecast at <a href="https://www.gov.uk/check-state-pension" target="_blank">gov.uk/check-state-pension</a></li>
      </ul>
    `,
  },
  {
    key: "ukStatePensionInputSecondStateAmount",
    label: "Second Tier State Pension Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual amount of any Additional State Pension (also known as the Second State Pension, or S2P) accrued under the old pre-2016 State Pension system.</p>
      <h3>Tips</h3>
      <ul>
        <li>This only applies to people who reached State Pension age before 6 April 2016, or who have a protected entitlement from the old system</li>
        <li>The amount will be shown on the owner's State Pension forecast from the government - if none is shown, leave this blank</li>
        <li>Under the new flat-rate State Pension (post-April 2016), most of the Additional State Pension is incorporated into the main figure</li>
      </ul>
    `,
  },
  {
    key: "ukStatePensionInputGraduatedStatePensionAmount",
    label: "Graduated State Pension Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter any Graduated State Pension entitlement. This is an older state pension element accrued between 1961 and 1975 under the Graduated Retirement Benefit scheme.</p>
      <h3>Tips</h3>
      <ul>
        <li>This will only be relevant for older users - anyone who worked and paid graduated NI contributions between 1961 and 1975 may have a small entitlement</li>
        <li>The amount will appear on the State Pension forecast if it applies - if nothing is shown, leave this blank</li>
      </ul>
    `,
  },
  {
    key: "ukStatePensionUseManualLockRate",
    label: "Manually Enter Escalation Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Toggle this on if you want to override Voyant's default Triple Lock escalation with a specific fixed rate of your choice.</p>
      <h3>Tips</h3>
      <ul>
        <li>By default, Voyant escalates the State Pension using the Triple Lock (the higher of NAE, CPI, or 2.5%) - this is the current government policy</li>
        <li>Toggle this on if you want to model a scenario where the Triple Lock is removed or changed - for example, using a flat 2.5% or CPI-only increase</li>
        <li>This can be a useful stress-test for people who are significantly reliant on the State Pension in retirement</li>
      </ul>
    `,
  },
  {
    key: "userEnteredLockRate",
    label: "Manual Escalation Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the rate at which you want the state pension to increase.</p>
      <h3>Tips</h3>
      <ul>
        <li>This will overwrite any triple-lock employed by Voyant. The state pension will grow consistently at the entered rate</li>
      </ul>
    `,
  },

  // ============================================================
  // CATEGORY: Debts & Loans
  // ============================================================

  // ------------------------------------------------------------
  // SUB-CATEGORY: Debt
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "debtInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the borrower or borrowers - the person or people who have borrowed the money and are responsible for paying it back.</p>
      <h3>Tips</h3>
      <ul>
        <li>This should usually match the person or people legally responsible for the debt.</li>
        <li>If the debt is jointly held, select all relevant borrowers.</li>
        <li>Ownership affects how the debt and repayments flow through the plan.</li>
      </ul>
    `,
  },

  {
    key: "otherDebtInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear name for the debt so it is easy to identify later.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use a name that distinguishes this debt from any others in the plan.</li>
        <li>For example: "Main mortgage", "Car loan", "Credit card", or "Personal loan".</li>
        <li>Avoid including sensitive information such as account numbers.</li>
      </ul>
    `,
  },

  {
    key: "debtType",
    label: "Debt Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the type of debt you are adding.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Mortgage:</strong> a debt secured against a property.</li>
        <li><strong>Loan:</strong> a standard loan or borrowing arrangement.</li>
        <li><strong>Revolving / Credit Card:</strong> flexible borrowing where the balance may change over time.</li>
        <li><strong>Other:</strong> use this where none of the other categories fit.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>The debt type helps classify the debt in Voyant.</li>
        <li>If the debt is linked to a property, check the 'Linked Property' tab to ensure this is reflected in Voyant.</li>
      </ul>
    `,
  },

  {
    key: "debtInputBalance",
    label: "Balance",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the amount currently outstanding on the debt.</p>
      <h3>Tips</h3>
      <ul>
        <li>If working in arrears i.e. entering data between April & October, you may want to enter the balance as at 6th April.</li>
        <li>If working in advance, enter the current balance at the date you're adding the loan.</li>
        <li>You can check how the debt changes over time in Year View.</li>
      </ul>
    `,
  },

  {
    key: "debtInputType",
    label: "Payment Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how the debt is repaid.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Repayment:</strong> repayments reduce both the interest and the capital balance.</li>
        <li><strong>Interest Only:</strong> repayments cover interest only, so the capital balance remains outstanding unless paid off separately.</li>
      </ul>
      <h3>Important</h3>
      <p>An interest-only debt will, by default, continue until the end of the plan or until the sale of the linked property, if the debt is linked to one.</p>
      <p>To repay the capital value of an interest-only debt earlier, go to <strong>One Time Payments</strong>, select <strong>Payoff</strong>, and choose when the repayment should occur in Timing.</p>
    `,
  },

  {
    key: "debtInputPaymentAmountUpdater",
    label: "Payment Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the regular payment amount for this debt.</p>
      <h3>How to use this</h3>
      <ul>
        <li>If you know the payment amount, enter it here and leave the payment duration blank.</li>
        <li>Voyant will then use the payment amount to pay the debt down over time.</li>
        <li>If you are making regular overpayments, enter the total payment amount, including the overpayment, and leave duration blank.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Check Year View to confirm the debt is reducing as expected.</li>
        <li>If the balance is not reducing as expected, review the interest rate, payment type, payment amount, and duration fields together.</li>
      </ul>
    `,
  },

  {
    key: "debtInputPaymentAmount",
    label: "Payment Duration",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the payment duration if you want Voyant to calculate the regular payment amount automatically.</p>
      <h3>How this works</h3>
      <ul>
        <li>If you enter a duration, Voyant will calculate the payment amount based on the debt balance, interest rate, and term.</li>
        <li>If you already know the actual payment amount, use the Payment Amount field instead and leave duration blank.</li>
        <li>Use 'Year View' to check the mortgage is repaid over the expected time period.</li>
      </ul>
    `,
  },

  {
    key: "receiveCredit",
    label: "Receive Debt Amount as Cash",
    helpText: `
      <h3>What this does</h3>
      <p>Select this if the borrowed money should be received into the plan as cash.</p>
      <h3>When to use this</h3>
      <ul>
        <li>Use this where you take a loan and want the proceeds to be available in Voyant to spend, invest, or hold as cash.</li>
        <li>For example, this may be relevant if borrowing is being used to fund a purchase or investment within the plan.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>If the debt already exists and the money has already been spent, this may not be appropriate.</li>
        <li>Check the cash flow after saving to ensure the loan proceeds appear in the way you expect.</li>
      </ul>
    `,
  },

  // ── Tab: One Time Payments ─────────────────────────────────────

  {
    key: "payoff",
    label: "Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select what type of one-time payment you want to model.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Specified Amount:</strong> enter a specific one-off payment amount.</li>
        <li><strong>Payoff:</strong> repay the full outstanding balance at the selected time.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Use Payoff if you want to clear the debt completely at a particular event.</li>
        <li>Use Specified Amount if you want to model a partial repayment.</li>
      </ul>
    `,
  },

  {
    key: "amount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the amount of the one-time payment.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is relevant when the one-time payment type is set to Specified Amount.</li>
        <li>If you select Payoff, Voyant should use the outstanding balance at the selected time instead.</li>
        <li>Check the debt balance after the payment to confirm the result.</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Line of Credit
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "lineOfCreditInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the person or people responsible for the line of credit.</p>
      <h3>Tips</h3>
      <ul>
        <li>This should usually match the borrower or borrowers on the line of credit.</li>
        <li>If the line of credit is linked to a property, make sure the linked property is also entered correctly.</li>
      </ul>
    `,
  },

  {
    key: "otherlineOfCreditInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear name for the line of credit.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use a name that makes it easy to recognise later.</li>
        <li>For example: "Home equity line of credit", "Revolving facility", or "Investment credit line".</li>
        <li>Avoid adding account numbers or sensitive details.</li>
      </ul>
    `,
  },

  {
    key: "lofCreditLimitType",
    label: "Credit Limit Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how the credit limit is calculated.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Fixed:</strong> the limit is a fixed monetary amount. Once the balance reaches that amount, no further credit can be provided.</li>
        <li><strong>Percent of Equity:</strong> the limit is calculated as a percentage of the equity in a linked asset. This will be based on the linked asset's value in each year of the plan.</li>
      </ul>
      <h3>Important</h3>
      <ul>
        <li>If using Percent of Equity, go to <strong>Linked Properties</strong> and link the relevant property to the line of credit.</li>
        <li>Property values may change over time based on the Growth Rate applied to the property.</li>
        <li>You can view property values in a particular year by going to <strong>Year View &gt; Property</strong> and moving to the relevant year.</li>
      </ul>
      <h3>Next steps</h3>
      <ul>
        <li>After entering the basic details, link the relevant property if Percent of Equity is selected.</li>
        <li>Then go to <strong>Withdrawal Limit</strong>. This defaults to <strong>Do Not Allow</strong>, which means Voyant will not draw money from the line of credit.</li>
        <li>To allow money to be drawn into the plan, change the Withdrawal Limit to <strong>As Needed</strong> or <strong>Scheduled Only</strong>.</li>
        <li><strong>Scheduled Only</strong> means Voyant will only draw from the line of credit according to what you set up in Planned Withdrawals.</li>
      </ul>
    `,
  },

  {
    key: "lineOfCreditInputCreditLimit",
    label: "Credit Limit",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the fixed credit limit for this line of credit.</p>
      <h3>When this applies</h3>
      <ul>
        <li>This applies where Credit Limit Type is set to Fixed.</li>
        <li>Once the balance reaches this limit, no further borrowing should be available.</li>
      </ul>
      <h3>Where to check it</h3>
      <ul>
        <li>You can see the balance in Let's See or Dashboard by selecting <strong>Year View &gt; Debts</strong>.</li>
      </ul>
      <h3>Next steps</h3>
      <ul>
        <li>If Percent of Equity is being used instead, link the relevant property in Linked Properties.</li>
        <li>Go to Withdrawal Limit if you want the line of credit to be available for use in the plan.</li>
        <li>The default Withdrawal Limit is Do Not Allow, which means the line of credit will not be drawn from unless changed.</li>
      </ul>
    `,
  },

  {
    key: "lineOfCreditInputBalance",
    label: "Balance",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the current amount already borrowed on this line of credit.</p>
      <h3>Example</h3>
      <p>If the credit limit is £300,000 and the current balance is £200,000, only a further £100,000 is available to be used in the Voyant plan.</p>
      <h3>Where to check it</h3>
      <ul>
        <li>You can see the line of credit balance in Let's See or Dashboard by selecting <strong>Year View &gt; Debts</strong>.</li>
      </ul>
    `,
  },

  {
    key: "lineOfCreditInputInterestRate",
    label: "Interest Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual interest rate applied to the line of credit.</p>
      <h3>Tips</h3>
      <ul>
        <li>This affects the cost of borrowing and the balance over time.</li>
        <li>If the rate is variable, use a realistic planning assumption.</li>
        <li>Check Year View: Debts to see how the interest affects the projected balance.</li>
      </ul>
    `,
  },

  {
    key: "locInterestOnly",
    label: "Payment Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how payments on the line of credit should be treated.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Repayment:</strong> payments reduce the balance.</li>
        <li><strong>Interest only:</strong> interest is paid, but the balance itself is not repaid.</li>
      </ul>
      <h3>Important</h3>
      <ul>
        <li>Selecting Repayment with a £0 payment amount may mean the interest rolls up into the amount owed.</li>
        <li>Selecting Interest Only pays the interest each year but does not repay the capital balance.</li>
      </ul>
      <h3>Where to check it</h3>
      <ul>
        <li>Use Let's See or Dashboard, then go to <strong>Year View &gt; Debts</strong> to check the result.</li>
      </ul>
    `,
  },

  {
    key: "locPaymentAmount",
    label: "Payment Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>If a repayment line of credit is selected, enter the annual amount to be repaid here.</p>
      <h3>Tips</h3>
      <ul>
        <li>This field is used to specify how much of the line of credit is paid down each year.</li>
        <li>If no repayment is entered, check whether interest is rolling up or whether the balance remains outstanding.</li>
        <li>Use <strong>Year View: Debts</strong> to confirm the projected behaviour.</li>
      </ul>
    `,
  },

  {
    key: "locCreditLimitAsPercent",
    label: "Percent of Available Equity in Linked Asset",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the percentage of available equity in the linked asset that can be used as the credit limit.</p>
      <h3>When this applies</h3>
      <ul>
        <li>This applies when Credit Limit Type is set to Percent of Equity.</li>
        <li>The credit limit will depend on the value of the linked asset in each year of the plan.</li>
      </ul>
      <h3>Important</h3>
      <ul>
        <li>Make sure the relevant property or asset is linked to the line of credit.</li>
        <li>Property growth assumptions can affect the available equity and therefore the credit limit.</li>
        <li>Check the result in Year View to ensure the available borrowing behaves as expected.</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Equity Release
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "reverseMortgageOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the person or people who own, or are responsible for, the equity release arrangement.</p>
      <h3>Tips</h3>
      <ul>
        <li>This should usually match the property owner or owners.</li>
        <li>If the equity release is linked to a property, check that the property details and ownership are also correct.</li>
      </ul>
    `,
  },

  {
    key: "reverseMortgageName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear name for the equity release arrangement.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use a recognisable name, such as "Main home equity release" or the provider name.</li>
        <li>Avoid including sensitive account or reference numbers.</li>
      </ul>
    `,
  },

  {
    key: "existingHomeEquity",
    label: "Is this a new equity release?",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether this is a new equity release arrangement or one that already exists.</p>
      <h3>Tips</h3>
      <ul>
        <li>If the arrangement already exists, enter the current mortgage amount or outstanding balance.</li>
        <li>If it is a new arrangement, ensure the 'Timing' tab reflects the timing for taking the borrowing.</li>
      </ul>
    `,
  },

  {
    key: "mortgageBalance",
    label: "Mortgage Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the mortgage amount or outstanding balance for the equity release arrangement.</p>
      <h3>Tips</h3>
      <ul>
        <li>For an existing arrangement, this should usually be the current amount owed.</li>
        <li>For a new arrangement, this may represent the initial amount being borrowed.</li>
        <li>Check Year View: Debts to confirm how the balance grows or is repaid over time.</li>
      </ul>
    `,
  },

  {
    key: "reverseMortgageFees",
    label: "Closing Fees",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter any fees associated with setting up or closing the equity release arrangement.</p>
      <h3>Tips</h3>
      <ul>
        <li>Include fees that are expected to be paid as part of the arrangement.</li>
      </ul>
    `,
  },

  {
    key: "interestRate",
    label: "Interest Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual interest rate for the equity release arrangement.</p>
      <h3>Tips</h3>
      <ul>
        <li>Equity release interest may roll up over time if not paid.</li>
        <li>The interest rate can have a significant impact on the remaining equity in the property.</li>
        <li>Check the projected debt balance and property value together to understand the long-term impact.</li>
      </ul>
    `,
  },

  {
    key: "lumpSumToTake",
    label: "Lump Sum Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the lump sum amount to be taken from the equity release arrangement.</p>
      <h3>Tips</h3>
      <ul>
        <li>This should reflect the amount being released as an upfront lump sum.</li>
        <li>Check whether the lump sum appears in the cash flow as expected.</li>
        <li>If further borrowing is expected over time, use the relevant annual advance or credit limit fields if appropriate.</li>
      </ul>
    `,
  },

  {
    key: "reverseMortgageAnnualAdvanceLabel",
    label: "Annual Advance",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter any annual amount expected to be advanced from the equity release arrangement.</p>
      <h3>Tips</h3>
      <ul>
        <li>This may be used where funds are drawn gradually rather than all at once.</li>
        <li>Check how the advances appear in cash flow and how they affect the debt balance over time to ensure this matches your expectations.</li>
      </ul>
    `,
  },

  {
    key: "reverseMortgageCreditLimit",
    label: "Credit Limit",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the credit limit available under the equity release arrangement.</p>
      <h3>Tips</h3>
      <ul>
        <li>This may represent the maximum amount that can be borrowed or drawn under the facility.</li>
        <li>If a credit limit growth rate is also entered, check how the available limit changes over time.</li>
        <li>Review the plan output to confirm how much is actually drawn and when.</li>
      </ul>
    `,
  },

  {
    key: "creditLimitGrowthRate",
    label: "Credit Limit Growth Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the rate at which the available credit limit grows over time.</p>
      <h3>Tips</h3>
      <ul>
        <li>This affects the future borrowing capacity under the equity release arrangement.</li>
        <li>Be cautious with this assumption, as it may materially affect the amount that can be drawn in later years.</li>
        <li>Check the future credit limit and drawdowns in Year View.</li>
      </ul>
    `,
  },

  {
    key: "reverseMortgageClosePolicyAfterPayoff",
    label: "Close Policy After Payoff",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether the equity release arrangement should be closed after it has been paid off.</p>
      <h3>Tips</h3>
      <ul>
        <li>If the policy remains open, further advances or borrowing should remain available.</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Loan
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "loanInputOwnerLabel",
    label: "Lender",
    helpText: `
      <h3>What this means</h3>
      <p>The lender is the person who initially paid out the money.</p>
      <p>The borrower is the person who will be paying the money back to the lender through this loan.</p>
      <h3>Example</h3>
      <p>If Mr Smith lends money to his daughter and she pays him back over a number of years, Mr Smith is the lender and his daughter is the borrower.</p>
      <h3>Where this appears</h3>
      <ul>
        <li>Money will come into the plan via Cash Flow as the loan is paid back.</li>
        <li>In Dashboard or Let's See, click <strong>Year View</strong> and check the <strong>Cash Flow</strong> tab to see the loan repayments coming in.</li>
      </ul>
    `,
  },

  {
    key: "loanInputBorrowerLabel",
    label: "Borrower",
    helpText: `
      <h3>What to enter</h3>
      <p>Select or enter the person who is borrowing the money and will be making repayments.</p>
      <h3>Tips</h3>
      <ul>
        <li>The borrower is outside the plan if they are not one of the people being modelled.</li>
        <li>The repayments from the borrower should appear as money coming into the plan.</li>
        <li>Check Year View: Cash Flow to confirm repayments appear as expected.</li>
      </ul>
    `,
  },

  {
    key: "loanInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a clear name for the loan.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use a name that identifies who the loan is to or what it relates to.</li>
        <li>For example: "Loan to daughter", "Family loan", or "Business loan repayment".</li>
        <li>Avoid including sensitive account details.</li>
      </ul>
    `,
  },

  {
    key: "isExistingLoan",
    label: "Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether the loan already exists or will start in the future.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Existing Loan:</strong> use this if the loan is already in place at the start of the plan.</li>
        <li><strong>Future Loan:</strong> use this if the loan will begin at a future date.</li>
      </ul>
      <h3>Important</h3>
      <p>If you select Future Loan, the Timing tab should appear so you can select the event when the loan starts.</p>
    `,
  },

  {
    key: "existingLoanInitYear",
    label: "Loan Start Year",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the year the loan started.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is relevant for existing loans.</li>
        <li>Use the original start year if known.</li>
        <li>If the loan is future-dated, use the Timing tab to control when it starts.</li>
      </ul>
    `,
  },

  {
    key: "debtInputInterestRate",
    label: "Interest Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual interest rate charged on the loan.</p>
      <h3>Tips</h3>
      <ul>
        <li>This affects how quickly the debt reduces, or grows if repayments are not enough to cover interest.</li>
        <li>If the current rate is temporary, such as a short fixed-rate mortgage deal, consider whether a longer-term assumption would be more appropriate.</li>  
        <li>If the loan is interest-free, enter 0%.</li>
        <li>Check the Cash Flow and Debt tabs in Year View to confirm the loan behaves as expected.</li>
      </ul>
    `,
  },

  {
    key: "loanPresentFutureValue",
    label: "Loan Balance Entered As",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how the loan balance should be interpreted.</p>
      <h3>Tips</h3>
      <ul>
        <li>This determines whether the balance is treated as a present value or future value.</li>
        <li>Use Present Value where the balance is expressed in today's money and should be adjusted over time.</li>
        <li>Use Future Value where the balance is already the value expected at the relevant future date.</li>
      </ul>
    `,
  },

  // ── Tab: One Time Payments ─────────────────────────────────────

  {
    key: "paymentTiming",
    label: "Payment Timing",
    helpText: `
      <h3>What to enter</h3>
      <p>Select when the one-time payment should be made within the selected plan year.</p>
      <h3>Options</h3>
      <ul>
        <li><strong>Start of Year:</strong> the payment is treated as happening at the start of the year.</li>
        <li><strong>End of Year:</strong> the payment is treated as happening at the end of the year.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>This timing can affect interest calculations and the cash flow shown in that year.</li>
        <li>Use the option that best reflects when the payment is expected to be received or made (remember the Plan Year starts on 6th April).</li>
        <li>Check Year View after saving to confirm the timing has the expected impact.</li>
      </ul>
    `,
  },

  // ============================================================
  // CATEGORY: Protection
  // ============================================================

  // ------------------------------------------------------------
  // SUB-CATEGORY: Term & Endowment
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "ukTermProtectinInputOwnerLabel",
    label: "Policy Owner",
    helpText: `
    <h3>What to enter</h3>
    <p>Select the policy owner or owners.</p>
    <h3>Tips</h3>
    <ul>
      <li>Select two owners if you are entering a joint policy.</li>
      <li>The Policy Details field lets you specify whether the policy is single or joint.</li>
      <li>If the policy is joint, use the payout option to confirm whether the benefit is paid on first death or second death.</li>
    </ul>
  `,
  },

  {
    key: "ukTermProtectionName",
    label: "Policy Name",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter a clear name for the policy so it is easy to identify later.</p>
    <h3>Tips</h3>
    <ul>
      <li>Use the provider name, policy type, or purpose of the cover.</li>
      <li>For example: "Family Income Benefit", "Mortgage Protection", or "Employer Death in Service".</li>
      <li>Avoid including sensitive policy numbers or reference details.</li>
    </ul>
  `,
  },

  {
    key: "insuredPersonsInputIsDifferent",
    label: "Is Insured different than owner?",
    helpText: `
    <h3>What to enter</h3>
    <p>Use this if the person insured under the policy is different from the policy owner.</p>
    <h3>Tips</h3>
    <ul>
      <li>The policy owner is the person who owns the policy.</li>
      <li>The insured person is the person whose death or illness triggers the benefit.</li>
      <li>If the owner and insured person are the same, you should not need to use this option.</li>
    </ul>
  `,
  },

  {
    key: "investmentInputInsuranceType",
    label: "Insurance Type",
    helpText: `
    <h3>What to enter</h3>
    <p>Select the type of insurance being entered.</p>
    <h3>Options</h3>
    <ul>
      <li><strong>Employee:</strong> use this for cover linked to employment, such as death-in-service benefits calculated as a multiple of salary.</li>
      <li><strong>Personal:</strong> use this for personal insurance policies where you enter the benefit amount directly.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>Select Employee if the cover is calculated as a multiple of salary.</li>
      <li>Select Personal if you need to enter a lump sum, regular income, decreasing lump sum, or increasing lump sum benefit.</li>
      <li>A Family Income Benefit policy would usually be entered as a Regular Income benefit under Personal insurance.</li>
      <li>Different fields will appear depending on whether you select Employee or Personal.</li>
    </ul>
  `,
  },

  {
    key: "investmentInputLinkedEmployment",
    label: "Linked Employment",
    helpText: `
    <h3>What to enter</h3>
    <p>Link employee insurance to the relevant employment entry.</p>
    <h3>Why this matters</h3>
    <ul>
      <li>Voyant uses the linked employment to determine policy benefits where cover is based on a salary multiplier.</li>
      <li>The cover will only pay out while the person is in the linked employment.</li>
      <li>Because of this, there is no separate Timing panel to complete for this type of employee cover.</li>
    </ul>
  `,
  },

  {
    key: "ukEmployeeTermProtectionSalaryMultiplier",
    label: "Salary Multiplier",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the multiple of salary used to calculate the benefit amount.</p>
    <h3>Example</h3>
    <p>If Sarah earns £20,000 and has death-in-service cover worth four times salary, enter <strong>4</strong>. Voyant will calculate the benefit as £20,000 × 4 = £80,000.</p>
  `,
  },

  {
    key: "ukTermProtectionIsJoint",
    label: "Policy Details",
    helpText: `
    <h3>What to enter</h3>
    <p>Select whether the term insurance is a single or joint policy.</p>
    <h3>Options</h3>
    <ul>
      <li><strong>Single:</strong> the policy has one life insured.</li>
      <li><strong>Joint:</strong> the policy has two lives insured.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>If the policy is joint, use the Joint Payout Type field to choose whether the benefit is paid on first death or second death.</li>
      <li>Make sure this matches the actual policy schedule.</li>
    </ul>
  `,
  },

  {
    key: "ukTermProtectionInTrust",
    label: "Policy Held in Trust?",
    helpText: `
    <h3>What to enter</h3>
    <p>Select Yes if the policy is held in trust.</p>
  `,
  },

  {
    key: "insuredPersonsInputPersonsLabel",
    label: "Insured",
    helpText: `
    <h3>What to enter</h3>
    <p>Select the person or people insured by the policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>This is the person whose death or other insured event would trigger the payout.</li>
      <li>Check this carefully if the insured person is different from the policy owner.</li>
    </ul>
  `,
  },

  {
    key: "ukTermProtectionBenefitType",
    label: "Benefit Type",
    helpText: `
    <h3>What to enter</h3>
    <p>Select how the policy benefit is paid.</p>
    <h3>Options</h3>
    <ul>
      <li><strong>Lump Sum:</strong> pays a one-off lump sum.</li>
      <li><strong>Regular Income:</strong> pays an ongoing income. Use this for Family Income Benefit policies.</li>
      <li><strong>Decreasing Lump Sum:</strong> pays a lump sum that reduces over time.</li>
      <li><strong>Increasing Lump Sum:</strong> pays a lump sum that increases over time.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>Choose Regular Income for Family Income Benefit policies.</li>
      <li>The other options pay a one-off lump sum on the mortality of the selected person.</li>
    </ul>
  `,
  },

  {
    key: "ukTermProtectionInputTerm1",
    label: "Term (Remaining)",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the term of the policy.</p>
    <h3>How to use this</h3>
    <ul>
      <li>If the policy is already in force at the start of the plan, enter the remaining term.</li>
      <li>If the policy starts in the future, enter the full term for the future policy.</li>
    </ul>
    <h3>Example</h3>
    <p>If a Family Income Benefit policy starts in 5 years and has a term of 10 years, and the policyholder's mortality event is 7 years from now, the income benefit would be paid for the remaining 8 years of the policy term.</p>
  `,
  },

  {
    key: "ukTermProtectionInputBenefitAmount",
    label: "Benefit Amount",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the benefit amount for the policy.</p>
    <h3>How to use this</h3>
    <ul>
      <li>For level term insurance, this will usually be the sum assured.</li>
      <li>For Family Income Benefit, enter the annual benefit amount.</li>
    </ul>
  `,
  },

  {
    key: "timingType",
    label: "Begin Premiums at",
    helpText: `
    <h3>What to enter</h3>
    <p>Select when premiums should begin.</p>
    <h3>Options</h3>
    <ul>
      <li><strong>Event:</strong> premiums begin from the selected policy start event in the Timing tab.</li>
      <li><strong>Age:</strong> premiums begin at the specified purchase age.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>If using Event, make sure the policy start timing is set correctly.</li>
      <li>Check Year View &gt; Expenses to confirm when premiums begin.</li>
    </ul>
  `,
  },

  {
    key: "purchaseAge",
    label: "Purchase Age",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the age at which premiums begin or the policy is purchased, if using age-based timing.</p>
    <h3>Tips</h3>
    <ul>
      <li>This is relevant when Begin Premiums at is set to Age.</li>
      <li>Check this against the intended policy start date.</li>
    </ul>
  `,
  },

  {
    key: "investmentInputPremiumAmount",
    label: "Premium",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the premium payable while the policy is in force.</p>
    <h3>Important</h3>
    <ul>
      <li>Voyant automatically creates an expense for this premium.</li>
      <li>Be careful not to double count the premium by also adding it manually as an expense.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>The default frequency is annual, but this can be changed.</li>
      <li>Check Year View after saving to confirm the premium is appearing correctly.</li>
    </ul>
  `,
  },

  {
    key: "escalation",
    label: "Benefit Escalation",
    helpText: `
    <h3>What to enter</h3>
    <p>Select whether the benefit increases over time.</p>
    <h3>Options</h3>
    <ul>
      <li>None</li>
      <li>RPI</li>
      <li>LPI</li>
      <li>CPI</li>
      <li>Other</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>Use the option that matches the policy terms.</li>
      <li>This can be important for Family Income Benefit or increasing lump sum policies.</li>
      <li>If using Other, check how the escalation rate is entered and applied.</li>
    </ul>
  `,
  },

  {
    key: "premiumEscalation",
    label: "Premium Escalation",
    helpText: `
    <h3>What to enter</h3>
    <p>Select whether premiums increase over time.</p>
    <h3>Options</h3>
    <ul>
      <li>None</li>
      <li>RPI</li>
      <li>LPI</li>
      <li>CPI</li>
      <li>Other</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>Use the option shown in the policy schedule.</li>
      <li>Check Year View &gt; Expenses to confirm premiums are increasing as expected.</li>
    </ul>
  `,
  },

  {
    key: "investmentInputJointPayoutType",
    label: "Joint Payout Type",
    helpText: `
    <h3>What to enter</h3>
    <p>If the policy is joint, select whether the benefit is paid on first death or second death.</p>
    <h3>Important</h3>
    <ul>
      <li>If the joint policyholders are the primary client and spouse or partner, setting payout to Second Death may effectively remove the benefit from the main planning timeline.</li>
      <li>For Family Income Benefit, a payout on second death may not show on Let's See charts if the planning timeline has ended.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>Check the policy terms carefully before selecting first death or second death.</li>
      <li>Use Year View or Life Needs Insight to confirm the policy is paying out as expected.</li>
    </ul>
  `,
  },

  {
    key: "decreasingBenefitRate",
    label: "Decreasing Benefit Rate",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the rate at which the benefit decreases over time.</p>
    <h3>When this applies</h3>
    <ul>
      <li>This is relevant for Decreasing Lump Sum policies.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>Use the rate shown in the policy documentation.</li>
      <li>Check the payout in Year View or Life Needs Insight to confirm the decreasing benefit is being reflected correctly.</li>
    </ul>
  `,
  },

  // ── Tab: Term Maturity ───────────────────────────────────────

  {
    key: "receivePayoutAtEndOfTerm",
    label: "Receive Payout at end of term",
    helpText: `
    <h3>What to enter</h3>
    <p>Select this if the policy pays a maturity value at the end of the term.</p>
    <h3>Tips</h3>
    <ul>
      <li>This may be relevant for endowment-style policies.</li>
      <li>Check the maturity value, taxation, growth, and fees settings if a payout is expected.</li>
      <li>Review Year View to confirm the maturity payout appears at the expected time.</li>
    </ul>
  `,
  },

  {
    key: "currentMaturityBaseAmount",
    label: "Current Maturity Value",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the current maturity value of the policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>Use the latest statement or policy valuation if available.</li>
      <li>This value may be grown forward depending on the growth settings used in this tab.</li>
    </ul>
  `,
  },

  {
    key: "receiveMaturityValueAtDeath",
    label: "Use the Maturity Value as Death Benefit",
    helpText: `
    <h3>What to enter</h3>
    <p>Select this if the maturity value should also be used as the death benefit.</p>
    <h3>Tips</h3>
    <ul>
      <li>Use this only if it reflects the policy terms.</li>
      <li>Check the payout under both maturity and death scenarios if this setting materially affects the plan.</li>
    </ul>
  `,
  },

  {
    key: "termProtectionMaturityPayoutTaxationType",
    label: "Payout Taxation (If Before Death)",
    helpText: `
    <h3>What to enter</h3>
    <p>Select how the maturity payout should be taxed if it is paid before death.</p>
    <h3>Options</h3>
    <ul>
      <li>None</li>
      <li>Tax at Income Rate</li>
      <li>Tax at Capital Gains Rate</li>
      <li>Tax at Dividends Rate</li>
      <li>Tax based on Special Rules</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>The correct treatment depends on the type of policy and the circumstances.</li>
    </ul>
  `,
  },

  {
    key: "growthType",
    label: "Grow Maturity Value By",
    helpText: `
    <h3>What to enter</h3>
    <p>Select how the maturity value should be projected over time.</p>
    <h3>Options</h3>
    <ul>
      <li>None</li>
      <li>Growth Rate</li>
      <li>Asset Allocations</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>Use None if the maturity value should not grow.</li>
      <li>Use Growth Rate if you want to apply a specific annual growth assumption.</li>
      <li>Use Asset Allocations only where that reflects how the policy value should be modelled.</li>
    </ul>
  `,
  },

  {
    key: "termProtectionMaturityCostBasis",
    label: "Cost Basis",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the cost basis for the policy maturity value.</p>
    <h3>Tips</h3>
    <ul>
      <li>This may be relevant where a taxable gain needs to be calculated.</li>
      <li>Use policy records or provider information if available.</li>
    </ul>
  `,
  },

  {
    key: "termProtectionMaturityGrowthRate",
    label: "Maturity Growth Rate",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the annual growth rate applied to the maturity value.</p>
    <h3>When this applies</h3>
    <ul>
      <li>This is relevant where Grow Maturity Value By is set to Growth Rate.</li>
      <li>Use a realistic assumption based on the policy type and underlying investment approach.</li>
    </ul>
  `,
  },

  {
    key: "termProtectionMaturityFeeRate",
    label: "Annual Fees",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the annual fee rate applied to the maturity value.</p>
    <h3>Tips</h3>
    <ul>
      <li>Fees reduce the projected maturity value over time.</li>
      <li>Use the policy documentation or latest statement if available.</li>
      <li>Check the maturity projection after saving.</li>
    </ul>
  `,
  },

  // ── Tab: Debt Payouts ────────────────────────────────────────

  {
    key: "limitBenefitToDebtAmount",
    label:
      "Limit Insurance Payout to Total Amount of Liabilities at Death or Maturity",
    helpText: `
    <h3>What this does</h3>
    <p>Select this if the insurance payout should be limited to the total amount of liabilities at death or maturity.</p>
    <h3>Tips</h3>
    <ul>
      <li>This may be relevant for policies intended to clear debts rather than provide a wider surplus.</li>
      <li>Check the payout amount in Year View or Life Needs Insight to confirm it is limited as expected.</li>
      <li>Make sure the relevant liabilities are entered correctly in the plan.</li>
      <li>Drag debts into the 'Payout these Debts first' column as appropriate.</li>
    </ul>
  `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Whole Life
  // ------------------------------------------------------------

  {
    key: "ukWholeLifeProtectionInputOwnerLabel",
    label: "Owner",
    helpText: `
    <h3>What to enter</h3>
    <p>Select the owner or owners of the whole life policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>This should reflect who owns the policy.</li>
      <li>If the insured person is different from the owner, use the relevant insured person setting if available.</li>
      <li>Ownership may affect how the policy is treated in the plan.</li>
    </ul>
  `,
  },

  {
    key: "ukWholeLifeProtectionInputName",
    label: "Policy Name",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter a clear name for the whole life policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>Use the provider name, policy type, or planning purpose.</li>
      <li>For example: "Whole of Life IHT Policy".</li>
      <li>Avoid including policy numbers or sensitive details.</li>
    </ul>
  `,
  },

  {
    key: "ukWholeLifeProtectionInputPremiumAmount",
    label: "Premium",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the premium payable while the policy is in force.</p>
    <h3>Important</h3>
    <ul>
      <li>Voyant automatically creates an expense for this premium.</li>
      <li>Be careful not to double count the premium by also adding it manually as an expense.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>The default frequency is annual, but this can be changed.</li>
      <li>Check Year View after saving to confirm the premium is appearing correctly.</li>
    </ul>
  `,
  },

  {
    key: "ukWholeLifeProtectionInputBenefitAmount",
    label: "Benefit Amount",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the benefit amount payable under the whole life policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>This is usually the sum assured payable on death.</li>
      <li>Use the policy schedule or latest documentation.</li>
      <li>Check the payout in Year View or Life Needs Insight if the cover is material to the plan.</li>
    </ul>
  `,
  },

  {
    key: "ukWholeLifeProtectionIsJoint",
    label: "Policy Details",
    helpText: `
    <h3>What to enter</h3>
    <p>Use this to specify whether the policy is single or joint.</p>
    <h3>Tips</h3>
    <ul>
      <li>If joint, check whether the policy pays on first death or second death.</li>
      <li>This matters for when the benefit appears in the plan.</li>
      <li>Make sure this matches the policy schedule.</li>
    </ul>
  `,
  },

  {
    key: "inTrust-radio1",
    label: "In Trust?",
    helpText: `
    <h3>What to enter</h3>
    <p>Select whether the whole life policy is held in trust.</p>
  `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Income Protection
  // ------------------------------------------------------------

  {
    key: "ukIncomeProtectionInputOwnerLabel",
    label: "Owner",
    helpText: `
    <h3>What to enter</h3>
    <p>Select the owner of the income protection policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>This will usually be the person whose income is being protected.</li>
      <li>If the policy is linked to employment, make sure the linked employment is correct.</li>
    </ul>
  `,
  },

  {
    key: "ukIncomeProtectionInputName",
    label: "Policy Name",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter a clear name for the income protection policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>Use a name that makes the policy easy to identify.</li>
      <li>For example: "Personal Income Protection" or "Employer Sick Pay Cover".</li>
    </ul>
  `,
  },

  {
    key: "ukIncomeProtectionInputPremiumAmount",
    label: "Premium Amount",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the premium payable while the policy is in force.</p>
    <h3>Important</h3>
    <ul>
      <li>Voyant automatically creates an expense for this premium.</li>
      <li>Be careful not to double count the premium by also adding it manually as an expense.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>The default frequency is annual, but this can be changed.</li>
      <li>Check Year View after saving to confirm the premium is appearing correctly.</li>
    </ul>
  `,
  },

  {
    key: "premiumGrowthRateLabel",
    label: "Premium Escalation Rate",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the rate at which premiums increase over time.</p>
    <h3>Tips</h3>
    <ul>
      <li>Use the policy schedule or provider documentation if premiums escalate contractually.</li>
      <li>If premiums are level, use 0%.</li>
      <li>Check Year View &gt; Expenses to confirm the premiums are showing correctly.</li>
    </ul>
  `,
  },

  {
    key: "ukIncomeProtectionInputType",
    label: "Coverage Type",
    helpText: `
    <h3>What to enter</h3>
    <p>Select how the income protection benefit is calculated.</p>
    <h3>Options</h3>
    <ul>
      <li><strong>Fixed Amount:</strong> the policy pays a specified amount.</li>
      <li><strong>Percent of Income:</strong> the policy benefit is based on a percentage of income.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>Use the option that matches the policy terms.</li>
      <li>If using Percent of Income, make sure the relevant income and employment details are accurate.</li>
    </ul>
  `,
  },

  {
    key: "ukIncomeProtectionInputCoverageAmount",
    label: "Coverage Amount",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the amount of income protection cover.</p>
  `,
  },

  {
    key: "growthRate",
    label: "Coverage Inflation Rate",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the rate at which the income protection benefit increases over time.</p>
    <h3>Tips</h3>
    <ul>
      <li>Use this where the policy benefit is index-linked or expected to escalate.</li>
      <li>If the benefit is level, use 0%.</li>
    </ul>
  `,
  },

  {
    key: "benefitDurationType",
    label: "Benefit Duration",
    helpText: `
    <h3>What to enter</h3>
    <p>Select how long the income protection benefit can be paid for.</p>
    <h3>Tips</h3>
    <ul>
      <li>This should match the policy terms.</li>
      <li>Use 'End of Linked Employment' if payments would continue so long as you remain employed.</li>
      <li>Use 'Fixed Number of Years' where there is a set benefit duration e.g. 5 years.</li>
    </ul>
  `,
  },

  {
    key: "incomeProtectionMaxBenefitAge",
    label: "Max Benefit Age",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the maximum age to which the benefit can be paid.</p>
    <h3>Tips</h3>
    <ul>
      <li>The policy will cancel itself beyond this age.</li>
    </ul>
  `,
  },

  {
    key: "ukIncomeProtectionPresentFutureValue",
    label: "Premium/Coverage entered as",
    helpText: `
    <h3>What to enter</h3>
    <p>Select whether premiums and cover are entered as present value or future value.</p>
    <h3>Options</h3>
    <ul>
      <li><strong>Present Value:</strong> values are expressed in today's money and may be inflated over time.</li>
      <li><strong>Future Value:</strong> values are already expressed in the value expected at the relevant future time.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>Use Present Value when entering today's premium or benefit amount.</li>
      <li>Use Future Value only where the amount already reflects the value at a future point.</li>
    </ul>
  `,
  },

  {
    key: "downsizeDebtInputYears2",
    label: "Benefit Duration (years)",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the number of years the income protection benefit can be paid for.</p>
    <h3>Tips</h3>
    <ul>
      <li>This is relevant where the policy pays for a fixed benefit period.</li>
      <li>Use the period shown in the policy terms.</li>
    </ul>
  `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Critical Illness
  // ------------------------------------------------------------

  {
    key: "ukCriticalIllnessProtectionInputOwnerLabel",
    label: "Owner",
    helpText: `
    <h3>What to enter</h3>
    <p>Select the owner of the critical illness policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>Voyant assumes the owner and life insured are the same.</li>
    </ul>
  `,
  },

  {
    key: "ukCriticalIllnessInputName",
    label: "Policy Name",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter a clear name for the critical illness policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>Use the provider name or purpose of the policy.</li>
      <li>For example: "Critical Illness Cover" or "Mortgage CI Policy".</li>
    </ul>
  `,
  },

  {
    key: "ukCriticalIllnessProtectionInputPremiumAmount",
    label: "Premium Amount",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the premium payable while the policy is in force.</p>
    <h3>Important</h3>
    <ul>
      <li>Voyant automatically creates an expense for this premium.</li>
      <li>Be careful not to double count the premium by also adding it manually as an expense.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>The default frequency is annual, but this can be changed.</li>
      <li>Check Year View after saving to confirm the premium is appearing correctly.</li>
    </ul>
  `,
  },

  {
    key: "ukCriticalIllnessProtectionInputBenefitAmount",
    label: "Benefit Amount",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the amount paid by the policy if a valid critical illness claim is triggered.</p>
    <h3>Tips</h3>
    <ul>
      <li>This should usually be the policy's sum assured.</li>
      <li>Use the latest policy schedule or statement.</li>
      <li>Check the plan output where a disability or illness event is modelled.</li>
    </ul>
  `,
  },

  {
    key: "ukCriticalIllnessInputTerm",
    label: "Term (Remaining)",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the remaining term of the critical illness policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>If the policy is already in force, enter the remaining term.</li>
      <li>If the policy starts in the future, enter the term from the future start date.</li>
      <li>Once outside the term, the policy should no longer provide cover.</li>
    </ul>
  `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Long Term Care
  // ------------------------------------------------------------

  {
    key: "ukLongTermCareProtectionInputOwnerLabel",
    label: "Owner",
    helpText: `
    <h3>What to enter</h3>
    <p>Select the owner of the long-term care policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>This will usually be the person whose care costs are being insured.</li>
    </ul>
  `,
  },

  {
    key: "ukLongTermCareInputName",
    label: "Policy Name",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter a clear name for the long-term care policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>Use the provider name or a descriptive policy name.</li>
      <li>For example: "Long Term Care Policy".</li>
    </ul>
  `,
  },

  {
    key: "ukLongTermCareProtectionInputMonthlyBenefit",
    label: "Benefit Amount",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the benefit amount payable under the long-term care policy.</p>
    <h3>Tips</h3>
    <ul>
      <li>Use the policy schedule or provider details.</li>
      <li>Check the projected care-related cash flow after saving.</li>
    </ul>
  `,
  },

  {
    key: "ukLongTermCareUnlimitedBenefitPeriod",
    label: "Lifetime Benefits",
    helpText: `
    <h3>What to enter</h3>
    <p>Select whether benefits can continue for life.</p>
    <h3>Tips</h3>
    <ul>
      <li>If the policy has unlimited lifetime benefits, select the relevant option.</li>
      <li>If benefits are limited, use the Benefit Period field instead.</li>
      <li>Check the policy schedule carefully as benefit periods can vary significantly.</li>
    </ul>
  `,
  },

  {
    key: "ukLongTermCareInputBenefitPeriod",
    label: "Benefit Period",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the period for which long-term care benefits can be paid.</p>
    <h3>Tips</h3>
    <ul>
      <li>This is relevant where Lifetime Benefits do not apply.</li>
      <li>Use the benefit period from the policy documentation.</li>
      <li>Check how long benefits continue in the plan output.</li>
    </ul>
  `,
  },

  {
    key: "ukLongTermCareProtectionInputPremiumAmount",
    label: "Premium Amount",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the premium payable while the policy is in force.</p>
    <h3>Important</h3>
    <ul>
      <li>Voyant automatically creates an expense for this premium.</li>
      <li>Be careful not to double count the premium by also adding it manually as an expense.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>The default frequency is annual, but this can be changed.</li>
      <li>Check Year View after saving to confirm the premium is appearing correctly.</li>
    </ul>
  `,
  },

  {
    key: "longTermCareInsuranceWaiverOfPremiumRider",
    label: "Waiver of Premium",
    helpText: `
    <h3>What to enter</h3>
    <p>Select whether the policy includes a waiver of premium feature.</p>
    <h3>Tips</h3>
    <ul>
      <li>A waiver of premium feature may stop premiums being payable after certain conditions are met.</li>
      <li>Use the policy documentation to confirm whether this applies.</li>
    </ul>
  `,
  },

  {
    key: "ukLongTermCareProtectionInputLifetimePayments",
    label: "Lifetime Payments",
    helpText: `
    <h3>What to enter</h3>
    <p>Select whether premiums or payments continue for life.</p>
    <h3>Tips</h3>
    <ul>
      <li>Use this if the policy requires lifetime payments.</li>
      <li>If payments are limited to a fixed number of years, select 'No' and use Payment Option Years.</li>
      <li>Check Year View &gt; Expenses to confirm the premium pattern.</li>
    </ul>
  `,
  },

  {
    key: "ukLongTermCareInputNumberOfYears",
    label: "Payment Option Years",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the number of years over which payments are made.</p>
    <h3>Tips</h3>
    <ul>
      <li>This is relevant where payments are limited to a fixed period rather than payable for life.</li>
      <li>Use the policy schedule to confirm the payment period.</li>
      <li>Check the expense pattern after saving.</li>
    </ul>
  `,
  },

  {
    key: "insurancePresentFutureValue",
    label: "Benefit and Premiums entered as",
    helpText: `
    <h3>What to enter</h3>
    <p>Select whether benefit and premium values are entered as present value or future value.</p>
    <h3>Options</h3>
    <ul>
      <li><strong>Present Value:</strong> values are expressed in today's money and may be inflated over time.</li>
      <li><strong>Future Value:</strong> values are already expressed in the value expected at the relevant future time.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>Use Present Value when entering today's benefit and premium amounts.</li>
      <li>Use Future Value only where the figures already reflect the future amount.</li>
    </ul>
  `,
  },

  {
    key: "benefitInflationType",
    label: "Benefit Inflation",
    helpText: `
    <h3>What to enter</h3>
    <p>Select how the long-term care benefit increases over time.</p>
    <h3>Options</h3>
    <ul>
      <li><strong>None:</strong> the benefit does not inflate.</li>
      <li><strong>Compound:</strong> the benefit increases with compounding.</li>
      <li><strong>Simple:</strong> the benefit increases using simple inflation.</li>
    </ul>
    <h3>Tips</h3>
    <ul>
      <li>Use the option that matches the policy terms.</li>
      <li>Benefit inflation can materially affect long-term care projections.</li>
    </ul>
  `,
  },

  {
    key: "benefitInflationRate",
    label: "Inflation Rate",
    helpText: `
    <h3>What to enter</h3>
    <p>Enter the rate used to increase the long-term care benefit over time.</p>
    <h3>Tips</h3>
    <ul>
      <li>This applies where Benefit Inflation is set to Simple or Compound.</li>
      <li>Use the policy schedule or provider documentation.</li>
      <li>Check the projected benefit amount over time after saving.</li>
    </ul>
  `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Transfer
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "transferType",
    label: "Transferring",
    helpText: `
      <h3>What to enter</h3>
      <p>Choose whether this transfer should move a <strong>Specific Amount</strong>, or <strong>All Available</strong> funds from the source.</p>
      <h3>Tips</h3>
      <ul>
        <li><strong>All Available:</strong> useful for sweeping all surplus or all remaining funds in an account into another account</li>
        <li><strong>Specific Amount:</strong> use this when you want to transfer a fixed sum, such as a one-off lump sum or a regular contribution amount</li>
      </ul>
    `,
  },
  {
    key: "transferAmount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the amount to be transferred. This field appears when 'Transferring' is set to 'Specific Amount'.</p>
      <h3>Tips</h3>
      <ul>
        <li>For a recurring transfer, this is the amount transferred each period</li>
        <li>For a one-off transfer (e.g. investing a windfall), enter the lump sum amount</li>
      </ul>
    `,
  },
  {
    key: "isFutureValue",
    label: "Transfer entered as",
    helpText: `
      <h3>Tips</h3>
      <ul>
        <li><strong>Present Value:</strong> If you want the transfer amount to increase with inflation from <strong>today</strong>, choose this</li>
        <li><strong>Future Value:</strong> If you want the transfer amount to increase with inflation from <strong>the chosen start date (Timing tab)</strong>, choose this</li>
        <li>Check the Year View to ensure this represents what you want</li>
      </ul>
    `,
  },
  {
    key: "transferBeforeExpenses",
    label: "Transfer Before Paying Expenses",
    helpText: `
      <h3>What to enter</h3>
      <p>Select 'Yes' if this transfer should be prioritised <strong>before</strong> the plan's expenses are met - this prevents the funds being used to cover expenses instead.</p>
      <h3>Tips</h3>
      <ul>
        <li>If left as 'No', expenses will be met first, with any remaining funds contributed to the target account</li>
      </ul>
    `,
  },
  {
    key: "recurringTransfer",
    label: "Recurring",
    helpText: `
      <h3>What to enter</h3>
      <p>Tick this box if the transfer should repeat over a period of time, rather than occurring as a one-off.</p>
      <h3>Tips</h3>
      <ul>
        <li>For a recurring transfer, ensure two events exist on the Timeline tab - one to mark the start and one to mark the end</li>
        <li>For example, a recurring transfer from a General Investment Account into an ISA could run from 'Start' to 'Retirement'</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Planned Withdrawals
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "drawdownInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a name for this Planned Withdrawal - this is how it will appear in Let's See > Cashflow.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use a name that's meaningful to you, especially if the owner has multiple planned withdrawals</li>
      </ul>
    `,
  },
  {
    key: "drawdownScheduledWithdrawalDollarAmount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the fixed annual amount to be withdrawn. This amount cannot be changed to a different frequency - planned withdrawals are always entered as an <strong>annual</strong> amount.</p>
      <h3>Tips</h3>
      <ul>
        <li>Check Year View > Cashflow after saving to confirm the withdrawal is appearing correctly</li>
      </ul>
    `,
  },
  {
    key: "drawdownScheduledWithdrawalPercent",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the percentage amount to be withdrawn.</p>
      <h3>Tips</h3>
      <ul>
        <li>This percentage will be taken from all the 'Selected Accounts' below</li>
        <li>Check Year View > Cashflow after saving to confirm the withdrawal is appearing correctly</li>
      </ul>
    `,
  },
  {
    key: "drawdownWithdrawalFixAmountDistributionType",
    label: "Distribution Type",
    helpText: `
      <h3>What to enter</h3>
      <p>This option is only relevant when <strong>multiple accounts</strong> are selected for this withdrawal.</p>
      <h3>Tips</h3>
      <ul>
        <li><strong>Each:</strong> the amount entered is withdrawn from each selected account simultaneously - useful for splitting withdrawals between two people's pensions, for example</li>
        <li><strong>Total:</strong> the amount entered is withdrawn from the first account in the Selected Accounts list until depleted, then moves on to the next account - effectively setting an account-by-account liquidation order</li>
      </ul>
    `,
  },
  {
    key: "drawdownIsSingleEvent",
    label: "Recurring",
    helpText: `
      <h3>What to enter</h3>
      <p>Choose whether this withdrawal should occur once, or repeat over a period of time.</p>
      <h3>Tips</h3>
      <ul>
        <li><strong>No:</strong> a one-off withdrawal - set the timing by dragging the relevant event into the Withdrawal Timing box on the Timing tab</li>
        <li><strong>Yes:</strong> a recurring withdrawal - set the start and end by dragging events into the Withdrawal Starts and Withdrawal Ends boxes on the Timing tab</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Estate Plan
  // ------------------------------------------------------------

  // ── Tab: Basics ──────────────────────────────────────────────

  {
    key: "estatePlanInputOwnerLabel",
    label: "Owner",
    helpText: `
      <h3>What to enter</h3>
      <p>Select the owner of this Estate Plan.</p>
      <h3>Tips</h3>
      <ul>
        <li>Only one Estate Plan can be created per person in the plan</li>
        <li>An Estate Plan is only needed if Voyant's default distribution logic doesn't reflect the owner's actual wishes (e.g. a will that bequests part of the estate to children on first death)</li>
      </ul>
    `,
  },
  {
    key: "estatePlanInputName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a name for this Estate Plan.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use a name that's meaningful to you - this will help distinguish it if there are multiple Estate Plans in the household</li>
      </ul>
    `,
  },
  {
    key: "estatePlanInputLiquidation",
    label: "Liquidate Designated Assets for IHT",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether a specific asset bequeathed in the Asset Distribution screen should be <strong>liquidated</strong> to pay any IHT due on it.</p>
      <h3>Tips</h3>
      <ul>
        <li><strong>No:</strong> the asset will be shown as transferred (in specie) in the Legacy screen, with any IHT met from elsewhere in the estate</li>
        <li><strong>Yes:</strong> the asset will be shown as liquidated in the Legacy screen, with the IHT met from its own proceeds</li>
      </ul>
      <h3>Reference</h3>
      <ul>
        <li>Voyant's help article: <a href="https://support.planwithvoyant.com/hc/en-us/articles/49450955718811-How-to-add-an-Estate-Plan-UK" target="_blank">How to add an Estate Plan</a></li>
        <li>Voyant's help article: <a href="https://support.planwithvoyant.com/hc/en-us/articles/49503230436635-Estate-Plans-How-to-distribute-specified-assets-to-specified-beneficiaries-UK" target="_blank">How to distribute specified assets to specified beneficiaries</a></li>
      </ul>
    `,
  },

  // ── Tab: Asset Distribution ──────────────────────────────────

  {
    key: "distributionType",
    label: "Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select how this distribution should be calculated.</p>
      <h3>Tips</h3>
      <ul>
        <li><strong>Percentage:</strong> available for bequests to Charity, Spouse, or Other - a share of the estate</li>
        <li><strong>Amount:</strong> a fixed sum, available for bequests to Charity, Spouse, or Other</li>
        <li><strong>Percentage of Threshold:</strong> only available for 'Other' (including non-legal partners) - models a proportion of the Nil Rate Band being left to a beneficiary other than the spouse or charity</li>
      </ul>
      <h3>Reference</h3>
      <ul>
        <li>Voyant's help article: <a href="https://support.planwithvoyant.com/hc/en-us/articles/49450955718811-How-to-add-an-Estate-Plan-UK" target="_blank">How to add an Estate Plan</a></li>
        <li>Voyant's help article: <a href="https://support.planwithvoyant.com/hc/en-us/articles/49503230436635-Estate-Plans-How-to-distribute-specified-assets-to-specified-beneficiaries-UK" target="_blank">How to distribute specified assets to specified beneficiaries</a></li>
      </ul>
    `,
  },
  {
    key: "distributionPercent",
    label: "Percentage",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the percentage of the estate (or, for 'Other', the percentage of the Nil Rate Band threshold) to be distributed to this beneficiary category.</p>
    `,
  },
  {
    key: "distributionAmount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the fixed amount to be distributed to this beneficiary category.</p>
      <h3>Tips</h3>
      <ul>
        <li>For bequests split between multiple beneficiaries (e.g. children in equal shares), enter the total amount here, then set each beneficiary's share in the Distribution Breakdown</li>
      </ul>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Plan Settings
  // ------------------------------------------------------------

  // ── Tab: Default Ages ────────────────────────────────────────

  {
    key: "defaultMortalityAge",
    label: "Default Mortality Age",
    helpText: `
      <h3>What this is</h3>
      <p>This sets the age to which the plan runs by default for each owner, in the absence of any other mortality assumption being used.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is now a reference value only and cannot be edited directly here</li>
        <li>To change an individual's plan end age, you can move their mortality on the Timeline</li>
      </ul>
    `,
  },
  {
    key: "childExcludeFromPlanAge",
    label: "Child Owned Accounts Available in Plan Until Age",
    helpText: `
      <h3>What to enter</h3>
      <p>Set the age at which a child's own accounts (e.g. a Junior ISA) stop being included in the plan's calculations - reflecting the point at which the funds pass out of the parents' control.</p>
      <h3>Tips</h3>
      <ul>
        <li>This only affects accounts owned by a child added to the plan as a 'Person'</li>
        <li>From this age, the accounts will disappear in your plan</li>
        <li>If you have scheduled regular contributions to the plans that disappear, or regular income from them, this will continue even though the plans themselves disappear</li>
      </ul>
    `,
  },

  // ── Tab: Inflation/Growth ─────────────────────────────────────

  {
    key: "rateOfInflation",
    label: "Inflation Rate",
    helpText: `
      <h3>What this is</h3>
      <p>The default rate used to inflate expenses and the future purchase price of properties. It is also the rate applied whenever a 'Present Value' is used anywhere in the plan, and is used to calculate future values entered in any Steps section.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual item level</li>
        <li>Changing this will only affect new plans created - for existing plans, growth assumptions can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "defaultCashSavingsGrowthRate",
    label: "Savings Growth Rate",
    helpText: `
      <h3>What this is</h3>
      <p>The default interest rate applied to cash/savings accounts, including the software's Default Surplus Account (e.g. "John's Cash"), provided the account isn't set to grow by Portfolio/Holdings.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, growth assumptions can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "defaultInvestmentGrowthRate",
    label: "Investment Growth Rate",
    helpText: `
      <h3>What this is</h3>
      <p>The default capital growth rate applied to investments, money purchase pensions, and drawdown pensions, provided the account isn't set to grow by Portfolio/Holdings.</p>
      <p>It is also used as the default growth rate for the hypothetical taxable savings account created by the Annual Savings Insight.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, growth assumptions can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "propertyGrowthRate",
    label: "Property Growth/Depreciation Rate",
    helpText: `
      <h3>What this is</h3>
      <p>The default rate at which property values increase (or decrease, if entered as a negative figure) once owned.</p>
      <h3>Tips</h3>
      <ul>
        <li>For a future property purchase, the Inflation Rate (not this rate) is used to calculate the future purchase price</li>
        <li>This default can be overridden at the individual property level</li>
        <li>Changing this will only affect new plans created - for existing plans, growth assumptions can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "incomeGrowthRate",
    label: "National Average Earnings",
    helpText: `
      <h3>What this is</h3>
      <p>The default rate used to escalate Employment and Other Income amounts over time. It also forms part of the Triple Lock formula used to escalate the State Pension.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual income item level</li>
        <li>Changing this will only affect new plans created - for existing plans, growth assumptions can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "defaultAnnuityAssumedInterestRate",
    label: "Annuity Assumed Interest Rate",
    helpText: `
      <h3>What this is</h3>
      <p>The default rate used to convert an accumulated pension fund into an annuity, or to calculate payments for any future annuity purchase. It is also used if 'Assumed Interest Rate' is selected in the Longevity Risk (Annuity) Insight.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual item level</li>
        <li>Changing this will only affect new plans created - for existing plans, growth assumptions can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "defaultPriceIndex",
    label: "CPI",
    helpText: `
      <h3>What this is</h3>
      <p>The Consumer Prices Index rate. Where selected, it can be used to inflate items such as final salary pension and annuity payouts, and is used to escalate the Residential Nil Rate Band (RNRB).</p>
      <h3>Tips</h3>
      <ul>
        <li>This rate is also used by the 'Real Money' option (on Dashboard and Let's See) to show present-value figures</li>
      </ul>
    `,
  },
  {
    key: "retailPriceIndex",
    label: "RPI",
    helpText: `
      <h3>What this is</h3>
      <p>The Retail Price Index rate. Where selected, it can be used to inflate items such as final salary pension and annuity payouts.</p>
    `,
  },
  {
    key: "defaultTaxTableEscalationRate",
    label: "Default Tax Table Assumptions",
    helpText: `
      <h3>What this is</h3>
      <p>An across-the-board annual escalation rate applied to future tax-related assumptions - tax brackets, allowances, thresholds, and contribution allowances for investments and pensions.</p>
    `,
  },
  {
    key: "ukIHTExemptionEscalationRate",
    label: "Nil Rate Band Escalation",
    helpText: `
      <h3>What this is</h3>
      <p>The rate used to escalate the UK Inheritance Tax Nil Rate Band.</p>
      <h3>Tips</h3>
      <ul>
        <li>The Nil Rate Band is fixed at £325,000 by legislation until 2030 - this setting only affects escalation from 2030 onwards</li>
      </ul>
    `,
  },
  {
    key: "ukIHTPropertyExemptionEscalationRate",
    label: "IHT Property Exemption Escalation Rate",
    helpText: `
      <h3>What this is</h3>
      <p>The rate used to escalate the threshold at which the Residence Nil Rate Band begins to be tapered away.</p>
    `,
  },
  {
    key: "defaultGiltRate",
    label: "15 year Gilt Rate",
    helpText: `
      <h3>What this is</h3>
      <p>Used for GAD table look-ups when limiting drawdown pension withdrawals to a percentage of GAD.</p>
    `,
  },
  {
    key: "isYieldReinvested",
    label: "Reinvest Investment Yield",
    helpText: `
      <h3>What to enter</h3>
      <p>Sets the default for whether yield on unwrapped investments and ISAs is reinvested or paid out annually.</p>
      <h3>Tips</h3>
      <ul>
        <li>By default Voyant reinvests yield rather than paying it out</li>
        <li>This can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, this can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "growByAssetAllocation",
    label: "Grow all investment and retirement accounts using asset allocation",
    helpText: `
      <h3>What to enter</h3>
      <p>Switching this on automatically sets all investment and retirement accounts to grow using asset allocation (Portfolio/Holdings) rather than a fixed growth rate.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is usually switched off by default</li>
        <li>When switched on, the 'Grow this account by' dropdown on individual accounts will be locked to 'Portfolio/Holdings' and cannot be changed to 'Entered Growth Rate'</li>
      </ul>
    `,
  },
  {
    key: "cashGrowByAssetAllocation",
    label: "Grow all savings and cash accounts using 100% cash allocation",
    helpText: `
      <h3>What to enter</h3>
      <p>Switching this on automatically sets all savings and cash accounts to grow using a 100% cash asset allocation, rather than a fixed interest rate.</p>
      <h3>Tips</h3>
      <ul>
        <li>This is usually switched off by default</li>
        <li>When switched on, the 'Grow this account by' dropdown on individual accounts will be locked to 'Portfolio/Holdings' and cannot be changed to 'Entered Interest Rate'</li>
      </ul>
    `,
  },

  // ── Tab: Fees & Taxation ──────────────────────────────────────

  {
    key: "ce0e199e-0268-4931-9e12-eb950cdb83ce",
    label: "Product Fees - Cash Savings",
    helpText: `
      <h3>What to enter</h3>
      <p>The default annual product fee applied to cash savings accounts. Fees are deducted from capital growth.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, fees can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "dc49f3fd-951d-4fc5-a523-9e684491679e",
    label: "Product Fees - Taxable",
    helpText: `
      <h3>What to enter</h3>
      <p>The default annual product fee applied to taxable (unwrapped) investment accounts. Fees are deducted from capital growth.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, fees can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "d65bcb85-7079-4e00-b047-a008cb706810",
    label: "Product Fees - Tax-Deferred",
    helpText: `
      <h3>What to enter</h3>
      <p>The default annual product fee applied to tax-deferred accounts (e.g. pensions, bonds). Fees are deducted from capital growth.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, fees can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "dcc403ad-a02e-40e1-9205-7353d2b97e8a",
    label: "Product Fees - Tax-Free",
    helpText: `
      <h3>What to enter</h3>
      <p>The default annual product fee applied to tax-free accounts (e.g. ISAs). Fees are deducted from capital growth.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, fees can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "d5dd7d10-eb15-4eee-9303-a64fa4110948",
    label: "Ongoing Advice Fees - Cash Savings",
    helpText: `
      <h3>What to enter</h3>
      <p>The default annual ongoing advice fee applied to cash savings accounts. Fees are deducted from capital growth.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, fees can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "c53a4689-d169-4699-9ce5-b276e3c526c7",
    label: "Ongoing Advice Fees - Taxable",
    helpText: `
      <h3>What to enter</h3>
      <p>The default annual ongoing advice fee applied to taxable (unwrapped) investment accounts. Fees are deducted from capital growth.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, fees can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "dba039ae-3d6d-4e0f-a073-b57126ffaa65",
    label: "Ongoing Advice Fees - Tax-Deferred",
    helpText: `
      <h3>What to enter</h3>
      <p>The default annual ongoing advice fee applied to tax-deferred accounts (e.g. pensions, bonds). Fees are deducted from capital growth.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, fees can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "cc8d86ab-14f2-437e-84d4-1199df4fca00",
    label: "Ongoing Advice Fees - Tax-Free",
    helpText: `
      <h3>What to enter</h3>
      <p>The default annual ongoing advice fee applied to tax-free accounts (e.g. ISAs). Fees are deducted from capital growth.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, fees can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "percentYearlyGainsTaxed",
    label: "Account Liquidation Annually",
    helpText: `
      <h3>What this is</h3>
      <p>Sets the default for the 'Capital Gains Realized Annually' field, available on some taxable investments (e.g. unwrapped investments) in the Growth section.</p>
      <h3>Tips</h3>
      <ul>
        <li>This default can be overridden at the individual account level</li>
        <li>Changing this will only affect new plans created - for existing plans, this can only be updated at the item level</li>
      </ul>
    `,
  },
  {
    key: "defaultInternalTaxRate",
    label: "Onshore Bond Default Internal Tax Rate",
    helpText: `
      <h3>What this is</h3>
      <p>Sets the default internal tax rate applied to onshore bonds, capturing the relative tax difference between onshore and offshore bonds.</p>
      <h3>Tips</h3>
      <ul>
        <li>This rate is applied only to growth on the account - e.g. a 20% rate would reduce a 5% headline growth rate to 4% (a 1% reduction, i.e. 20% of the growth)</li>
        <li>Unless you have reason to change this, we would suggest leaving it as is</li>
      </ul>
    `,
  },

  // ── Tab: Major Loss ───────────────────────────────────────────

  {
    key: "defaultStartAge",
    label: "Default Age",
    helpText: `
      <h3>What to enter</h3>
      <p>Sets the default age of the primary client at which a Major Loss Event or the Market Crash Insight will begin.</p>
      <h3>Tips</h3>
      <ul>
        <li>This can be changed to a different age/year when adding a specific Major Loss event to the Timeline</li>
      </ul>
    `,
  },
  {
    key: "numberOfYears",
    label: "Number of Years (1 to 5)",
    helpText: `
      <h3>What to enter</h3>
      <p>Sets how many consecutive years the Major Loss event runs for - between 1 and 5.</p>
      <h3>Tips</h3>
      <ul>
        <li>For each year, you can set a separate growth deviation under 'Fixed Growth' and/or 'Allocation Percentile'</li>
        <li>Use Year View > Investments and Pensions > Net Growth to check the deviation has been applied, and that growth returns to normal afterwards</li>
      </ul>
    `,
  },

  // ── Tab: Calculation Settings ─────────────────────────────────

  {
    key: "crystallizeFinalSalaryBeforeMoneyPurchase",
    label: "Crystallise final salary before money purchase",
    helpText: `
      <h3>What this is</h3>
      <p>Relates to the historic Lifetime Allowance test, and controls which pension type was tested first if both final salary and money purchase pensions crystallised in the same year.</p>
      <h3>Tips</h3>
      <ul>
        <li>Usually switched off by default</li>
      </ul>
    `,
  },
  {
    key: "transferExcessCreditsToSavings",
    label: "Transfer all excess income / credits to savings",
    helpText: `
      <h3>What to enter</h3>
      <p>Switch this on if you want unallocated surplus income to be assumed saved, rather than spent.</p>
      <h3>Tips</h3>
      <ul>
        <li>Usually switched off by default - Voyant normally assumes unallocated surplus is spent</li>
        <li>Leaving this switched off is the conservative approach</li>
      </ul>
    `,
  },
  {
    key: "saveIncomeAfterRetirement",
    label: "Save excess income after retirement",
    helpText: `
      <h3>What to enter</h3>
      <p>Switch this on if you want surplus income to be assumed saved during retirement, rather than spent.</p>
      <h3>Tips</h3>
      <ul>
        <li>Usually switched off by default</li>
        <li>Before retirement, surplus is still assumed spent unless 'Transfer all excess income / credits to savings' is also switched on</li>
      </ul>
    `,
  },
  {
    key: "assumePredeceasedUponSimultaneousDeath",
    label: "Assume predeceased upon simultaneous death",
    helpText: `
      <h3>What this is</h3>
      <p>When both clients die in the same year (simultaneous mortality), this setting tells Voyant to assume the younger client predeceases the older client.</p>
    `,
  },
  {
    key: "showBasicExpensesLine",
    label: "Show Basic Expenses Line (Cashflow Chart)",
    helpText: `
      <h3>What to enter</h3>
      <p>Controls whether the 'basic needs' line is shown by default on cashflow charts.</p>
    `,
  },
  {
    key: "includeCashNotDisplayedInIncome",
    label:
      "Income incomes not displayed on Cash Flow chart (Income vs Expenditures)",
    helpText: `
      <h3>What to enter</h3>
      <p>Controls whether incomes that are hidden from the cash flow chart - such as protection payouts - are shown on the Income vs Expenditure Overview.</p>
    `,
  },
  {
    key: "includeWithdrawalsInIncome",
    label: "Include Planned Withdrawals with Incomes (Income vs Expenditures)",
    helpText: `
      <h3>What to enter</h3>
      <p>Controls whether Planned Withdrawals are shown alongside income on the Income vs Expenditure Overview.</p>
    `,
  },

  // ------------------------------------------------------------
  // SUB-CATEGORY: Carryover Assumptions
  // ------------------------------------------------------------

  // ── Subheading: Basics ───────────────────────────────────────

  {
    key: "ukTaxAndAllowanceInfoInputExpectedRebate",
    label: "Taxes Rebate",
    helpText: `
      <h3>What to enter</h3>
      <p>If a tax rebate is expected relating to a period before the start of the plan, that hasn't yet been received, enter it here.</p>
    `,
  },
  {
    key: "ukTaxAndAllowanceInfoInputTaxesDue",
    label: "Taxes Due",
    helpText: `
      <h3>What to enter</h3>
      <p>If there's an outstanding tax liability relating to a period before the start of the plan, that is still due to be paid, enter it here.</p>
    `,
  },
  {
    key: "newUserInputProvince",
    label: "Country",
    helpText: `
      <h3>What to enter</h3>
      <p>Select England/Wales, Scotland, or Northern Ireland, so that the appropriate tax rules are applied to this plan.</p>
    `,
  },

  // ── Subheading: Pension Allowance & Carry Forward ────────────

  {
    key: "ukTaxInfoInputPensionProtectionType",
    label: "Protection Type",
    helpText: `
      <h3>What to enter</h3>
      <p>If a form of pension protection is held, select the relevant option here.</p>
      <h3>Tips</h3>
      <ul>
        <li>If no pension protection is held, this can be left as the default option</li>
        <li>If unsure, check pension paperwork or contact the pension provider directly</li>
      </ul>
    `,
  },
  {
    key: "ukTaxInfoInputPensionMaxTaxFreeCash",
    label: "Maximum Allowed Tax-Free Cash",
    helpText: `
      <h3>What to enter</h3>
      <p>If there's an entitlement to a tax-free cash percentage that differs from the standard amount - for example, due to a protection held - enter it here.</p>
      <h3>Tips</h3>
      <ul>
        <li>This setting applies across all pensions on this plan</li>
        <li>Related entries on individual pensions (e.g. Crystallisations) may also need reviewing alongside this field</li>
        <li>If unsure what figure applies, check pension paperwork, or contact the pension provider</li>
      </ul>
    `,
  },
  {
    key: "ukTaxInfoInputPensionProtectedAllowanceAmount",
    label: "Remaining LSDBA",
    helpText: `
      <h3>What to enter</h3>
      <p>If there have been previous pension benefit crystallisation events before the plan starts, enter the remaining Lump Sum and Death Benefit Allowance here.</p>
      <h3>Tips</h3>
      <ul>
        <li>If unsure of the remaining amount, check with the pension provider(s) involved</li>
      </ul>
    `,
  },
  {
    key: "ukTaxInfoInputPensionProtectedTaxFreeCashAmt",
    label: "Remaining Lump Sum Allowance",
    helpText: `
      <h3>What to enter</h3>
      <p>If there have been previous pension benefit crystallisation events before the plan starts, enter the remaining Lump Sum Allowance here.</p>
      <h3>Tips</h3>
      <ul>
        <li>If unsure of the remaining amount, check with the pension provider(s) involved</li>
      </ul>
    `,
  },
  {
    key: "ukTaxInfoInputPensionContributionCarryForward",
    label: "Available Pension Contribution Carry Forward",
    helpText: `
      <h3>What to enter</h3>
      <p>If there's unused pension annual allowance carried forward from previous tax years, enter the available amount here.</p>
      <h3>Tips</h3>
      <ul>
        <li>Pension providers can usually confirm contribution history; an accountant or financial adviser can help calculate what's available to carry forward</li>
      </ul>
    `,
  },

  // ── Subheading: Nil Rate Band Carry Forward & Previous Transfers ──

  {
    key: "ukTaxInfoInputGiftExemptionCarryOver",
    label: "Gift Exemption Carry Forward",
    helpText: `
      <h3>What to enter</h3>
      <p>If there's any unused annual gift exemption carried forward from the previous tax year, enter it here.</p>
    `,
  },
  {
    key: "ukTaxInfoInputIhtCarryOverPercent",
    label: "IHT Nil Rate Band",
    helpText: `
      <h3>What to enter</h3>
      <p>If a percentage of the Nil Rate Band has been inherited from a deceased spouse or civil partner who died before the plan starts, enter that percentage here.</p>
      <h3>Tips</h3>
      <ul>
        <li>This field is only for transfers that occurred before the plan starts - transfers arising from a death during the plan are handled separately</li>
        <li>If unsure whether this applies, this is something a solicitor, accountant, or financial adviser can usually help establish from the previous estate's records</li>
      </ul>
    `,
  },
  {
    key: "ukTaxInfoInputResidenceNilRateBandCarryOverPercent",
    label: "Residence Nil Rate Band",
    helpText: `
      <h3>What to enter</h3>
      <p>If a percentage of the Residence Nil Rate Band has been inherited from a deceased spouse or civil partner who died before the plan starts, enter that percentage here.</p>
      <h3>Tips</h3>
      <ul>
        <li>This field is only for transfers that occurred before the plan starts - transfers arising from a death during the plan are handled separately</li>
        <li>If unsure whether this applies, this is something a solicitor, accountant, or financial adviser can usually help establish from the previous estate's records</li>
      </ul>
    `,
  },
  {
    key: "ukTaxInfoInputBprAprCarryoverPct",
    label: "BPR/APR Allowance Carry Forward",
    helpText: `
      <h3>What to enter</h3>
      <p>If a percentage of Business Property Relief or Agricultural Property Relief allowance has been inherited from a deceased spouse or civil partner who died before the plan starts, enter that percentage here.</p>
      <h3>Tips</h3>
      <ul>
        <li>If unsure whether this applies, this is something a solicitor, accountant, or financial adviser can usually help establish from the previous estate's records</li>
      </ul>
    `,
  },
  {
    key: "ukTaxInfoInputNilPET",
    label: "Potentially Exempt Transfers",
    helpText: `
      <h3>What to enter</h3>
      <p>If any gifts have been made before the plan starts that may still be relevant for Inheritance Tax purposes, enter the value here.</p>
      <h3>Tips</h3>
      <ul>
        <li>Keeping a record of significant gifts (date, recipient, and value) is useful here</li>
      </ul>
    `,
  },
  {
    key: "ukTaxInfoInputNilCLT",
    label: "Chargeable Lifetime Transfers",
    helpText: `
      <h3>What to enter</h3>
      <p>If any chargeable lifetime transfers have been made before the plan starts that may still be relevant for Inheritance Tax purposes, enter the value here.</p>
    `,
  },

  // ── Subheading: Capital Gains ─────────────────────────────────

  {
    key: "ukTaxInfoInputCapitalGainsRealisedYearToDate",
    label: "Capital Gains Realised Year to Date",
    helpText: `
      <h3>What to enter</h3>
      <p>If any capital gains have already been realised in the current tax year, before you entered your details into Voyant, enter the amount here.</p>
      <h3>Tips</h3>
      <ul>
        <li>Remember, if entering details between April and October then we're looking at the current tax year. If entering details between October and April then we're looking at next tax year, so this won't be relevant.</li>
      </ul>
    `,
  },
  {
    key: "ukTaxInfoInputCapitalGainsLossCarryOver",
    label: "Carried Over Losses",
    helpText: `
      <h3>What to enter</h3>
      <p>If there are capital losses carried forward from previous tax years, enter the amount here.</p>
      <h3>Tips</h3>
      <ul>
        <li>This information is usually available from previous tax returns or, if applicable, an accountant</li>
        <li>Remember, if entering details between April and October then we're looking at the current tax year. If entering details between October and April then we're looking at next tax year.</li>
      </ul>
    `,
  },
  {
    key: "ukTaxInfoInputEntreprenuersCapGainsRelief",
    label: "Entrepreneur's Relief Claimed to Date",
    helpText: `
      <h3>What to enter</h3>
      <p>If Business Asset Disposal Relief (formerly Entrepreneurs' Relief) has been claimed previously, enter the amount claimed to date.</p>
      <h3>Tips</h3>
      <ul>
        <li>This information is usually available from previous tax returns or, if applicable, an accountant</li>
      </ul>
    `,
  },

  // ── Subheading: Tax Deductions / Tax Credits ──────────────────

  {
    key: "taxCreditOrDeductionName",
    label: "Name",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter a name for this item, as it should appear in the plan.</p>
    `,
  },
  {
    key: "taxCreditOrDeductionAmount",
    label: "Amount",
    helpText: `
      <h3>What to enter</h3>
      <p>Enter the annual amount for this item.</p>
    `,
  },
  {
    key: "taxCreditOrDeductionIncomeOffset",
    label: "Income Offset",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether this deduction relates to Income or Capital Gains.</p>
    `,
  },
  {
    key: "taxCreditOrDeductionType",
    label: "Type",
    helpText: `
      <h3>What to enter</h3>
      <p>Select whether this is a Non-Refundable or Refundable tax credit.</p>
    `,
  },
  {
    key: "taxCreditOrDeductionGrowthRate",
    label: "Escalation Rate",
    helpText: `
      <h3>What to enter</h3>
      <p>If this amount should increase each year, enter the rate here.</p>
    `,
  },

  // ============================================================
  // CATEGORY: Year View
  // ============================================================
  // These entries are matched by column header text plus the aria-label of
  // the ancestor table, not by a label's for/id. See SHACKADEMY_COLUMN_HEADERS
  // below, and getColumnHeaderKey in content.js.
  //
  // {{TAX_YEAR_RANGE}} is replaced at render time with the tax year shown in
  // Voyant's year selector, e.g. "2026/27". See interpolateHelpText in
  // content.js.
  // ------------------------------------------------------------

  {
    key: "yearViewInvestmentEOYBalance",
    label: "EOY Balance (Investment)",
    helpText: `
      <h3>What this shows</h3>
      <p>The projected value of this investment as at the end of the {{TAX_YEAR_RANGE}} tax year.</p>
    `,
  },
  {
    key: "yearViewInvestmentNetGrowth",
    label: "Net Growth (Investment)",
    helpText: `
      <h3>What this shows</h3>
      <p>The growth applied to this investment during the {{TAX_YEAR_RANGE}} tax year, after any fees.</p>
    `,
  },
  {
    key: "yearViewPensionEOYBalance",
    label: "EOY Balance (Pension)",
    helpText: `
      <h3>What this shows</h3>
      <p>The projected value of this pension as at the end of the {{TAX_YEAR_RANGE}} tax year.</p>
    `,
  },
  {
    key: "yearViewPensionNetGrowth",
    label: "Net Growth (Pension)",
    helpText: `
      <h3>What this shows</h3>
      <p>The growth applied to this pension during the {{TAX_YEAR_RANGE}} tax year, after any fees.</p>
    `,
  },
  {
    key: "yearViewPropertyValue",
    label: "Value (Property)",
    helpText: `
      <h3>What this shows</h3>
      <p>The projected value of this property as at the end of the {{TAX_YEAR_RANGE}} tax year.</p>
    `,
  },
  {
    key: "yearViewPropertyDebts",
    label: "Debts (Property)",
    helpText: `
      <h3>What this shows</h3>
      <p>Any outstanding debt linked to this property (e.g. a mortgage) as at the end of the {{TAX_YEAR_RANGE}} tax year.</p>
    `,
  },
  {
    key: "yearViewDebtEOYBalance",
    label: "EOY Balance (Debt)",
    helpText: `
      <h3>What this shows</h3>
      <p>The projected outstanding balance of this debt as at the end of the {{TAX_YEAR_RANGE}} tax year.</p>
    `,
  },
];

// -----------------------------------------------------------------------------
// Year View column header targets
// -----------------------------------------------------------------------------
// Unlike the fields above (matched by a label's for/id), these are matched by
// their own visible text combined with the aria-label of the ancestor
// role="table" wrapper, since Voyant gives each Year View variant its own
// aria-label (Investment Details, Pension Details, Property Details, Debt
// Details), and the header divs themselves carry no id/for.
//
// Each entry's key must match a field entry's key above.
// -----------------------------------------------------------------------------

window.SHACKADEMY_COLUMN_HEADERS = [
  {
    key: "yearViewInvestmentEOYBalance",
    tableLabel: "Year View Investment Details",
    columnText: "EOY Balance",
  },
  {
    key: "yearViewInvestmentNetGrowth",
    tableLabel: "Year View Investment Details",
    columnText: "Net Growth",
  },
  {
    key: "yearViewPensionEOYBalance",
    tableLabel: "Year View Pension Details",
    columnText: "EOY Balance",
  },
  {
    key: "yearViewPensionNetGrowth",
    tableLabel: "Year View Pension Details",
    columnText: "Net Growth",
  },
  {
    key: "yearViewPropertyValue",
    tableLabel: "Year View Property Details",
    columnText: "Value",
  },
  {
    key: "yearViewPropertyDebts",
    tableLabel: "Year View Property Details",
    columnText: "Debts",
  },
  {
    key: "yearViewDebtEOYBalance",
    tableLabel: "Year View Debt Details",
    columnText: "EOY Balance",
  },
];
