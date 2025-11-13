import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askOpenAI(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é uma atendente simpática e prestativa de uma loja de móveis." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao acessar OpenAI:", error);
    return "Desculpe, estou com dificuldade para responder agora 😔";
  }
}
