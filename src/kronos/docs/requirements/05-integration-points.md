# Integration Points with Kailash SDK

## Overview
This document identifies how the Kronos automated investment platform can leverage existing Kailash SDK components, what needs modification, and what must be built new.

---

## Kailash SDK Component Analysis

### Core SDK Components Assessment

#### 1. WorkflowBuilder & LocalRuntime
**Status**: ✅ Can Reuse Directly

**Usage in Kronos**:
```python
from kailash.workflow.builder import WorkflowBuilder
from kailash.runtime.local import LocalRuntime

# Example: Daily portfolio rebalancing workflow
class DailyRebalancingWorkflow:
    def __init__(self):
        self.workflow = WorkflowBuilder()
        
    def build(self):
        # Fetch all accounts needing rebalancing
        self.workflow.add_node(
            "FetchAccounts", 
            "fetch_accounts",
            {"status": "active", "rebalance_due": True}
        )
        
        # Calculate drift for each portfolio
        self.workflow.add_node(
            "CalculateDrift",
            "calculate_drift", 
            {"threshold": 0.05}
        )
        
        # Generate rebalancing trades
        self.workflow.add_node(
            "GenerateTrades",
            "generate_trades",
            {"strategy": "minimize_tax"}
        )
        
        # Execute trades via custodian
        self.workflow.add_node(
            "ExecuteTrades",
            "execute_trades",
            {"custodian": "apex_clearing"}
        )
        
        return self.workflow.build()

# Execution
runtime = LocalRuntime()
results, run_id = runtime.execute(workflow.build())
```

#### 2. Data Processing Nodes
**Status**: ✅ Can Reuse with Minor Modifications

**Reusable Nodes**:
- `CSVReaderNode`: For bulk data imports
- `DataValidatorNode`: For input validation
- `DataTransformerNode`: For data transformations
- `FileSystemNode`: For document storage

**Example Usage**:
```python
# Bulk account import workflow
workflow.add_node(
    "CSVReaderNode",
    "read_accounts", 
    {
        "file_path": "imports/new_accounts.csv",
        "delimiter": ",",
        "has_header": True
    }
)

workflow.add_node(
    "DataValidatorNode",
    "validate_accounts",
    {
        "schema": {
            "email": {"type": "email", "required": True},
            "ssn": {"type": "ssn", "required": True},
            "initial_deposit": {"type": "decimal", "min": 100}
        }
    }
)
```

#### 3. LLMAgentNode
**Status**: ⚠️ Needs Modification for Compliance

**Modifications Needed**:
- Add compliance guardrails
- Ensure no financial advice without licenses
- Audit trail for all AI decisions
- Restrict to approved use cases only

**Safe Use Cases**:
```python
# Customer support categorization
workflow.add_node(
    "LLMAgentNode",
    "categorize_support",
    {
        "model": "gpt-4",
        "prompt_template": """
        Categorize this support request. 
        DO NOT provide investment advice.
        Categories: account_access, technical_issue, 
                   general_question, compliance_matter
        
        Request: {user_message}
        """,
        "compliance_mode": True  # New parameter needed
    }
)
```

#### 4. Notification Nodes
**Status**: ✅ Can Reuse Directly

**Reusable Nodes**:
- `EmailNode`: For transactional emails
- `SMSNode`: For 2FA and alerts
- `WebhookNode`: For real-time updates

**Example Usage**:
```python
# Trade confirmation notification
workflow.add_node(
    "EmailNode",
    "send_confirmation",
    {
        "template": "trade_confirmation",
        "to": "{{user_email}}",
        "subject": "Trade Executed - Kronos",
        "data": {
            "trades": "{{executed_trades}}",
            "portfolio_value": "{{new_value}}"
        }
    }
)
```

---

## Components Needing Modification

### 1. StateMachineNode Enhancement
**Current**: Basic state management
**Needed**: Financial transaction states with rollback

```python
class FinancialStateMachineNode(StateMachineNode):
    """Enhanced state machine for financial transactions"""
    
    def __init__(self):
        super().__init__()
        self.states = {
            "initiated": ["validated", "failed"],
            "validated": ["executed", "rejected"],
            "executed": ["settled", "reversed"],
            "settled": ["completed"],
            "failed": ["retry", "abandoned"],
            "reversed": ["completed"]
        }
        
    def on_state_change(self, from_state, to_state, context):
        # Audit trail for compliance
        self.audit_log.record({
            "timestamp": datetime.utcnow(),
            "from_state": from_state,
            "to_state": to_state,
            "context": context,
            "user_id": context.get("user_id")
        })
```

### 2. DataValidatorNode for Financial Data
**Current**: Generic validation
**Needed**: Financial-specific validators

```python
class FinancialValidatorNode(DataValidatorNode):
    """Financial data validation with decimal precision"""
    
    validators = {
        "money": self.validate_money,
        "percentage": self.validate_percentage,
        "ssn": self.validate_ssn,
        "routing_number": self.validate_routing,
        "account_number": self.validate_account
    }
    
    def validate_money(self, value):
        # Use Decimal for precision
        try:
            amount = Decimal(str(value))
            if amount < 0:
                raise ValueError("Negative amounts not allowed")
            if amount.as_tuple().exponent < -2:
                raise ValueError("Maximum 2 decimal places")
            return amount
        except:
            raise ValueError("Invalid money format")
```

### 3. ExternalAPINode for Financial Services
**Current**: Generic HTTP client
**Needed**: Financial API patterns

```python
class FinancialAPINode(ExternalAPINode):
    """Enhanced API node for financial services"""
    
    def __init__(self):
        super().__init__()
        self.retry_strategy = ExponentialBackoff()
        self.circuit_breaker = CircuitBreaker()
        
    def execute(self, inputs):
        # Add idempotency key
        headers = {
            "X-Idempotency-Key": self.generate_idempotency_key(inputs),
            "X-Request-ID": str(uuid4())
        }
        
        # Financial APIs often use mTLS
        if self.requires_mtls:
            self.setup_mutual_tls()
            
        # Execute with circuit breaker
        return self.circuit_breaker.call(
            super().execute, 
            inputs, 
            headers=headers
        )
```

---

## New Components to Build

### 1. KYC/AML Compliance Nodes
```python
class KYCVerificationNode:
    """Know Your Customer verification node"""
    
    def execute(self, inputs):
        user_data = inputs["user_data"]
        
        # Identity verification
        identity_result = self.verify_identity(user_data)
        
        # Sanctions screening
        sanctions_result = self.screen_sanctions(user_data)
        
        # Risk scoring
        risk_score = self.calculate_risk_score(
            identity_result, 
            sanctions_result
        )
        
        return {
            "verified": identity_result["verified"],
            "risk_score": risk_score,
            "review_required": risk_score > 0.7
        }

class AMLMonitoringNode:
    """Anti-Money Laundering monitoring node"""
    
    def execute(self, inputs):
        transaction = inputs["transaction"]
        
        # Pattern detection
        patterns = self.detect_suspicious_patterns(transaction)
        
        # Velocity checks
        velocity = self.check_velocity_limits(transaction)
        
        # Generate SAR if needed
        if patterns["suspicious"] or velocity["exceeded"]:
            self.flag_for_sar_review(transaction)
            
        return {
            "approved": not patterns["suspicious"],
            "flags": patterns["flags"]
        }
```

### 2. Portfolio Management Nodes
```python
class PortfolioCalculationNode:
    """Portfolio metrics and calculations"""
    
    def execute(self, inputs):
        holdings = inputs["holdings"]
        prices = inputs["market_prices"]
        
        # Calculate current allocation
        current_allocation = self.calculate_allocation(holdings, prices)
        
        # Calculate performance metrics
        performance = self.calculate_performance(
            holdings, 
            prices, 
            inputs["period"]
        )
        
        # Risk metrics
        risk_metrics = self.calculate_risk_metrics(holdings, prices)
        
        return {
            "total_value": sum(h["shares"] * prices[h["symbol"]] 
                              for h in holdings),
            "allocation": current_allocation,
            "performance": performance,
            "risk_metrics": risk_metrics
        }

class RebalancingNode:
    """Portfolio rebalancing logic"""
    
    def execute(self, inputs):
        current = inputs["current_allocation"]
        target = inputs["target_allocation"]
        constraints = inputs["constraints"]
        
        # Calculate drift
        drift = self.calculate_drift(current, target)
        
        # Generate trades if needed
        if self.needs_rebalancing(drift, constraints["threshold"]):
            trades = self.optimize_trades(
                drift, 
                constraints["min_trade_size"],
                constraints["tax_aware"]
            )
            return {"trades": trades, "rebalance": True}
            
        return {"trades": [], "rebalance": False}
```

### 3. Trading Execution Nodes
```python
class TradingNode:
    """Execute trades via custodian"""
    
    def execute(self, inputs):
        trades = inputs["trades"]
        custodian = inputs["custodian"]
        
        # Validate pre-trade compliance
        compliance_check = self.check_compliance(trades)
        if not compliance_check["passed"]:
            return {"status": "rejected", "reason": compliance_check["reason"]}
        
        # Execute trades
        results = []
        for trade in trades:
            result = self.execute_trade(trade, custodian)
            results.append(result)
            
        # Post-trade reconciliation
        self.reconcile_trades(results)
        
        return {
            "status": "completed",
            "executed_trades": results
        }

class SettlementNode:
    """Track trade settlement"""
    
    def execute(self, inputs):
        trades = inputs["executed_trades"]
        
        # Track T+2 settlement
        for trade in trades:
            settlement_date = self.calculate_settlement_date(trade)
            self.schedule_settlement_check(trade, settlement_date)
            
        return {
            "settlements_scheduled": len(trades),
            "expected_dates": [t["settlement_date"] for t in trades]
        }
```

### 4. Regulatory Reporting Nodes
```python
class TaxReportingNode:
    """Generate tax reports and forms"""
    
    def execute(self, inputs):
        account_id = inputs["account_id"]
        tax_year = inputs["tax_year"]
        
        # Fetch all transactions
        transactions = self.fetch_transactions(account_id, tax_year)
        
        # Calculate realized gains/losses
        gains_losses = self.calculate_gains_losses(transactions)
        
        # Generate 1099 forms
        forms = {
            "1099-B": self.generate_1099b(gains_losses),
            "1099-DIV": self.generate_1099div(transactions),
            "1099-INT": self.generate_1099int(transactions)
        }
        
        return {
            "forms": forms,
            "total_gain_loss": gains_losses["total"]
        }

class ComplianceReportingNode:
    """Regulatory compliance reporting"""
    
    def execute(self, inputs):
        report_type = inputs["report_type"]
        period = inputs["period"]
        
        if report_type == "SAR":
            return self.generate_sar(inputs["suspicious_activity"])
        elif report_type == "CTR":
            return self.generate_ctr(inputs["large_transactions"])
        elif report_type == "Form_ADV":
            return self.generate_form_adv(period)
```

### 5. Customer Support Nodes
```python
class SupportTicketNode:
    """Customer support ticket management"""
    
    def execute(self, inputs):
        ticket_data = inputs["ticket_data"]
        
        # Categorize ticket
        category = self.categorize_ticket(ticket_data)
        
        # Assign priority
        priority = self.assign_priority(category, ticket_data)
        
        # Route to appropriate team
        assigned_to = self.route_ticket(category, priority)
        
        # Create ticket
        ticket = self.create_ticket({
            "user_id": ticket_data["user_id"],
            "category": category,
            "priority": priority,
            "assigned_to": assigned_to,
            "content": ticket_data["content"]
        })
        
        return {
            "ticket_id": ticket["id"],
            "estimated_response": self.estimate_response_time(priority)
        }
```

---

## Integration Architecture

### Workflow Orchestration Pattern
```python
class KronosWorkflowOrchestrator:
    """Main orchestrator for all Kronos workflows"""
    
    def __init__(self):
        self.runtime = LocalRuntime()
        self.workflows = {
            "onboarding": OnboardingWorkflow(),
            "daily_rebalancing": DailyRebalancingWorkflow(),
            "trade_execution": TradeExecutionWorkflow(),
            "compliance_monitoring": ComplianceMonitoringWorkflow(),
            "tax_reporting": TaxReportingWorkflow()
        }
        
    def schedule_workflows(self):
        # Daily workflows
        schedule.every().day.at("16:00").do(
            self.run_workflow, "daily_rebalancing"
        )
        
        # Continuous monitoring
        schedule.every(5).minutes.do(
            self.run_workflow, "compliance_monitoring"
        )
        
        # Annual workflows
        schedule.every().year.on("january", 31).do(
            self.run_workflow, "tax_reporting"
        )
```

### Custom Node Registry
```python
# Register all custom nodes with Kailash
from kailash.registry import NodeRegistry

registry = NodeRegistry()

# Financial nodes
registry.register("KYCVerificationNode", KYCVerificationNode)
registry.register("AMLMonitoringNode", AMLMonitoringNode)
registry.register("PortfolioCalculationNode", PortfolioCalculationNode)
registry.register("RebalancingNode", RebalancingNode)
registry.register("TradingNode", TradingNode)

# Compliance nodes
registry.register("TaxReportingNode", TaxReportingNode)
registry.register("ComplianceReportingNode", ComplianceReportingNode)

# Support nodes
registry.register("SupportTicketNode", SupportTicketNode)
```

---

## Implementation Roadmap

### Phase 1: Foundation (Months 1-3)
1. **Set up Kailash SDK**
   - Install core SDK
   - Configure development environment
   - Set up testing framework

2. **Build Critical Custom Nodes**
   - KYCVerificationNode
   - PortfolioCalculationNode
   - Basic TradingNode

3. **Create Core Workflows**
   - User onboarding workflow
   - Simple portfolio management
   - Basic trade execution

### Phase 2: Enhancement (Months 4-6)
1. **Advanced Nodes**
   - AMLMonitoringNode
   - RebalancingNode
   - TaxReportingNode

2. **Complex Workflows**
   - Automated rebalancing
   - Compliance monitoring
   - Tax optimization

### Phase 3: Optimization (Months 7-12)
1. **Performance Tuning**
   - Optimize node execution
   - Implement caching
   - Parallel processing

2. **Advanced Features**
   - Real-time notifications
   - Complex trading strategies
   - AI-powered support

---

## Testing Strategy

### Unit Testing Custom Nodes
```python
import unittest
from decimal import Decimal

class TestPortfolioCalculationNode(unittest.TestCase):
    def setUp(self):
        self.node = PortfolioCalculationNode()
        
    def test_calculate_allocation(self):
        holdings = [
            {"symbol": "VTI", "shares": 100},
            {"symbol": "BND", "shares": 200}
        ]
        prices = {"VTI": Decimal("200.00"), "BND": Decimal("80.00")}
        
        result = self.node.execute({
            "holdings": holdings,
            "market_prices": prices
        })
        
        self.assertEqual(result["total_value"], Decimal("36000.00"))
        self.assertAlmostEqual(
            result["allocation"]["VTI"], 
            Decimal("0.5556"), 
            places=4
        )
```

### Integration Testing Workflows
```python
class TestOnboardingWorkflow(unittest.TestCase):
    def test_complete_onboarding(self):
        workflow = OnboardingWorkflow()
        runtime = LocalRuntime()
        
        inputs = {
            "user_data": {
                "email": "test@example.com",
                "ssn": "123-45-6789",
                "initial_deposit": 1000
            }
        }
        
        results, run_id = runtime.execute(
            workflow.build(), 
            inputs
        )
        
        self.assertEqual(results["status"], "completed")
        self.assertTrue(results["kyc_verified"])
        self.assertIsNotNone(results["account_id"])
```

---

## Success Metrics

### SDK Integration Success
- **Node Reuse Rate**: >60% of nodes from SDK
- **Custom Node Count**: <40 custom nodes
- **Workflow Complexity**: Average 10-15 nodes
- **Execution Performance**: <500ms per node
- **Test Coverage**: >90% for custom nodes

### Business Impact
- **Development Speed**: 2x faster with SDK
- **Bug Rate**: 50% reduction vs custom
- **Maintenance Cost**: 30% lower
- **Feature Velocity**: 3x improvement

---

## Conclusion

The Kailash SDK provides a solid foundation for building Kronos, with approximately 60% of required functionality available out-of-the-box. The main development effort will focus on:

1. **Custom financial nodes** for domain-specific logic
2. **Compliance integrations** for regulatory requirements
3. **Trading workflows** for investment operations
4. **Monitoring and reporting** for business insights

By leveraging the SDK's workflow orchestration and extending with custom nodes, Kronos can achieve faster time-to-market while maintaining the flexibility needed for financial services compliance.