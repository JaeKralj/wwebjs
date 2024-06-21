const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const wwebVersion = "2.2412.54";

const client = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth(),
  webVersionCache: {
    type: "remote",
    remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
  },
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// client initialization...

client.on("message", async (msg) => {
  if (msg.body.includes("!everyone")) {
    const chat = await msg.getChat();

    let text = "";
    let mentions = [];

    for (let participant of chat.participants) {
      mentions.push(`${participant.id.user}@c.us`);
    }
    text += `There's a tagged mesage for you. 😊`;

    await msg.reply(text, msg.from, { mentions });
  }
});

client.on("message", async (msg) => {
  if (msg.body.includes("TheDominion")) {
    const chat = await msg.getChat();

    let text = "";
    let mentions = [];

    for (let participant of chat.participants) {
      mentions.push(`${participant.id.user}@c.us`);
    }
    text += `*TheDominion 4 NASS PRO*`;

    await msg.reply(text, msg.from, { mentions });
  }
});

client.initialize();
