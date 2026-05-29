import { NextResponse } from "next/server";
import { VertexAI } from "@google-cloud/vertexai";

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: "royalty-group-llc", location: "us-central1" });
const model = "gemini-1.5-flash";

const generativeModel = vertex_ai.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0.2,
    topP: 0.95,
  },
  systemInstruction: {
    role: "system",
    parts: [{
      text: `You are the AI Assistant for Royalty Group LLC, a provider of premium independent living homes for seniors and adults with disabilities in Oceanside, California.
Your goal is to answer questions about housing options, the application process, and community services.
Be polite, professional, and helpful. Keep responses concise.
Key details:
- Shared and private rooms are available.
- Applications can be submitted online via the 'Apply for Housing' portal.
- Amenities include modern furnished rooms, utilities, internet, and a supportive community.
- We offer contractor services including handyman repairs, cleaning, and maintenance.
If you don't know the answer, advise the user to contact the office via the Contact Us page.`
    }]
  }
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Convert chat history to Vertex AI format (ignore the initial assistant greeting to avoid role issues if needed, but let's map it safely)
    const formattedHistory = [];
    
    // We only want to process the history up to the current message, but the frontend 
    // actually sends the full history *excluding* the current message.
    for (const msg of history) {
      // Vertex AI expects roles to be either 'user' or 'model'
      const role = msg.role === "assistant" ? "model" : "user";
      formattedHistory.push({
        role: role,
        parts: [{ text: msg.content }]
      });
    }

    // Add the new user message
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }]
    });

    const request = {
      contents: formattedHistory,
    };

    const response = await generativeModel.generateContent(request);
    const resultText = response.response.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response at this time.";

    return NextResponse.json({ reply: resultText });
  } catch (error) {
    console.error("Error generating AI content:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
