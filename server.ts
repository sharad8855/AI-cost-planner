import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { AI_MODELS } from "./src/data/models";
import { AIModel } from "./src/types";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory cache for synced models
let cachedModels: AIModel[] = [...AI_MODELS];
let lastSyncTime: number = 0; // Epoch timestamp
let isSyncing = false;
let syncError: string | null = null;

// Helper to determine iconType from producer
function determineIconType(provider: string, id: string): any {
  const p = provider.toLowerCase();
  const modelId = id.toLowerCase();
  if (p.includes("openai") || modelId.includes("gpt") || modelId.includes("openai")) return "openai";
  if (p.includes("google") || modelId.includes("gemini")) return "google";
  if (p.includes("anthropic") || modelId.includes("claude")) return "anthropic";
  if (p.includes("deepseek")) return "deepseek";
  if (p.includes("meta") || modelId.includes("llama")) return "meta";
  if (p.includes("mistral") || modelId.includes("codestral")) return "mistral";
  if (p.includes("glm") || p.includes("zhipu")) return "glm";
  if (p.includes("qwen") || p.includes("alibaba")) return "qwen";
  if (p.includes("cohere")) return "cohere";
  if (p.includes("xai") || modelId.includes("grok")) return "xai";
  if (p.includes("moonshot") || p.includes("kimi")) return "kimi";
  return "google"; // Default fallback
}

// Map OpenRouter provider keys to user-friendly names
function mapProviderName(orId: string, orName: string): string {
  const parts = orId.split('/');
  const prefix = parts.length > 1 ? parts[0].toLowerCase() : "";
  
  if (prefix === "openai" || orName.toLowerCase().includes("openai")) return "OpenAI";
  if (prefix === "google" || orName.toLowerCase().includes("google") || orName.toLowerCase().includes("gemini")) return "Google";
  if (prefix === "anthropic" || orName.toLowerCase().includes("anthropic") || orName.toLowerCase().includes("claude")) return "Anthropic";
  if (prefix === "deepseek" || orName.toLowerCase().includes("deepseek")) return "DeepSeek";
  if (prefix === "meta" || orName.toLowerCase().includes("llama")) return "Meta";
  if (prefix === "mistralai" || orName.toLowerCase().includes("mistral")) return "Mistral";
  if (prefix === "cohere" || orName.toLowerCase().includes("cohere")) return "Cohere";
  if (prefix === "x-ai" || orName.toLowerCase().includes("grok") || orName.toLowerCase().includes("xai")) return "xAI";
  if (prefix === "moonshot" || orName.toLowerCase().includes("kimi") || orName.toLowerCase().includes("moonshot")) return "Moonshot (Kimi)";
  if (orName.toLowerCase().includes("zhipu") || orName.toLowerCase().includes("glm")) return "GLM (Zhipu AI)";
  if (prefix === "qwen" || orName.toLowerCase().includes("qwen")) return "Alibaba Qwen";
  
  // capitalized fallback
  if (prefix) {
    return prefix.charAt(0).toUpperCase() + prefix.slice(1);
  }
  return "Other";
}

// Sync function (calls OpenRouter)
async function performOpenRouterSync(force = false) {
  // To fulfill "call only one time", cache for 1 hour unless force-refreshed
  const cacheDurationMs = 60 * 60 * 1000;
  const now = Date.now();
  if (!force && lastSyncTime > 0 && (now - lastSyncTime < cacheDurationMs)) {
    console.log("[OpenRouter Sync] Using cached model data (last synced " + new Date(lastSyncTime).toISOString() + ")");
    return;
  }

  if (isSyncing) return;
  isSyncing = true;
  syncError = null;

  try {
    console.log("[OpenRouter Sync] Fetching latest models from OpenRouter...");
    const apiKey = process.env.OPENROUTER_API_KEY;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiKey && apiKey.trim().startsWith("sk-or-")) {
      headers["Authorization"] = `Bearer ${apiKey.trim()}`;
    }

    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API failed with status ${response.status}`);
    }

    const result = await response.json();
    if (!result || !Array.isArray(result.data)) {
      throw new Error("Invalid response format from OpenRouter API");
    }

    const orModels = result.data;
    console.log(`[OpenRouter Sync] Successfully fetched ${orModels.length} models from OpenRouter.`);

    // Keep deep copy of static AI_MODELS to start with
    const updatedList: AIModel[] = JSON.parse(JSON.stringify(AI_MODELS));
    const matchedOrIds = new Set<string>();

    // 1. First Pass: Update existing local models where high-confidence match found
    for (let i = 0; i < updatedList.length; i++) {
      const local = updatedList[i];
      const localIdLower = local.id.toLowerCase();
      
      // Look for the best matching model in OpenRouter data
      const matched = orModels.find((or: any) => {
        const orId = or.id.toLowerCase();
        // Exact match of part (e.g., openai/gpt-4o vs gpt-4o) or full id match
        const parts = orId.split('/');
        const relativeId = parts.length > 1 ? parts[1] : orId;
        
        return (
          orId === localIdLower ||
          relativeId === localIdLower ||
          orId.replace("anthropic/", "") === localIdLower ||
          orId.replace("openai/", "") === localIdLower ||
          orId.replace("google/", "") === localIdLower ||
          relativeId === localIdLower.replace("-chat-v3", "") ||
          relativeId === localIdLower.replace("-sonnet-4", "") ||
          relativeId === localIdLower.replace("-r1", "")
        );
      });

      if (matched) {
        matchedOrIds.add(matched.id);
        const promptCost = matched.pricing?.prompt ? parseFloat(matched.pricing.prompt) : 0;
        const completionCost = matched.pricing?.completion ? parseFloat(matched.pricing.completion) : 0;
        
        // Convert dollar-per-token to dollar-per-million-tokens
        local.inputCostPerMillion = Number((promptCost * 1000000).toFixed(6));
        local.outputCostPerMillion = Number((completionCost * 1000000).toFixed(6));
        
        // Map context length
        if (matched.context_length) {
          const len = matched.context_length;
          local.contextWindow = len >= 1000000 
            ? `${(len / 1000000).toFixed(0)}M+` 
            : `${Math.round(len / 1000)}K`;
        }
        
        if (matched.created) {
          local.created = Number(matched.created);
        }
        
        console.log(`[OpenRouter Sync] Matched and updated local model: ${local.id} (Prompts: $${local.inputCostPerMillion}/M, Comps: $${local.outputCostPerMillion}/M, Context: ${local.contextWindow}, Created: ${local.created})`);
      }
    }

    // 2. Second Pass: Dynamically add newly released models (especially the latest Gemini 3.5, Claude 4.5/4.8, etc.) if they exist on OpenRouter but not already matched!
    const newlyDiscovered: AIModel[] = [];
    for (const or of orModels) {
      if (matchedOrIds.has(or.id)) continue;

      const orIdLower = or.id.toLowerCase();
      const orName = or.name;

      // Filter to keep models that are interesting, such as latest Gemini 3.5 / Claude 4.5 / Claude 4.8 / Grok 3-4 etc.
      const isLatestInteresing = 
        orIdLower.includes("gemini") || 
        orIdLower.includes("claude") || 
        orIdLower.includes("gpt") || 
        orIdLower.includes("deepseek") || 
        orIdLower.includes("grok") || 
        orIdLower.includes("qwen") || 
        orIdLower.includes("glm") || 
        orIdLower.includes("kimi") ||
        orIdLower.includes("command-r") || 
        orIdLower.includes("o3") || 
        orIdLower.includes("o1") || 
        orIdLower.includes("o4") || 
        orName.includes("3.1") || 
        orName.includes("3.2") || 
        orName.includes("3.5") || 
        orName.includes("4.5") || 
        orName.includes("4.8") || 
        orName.includes("1") || 
        orName.includes("3") || 
        orName.includes("4");

      // Don't add deprecated or legacy files unless required (keeps catalog clean and beautiful)
      const isSelfNoise = orIdLower.includes("free") || orIdLower.includes("deprecated") || orIdLower.includes("legacy") || orIdLower.includes("moderation");

      if (isLatestInteresing && !isSelfNoise) {
        const promptCost = or.pricing?.prompt ? parseFloat(or.pricing.prompt) : 0;
        const completionCost = or.pricing?.completion ? parseFloat(or.pricing.completion) : 0;
        
        const inputCost = Number((promptCost * 1000000).toFixed(6));
        const outputCost = Number((completionCost * 1000000).toFixed(6));
        
        let ctx = "128K";
        if (or.context_length) {
          const len = or.context_length;
          ctx = len >= 1000000 
            ? `${(len / 1000000).toFixed(0)}M+` 
            : `${Math.round(len / 1000)}K`;
        }

        const mappedProvider = mapProviderName(or.id, or.name);
        
        // Estimate capability ratings based on performance and cost tier
        let scoretier: 'Exceptional' | 'Very High' | 'High' | 'Medium' | 'Basic' = "Medium";
        if (inputCost >= 2.0 || orIdLower.includes("pro") || orIdLower.includes("opus") || orIdLower.includes("sonnet") || orIdLower.includes("r1") || orIdLower.includes("o1") || orIdLower.includes("gpt-4")) {
          scoretier = "Exceptional";
        } else if (inputCost >= 0.25 || orIdLower.includes("flash") || orIdLower.includes("mini")) {
          scoretier = "Very High";
        } else if (inputCost > 0.05) {
          scoretier = "High";
        }

        // Clean name to not contain provider prefix if mapped correctly
        let displayName = or.name;
        if (displayName.includes(": ")) {
          displayName = displayName.split(": ")[1];
        }

        newlyDiscovered.push({
          id: or.id,
          name: displayName,
          provider: mappedProvider,
          inputCostPerMillion: inputCost,
          outputCostPerMillion: outputCost,
          contextWindow: ctx,
          speed: inputCost < 0.2 ? "Extremely Fast" : (inputCost < 1.0 ? "Very Fast" : "Fast"),
          coding: scoretier,
          reasoning: scoretier,
          bestFor: `Dynamic OpenRouter model for ${mappedProvider} developers`,
          strength: "Live OpenRouter Pricing",
          iconType: determineIconType(mappedProvider, or.id),
          created: or.created ? Number(or.created) : Math.floor(Date.now() / 1000)
        });
      }
    }

    // Combine them, placing newly discovered ones cleanly at the bottom
    cachedModels = [...updatedList, ...newlyDiscovered];
    lastSyncTime = now;
    console.log(`[OpenRouter Sync] Sync complete. Active models catalog is now ${cachedModels.length} models (Static: ${AI_MODELS.length}, New dynamically matched & added: ${newlyDiscovered.length})`);
  } catch (error: any) {
    console.error("[OpenRouter Sync] Error running sync:", error);
    syncError = error.message || String(error);
  } finally {
    isSyncing = false;
  }
}

// Initial Sync trigger (Bootstrapping caching, satisfying one-time load request)
performOpenRouterSync(false).catch(console.error);

// API endpoint to serve model prices
app.get("/api/models", async (req, res) => {
  const force = req.query.force === "true";
  if (force) {
    await performOpenRouterSync(true);
  } else {
    // Background sync check if cache stale or has empty initialization
    performOpenRouterSync(false).catch(console.error);
  }

  res.json({
    status: syncError ? "error" : "success",
    isSyncing,
    lastSyncTime,
    error: syncError,
    models: cachedModels,
  });
});

// Sync triggers
app.get("/api/sync-status", (req, res) => {
  res.json({
    isSyncing,
    lastSyncTime,
    error: syncError,
    modelsCount: cachedModels.length
  });
});

app.post("/api/sync", async (req, res) => {
  await performOpenRouterSync(true);
  res.json({
    status: syncError ? "error" : "success",
    isSyncing,
    lastSyncTime,
    error: syncError,
    modelsCount: cachedModels.length
  });
});

// Vite / static file serving integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[Vite] Initializing development server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Production] Serving static files from dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
    const hasKey = !!(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim().startsWith("sk-or-"));
    console.log(`[Server] OpenRouter Key Loaded: ${hasKey ? "Yes (Matches sk-or-...)" : "No"}`);
  });
}

startServer();
