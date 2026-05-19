import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function translateAlert(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return text;

  try {
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are a professional Arabic travel assistant for an airline alerts dashboard. Translate the user's text into concise, professional Modern Standard Arabic. For flight statuses use natural aviation terms (e.g. scheduled, active, landed, cancelled, diverted, incident). Return only the Arabic translation with no quotes or explanation.",
        },
        {
          role: "user",
          content: trimmed,
        },
      ],
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content?.trim() || trimmed;
  } catch (error) {
    console.error("DeepSeek Error:", error);
    return trimmed;
  }
}