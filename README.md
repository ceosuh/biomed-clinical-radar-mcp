# 🧬 BioMed, Clinical Trials & OpenFDA Radar (MCP Server)

An official Model Context Protocol (MCP) server that aggregates **NCBI PubMed medical research papers, ClinicalTrials.gov study pipelines (NCT phases, recruitment status, sponsors), and OpenFDA official drug labels** in real time.

Powered by Apify (`ceosuh/biomed-clinical-radar-mcp`) and built for **Healthcare AI Agents, Biotech Researchers, Claude Desktop, Cursor, and Windsurf**.

## 🚀 Quick Start (Claude Desktop / Cursor)

Add the following configuration to your `claude_desktop_config.json` or Cursor MCP settings:

```json
{
  "mcpServers": {
    "biomed-clinical-radar-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@apify/actors-mcp-server",
        "--actors",
        "ceosuh/biomed-clinical-radar-mcp"
      ],
      "env": {
        "APIFY_TOKEN": "your-apify-api-token"
      }
    }
  }
}
```

### Alternative: Run Local Bridge Directly

```bash
export APIFY_TOKEN="your-apify-api-token"
node index.js
```

## 🛠️ Tool Provided

* **`search_biomed_clinical_intelligence`**: Queries NCBI PubMed, ClinicalTrials.gov API v2, and OpenFDA simultaneously for diseases, drugs, biomarkers, or clinical therapies.

## 📄 License

MIT License
