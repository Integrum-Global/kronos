# Kronos System Diagrams

## Overview
This directory contains visual diagrams that illustrate the Kronos automated investment system architecture, user flows, and technical design.

## Diagram Types

### 1. User Journey Maps
- **[User Onboarding Journey](./user-onboarding-journey.mmd)** - New user registration to first investment
- **[Investment Lifecycle](./investment-lifecycle.mmd)** - Complete investment journey from goal to achievement
- **[Multi-Persona Flows](./multi-persona-flows.mmd)** - How different users interact with the system

### 2. System Architecture
- **[High-Level Architecture](./high-level-architecture.mmd)** - Overall system components
- **[Microservices Map](./microservices-map.mmd)** - Service dependencies and communication
- **[Data Flow Diagram](./data-flow-diagram.mmd)** - How data moves through the system

### 3. Technical Workflows
- **[Portfolio Rebalancing Flow](./portfolio-rebalancing-flow.mmd)** - Automated rebalancing process
- **[Trade Execution Pipeline](./trade-execution-pipeline.mmd)** - Order to settlement flow
- **[Risk Management Process](./risk-management-process.mmd)** - Real-time risk monitoring

### 4. Infrastructure
- **[Deployment Architecture](./deployment-architecture.mmd)** - Cloud infrastructure layout
- **[Security Layers](./security-layers.mmd)** - Defense in depth visualization
- **[Disaster Recovery](./disaster-recovery.mmd)** - Failover and backup strategies

## How to View Diagrams

These diagrams are written in Mermaid format (.mmd files). You can view them:

1. **In GitHub** - GitHub automatically renders Mermaid diagrams
2. **In VS Code** - Install the Mermaid extension
3. **Online** - Copy content to [Mermaid Live Editor](https://mermaid.live/)
4. **Generate Images** - Use Mermaid CLI to export as PNG/SVG

## Mermaid CLI Installation

```bash
# Install mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# Generate PNG from diagram
mmdc -i user-onboarding-journey.mmd -o user-onboarding-journey.png

# Generate SVG (better quality)
mmdc -i user-onboarding-journey.mmd -o user-onboarding-journey.svg
```

## Diagram Standards

### Color Coding
- **Blue** (#4A90E2) - User actions
- **Green** (#7CB342) - System processes
- **Orange** (#F57C00) - External services
- **Red** (#E53935) - Security/Risk components
- **Purple** (#AB47BC) - AI/ML components

### Node Shapes
- **Rectangles** - Standard processes
- **Diamonds** - Decision points
- **Circles** - Start/End points
- **Parallelograms** - Data/Input/Output
- **Hexagons** - External systems

## Contributing

When adding new diagrams:
1. Use descriptive filenames (kebab-case)
2. Include a title in the diagram
3. Add description comments in the .mmd file
4. Update this README with the new diagram
5. Follow the color and shape standards

## Quick Reference

### Mermaid Syntax Examples

```mermaid
%% Flowchart
flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process]
    B -->|No| D[End]

%% Sequence Diagram
sequenceDiagram
    User->>System: Request
    System-->>User: Response

%% State Diagram
stateDiagram-v2
    [*] --> Active
    Active --> [*]
```