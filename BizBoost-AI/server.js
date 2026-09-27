// BizBoost AI secure backend
// Node 18+ recommended. Keep OPENAI_API_KEY in the server environment.
// Never put the key in index.html or other browser code.
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({limit:"100kb"}));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-5.6-luna";

function buildPrompt(body) {
  const b = body.business || {};
  return `You are BizBoost, a helpful marketing assistant for a small business.
Business name: ${b.name || "Not provided"}
Business type: ${b.type || "Not provided"}
Offer: ${b.offer || "Not provided"}
Contact: ${b.contact || "Not provided"}
Task type: ${body.type}
Goal: ${body.goal || "Not specified"}
User details: ${body.input || ""}
Extra details: ${body.extra || ""}

Write useful, accurate marketing content. Do not invent prices, guarantees, testimonials, locations, awards, or business facts. Keep it practical and ready to paste.`;
}

app.post("/api/generate", async (req,res)=>{
  if(!process.env.OPENAI_API_KEY) return res.status(500).json({error:"OPENAI_API_KEY is not configured on the server."});
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},
      body:JSON.stringify({
        model: MODEL,
        input: buildPrompt(req.body),
        max_output_tokens: 700
      })
    });
    const data = await response.json();
    if(!response.ok) return res.status(response.status).json({error:data.error?.message || "AI request failed"});
    const text = data.output_text || (data.output||[]).flatMap(x=>x.content||[]).map(x=>x.text||"").join("\n").trim();
    res.json({text:text || "No text was returned."});
  } catch(e) {
    res.status(500).json({error:e.message});
  }
});

app.listen(PORT,()=>console.log(`BizBoost AI running on http://localhost:${PORT}`));