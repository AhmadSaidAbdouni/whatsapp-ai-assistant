// index.js
import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import express from "express";
import dotenv from "dotenv";
import { handleWithAI } from "./handlers/messages.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

async function startSocket() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState("./auth");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      version
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        qrcode.generate(qr, { small: true });
        console.log("⚠️ Escaneie o QR com o WhatsApp.");
      }

      if (connection === "open") console.log("✅ Conectado ao WhatsApp!");
      if (connection === "close") {
        const reason = lastDisconnect?.error?.output?.statusCode;
        console.log("🔴 Conexão fechada, reason:", reason);
        if (reason === DisconnectReason.loggedOut) {
          console.log("❌ Sessão desconectada. Exclua ./auth e re-autentique.");
        } else {
          console.log("🔁 Tentando reconectar em 2s...");
          setTimeout(() => startSocket(), 2000);
        }
      }
    });

    sock.ev.on("messages.upsert", async (m) => {
      try {
        const messages = m.messages;
        for (const msg of messages) {
          if (!msg.message) continue;
          if (msg.key && msg.key.fromMe) continue;

          let text = msg.message.conversation || msg.message.extendedTextMessage?.text ||
                     msg.message.imageMessage?.caption ||
                     msg.message.buttonsResponseMessage?.selectedButtonId ||
                     msg.message.listResponseMessage?.singleSelectReply?.selectedRowId;

          if (!text) continue;

          const from = msg.key.remoteJid;
          const phone = from.split("@")[0];
          console.log("📩 Mensagem de", phone, ":", text);

          try {
            const reply = await handleWithAI(phone, text);
            if (reply) {
              await sock.sendMessage(from, { text: reply });
              console.log("✅ Resposta enviada para", phone);
            } else {
              console.log("⚠️ Nenhuma resposta gerada pela IA.");
            }
          } catch (aiErr) {
            console.error("❌ Erro ao processar IA:", aiErr);
            await sock.sendMessage(from, { text: "Desculpe, estou com dificuldade para responder agora 😔" });
          }
        }
      } catch (err) {
        console.error("Erro no processamento de mensagens:", err);
      }
    });

    console.log("Socket inicializado. Aguardando QR...");
    return sock;
  } catch (err) {
    console.error("Erro ao iniciar socket:", err);
  }
}

startSocket().catch(err => console.error("Erro no startSocket:", err));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
