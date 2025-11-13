<h1 align="center">🤖 WhatsApp AI Assistant</h1>
<h3 align="center">Atendente Virtual Inteligente para WhatsApp</h3>

<img width="1890" height="591" alt="Cópia de Cópia de Cópia de ↓ Read More ↓" src="https://github.com/user-attachments/assets/8258b0de-f79d-46bf-885c-042341c41386" />

---

## 📋 Descrição do Projeto

Este projeto cria uma **atendente virtual para WhatsApp**, usando **Baileys** para integrar ao WhatsApp Web e **OpenAI GPT** para gerar respostas inteligentes.  
A atendente age como uma vendedora simpática, prestativa e disponível 24h por dia.

---

## 🚀 Funcionalidades

- Conexão com o WhatsApp via **Baileys API**
- Respostas automáticas usando **OpenAI GPT**
- Personalização de contexto por cliente
- Arquivo `.env` para configuração simples
- Servidor em **Express**
- Compatível com hospedagem local ou em VPS

---

## 🧰 Tecnologias Utilizadas

| Tecnologia | Função |
|-----------|--------|
| **Node.js** | Backend da aplicação |
| **Baileys** | Conexão com WhatsApp |
| **OpenAI API** | Inteligência artificial |
| **Express** | Servidor HTTP |
| **dotenv** | Variáveis de ambiente |
| **qrcode-terminal** | Exibir QR Code |
| **SQLite3** | Armazenamento opcional |

---

## 🧩 Como Configurar o Projeto

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/SEU_USUARIO/whatsapp-ai-assistant.git
cd whatsapp-ai-assistant
```

---

### 2️⃣ Instalar as Dependências

```bash
npm install
```

---

### 3️⃣ Criar o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto e adicione:

```env
OPENAI_API_KEY=sua_chave_aqui
SESSION_NAME=ia_atendente
PORT=3000
```

Sua chave pode ser gerada em:  
https://platform.openai.com/api-keys

---

### 4️⃣ Iniciar o Bot

```bash
npm start
```

---

### 5️⃣ Escanear o QR Code

Ao rodar o projeto, será exibido um QR Code no terminal.  
Escaneie usando o WhatsApp do número que será o atendente.

---

## 🧠 Funcionamento Interno

- O bot recebe mensagens via Baileys.
- Cada mensagem é enviada para a OpenAI.
- A IA gera uma resposta inteligente.
- O bot envia essa resposta automaticamente ao cliente.
- Configurações podem ser ajustadas nos arquivos `ai.js` e `messages.js`.

---

## 🔒 Segurança

- Nunca exponha sua chave `.env`.
- Não use número pessoal.
- Para produção, prefira rodar em VPS.
- Atualize as dependências regularmente.

---

## 👨‍💻 Desenvolvedor

| [<img src="https://avatars.githubusercontent.com/u/75034691?v=4" width="115"><br><sub>Ahmad Said Abdouni</sub>](https://github.com/AhmadSaidAbdouni) |
|:-------------------------------------------------------------------------------------------------------------------------------------------------------:|
