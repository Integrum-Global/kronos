# Functional Requirements Matrix

## Overview
This document provides a comprehensive breakdown of functional requirements for the Kronos automated investment platform, mapping each requirement to specific inputs, outputs, business logic, edge cases, and Kailash SDK components.

## Requirements Categorization
Requirements are divided into two tracks:
- **Original Vision**: The ambitious initial concept
- **Reality Check**: The pragmatic MVP approach

---

## Authentication & User Management Requirements

| Requirement | Description | Input | Output | Business Logic | Edge Cases | SDK Mapping |
|-------------|-------------|-------|---------|----------------|------------|-------------|
| **REQ-AUTH-001** | User Registration | email, password, phone | user_id, verification_token | Validate email format, check uniqueness, generate verification token, send verification email/SMS | Invalid email, existing account, SMS delivery failure, rate limiting | WorkflowBuilder with LLMAgentNode for validation, PythonCodeNode for token generation |
| **REQ-AUTH-002** | Email/Phone Verification | verification_code, user_id | verified_status, session_token | Compare code with stored token, mark account verified, create session | Wrong code (3 attempts), expired code, concurrent verification attempts | StateMachineNode for retry logic, DataValidatorNode for code validation |
| **REQ-AUTH-003** | User Login | email/phone, password | session_token, user_profile | Validate credentials, check account status, create JWT session | Account locked, password expired, 2FA required, concurrent login attempts | AuthenticationNode (custom), SessionManagerNode (custom) |
| **REQ-AUTH-004** | Password Reset | email/phone | reset_token, email_sent | Verify account exists, generate reset token, send reset email | Account not found, too many reset attempts, email delivery failure | EmailNode, TokenGeneratorNode (custom) |
| **REQ-AUTH-005** | Two-Factor Authentication | user_id, 2fa_code | verified_status | Generate TOTP/SMS code, validate within time window | Code expired, device lost, backup codes exhausted | TOTPNode (custom), SMSNode |

## KYC/AML Compliance Requirements

| Requirement | Description | Input | Output | Business Logic | Edge Cases | SDK Mapping |
|-------------|-------------|-------|---------|----------------|------------|-------------|
| **REQ-KYC-001** | Identity Verification | full_name, dob, ssn, address | kyc_status, risk_score | Validate SSN format, check OFAC/PEP lists, verify identity via third-party | PO Box address, OFAC match, identity mismatch, manual review required | ExternalAPINode (Jumio/LexisNexis), ComplianceValidatorNode (custom) |
| **REQ-KYC-002** | Document Upload | driver_license, proof_of_address | document_status, verification_result | Validate document authenticity, extract data via OCR, match with provided info | Blurry documents, expired ID, name mismatch, fraudulent documents | FileUploadNode, OCRNode (custom), DocumentValidatorNode |
| **REQ-KYC-003** | AML Monitoring | transaction_history, user_behavior | risk_flags, sar_required | Monitor for suspicious patterns, flag unusual activity, generate SARs if needed | Rapid deposits/withdrawals, login from sanctioned countries, structuring | MLModelNode for pattern detection, ComplianceWorkflowNode |
| **REQ-KYC-004** | Ongoing Monitoring | user_id, activity_data | compliance_status, alerts | Continuous monitoring of user activity, periodic re-verification | Change in risk profile, adverse media hits, account dormancy | ScheduledWorkflowNode, AlertingNode |

## Investment Account Management

| Requirement | Description | Input | Output | Business Logic | Edge Cases | SDK Mapping |
|-------------|-------------|-------|---------|----------------|------------|-------------|
| **REQ-ACC-001** | Account Creation | account_type, user_id | account_id, custodial_account_id | Create internal account, setup custodial account via API, link accounts | Custodian API failure, duplicate account attempt, unsupported account type | ExternalAPINode (Custodian), AccountManagerNode (custom) |
| **REQ-ACC-002** | Account Funding (ACH) | bank_account, amount | transaction_id, estimated_completion | Validate bank account, initiate ACH transfer, track status | Insufficient funds, account closed, name mismatch, ACH return | PlaidIntegrationNode (custom), TransactionNode |
| **REQ-ACC-003** | Account Funding (Wire) | wire_instructions | transaction_id, reference_number | Generate wire instructions, monitor for receipt, match incoming wire | Wrong reference number, amount mismatch, compliance hold | WireMonitorNode (custom), ReconciliationNode |
| **REQ-ACC-004** | Withdrawal Request | amount, destination_account | transaction_id, estimated_date | Validate available balance, check withdrawal limits, initiate transfer | Insufficient balance, AML flags, destination account issues | BalanceValidatorNode, TransactionNode |
| **REQ-ACC-005** | Account Closure | user_id, reason | closure_confirmation, final_statement | Liquidate positions, transfer remaining funds, generate final documents | Open positions, pending transactions, tax implications | WorkflowOrchestrationNode, DocumentGeneratorNode |

## Portfolio Management

| Requirement | Description | Input | Output | Business Logic | Edge Cases | SDK Mapping |
|-------------|-------------|-------|---------|----------------|------------|-------------|
| **REQ-PORT-001** | Risk Assessment | age, income, goals, risk_tolerance | risk_profile, recommended_allocation | Calculate risk score, map to portfolio allocation, validate consistency | Inconsistent answers, edge demographics, changes over time | SurveyNode (custom), RiskCalculatorNode, MLModelNode |
| **REQ-PORT-002** | Portfolio Selection | risk_profile, preferences | portfolio_id, asset_allocation | Match profile to pre-built portfolios, allow customization within bounds | No suitable match, extreme preferences, regulatory restrictions | PortfolioMatcherNode, AllocationValidatorNode |
| **REQ-PORT-003** | Rebalancing Execution | current_allocation, target_allocation | trade_orders, execution_status | Calculate drift, generate trade orders, execute via custodian | Market closed, insufficient liquidity, large market movements | RebalancingEngineNode, TradingNode, MarketDataNode |
| **REQ-PORT-004** | Tax-Loss Harvesting | positions, tax_lots | harvest_trades, tax_savings_estimate | Identify loss opportunities, check wash sale rules, execute trades | Wash sale violations, minimal losses, correlation issues | TaxOptimizationNode, WashSaleValidatorNode |
| **REQ-PORT-005** | Performance Tracking | portfolio_id, date_range | performance_metrics, benchmark_comparison | Calculate returns, compare to benchmarks, generate visualizations | Data gaps, corporate actions, benchmark changes | PerformanceCalculatorNode, DataVisualizationNode |

## Trading & Execution

| Requirement | Description | Input | Output | Business Logic | Edge Cases | SDK Mapping |
|-------------|-------------|-------|---------|----------------|------------|-------------|
| **REQ-TRADE-001** | Order Generation | portfolio_changes, account_id | trade_orders, estimated_impact | Generate buy/sell orders, calculate commissions, estimate market impact | Fractional shares, minimum trade sizes, market volatility | OrderGeneratorNode, CostCalculatorNode |
| **REQ-TRADE-002** | Order Execution | trade_orders, market_data | execution_report, actual_prices | Route orders to custodian, monitor execution, handle partial fills | Market halts, rejected orders, price improvement | TradingAPINode, ExecutionMonitorNode |
| **REQ-TRADE-003** | Best Execution | order_details, venue_options | selected_venue, execution_quality | Analyze multiple venues, select best execution path, document decision | Limited liquidity, venue outages, regulatory restrictions | SmartRouterNode, VenueAnalyzerNode |
| **REQ-TRADE-004** | Settlement Tracking | executed_trades | settlement_status, position_updates | Track T+2 settlement, update positions, handle failures | Settlement failures, corporate actions, dividends | SettlementNode, PositionTrackerNode |

## Customer Support & Communication

| Requirement | Description | Input | Output | Business Logic | Edge Cases | SDK Mapping |
|-------------|-------------|-------|---------|----------------|------------|-------------|
| **REQ-SUPP-001** | Support Ticket Creation | user_id, issue_description | ticket_id, estimated_response | Categorize issue, assign priority, route to appropriate team | Urgent compliance issues, system outages, high-value clients | TicketingNode, PriorityRouterNode, LLMAgentNode for categorization |
| **REQ-SUPP-002** | Automated Responses | ticket_category, user_history | suggested_response, confidence_score | Generate contextual responses, check knowledge base, escalate if needed | Complex issues, angry customers, regulatory matters | LLMAgentNode, KnowledgeBaseNode, EscalationNode |
| **REQ-SUPP-003** | Notification System | event_type, user_preferences | notification_sent, delivery_status | Send email/SMS/push notifications, track delivery, handle preferences | Delivery failures, unsubscribes, regulatory notices | NotificationNode, DeliveryTrackerNode |
| **REQ-SUPP-004** | Document Generation | document_type, account_data | generated_document, storage_location | Generate statements, tax forms, confirmations in compliant format | Missing data, format requirements, retention rules | DocumentTemplateNode, PDFGeneratorNode, StorageNode |

## Reporting & Analytics

| Requirement | Description | Input | Output | Business Logic | Edge Cases | SDK Mapping |
|-------------|-------------|-------|---------|----------------|------------|-------------|
| **REQ-REPORT-001** | Account Statements | account_id, period | statement_pdf, transaction_list | Compile transactions, calculate balances, format per regulations | Missing transactions, adjustments, corrections | ReportGeneratorNode, DataAggregatorNode |
| **REQ-REPORT-002** | Tax Reporting | account_id, tax_year | 1099_forms, realized_gains | Calculate gains/losses, generate IRS forms, provide audit trail | Wash sales, cost basis adjustments, amended returns | TaxCalculatorNode, Form1099Node |
| **REQ-REPORT-003** | Regulatory Reporting | reporting_period | regulatory_filings, audit_trail | Compile required data, format per regulator specs, maintain records | Late filings, data corrections, examiner requests | RegulatoryReportNode, AuditTrailNode |
| **REQ-REPORT-004** | Performance Analytics | portfolio_id, benchmarks | analytics_dashboard, insights | Calculate risk-adjusted returns, attribution analysis, peer comparison | Benchmark changes, survivor bias, calculation methods | AnalyticsEngineNode, BenchmarkNode |

## Mobile & Web Platform

| Requirement | Description | Input | Output | Business Logic | Edge Cases | SDK Mapping |
|-------------|-------------|-------|---------|----------------|------------|-------------|
| **REQ-UI-001** | Responsive Dashboard | user_id, device_type | rendered_dashboard, real_time_data | Fetch account data, render responsive UI, handle real-time updates | Slow connections, data sync issues, browser compatibility | APIGatewayNode, CacheNode, WebSocketNode |
| **REQ-UI-002** | Biometric Authentication | biometric_data, device_id | auth_status, session_token | Validate biometric, check device trust, create secure session | New devices, biometric changes, fallback auth | BiometricNode (custom), DeviceTrustNode |
| **REQ-UI-003** | Offline Capability | cached_data, sync_queue | offline_view, sync_status | Display cached data, queue actions, sync when online | Conflicting changes, data staleness, sync failures | OfflineStorageNode, SyncManagerNode |
| **REQ-UI-004** | Accessibility Compliance | ui_elements, wcag_standards | compliance_report, remediation_tasks | Audit UI for WCAG compliance, generate fixes, track compliance | Dynamic content, third-party widgets, screen readers | AccessibilityAuditNode, RemediationNode |

## Integration Requirements

| Requirement | Description | Input | Output | Business Logic | Edge Cases | SDK Mapping |
|-------------|-------------|-------|---------|----------------|------------|-------------|
| **REQ-INT-001** | Custodian Integration | api_credentials, account_data | integration_status, data_sync | Establish secure connection, sync account data, handle webhooks | API changes, rate limits, authentication failures | ExternalAPINode, WebhookNode, RetryNode |
| **REQ-INT-002** | Market Data Integration | symbol_list, data_requirements | market_data_feed, latency_metrics | Subscribe to data feeds, normalize data, handle corporate actions | Feed outages, data quality issues, symbol changes | MarketDataNode, DataNormalizerNode |
| **REQ-INT-003** | Banking Integration | plaid_credentials, user_consent | linked_accounts, transaction_history | Connect via Plaid, fetch account data, monitor transactions | Bank not supported, MFA challenges, consent revocation | PlaidNode, ConsentManagerNode |
| **REQ-INT-004** | Tax Integration | tax_software_api, user_data | tax_data_export, import_confirmation | Export data in required format, handle secure transmission | Format mismatches, API deprecation, data privacy | TaxExportNode, SecureTransferNode |

## Compliance & Security Requirements

| Requirement | Description | Input | Output | Business Logic | Edge Cases | SDK Mapping |
|-------------|-------------|-------|---------|----------------|------------|-------------|
| **REQ-SEC-001** | Data Encryption | sensitive_data, encryption_key | encrypted_data, key_reference | Encrypt at rest and in transit, manage keys, rotate regularly | Key compromise, algorithm deprecation, performance impact | EncryptionNode, KeyManagementNode |
| **REQ-SEC-002** | Access Control | user_role, resource_request | access_decision, audit_log | Evaluate permissions, enforce RBAC, log all access | Permission conflicts, elevated access, audit requirements | RBACNode, AuditLogNode |
| **REQ-SEC-003** | Fraud Detection | transaction_pattern, user_behavior | fraud_score, recommended_action | Analyze patterns, score risk, trigger interventions | False positives, evolving patterns, real-time requirements | FraudMLNode, InterventionNode |
| **REQ-SEC-004** | Incident Response | security_event, severity_level | incident_ticket, response_actions | Assess impact, trigger response plan, coordinate teams | Multiple concurrent incidents, communication failures | IncidentManagerNode, AlertingNode |

## Reality Check Requirements (MVP)

| Requirement | Description | Input | Output | Business Logic | Edge Cases | SDK Mapping |
|-------------|-------------|-------|---------|----------------|------------|-------------|
| **REQ-MVP-001** | Single Portfolio Only | risk_level (1-3) | portfolio_allocation | Map to 40/60, 60/40, or 80/20 allocation | None - simplified | SimpleAllocationNode |
| **REQ-MVP-002** | Manual Rebalancing | rebalance_request | review_queue_entry | Add to daily manual review queue | None - human handles | QueueNode, ManualReviewNode |
| **REQ-MVP-003** | Email-Only Support | support_request | email_sent, ticket_created | Auto-reply with ticket number, queue for human | None - simplified | EmailNode, TicketNode |
| **REQ-MVP-004** | Basic Dashboard | user_id | account_value, simple_chart | Show total value and line chart only | None - simplified | SimpleAPINode |
| **REQ-MVP-005** | ACH Only Funding | bank_account, amount | transfer_initiated | Single funding method, no wires | None - simplified | ACHNode |

---

## Implementation Priority

### Phase 1 (MVP) - Critical Path
1. REQ-AUTH-001, 002, 003 (Basic authentication)
2. REQ-KYC-001 (Identity verification - simplified)
3. REQ-ACC-001, 002 (Account creation and ACH funding)
4. REQ-MVP-001, 002, 004 (Single portfolio, manual ops, basic UI)

### Phase 2 (Product-Market Fit)
1. REQ-PORT-001, 002, 003 (Risk assessment and automated rebalancing)
2. REQ-TRADE-001, 002 (Basic trading)
3. REQ-UI-001 (Better dashboard)
4. REQ-SUPP-001, 003 (Improved support)

### Phase 3 (Scale)
1. REQ-KYC-003, 004 (Enhanced compliance)
2. REQ-PORT-004 (Tax-loss harvesting)
3. REQ-INT-001, 002, 003 (Full integrations)
4. REQ-SEC-001, 002, 003 (Enhanced security)

---

## Success Criteria

Each requirement must have:
- [ ] Automated tests covering happy path and edge cases
- [ ] Performance benchmarks defined and met
- [ ] Security review completed
- [ ] Compliance review approved
- [ ] User acceptance testing passed
- [ ] Monitoring and alerting configured
- [ ] Documentation updated
- [ ] Rollback plan defined