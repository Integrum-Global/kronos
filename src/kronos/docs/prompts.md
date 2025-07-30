# Initial Prompt

## Guidance
This repository is for building an automated system related to financial investment.
I want you to adopt user perspectives then work backwards to the technology.

As you go through each of the points below, I want you to document them into src/kronos/docs/prd. 
Use multiple files and ensure that any developer can navigate the contents using README.md. 
Use diagrams to convey effectively.

Please follow these steps:
1. What are the user personas that would benefit from having an automated investing system.
2. For each user persona, how would they use this system. Think of all the user flows.
3. Ensure that all the user flows lead to valuable objectives.
4. After you are done with the above tasks, consolidate and distill the various workflows into generalizable forms (e2e) 

# Implementation

## Guidance
### Phase 1
Remember that all the codebase and documentation should be in src/kronos. Do not write outside of this directory.
Use the ultrathink-analyst to go through its previous work on src/kronos/docs/prd in preparation for system design and implementation.
Use requirements-analyst, sdk-navigator, and framework-advisor to perform complete analysis and planning for this system.

### Phase 2
Use the todo-manager and intermediate-reviewer subagents to create and validate tasks breakdown

### Phase 3
Analyze the active todos, group them into independent tracks, and implement the dependent paths first.
Use the tdd-implementer (supported by the testing-specialist), pattern-expert, and gold-standards-validator subagents to implement and validate <..>

POST Phase 3:
Use the intermediate-reviewer subagent to ensure that the implementation meets all requirements and standards

### Phase 4
Use the testing-specialist, documentation-validator, and todo-manager subagents to ensure complete test coverage and documentation accuracy

# Opportunities for AI capabilities

## Guidance
### Scanning of the plan to identify opportunities
Use the intermediate-reviewer subagent to scan the project requirement (src/kronos/docs/prd) and identify opportunities for AI capabilities.
Document all the opportunities and what has been planned in src/kronos/docs/research/ai-opportunities.md.

# UI 
## Guidance
analyze @03-user-flows.md and @05-consolidated-workflows.md, we are building an investment system (see @README.md for an overview). 
Follow the guidance in @fe-guidance.md, create the frontend codes in src/frontend. 
Ensure that your UI follows the expected UX of the personas (@01-user-personas.md).

Some frontend components have already been completed in src/frontend. Please analyze this folder to know where we stand and continue with the outstanding tasks. Immediate ones are:
    - Build main dashboard with portfolio overview and goal tracking
    - Implement persona-specific features (education for young investors, retirement planning, etc.)
    - Ensure all components are responsive for mobile and desktop
    - Integrate with backend APIs using React Query
