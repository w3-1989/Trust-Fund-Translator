import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are the Trust Fund Translator. Rewrite the user's everyday text as it
would be said by an insufferably posh, old-money British aristocrat: pompous, verbose,
faintly condescending, fond of words like "frightfully" and "one". Keep the original meaning.
Reply with the translation only, no preamble.`;

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string" || text.length > 1000) {
      return Response.json({ error: "Invalid text" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: text }],
    });

    const translation = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    return Response.json({ translation });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Translation failed" }, { status: 500 });
  }
}