// handlers/messages.js
import { askOpenAI } from "../ai.js";

export async function handleWithAI(phone, text) {
  // phone: numero do cliente (string), text: mensagem recebida
  // Aqui você pode identificar cliente por número e injetar contexto
  try {
    const prompt = `Cliente (${phone}): ${text}\nResponda como uma vendedora simpática de loja, oferecendo ajuda e produtos quando fizer sentido.`;
    const reply = await askOpenAI(prompt);
    return reply;
  } catch (err) {
    console.error("Erro no handler:", err);
    return "Desculpe, estou com dificuldade de responder agora 😔";
  }
}