# User Flows for Automated Investment System

## Overview
This document details the key user flows for each persona, showing how they interact with the system to achieve their investment goals.

## Flow Notation
- **[User Action]** - Actions taken by the user
- **{System Response}** - Automated system responses
- **→** - Flow progression
- **Decision Point** - Where user must make a choice
- **✓ Success State** - Desired outcome achieved

---

## 1. New User Onboarding Flow

### Flow: First-Time Setup (All Personas)

1. **[User lands on homepage]**
2. **[Clicks "Get Started"]**
3. **{System presents account creation}**
4. **[User provides email/phone]**
5. **{System sends verification code}**
6. **[User enters verification code]**
7. **{System creates account}**

### Flow: Risk Assessment (Personalized by Persona)

1. **{System presents risk questionnaire}**
   - Age and retirement timeline
   - Income and assets
   - Investment experience
   - Risk tolerance scenarios
   - Financial goals

2. **[User completes assessment]**
   - Young Investor: High risk tolerance, growth focus
   - Retirement Planner: Conservative shift, preservation focus
   - Busy Professional: Moderate risk, balanced approach

3. **{System generates risk profile}**
   - Recommended portfolio allocation
   - Expected returns visualization
   - Risk metrics explanation

4. **Decision Point: Accept or Customize**
   - **[Accept recommendations]** → Portfolio Creation
   - **[Customize]** → Advanced Settings

### Flow: Account Funding

1. **{System presents funding options}**
   - Bank account link (Plaid)
   - Wire transfer instructions
   - Recurring investment setup

2. **[User selects funding method]**
3. **[User completes funding]**
4. **{System confirms receipt}**
5. **{System begins automated investing}**
6. **✓ Success: Account active and investing**

---

## 2. Busy Professional Flow (Sarah Chen)

### Primary Flow: Set and Forget Setup

1. **[Sarah downloads mobile app during commute]**
2. **[Completes onboarding in 15 minutes]**
3. **[Sets up $2,000/month auto-investment]**
4. **{System creates diversified portfolio}**
5. **[Enables push notifications for milestones]**
6. **{System manages everything automatically}**

### Recurring Flow: Monthly Check-in (Optional)

1. **{System sends monthly summary notification}**
2. **[Sarah opens app (2 minutes)]**
3. **[Reviews performance dashboard]**
   - Portfolio value and growth
   - Goal progress tracker
   - Market insights summary
4. **[Closes app]**
5. **✓ Success: Wealth building on autopilot**

### Exception Flow: Bonus Investment

1. **[Sarah receives year-end bonus]**
2. **[Opens app]**
3. **[Clicks "One-time investment"]**
4. **[Enters bonus amount]**
5. **{System optimizes allocation}**
6. **{System invests within 24 hours}**
7. **✓ Success: Bonus optimally invested**

---

## 3. Retirement Planner Flow (Robert Williams)

### Primary Flow: Retirement Planning Setup

1. **[Robert schedules consultation call]**
2. **{System provides human advisor for setup}**
3. **[Discusses retirement goals]**
   - Target retirement date: 10 years
   - Desired annual income: $80,000
   - Existing assets: $500,000

4. **{System creates retirement roadmap}**
   - Glide path visualization
   - Required contribution calculator
   - Success probability analysis

5. **[Robert approves plan]**
6. **[Transfers existing IRA]**
7. **{System implements age-appropriate portfolio}**

### Recurring Flow: Quarterly Rebalancing

1. **{System automatically rebalances}**
2. **{System sends rebalancing report}**
3. **[Robert reviews changes]**
4. **{System shows tax impact}**
5. **✓ Success: Portfolio optimized for retirement**

### Annual Flow: Retirement Readiness Review

1. **{System schedules annual review}**
2. **[Robert joins video call]**
3. **{Advisor reviews progress}**
   - On track / Off track analysis
   - Adjustment recommendations
   - Tax strategy optimization
4. **[Robert approves adjustments]**
5. **✓ Success: Retirement plan optimized**

---

## 4. Young Investor Flow (Maria Rodriguez)

### Primary Flow: Learning While Earning

1. **[Maria sees social media ad]**
2. **[Downloads app]**
3. **[Starts with $50]**
4. **{System suggests beginner portfolio}**
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

## Critical User Flow Patterns

### Trust Building Pattern
1. Start small → Monitor closely → Gain confidence → Increase investment

### Education Integration Pattern
1. Learn concept → Apply in portfolio → See results → Build knowledge

### Automation Adoption Pattern
1. Manual start → Test automation → Trust system → Full automation

### Goal Achievement Pattern
1. Set goal → Track progress → Receive guidance → Achieve milestone → Set new goal

## Success Metrics for Flows

- **Onboarding Completion Rate:** >80%
- **Time to First Investment:** <24 hours
- **Monthly Active Usage:** >60%
- **Feature Adoption Rate:** >40%
- **Goal Achievement Rate:** >70%
- **User Satisfaction Score:** >4.5/5