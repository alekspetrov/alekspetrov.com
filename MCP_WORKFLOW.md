# IT Project Development Workflow (LLM Instructions)

## Overview
This is a standardized workflow for LLMs to follow when building IT projects. Each phase leverages our configured MCP servers for automation and quality assurance.

## Available MCP Arsenal
- **GitHub Official** (51 tools) - Repository operations, PR management, issues
- **Context7** (2 tools) - Up-to-date library documentation
- **Atlas Docs** (5 tools) - Documentation access and management  
- **Puppeteer** (7 tools) - Browser automation and testing
- **DuckDuckGo** (2 tools) - Privacy-focused web search
- **Fetch** (1 tool) - HTTP requests and content fetching
- **Time** (2 tools) - Time/date utilities

---

## Phase 1: Project Discovery & Planning

### LLM Instructions:
1. **Research the project domain**
   - Use `mcp__duckduckgo__search` to research market trends and competitors
   - Use `mcp__fetch__fetch` to analyze competitor websites and gather requirements

2. **Technology research**
   - Use `mcp__context7__resolve-library-id` to find relevant frameworks/libraries
   - Use `mcp__context7__get-library-docs` to understand capabilities and best practices
   - Use `mcp__atlas-docs__search_docs` for comprehensive documentation

3. **Create project repository**
   - Use `mcp__github__create_repository` to initialize the project
   - Use `mcp__time__get_current_time` for timestamping and planning

### Deliverables:
- Project requirements document
- Technology stack decision
- GitHub repository with initial structure

---

## Phase 2: Architecture & Setup

### LLM Instructions:
1. **Framework documentation deep-dive**
   - Use `mcp__context7__get-library-docs` for chosen framework (React, Vue, Astro, etc.)
   - Focus on project structure, routing, state management patterns

2. **Setup project structure**
   - Create branches using `mcp__github__create_branch`
   - Follow framework conventions from documentation
   - Set up development environment files

3. **Research best practices**
   - Use `mcp__duckduckgo__search` for architecture patterns
   - Use `mcp__atlas-docs__search_docs` for framework-specific guides

### Deliverables:
- Project architecture diagram
- Development environment setup
- Initial file structure and configuration

---

## Phase 3: Core Development

### LLM Instructions:
1. **Component/Feature development**
   - Before building each component, use `mcp__context7__get-library-docs` to check latest API
   - Use `mcp__duckduckgo__search` for implementation patterns and examples
   - Create feature branches with `mcp__github__create_branch`

2. **Code quality assurance**
   - Follow documentation patterns from MCP-retrieved docs
   - Implement consistent naming and structure conventions
   - Use TypeScript/JSDoc for type safety

3. **Version control management**
   - Use `mcp__github__create_pull_request` for each feature
   - Use `mcp__github__request_copilot_review` for automated code review
   - Maintain clean commit history

### Deliverables:
- Core application features
- Component library
- API integration layer

---

## Phase 4: Testing & Quality Assurance

### LLM Instructions:
1. **Automated testing setup**
   - Use `mcp__puppeteer__puppeteer_navigate` to test user flows
   - Use `mcp__puppeteer__puppeteer_screenshot` for visual regression testing
   - Use `mcp__puppeteer__puppeteer_evaluate` for performance metrics

2. **Cross-browser testing**
   - Use `mcp__puppeteer__puppeteer_click` and `mcp__puppeteer__puppeteer_fill` for interaction testing
   - Test responsive design with `mcp__puppeteer__puppeteer_evaluate` for viewport changes
   - Capture screenshots at different breakpoints

3. **Performance monitoring**
   - Use `mcp__puppeteer__puppeteer_evaluate` to measure Core Web Vitals
   - Use `mcp__time__get_current_time` for performance logging
   - Identify and fix performance bottlenecks

### Deliverables:
- Automated test suite
- Performance benchmarks
- Cross-browser compatibility report

---

## Phase 5: Security & Compliance

### LLM Instructions:
1. **Security research**
   - Use `mcp__duckduckgo__search` for latest security best practices
   - Use `mcp__context7__get-library-docs` to check for security-related updates
   - Research OWASP guidelines and implementation

2. **Dependency management**
   - Use `mcp__github__list_code_scanning_alerts` to check for vulnerabilities
   - Use `mcp__github__list_secret_scanning_alerts` for exposed secrets
   - Regular dependency updates using latest documentation

3. **Compliance validation**
   - Use `mcp__puppeteer__puppeteer_navigate` to test GDPR/accessibility compliance
   - Use `mcp__fetch__fetch` to validate external API security

### Deliverables:
- Security audit report
- Dependency vulnerability assessment
- Compliance checklist completion

---

## Phase 6: Documentation & Deployment

### LLM Instructions:
1. **Documentation creation**
   - Use `mcp__context7__get-library-docs` to follow framework documentation standards
   - Use `mcp__atlas-docs__search_docs` for documentation best practices
   - Create comprehensive README and API docs

2. **Deployment preparation**
   - Use `mcp__duckduckgo__search` for deployment platform best practices
   - Use `mcp__puppeteer__puppeteer_navigate` to test production builds
   - Use `mcp__github__create_pull_request` for deployment PRs

3. **Final testing**
   - Use `mcp__puppeteer__puppeteer_screenshot` for final visual validation
   - Use `mcp__time__get_current_time` for deployment timestamping
   - Perform end-to-end testing with Puppeteer automation

### Deliverables:
- Complete project documentation
- Deployment configuration
- Production-ready application

---

## Phase 7: Monitoring & Maintenance

### LLM Instructions:
1. **Performance monitoring setup**
   - Use `mcp__puppeteer__puppeteer_evaluate` for ongoing performance checks
   - Use `mcp__time__get_current_time` for monitoring timestamps
   - Set up automated health checks

2. **Issue management**
   - Use `mcp__github__list_issues` to track problems
   - Use `mcp__github__create_issue` for bug reports
   - Use `mcp__github__list_notifications` for team communication

3. **Continuous improvement**
   - Use `mcp__duckduckgo__search` for new features and updates
   - Use `mcp__context7__get-library-docs` to stay current with framework updates
   - Regular security scans with `mcp__github__list_code_scanning_alerts`

### Deliverables:
- Monitoring dashboard
- Maintenance schedule
- Update roadmap

---

## Emergency Response Workflow

### LLM Instructions for Critical Issues:
1. **Immediate assessment**
   - Use `mcp__puppeteer__puppeteer_navigate` to reproduce the issue
   - Use `mcp__puppeteer__puppeteer_screenshot` to capture error states
   - Use `mcp__github__create_issue` to document the problem

2. **Research and resolution**
   - Use `mcp__duckduckgo__search` for immediate solutions
   - Use `mcp__context7__get-library-docs` for framework-specific fixes
   - Use `mcp__atlas-docs__search_docs` for detailed troubleshooting

3. **Fix deployment**
   - Use `mcp__github__create_branch` for hotfix branch
   - Use `mcp__puppeteer__puppeteer_evaluate` to verify fix
   - Use `mcp__github__merge_pull_request` for immediate deployment

---

## Quality Gates (LLM Checkpoints)

### Before Each Phase Completion:
- ✅ Use `mcp__context7__get-library-docs` to verify implementation follows latest standards
- ✅ Use `mcp__puppeteer__puppeteer_screenshot` for visual validation
- ✅ Use `mcp__github__list_pull_requests` to ensure code review completion
- ✅ Use `mcp__time__get_current_time` for milestone tracking

### Critical Success Factors:
- Always check latest documentation before implementation
- Automate testing with Puppeteer at every step
- Maintain GitHub workflow for version control
- Use web search for staying current with best practices
- Regular security and performance monitoring

This workflow ensures consistent, high-quality IT project delivery while leveraging MCP automation for efficiency and reliability.