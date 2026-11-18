#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = "ceosuh~biomed-clinical-radar-mcp";

const server = new Server(
  { name: "biomed-clinical-radar-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_biomed_clinical_intelligence",
      description: "Fetch latest PubMed medical papers, ClinicalTrials.gov clinical study pipelines, and OpenFDA drug labels for biotech or medical keywords.",
      inputSchema: {
        type: "object",
        properties: {
          queries: {
            type: "array",
            items: { type: "string" },
            description: "Medical, drug, or biotech keywords (e.g., ['GLP-1', 'CRISPR', 'semaglutide', 'CAR-T'])",
            default: ["GLP-1", "CRISPR"]
          },
          maxResultsPerSource: {
            type: "number",
            description: "Maximum records per biomedical database (1-15)",
            default: 5
          }
        },
        required: ["queries"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "search_biomed_clinical_intelligence") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
  if (!APIFY_TOKEN) {
    throw new Error("Missing APIFY_TOKEN environment variable. Get yours at https://console.apify.com/settings/integrations");
  }

  const response = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request.params.arguments || {})
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Apify API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
