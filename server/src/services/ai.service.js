import "dotenv/config";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_NVIDIA_API_KEY,
  baseURL: process.env.OPENAI_NVIDIA_BASE_URL,
});

export async function answerQuery(query, onToken) {
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content: "Answer factually and clearly. Do not hallucinate."
      },
      {
        role: "user",
        content: query
      }
    ],
    temperature: 0.2,
    max_tokens: 1024,
    stream: true,
  });

  for await (const chunk of completion) {
    const delta = chunk.choices?.[0]?.delta;
    if (delta?.content) {
      onToken(delta.content);
    }
  }
}
