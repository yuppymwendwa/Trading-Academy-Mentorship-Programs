import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the official AI Assistant and Trading Knowledge Advisor for "TRADING KNOWLEDGE" Academy.

BUSINESS KNOWLEDGE BASE:
- Business Identity: We offer full classic classes on forex trading, crypto, and other networks, specializing in ICT (Inner Circle Trader) and CRT (Candle Range Theory) strategies. We focus heavily on risk management, trade confirmation, and institutional liquidity.
- Official Email: yuppymwendwa45@gmail.com
- WhatsApp Support: 0710339554 (Direct owner line)
- Working Hours: Monday - Friday, 8:00 AM - 4:00 PM

PRICING & PAYMENTS:
- Full Course: $100 (Duration: 2 to 3 months).
- Payment Methods: M-Pesa (01 41 47-35 81) and Binance.
- Account Management: 50/50 profit sharing split on daily profits.
- Onboarding Steps:
  1. Submit documents
  2. Pay via M-Pesa (or Binance)
  3. Forward confirmation screenshot to WhatsApp (0710339554)

POLICIES & PROMOTIONS:
- Mentorship Promotion: For $32, students get a FundedNext account. The business trades for the student during mentorship to pass challenges and build capital!
- Refund / Reset Policy: If a student cannot complete a class, they can reset it for a fee of 40% of the total amount.

SOLOMON KING'S CRT SCHOOL & ICT STRATEGY CURRICULUM:
- What is Candle Range Theory (CRT): Every single candle on any timeframe has a High and a Low, creating its Candle Range. Price takes one side of the candle's range and then delivers toward the opposite side.
- Directional Rules:
  - Bullish CRT: Price goes below the candle -> clears the low -> reverses -> moves up. ("Clear the Low -> Go Higher 📈").
  - Bearish CRT: Price goes above the candle -> clears the high -> reverses -> moves down. ("Clear the High -> Go Lower 📉").
- High Probability (H.P) vs Low Probability (L.B) CRT:
  - Bullish H.P CRT: Liquidity is swept below the parent low, and the child candle closes BULLISH (green), proving buyers took control. (L.B CRT closes bearish - avoid).
  - Bearish H.P CRT: Liquidity is swept above parent high, and the child candle closes BEARISH (red), proving sellers took control. (L.B CRT closes bullish - avoid).
- The 3 Forms of CRT: Classic CRT (single sweep & reclaim), Two Candles CRT (sweep on candle 2, close inside on candle 3), Multiple Candles CRT (consolidation cluster breakout).
- Confluence with Key Levels: CRT has highest probability at key levels:
  - CRT + Old Highs/Lows (OL) = H.B CRT
  - CRT + Fair Value Gap (FVG) = H.B CRT
  - CRT + Order Block (OB) = H.B CRT
  - CRT + Mitigation Block (MB) = H.B CRT
  - CRT + Breaker Block (BB) = Top Tier Institutional Execution
- Execution Trigger: "The Third Candle Rule" — when you see the third candle, pay close attention; this is usually the candle that gives you the entry after the CRT setup has been confirmed.
- Multi-Timeframe Fractal Principle: CRT is best identified on the Higher Timeframe (Weekly, Daily, H4), then executed on the Lower Timeframe (H1, 15M, 5M) after a Change In State of Delivery (CISD) or MSS.
- The Three Candles Retracement Rule: For a Retracement to be valid, it MUST have at least THREE candles closing above each other (bullish pullback) or below each other (bearish pullback).
- Proper Break of Structure (BOS): The BODY of the candlestick must close completely above the highest wick (or below lowest wick). If only a wick pierces, it is a sweep/trap, NOT a BOS!
- Mitigation Block vs Breaker Block: Mitigation Block has NO break of the previous high/low (failed swing before MSS); Breaker Block DOES break the previous swing extreme (sweeps liquidity before breaking structure).
- FVG Execution Rules: For Big FVGs, wait for 50% Consequent Encroachment (CE) before entering; for Small FVGs, enter directly from the tip of the FVG.
- Valid Orderblock Requirements: 1. Create a BOS/MSS, 2. Have an Imbalance (FVG), 3. Be Unmitigated.
- Signature Models:
  - Unicorn Setup: Breaker Block or Mitigation Block in confluence with an FVG. (Stop loss below swing low).
  - Balance Price Range (BPR): Two overlapping FVGs from opposite sides of price; entry is at the exact middle overlap between them!
  - Orderblock + FVG Combo: Confluence of an OB backed by an FVG.
- Trade Entry Confirmations:
  - Swing High Confirmation: 3 candles inside POI; middle candle has highest high; 3rd candle closes below middle candle.
  - Swing Low Confirmation: 3 candles inside POI; middle candle has lowest low; 3rd candle closes above middle candle.
- ICT Power of 3 (PO3) & Killzones: Accumulation (Asian 7-10 PM EST) -> Manipulation (London 3-5 AM EST sweep) -> Distribution (New York 7-10 AM EST trend).
- Risk Management Rules: Maximum 1% risk per trade; strict minimum 1:2 Reward-to-Risk ratio. Capital preservation is non-negotiable.

AI BEHAVIOR RULES (MANDATORY):
1. Tone: Polite, respectful, brief, and direct. Keep answers concise, clear, and actionable without fluff.
2. Intelligence: Combine saved business facts and sound trading intelligence to guide prospective students and active traders.
3. Escalation: If a customer is difficult, asks for human intervention, or has specific payment verification disputes, inform them politely: "The owner will follow up with you directly. You can also reach out via WhatsApp at 0710339554 or email at yuppymwendwa45@gmail.com."
`;

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Fallback rule-based answers in case API key is absent or quota issues occur
function getFallbackAnswer(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("mentor") || p.includes("titan") || p.includes("dominic") || p.includes("musyoka") || p.includes("who is") || p.includes("founder") || p.includes("who runs") || p.includes("teacher")) {
    return "Trading Knowledge Academy is founded and mentored by Dominic Musyoka, known as Mentor Titan. He is an institutional trader specializing in ICT and Candle Range Theory (CRT). He personally trades for students during the $32 FundedNext mentorship promotion. You can connect with Dominic directly on WhatsApp at 0710339554 or follow his trading journey on TikTok @yuppydel999!";
  }
  if (p.includes("price") || p.includes("cost") || p.includes("fee") || p.includes("course")) {
    return "Our Full Course is $100 for a duration of 2 to 3 months. We accept payments via M-Pesa (01 41 47-35 81) and Binance. If you ever need to reset a class you cannot complete, our reset fee is 40%.";
  }
  if (p.includes("promo") || p.includes("fundednext") || p.includes("32") || p.includes("mentorship")) {
    return "With our Mentorship Promotion for only $32, you receive a FundedNext account. Our team trades for you during mentorship to pass the prop firm challenges and build your trading capital.";
  }
  if (p.includes("onboard") || p.includes("join") || p.includes("register") || p.includes("start")) {
    return "Onboarding has 3 simple steps:\n1. Submit your documents.\n2. Make payment via M-Pesa (01 41 47-35 81) or Binance.\n3. Forward your confirmation screenshot to our WhatsApp (0710339554).";
  }
  if (p.includes("contact") || p.includes("whatsapp") || p.includes("email") || p.includes("hours") || p.includes("support")) {
    return "You can reach us on WhatsApp at 0710339554 and via email at yuppymwendwa45@gmail.com. Our support hours are Monday to Friday, 8:00 AM – 4:00 PM.";
  }
  if (p.includes("profit") || p.includes("management") || p.includes("split") || p.includes("account")) {
    return "For our Account Management service, we operate on a 50/50 profit split on daily profits.";
  }
  if (p.includes("ote") || p.includes("fibonacci") || p.includes("sweet spot")) {
    return "OTE (Optimal Trade Entry) is measured between 62% and 79% Fibonacci retracement of the impulse leg, with 70.5% recognized as the institutional Sweet Spot for high-probability entries.";
  }
  if (p.includes("school") || p.includes("solomon") || p.includes("textbook") || p.includes("book")) {
    return "Our CRT School curriculum is based on Solomon King's 71-page textbook. It covers the fundamentals of Candle Range Theory, H.P vs L.B CRT, the 3rd candle entry rule, Unicorn & BPR models, and 70+ SMC abbreviations in our interactive reader!";
  }
  if (p.includes("unicorn")) {
    return "The Unicorn Setup occurs when price trades into a POI leaving a Breaker Block (or Mitigation Block) in confluence with a Fair Value Gap (FVG). Place your stop loss below the recent swing low.";
  }
  if (p.includes("retracement") || p.includes("3 candle")) {
    return "The Three Candles Retracement Rule states that for a pullback to be structurally valid, it MUST have at least 3 candles closing above each other (bullish pullback) or below each other (bearish pullback).";
  }
  if (p.includes("bos") || p.includes("break of structure")) {
    return "For a valid BOS (Break of Structure), the candle BODY must close beyond the highest or lowest wick. If only a wick pierces, it is a liquidity sweep or trap, not a true BOS.";
  }
  if (p.includes("crt") || p.includes("candle range")) {
    return "Candle Range Theory (CRT) uses a single candle's high and low as a delivery range. Key rule: Clear the Low -> Go Higher; Clear the High -> Go Lower. High-probability setups require the child candle to close in the intended direction, with the 3rd candle providing the execution entry.";
  }
  if (p.includes("smt") || p.includes("divergence")) {
    return "SMT Divergence identifies when correlated assets (like EURUSD and GBPUSD) fail to confirm extremes. For instance, when one pair makes a lower low while the other makes a higher low, it signals institutional accumulation.";
  }
  if (p.includes("risk")) {
    return "Our risk protocol enforces a strict maximum of 1% risk per trade with a minimum 1:2 Reward-to-Risk ratio.";
  }
  return "Trading Knowledge Academy provides masterclasses in ICT and CRT institutional strategies. Our full course is $100 (2-3 months), with a $32 FundedNext mentorship promotion. Feel free to ask about our entry models, risk rules, or onboarding steps.";
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasApiKey: !!process.env.GEMINI_API_KEY,
      business: "Trading Knowledge Academy",
    });
  });

  // Business Info Endpoint for dynamic frontend grounding
  app.get("/api/info", (req, res) => {
    res.json({
      business: {
        name: "Trading Knowledge Academy",
        founder: "Dominic Musyoka",
        moniker: "Mentor Titan",
        tiktok: "@yuppydel999",
        tiktokUrl: "https://www.tiktok.com/@yuppydel999",
        description:
          "Full classic classes on forex trading, crypto, and other networks, specializing in ICT and CRT strategies. Founded and taught by Dominic Musyoka (Mentor Titan), focusing on strict risk management, trade confirmation, and institutional liquidity.",
        email: "yuppymwendwa45@gmail.com",
        whatsapp: "0710339554",
        whatsappUrl: "https://wa.me/254710339554",
        hours: "Monday - Friday, 8:00 AM - 4:00 PM",
      },
      pricing: {
        fullCourse: {
          priceUsd: 100,
          duration: "2 to 3 months",
        },
        paymentMethods: [
          { name: "M-Pesa", detail: "01 41 47-35 81" },
          { name: "Binance", detail: "Crypto Transfer" },
        ],
        profitSharing: "50/50 split on daily profits for account management",
        onboarding: [
          "1. Submit documents",
          "2. Pay via M-Pesa (01 41 47-35 81) or Binance",
          "3. Forward confirmation screenshot to WhatsApp (0710339554)",
        ],
      },
      policies: {
        mentorshipPromo: {
          priceUsd: 32,
          benefit:
            "Students get a FundedNext account. The business trades for the student during mentorship to pass challenges and build capital.",
        },
        resetPolicy: {
          feePercentage: 40,
          detail:
            "If a student cannot complete a class, they can reset it for a fee of 40% of the total amount.",
        },
      },
      strategies: {
        ictFramework: [
          "Institutional Liquidity: Buy-Side (BSL) vs. Sell-Side (SSL)",
          "Market Structure: Higher Highs (HH), Higher Lows (HL), BOS, and MSS",
          "Premium vs. Discount: Sell above 50% equilibrium, buy below 50%",
          "Optimal Trade Entry (OTE): 62%-79% Fibonacci retracement, with 70.5% sweet spot",
          "5-Step Model: Liquidity Sweep → Order Block → FVG → Displacement → Retest",
        ],
        smtDivergence:
          "Bullish/Bearish divergence when correlated pairs (e.g. EURUSD / GBPUSD) fail to confirm new extremes.",
        turtleSoup: "False sweep reversal models raiding liquidity and reclaiming range.",
        crt: "Candle Range Theory: Every candle is a range; child candle sweeps parent range and reclaims.",
        riskManagement: "Max 1% risk per trade; minimum 1:2 Reward-to-Risk ratio.",
      },
    });
  });

  // AI Chat Endpoint with Gemini 3.8 Flash
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAI();

    // Check for difficult/complaining customer or escalation trigger
    const lower = message.toLowerCase();
    const isDifficultOrDispute =
      lower.includes("scam") ||
      lower.includes("fraud") ||
      lower.includes("sue") ||
      lower.includes("cheat") ||
      lower.includes("hate") ||
      lower.includes("angry") ||
      lower.includes("terrible") ||
      lower.includes("complaint") ||
      lower.includes("speak to human") ||
      lower.includes("talk to owner");

    if (isDifficultOrDispute) {
      return res.json({
        reply:
          "I understand your concern. The owner will follow up with you directly. You can also reach out right away via WhatsApp at 0710339554 or email at yuppymwendwa45@gmail.com (Hours: Mon-Fri 8:00 AM - 4:00 PM).",
        escalated: true,
      });
    }

    if (!ai) {
      // API Key not set yet in environment, return high-accuracy fallback grounded in facts
      return res.json({
        reply: getFallbackAnswer(message),
        fallback: true,
      });
    }

    try {
      // Build conversation context
      let promptText = "";
      if (Array.isArray(history) && history.length > 0) {
        const recent = history.slice(-6);
        for (const item of recent) {
          promptText += `${item.role === "user" ? "Student/Trader" : "Advisor"}: ${item.content}\n`;
        }
      }
      promptText += `Student/Trader: ${message}\nAdvisor:`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: promptText,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.4,
          },
        });
      } catch (firstErr: any) {
        console.warn("Primary model error, attempting fallback model:", firstErr?.message);
        response = await ai.models.generateContent({
          model: "gemini-flash-latest",
          contents: promptText,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.4,
          },
        });
      }

      const reply = response.text?.trim() || getFallbackAnswer(message);
      return res.json({ reply });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      // Seamlessly fallback to accurate facts if external API is temporarily busy
      return res.json({
        reply: getFallbackAnswer(message),
        fallback: true,
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Trading Knowledge Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
