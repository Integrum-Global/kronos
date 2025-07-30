# User Flows for Automated Investment System (Realistic Version)

## Overview
This document details the key user flows for each persona, showing how they interact with the system to achieve their investment goals. Updated with realistic timelines and comprehensive error handling.

## Flow Notation
- **[User Action]** - Actions taken by the user
- **{System Response}** - Automated system responses
- **→** - Flow progression
- **Decision Point** - Where user must make a choice
- **✓ Success State** - Desired outcome achieved
- **⚠️ Error State** - Failure scenarios and handling
- **⏱️ Timeline** - Realistic time expectations

---

## 1. New User Onboarding Flow

### Flow: First-Time Setup (All Personas)

⏱️ **Realistic Timeline: 3-7 business days from start to funded account**

1. **[User lands on homepage]**
2. **[Clicks "Get Started"]**
3. **{System presents account creation}**
4. **[User provides email/phone]**
   - ⚠️ **Error: Invalid email** → Show validation error
   - ⚠️ **Error: Existing account** → Redirect to login
5. **{System sends verification code}** (30-second delay)
   - ⚠️ **Error: SMS delivery failure** → Offer email option
   - ⚠️ **Error: Rate limited** → "Too many attempts, try in 15 minutes"
6. **[User enters verification code]**
   - ⚠️ **Error: Wrong code** → 3 attempts, then restart
   - ⚠️ **Error: Code expired** → Resend option
7. **{System creates account}**

### Flow: Identity Verification (KYC/AML)

⏱️ **Timeline: 5 minutes to 3 business days**

1. **{System requires identity verification}**
2. **[User provides personal information]**
   - Full legal name
   - Date of birth
   - Social Security Number
   - Current residential address
   - ⚠️ **Error: PO Box provided** → "Physical address required"

3. **{System runs instant verification}** (30 seconds)
   - ✓ **Success Path (70%)**: Instant approval
   - ⚠️ **Manual Review Path (25%)**: Additional documents needed
   - ⚠️ **Rejection Path (5%)**: Failed KYC/AML checks

4. **Manual Review Process** (if needed):
   - **[User uploads documents]**
     - Driver's license or passport
     - Utility bill or bank statement
   - **{System queues for review}** (1-3 business days)
   - ⚠️ **Error: Blurry documents** → Re-upload request
   - ⚠️ **Error: Expired ID** → Current ID required
   - ⚠️ **Error: Name mismatch** → Legal name affidavit

5. **Rejection Handling**:
   - ⚠️ **OFAC match** → Account denied, no recourse
   - ⚠️ **Identity not verified** → Phone call verification
   - ⚠️ **Address not verified** → Additional documentation

### Flow: Risk Assessment (After KYC Approval)

1. **{System presents risk questionnaire}**
   - Age and retirement timeline
   - Income and assets
   - Investment experience
   - Risk tolerance scenarios
   - Financial goals
   - ⚠️ **Inconsistency detected** → "Income doesn't match investment amount"

2. **[User completes assessment]** (5-10 minutes)
   - Young Investor: High risk tolerance, growth focus
   - Retirement Planner: Conservative shift, preservation focus
   - Busy Professional: Moderate risk, balanced approach
   - ⚠️ **Timeout after 30 mins** → Save progress option

3. **{System generates risk profile}**
   - Recommended portfolio allocation
   - Expected returns visualization
   - Risk metrics explanation
   - ⚠️ **Edge case** → Manual review if answers inconsistent

4. **Decision Point: Accept or Customize**
   - **[Accept recommendations]** → Portfolio Creation
   - **[Customize]** → Advanced Settings (adds 10-15 minutes)

### Flow: Account Funding

⏱️ **Timeline: 3-5 business days for ACH, 1 day for wire**

1. **{System presents funding options}**
   - Bank account link (Plaid) - Most common
   - Wire transfer - For large amounts
   - Check deposit - Rare, 7-10 days

2. **ACH Transfer Flow**:
   - **[User selects bank account link]**
   - **{Plaid integration launches}**
   - **[User logs into bank]**
     - ⚠️ **Error: Wrong credentials** → 3 attempts max
     - ⚠️ **Error: Bank not supported** → Manual entry option
     - ⚠️ **Error: MFA timeout** → Restart flow
   - **{System initiates micro-deposits}** (1-2 business days)
   - **[User verifies amounts]**
     - ⚠️ **Error: Wrong amounts** → 3 attempts, then restart
   - **[User initiates transfer]**
   - **{ACH processing}** (3-5 business days)
     - ⚠️ **Error: Insufficient funds** → Email notification
     - ⚠️ **Error: Account closed** → Update banking info
     - ⚠️ **Error: Name mismatch** → Compliance review

3. **Wire Transfer Flow**:
   - **{System provides wire instructions}**
   - **[User initiates wire at bank]**
   - **{System monitors for receipt}** (4-24 hours)
     - ⚠️ **Error: Wrong reference number** → Manual matching
     - ⚠️ **Error: Amount mismatch** → Compliance review

4. **{System confirms receipt}**
   - Email notification
   - In-app notification
   - ⚠️ **Holding period** → 5 days for first deposit (fraud prevention)

5. **{System begins automated investing}**
   - Only after funds fully clear
   - ⚠️ **Market closed** → Queue for next trading day

6. **✓ Success: Account active and investing**
   - Total time: 3-7 business days typically
   - ⚠️ **Abandonment risk** → 40% drop-off during funding

---

## 2. Busy Professional Flow (Sarah Chen)

### Primary Flow: Set and Forget Setup

⏱️ **Realistic Timeline: 1 week from download to investing**

1. **[Sarah downloads mobile app during commute]**
2. **[Starts onboarding]** (Interrupted 3 times)
   - Day 1: Creates account (5 mins)
   - Day 2: Completes KYC during lunch (10 mins)
   - Day 3: Risk assessment before bed (10 mins)
   - ⚠️ **Session timeout** → Progress saved

3. **[Attempts to fund account]**
   - **[Links checking account]** → Success
   - **[Sets up $2,000/month auto-investment]**
   - ⚠️ **Bank flags as suspicious** → Sarah calls bank
   - Day 4-6: Waiting for ACH to clear

4. **{System creates diversified portfolio}**
   - Day 7: First investment executed
   - ⚠️ **Market volatility** → Sarah worried, calls support

5. **[Enables push notifications for milestones]**
   - ⚠️ **Notification overload** → Sarah adjusts to monthly only

6. **{System manages everything automatically}**
   - ✓ **Success** → Sarah checks monthly, satisfied

### Recurring Flow: Monthly Check-in

1. **{System sends monthly summary notification}**
2. **[Sarah opens app]** (50% open rate)
3. **[Reviews performance dashboard]** (2-5 minutes)
   - Portfolio value and growth
   - ⚠️ **Down month** → Sarah considers withdrawing
   - **{System shows education}** → "Market downturns are normal"
   - Goal progress tracker
   - Market insights summary

4. **Common Issues**:
   - ⚠️ **Password forgotten** → Reset flow (happens 20% of time)
   - ⚠️ **Biometric fails** → Falls back to password
   - ⚠️ **App crashes** → 2% of sessions

5. **[Closes app]**
6. **✓ Success: Sarah stays invested through volatility**

### Exception Flow: Bonus Investment

⏱️ **Timeline: 3-5 days for large deposits**

1. **[Sarah receives year-end bonus]**
2. **[Opens app]**
   - ⚠️ **Session expired** → Re-authenticate
3. **[Clicks "One-time investment"]**
4. **[Enters bonus amount: $20,000]**
   - ⚠️ **Anti-fraud trigger** → "Large deposit verification required"
   - **{System requests confirmation}** → Email verification
   - ⚠️ **Daily limit exceeded** → "Max $10K/day, schedule multiple?"

5. **Verification Process**:
   - **{System calls Sarah}** → Voice verification
   - ⚠️ **Missed call** → Email alternative with 24hr delay
   - **[Sarah confirms deposit is legitimate]**

6. **{System processes deposit}** (3-5 business days)
   - Day 1-3: ACH processing
   - Day 4: Funds clear
   - Day 5: Investment executed
   - ⚠️ **Market closed** → Queued for next trading day

7. **✓ Success: Bonus invested (with some frustration)**

---

## 3. Retirement Planner Flow (Robert Williams)

### Primary Flow: Retirement Planning Setup

⏱️ **Timeline: 2-4 weeks for IRA transfer**

1. **[Robert schedules consultation call]**
   - ⚠️ **No immediate availability** → Books 3 days out
   - Receives prep materials via email

2. **{System provides human advisor for setup}** (45-min call)
   - ⚠️ **Tech issues** → 10% of calls have connection problems
   - Advisor is junior, reads from script

3. **[Discusses retirement goals]**
   - Target retirement date: 10 years
   - Desired annual income: $80,000
   - Existing assets: $500,000
   - ⚠️ **Reality check** → "Need $2M for that income"
   - Robert disappointed, adjusts expectations

4. **{System creates retirement roadmap}**
   - Glide path visualization
   - Required contribution: $3,000/month (Robert can only do $2,000)
   - Success probability: 65% (Robert wanted 90%)
   - ⚠️ **Assumptions questioned** → "7% return seems high"

5. **[Robert approves modified plan]** (After 2 more calls)

6. **[Initiates IRA transfer]** (Complex process)
   - **[Fills out transfer forms]** → 5 pages of paperwork
   - ⚠️ **Form rejected** → Signature doesn't match
   - **[Resubmits forms]** → Medallion signature required
   - **[Goes to bank for medallion]** → Adds 3 days
   - ⚠️ **Current custodian delays** → "Processing fee" surprise
   - Total transfer time: 15-30 business days

7. **{System implements age-appropriate portfolio}**
   - ⚠️ **Market timing concern** → "Should we wait for dip?"
   - Advisor explains dollar-cost averaging
   - ✓ **Success: IRA transferred after 3 weeks**

### Recurring Flow: Quarterly Rebalancing

1. **{System automatically rebalances}**
   - ⚠️ **Tax implications** → $2,000 capital gains realized
   - Robert upset, didn't expect tax bill

2. **{System sends rebalancing report}**
   - ⚠️ **Report confusing** → Robert calls support
   - 20-minute wait time
   - Support explains poorly

3. **[Robert reviews changes]**
   - Doesn't understand why bonds increased
   - ⚠️ **Requests to undo** → "Not possible after execution"

4. **{System shows tax impact}**
   - Estimated quarterly tax: $500
   - ⚠️ **Sticker shock** → Considers leaving platform

5. **✓ Partial Success: Portfolio rebalanced but trust damaged**

### Annual Flow: Retirement Readiness Review

⏱️ **Timeline: Scheduled over 2-week window**

1. **{System schedules annual review}**
   - ⚠️ **Robert misses first appointment** → Reschedules
   - New appointment 10 days later

2. **[Robert joins video call]**
   - Different advisor than last year
   - ⚠️ **Advisor unfamiliar with account** → Generic advice

3. **{Advisor reviews progress}**
   - Off track due to market downturn
   - Recommends increasing contribution to $4,000/month
   - ⚠️ **Robert can't afford** → Anxiety about retirement
   - Tax strategy costs extra $500/year

4. **[Robert reluctantly approves minimal adjustments]**
5. **≈ Mixed Result: Plan updated but confidence shaken**

---

## 4. Young Investor Flow (Maria Rodriguez)

### Primary Flow: Learning While Earning

⏱️ **Timeline: 2 weeks from download to investing (with gaps)**

1. **[Maria sees TikTok ad]** → "Turn $50 into $50K!"
   - ⚠️ **Misleading expectations** → Reality check needed

2. **[Downloads app]** → Excited but overwhelmed
   - Opens app, sees "Get Started"
   - ⚠️ **Abandons at KYC** → "Why do they need my SSN?"
   - Returns 3 days later after friend explains

3. **[Attempts to start with $50]**
   - ⚠️ **Below minimum** → "$100 minimum initial deposit"
   - Maria disappointed, waits until payday
   - Returns 1 week later with $100

4. **{System suggests beginner portfolio}**
   - 80/20 stocks/bonds seems "boring"
   - ⚠️ **Wants crypto** → "Not available"
   - ⚠️ **Wants individual stocks** → "ETFs only for accounts under $5K"
   - Reluctantly accepts suggested portfolio
5. **[Explores education section]**
   - Investment basics course
   - Risk/reward simulator
   - Market news simplified

6. **[Sets up $200/month auto-invest]**
7. **{System gamifies milestones}**

### Recurring Flow: Social Learning

1. **[Maria checks app weekly]**
2. **[Participates in community forums]**
3. **[Completes investment challenges]**
4. **{System awards achievement badges}**
5. **[Shares progress with friends]**
6. **✓ Success: Building wealth + knowledge**

### Growth Flow: Increasing Investment

1. **[Maria gets salary raise]**
2. **{System suggests increased contribution}**
3. **[Maria uses savings calculator]**
4. **[Increases to $400/month]**
5. **{System optimizes new allocation}**
6. **✓ Success: Accelerated wealth building**

---

## 5. Business Owner Flow (David Kim)

### Primary Flow: Irregular Income Management

1. **[David sets up business account]**
2. **[Configures tax-efficient structure]**
   - SEP-IRA setup
   - Taxable account
   - Tax-loss harvesting enabled

3. **[Creates investment rules]**
   - Invest 30% of monthly profit
   - Minimum: $5,000/month
   - Maximum: $50,000/month

4. **{System monitors business account}**
5. **{System auto-invests based on rules}**

### Quarterly Flow: Tax Optimization

1. **{System runs tax analysis}**
2. **{System harvests losses}**
3. **{System sends tax report}**
4. **[David forwards to accountant]**
5. **✓ Success: Minimized tax burden**

### Annual Flow: Business Exit Planning

1. **[David initiates exit planning tool]**
2. **{System models scenarios}**
   - Lump sum investment strategies
   - Tax minimization tactics
   - Wealth preservation options
3. **[David selects preferred approach]**
4. **✓ Success: Exit strategy prepared**

---

## 6. Conservative Saver Flow (Linda Thompson)

### Primary Flow: Cautious Entry

1. **[Linda reads multiple reviews]**
2. **[Calls customer support]**
3. **{Support explains SIPC insurance}**
4. **[Linda starts with $500 test]**
5. **{System suggests conservative portfolio}**
   - 30% stocks, 70% bonds
   - Government bond focus
   - Dividend aristocrats

6. **[Linda monitors daily for 1 month]**
7. **[Gains confidence in system]**
8. **[Increases investment gradually]**

### Recurring Flow: Building Trust

1. **{System sends weekly education}**
   - Market volatility explained
   - Historical performance data
   - Risk management strategies

2. **[Linda reads materials]**
3. **[Gradually increases allocation]**
4. **✓ Success: Overcomes investment fear**

---

## 7. ESG Investor Flow (James Park)

### Primary Flow: Values-Based Setup

1. **[James selects ESG focus]**
2. **{System presents ESG options}**
   - Environmental focus
   - Social impact focus
   - Governance focus
   - Custom exclusions

3. **[James customizes filters]**
   - Exclude: Fossil fuels, weapons
   - Include: Renewable energy, diversity leaders

4. **{System builds ESG portfolio}**
5. **{System shows impact metrics}**
6. **✓ Success: Values-aligned investing**

### Quarterly Flow: Impact Review

1. **{System generates impact report}**
   - Carbon footprint reduction
   - Social metrics improvement
   - Governance scores
2. **[James shares report with board]**
3. **✓ Success: Measurable positive impact**

---

## 8. International Professional Flow (Amara Okafor)

### Primary Flow: Multi-Currency Setup

1. **[Amara selects international account]**
2. **{System detects location}**
3. **[Configures multi-currency preferences]**
   - Base currency: USD
   - Regular income: EUR
   - Investment mix: Global

4. **{System handles conversions}**
5. **{System optimizes for tax treaties}**

### Relocation Flow: Country Change

1. **[Amara notifies of relocation]**
2. **{System adjusts tax strategy}**
3. **{System maintains compliance}**
4. **✓ Success: Seamless transition**

---

## Critical Missing Flows (Added After Review)

### Customer Support Flow

⏱️ **Average Resolution Time: 2-5 business days**

1. **[User encounters problem]** → Can't withdraw funds
2. **[Searches help center]** → Generic articles, not helpful
3. **[Looks for phone number]** → None available (cost savings)
4. **[Initiates chat]**
   - ⚠️ **Bot responds first** → Frustrating canned responses
   - **[Demands human]** → "Current wait time: 47 minutes"
   - ⚠️ **Closes app in frustration** → 40% abandon here

5. **[Tries email support]**
   - Auto-reply: "We'll respond within 2 business days"
   - ⚠️ **Day 3: No response** → Sends follow-up
   - Day 4: Generic response missing the point
   - ⚠️ **Escalation needed** → Posts negative review

6. **Resolution Path**:
   - Day 5: Manager responds to negative review
   - Offers phone call (exception to policy)
   - Issue resolved but trust damaged
   - ⚠️ **50% chance of churn** within 90 days

### Account Recovery Flow

⏱️ **Timeline: 30 minutes to 7 days depending on severity**

1. **[User can't access account]**
   - Forgot password
   - Phone number changed (no 2FA access)
   - Email compromised

2. **Password Reset** (Best case):
   - **[Clicks "Forgot Password"]**
   - Email sent (if email accessible)
   - ⚠️ **Email in spam** → 20% don't find it
   - Reset link expires in 1 hour
   - ✓ Success in 5-10 minutes

3. **2FA Device Lost** (Common case):
   - **[Can't receive SMS]** → Changed phone number
   - **[Clicks "Can't access phone"]**
   - ⚠️ **Backup codes required** → 90% didn't save them
   - Must verify identity:
     - Upload ID
     - Selfie with ID
     - Answer security questions
     - ⚠️ **Manual review** → 24-48 hours

4. **Complete Lockout** (Worst case):
   - Email and phone inaccessible
   - **[Contacts support]** → How? Catch-22
   - Must mail notarized affidavit
   - Include copy of ID, proof of address
   - ⏱️ **Resolution: 5-7 business days**
   - ⚠️ **20% never regain access** → Abandon funds

### Compliance Failure Flow

⚠️ **Critical: Can result in account freeze**

1. **Suspicious Activity Detected**:
   - Large unusual deposit
   - Rapid withdrawal after deposit
   - Login from sanctioned country

2. **{Automated freeze triggered}**
   - ⚠️ **No warning** → User discovers when trying to trade
   - All functions disabled
   - Vague email: "Account under review"

3. **[User panics]**
   - Tries to call → No phone support
   - Emails support → "Cannot discuss compliance matters"
   - ⚠️ **Funds inaccessible** → May miss bills

4. **Investigation Process**:
   - Day 1-3: Initial review
   - Day 4: Request for documents
     - Source of funds proof
     - Employment verification
     - Bank statements
   - ⚠️ **Documents rejected** → "Need certified copies"
   - Day 7-14: Extended review
   - ⚠️ **No updates provided** → User considers legal action

5. **Resolution**:
   - **Best case**: Cleared after 2 weeks
   - **Common case**: Partial restrictions remain
   - **Worst case**: Account closed, check mailed in 30 days
   - ⚠️ **SAR filed** → User never informed, shows on background checks

### Market Crash Flow (Black Swan Event)

⏱️ **Timeline: Minutes to days**

1. **Market drops 10% in one day**
2. **{System overloaded}**
   - ⚠️ **App won't load** → 500 errors
   - Website crashes
   - ⚠️ **Can't access funds** → Panic increases

3. **[Users flood support]**
   - 100x normal volume
   - ⚠️ **No one can get through** → Busy signals
   - Social media fills with complaints
   - ⚠️ **"Is this another Robinhood?"** → Reputation crisis

4. **Communication Failure**:
   - CEO too slow to respond
   - ⚠️ **Generic "we're experiencing issues"** → Increases panic
   - No clear timeline
   - Users assume the worst

5. **Aftermath**:
   - 30% of users withdraw everything
   - Class action lawsuits filed
   - Regulatory investigation
   - ⚠️ **Reputation permanently damaged**

## Critical User Flow Patterns

### Trust Building Pattern
1. Start small → Monitor closely → Gain confidence → Increase investment

### Education Integration Pattern
1. Learn concept → Apply in portfolio → See results → Build knowledge

### Automation Adoption Pattern
1. Manual start → Test automation → Trust system → Full automation

### Goal Achievement Pattern
1. Set goal → Track progress → Receive guidance → Achieve milestone → Set new goal

## Success Metrics for Flows (Realistic Version)

### Actual Industry Benchmarks
- **Onboarding Completion Rate:** 45-60% (not 80%)
- **Time to First Investment:** 3-7 days (not 24 hours)
- **Monthly Active Usage:** 20-30% (not 60%)
- **Feature Adoption Rate:** 10-20% (not 40%)
- **Annual Churn Rate:** 15-25% (ignored in original)
- **Support Ticket Resolution:** 2-5 days (not mentioned)
- **Account Recovery Success:** 80% (20% abandon)

### Reality Check Metrics
- **KYC Approval Rate:** 70% instant, 25% manual review, 5% rejected
- **Funding Success Rate:** 60% complete funding after account open
- **First-Year Retention:** 75% (25% churn)
- **Support Contact Rate:** 40% of users contact support in Year 1
- **Password Reset Rate:** 30% of users monthly
- **Negative Review Rate:** 15% of users leave negative reviews

### Critical Warning Signs
- Drop-off at KYC: >50% = Product problem
- Funding abandonment: >40% = Friction too high  
- Support ticket backlog: >3 days = Understaffed
- Account recovery fails: >20% = Security too strict
- Compliance holds: >2% = Process problems

## Conclusion

These realistic flows show that building a financial services platform is extremely complex. Every flow has multiple failure points, regulatory requirements add friction, and user trust is fragile. Success requires:

1. **Massive investment in support** - Not optional
2. **Bulletproof security with usability** - Very hard balance
3. **Regulatory expertise** - Embedded in every feature
4. **Patience** - Users won't onboard in 15 minutes
5. **Crisis planning** - Not if, but when things go wrong

The original optimistic flows would lead to product failure. These realistic flows, while sobering, provide an honest foundation for building a sustainable platform.