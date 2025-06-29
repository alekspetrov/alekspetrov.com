## System Notes

- Remember available MCP servers.

## Available MCP Servers

### Complete MCP Setup (7 servers):
1. **Atlas Docs** (5 tools) - Documentation access and management
2. **Context7** (2 tools) - Up-to-date library documentation  
3. **DuckDuckGo** (2 tools) - Privacy-focused web search
4. **Fetch** (1 tool) - HTTP requests and web content fetching
5. **GitHub Official** (51 tools) - Complete GitHub integration with token
6. **Puppeteer** (7 tools) - Browser automation and web scraping
7. **Time** (2 tools) - Time and date utilities

### MCP Configuration Status:
- ✅ **Claude Code**: All 7 servers configured with security restrictions
- ✅ **Claude Desktop**: All 7 servers configured via claude_desktop_config.json
- ✅ **Project Config**: `.mcp.json` in project root for team sharing
- ✅ **GitHub Token**: Set for both Claude Code and Claude Desktop

### Available Commands:
- Atlas Docs: Documentation tools (5 tools)
- Context7: Library docs - resolve-library-id, get-library-docs (2 tools)
- DuckDuckGo: Privacy web search (2 tools) 
- Fetch: HTTP requests (1 tool)
- GitHub: Repository operations (51 tools!)
- Puppeteer: Browser automation - navigate, screenshot, click, fill, evaluate, hover, select (7 tools)
- Time: Time utilities (2 tools)

## Tool Usage Preferences

**ALWAYS prefer MCP tools over Claude Code default tools when available:**

### Git & GitHub Operations
- ✅ Use `mcp__github__*` tools for all GitHub operations (commits, PRs, issues, etc.)
- ✅ Use `mcp__github__push_files` instead of `git add` + `git commit` + `git push`
- ✅ Use `mcp__github__create_pull_request` instead of `gh pr create`
- ❌ Avoid bash git commands when GitHub MCP can handle the operation

### Web Search & Documentation
- ✅ Use `mcp__duckduckgo__search` instead of WebSearch
- ✅ Use `mcp__context7__*` for library documentation instead of manual searches
- ✅ Use `mcp__atlas-docs__*` for framework documentation
- ✅ Use `mcp__fetch__fetch` instead of WebFetch when possible

### Browser Automation
- ✅ Use `mcp__puppeteer__*` tools for any web automation tasks
- ✅ Use puppeteer for screenshots, form filling, or web scraping

### Time Operations
- ✅ Use `mcp__time__*` tools for time zone conversions and current time