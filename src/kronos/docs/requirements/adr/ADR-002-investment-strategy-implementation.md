# ADR-002: Investment Strategy Implementation

## Status
Proposed

## Context
Kronos must decide how to implement investment strategies that balance customer expectations, regulatory requirements, operational complexity, and business sustainability. The investment strategy directly impacts:
- Regulatory compliance requirements
- Operational complexity and costs
- Customer acquisition and retention
- Revenue potential and margins
- Technical architecture needs

### Investment Strategy Options Analysis
Current robo-advisor market offers various approaches:
- **Simple ETF Portfolios**: Vanguard, Schwab (low cost, commoditized)
- **Tax Optimization Focus**: Wealthfront (direct indexing at scale)
- **Thematic Investing**: Betterment (SRI/ESG options)
- **Active Management Hybrid**: Personal Capital (human advisors)
- **Alternative Assets**: Alto, Rocket Dollar (complexity/regulation)

### Key Constraints
1. **Regulatory**: Must act as fiduciary, best interest standard
2. **Operational**: Rebalancing, tax reporting, corporate actions
3. **Cost**: Trading costs, market data, research
4. **Technical**: Real-time calculations, tax lot tracking
5. **Customer**: Performance expectations, simplicity needs

## Decision
Implement a **Progressive Complexity Strategy** starting with dead-simple portfolios and adding sophistication only after proving operational excellence.

### Implementation Phases

#### Phase 1: Three-Portfolio MVP
```yaml
portfolios:
  conservative:
    allocation:
      stocks: 30%  # VTI - Vanguard Total Stock Market
      bonds: 70%   # BND - Vanguard Total Bond Market
    rebalancing: quarterly_manual
    minimum: $100
    
  moderate:
    allocation:
      stocks: 60%  # VTI
      bonds: 40%   # BND
    rebalancing: quarterly_manual
    minimum: $100
    
  aggressive:
    allocation:
      stocks: 80%  # VTI
      bonds: 20%   # BND
    rebalancing: quarterly_manual
    minimum: $100

operations:
  execution: daily_batch_4pm_ET
  rebalancing: manual_review_quarterly
  tax_management: none_initially
  fractional_shares: no
```

#### Phase 2: Enhanced Portfolios
```yaml
enhancements:
  portfolio_options:
    - add_international: VTIAX (20% of equity)
    - add_real_estate: VNQ (10% of portfolio)
    - esg_option: ESG-screened ETFs
    
  features:
    - automated_rebalancing: weekly
    - tax_loss_harvesting: basic_version
    - fractional_shares: enabled
    - ira_accounts: traditional_and_roth
    
  operational:
    - execution: twice_daily
    - drift_monitoring: automated
    - tax_lot_selection: specific_identification
```

#### Phase 3: Sophisticated Strategies
```yaml
advanced_features:
  direct_indexing:
    minimum: $100,000
    stocks: 500_individual_holdings
    customization: sector_exclusions
    tax_alpha: 100-200bps_target
    
  factor_investing:
    - value_tilt
    - small_cap_tilt
    - quality_screens
    
  alternatives:
    - commodity_exposure: 5%_max
    - reits: 10%_max
    - crypto: 1-3%_max_BTC_ETH_only
```

### Risk Profiling Approach

#### MVP Risk Assessment
```python
# Simplified 5-question assessment
risk_questions = [
    {
        "question": "Investment timeline?",
        "options": ["<3 years", "3-10 years", ">10 years"],
        "scores": [1, 2, 3]
    },
    {
        "question": "Risk tolerance?",
        "options": ["Preserve capital", "Moderate growth", "Maximum growth"],
        "scores": [1, 2, 3]
    },
    # ... 3 more questions
]

# Simple mapping
def map_risk_score_to_portfolio(total_score):
    if total_score <= 7:
        return "conservative"
    elif total_score <= 12:
        return "moderate"
    else:
        return "aggressive"
```

#### Enhanced Risk Assessment (Phase 2)
- Add behavioral questions
- Monte Carlo simulations
- Goal-based planning
- Dynamic risk adjustment

### Rebalancing Strategy

#### Phase 1: Quarterly Manual
```yaml
manual_process:
  frequency: quarterly
  trigger: calendar_based
  process:
    1. generate_drift_report
    2. human_review_required
    3. create_rebalance_orders
    4. human_approval_required
    5. execute_in_batch
    6. verify_completion
```

#### Phase 2: Automated Threshold
```yaml
automated_process:
  frequency: weekly_check
  triggers:
    - absolute_drift: 5%_from_target
    - relative_drift: 25%_from_allocation
    - cash_inflow: >$10,000
    
  constraints:
    - min_trade_size: $100
    - tax_awareness: avoid_wash_sales
    - cost_consideration: commission_impact
```

### Tax Management Evolution

#### Phase 1: Basic Tax Reporting
- Track cost basis
- Generate 1099 forms
- FIFO lot selection

#### Phase 2: Tax-Loss Harvesting
```python
class TaxLossHarvester:
    def __init__(self):
        self.wash_sale_window = 30  # days
        self.min_loss_threshold = 100  # dollars
        self.correlation_threshold = 0.95
        
    def identify_harvest_opportunities(self, positions):
        # Basic TLH logic
        opportunities = []
        for position in positions:
            if position.unrealized_loss > self.min_loss_threshold:
                if not self.creates_wash_sale(position):
                    replacement = self.find_replacement(position)
                    opportunities.append({
                        'sell': position,
                        'buy': replacement
                    })
        return opportunities
```

#### Phase 3: Direct Indexing
- Individual stock ownership
- Daily tax-loss harvesting
- Custom exclusions
- Factor tilts

## Consequences

### Positive
1. **Lower Operational Risk**: Simple start reduces errors
2. **Faster Time to Market**: Basic portfolios quick to implement
3. **Regulatory Clarity**: Standard strategies well understood
4. **Cost Efficiency**: ETFs minimize trading costs
5. **Scalability Path**: Can add complexity gradually
6. **Customer Understanding**: Simple portfolios easier to explain

### Negative
1. **Commoditization Risk**: Hard to differentiate on 60/40
2. **Lower Margins**: ETF-based strategies have thin margins
3. **Limited Tax Alpha**: No optimization initially
4. **Customer Expectations**: May want more options
5. **Competitive Pressure**: Others offer more features

### Mitigation Strategies
- **Differentiation**: Focus on service, education, UX
- **Margins**: Add value through financial planning
- **Tax Alpha**: Promise future enhancements
- **Expectations**: Clear roadmap communication
- **Competition**: Pick specific customer niche

## Alternatives Considered

### Option 1: Direct Indexing from Start
**Description**: Individual stock ownership for all accounts

**Pros**:
- Maximum tax efficiency
- Strong differentiation
- Higher revenue potential
- Custom exclusions

**Cons**:
- Massive operational complexity
- High minimum account sizes
- Regulatory scrutiny
- Technical challenges
- 12+ month delay

**Why Rejected**: Too complex for initial launch

### Option 2: Active Management
**Description**: Tactical allocation, market timing

**Pros**:
- Higher fees possible
- Strong differentiation
- Marketing appeal

**Cons**:
- Regulatory complexity
- Performance pressure
- Higher costs
- Track record needed
- Conflicts with passive trend

**Why Rejected**: Against market trends and fiduciary duty

### Option 3: Alternative Assets Focus
**Description**: Crypto, private equity, real estate

**Pros**:
- High customer interest
- Premium pricing
- Differentiation

**Cons**:
- Regulatory nightmare
- Operational complexity
- Custody challenges
- Risk management
- Limited providers

**Why Rejected**: Too risky for new platform

## Implementation Plan

### Month 1-3: Foundation
1. Select ETF partners (Vanguard/iShares)
2. Design risk questionnaire
3. Build portfolio construction logic
4. Create rebalancing procedures
5. Test with paper portfolios

### Month 4-6: Integration
1. Custodian integration for ETF trading
2. Cost basis tracking system
3. Performance calculation engine
4. Client reporting templates
5. Compliance procedures

### Month 7-9: Testing
1. Paper trading validation
2. Tax calculation verification
3. Rebalancing simulation
4. Performance attribution
5. Stress testing

### Month 10-12: Launch
1. Pilot with employees
2. Limited customer beta
3. Operational refinement
4. Performance monitoring
5. Customer feedback

### Success Metrics
- Portfolio tracking error: <0.5%
- Rebalancing accuracy: 100%
- Tax reporting accuracy: 100%
- Customer satisfaction: >80%
- Operational incidents: <1/month

## Related Decisions
- ADR-001: Architecture Pattern (impacts calculation systems)
- ADR-003: Compliance Framework (fiduciary requirements)
- ADR-004: Technology Stack (performance needs)

## Technical Requirements

### Calculation Engine
```python
class PortfolioEngine:
    """Core portfolio calculations"""
    
    def calculate_allocation(self, account_value, target_allocation):
        """Convert percentages to dollar amounts"""
        pass
        
    def calculate_drift(self, current, target):
        """Determine rebalancing needs"""
        pass
        
    def optimize_trades(self, drift, constraints):
        """Minimize transaction costs"""
        pass
        
    def track_performance(self, positions, benchmarks):
        """Attribution and reporting"""
        pass
```

### Data Requirements
- Real-time market data feed
- Historical price data (5+ years)
- Corporate actions feed
- Benchmark data
- Tax rates database

## Compliance Considerations
1. **Best Execution**: Document ETF selection criteria
2. **Fiduciary Duty**: Show portfolios serve client interests
3. **Fair Allocation**: Equal treatment in batch trades
4. **Disclosure**: Clear fee and risk communication
5. **Suitability**: Match portfolios to risk profiles

## Review Schedule
- Quarterly portfolio performance review
- Annual ETF selection validation
- Semi-annual risk model calibration
- Monthly operational metrics
- Continuous customer feedback