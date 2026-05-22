const Express = require('express');
const Cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = Express();
app.use(Cors());
app.use(Express.json());

const PORT = process.env.PORT || 3000;

// 🔒 तुम्हारे सारे टोकन और लिंक्स यहाँ सुरक्षित हैं, गिटहब पर किसी को नहीं दिखेंगे
const TOKEN = process.env.TELEGRAM_BOT_TOKEN; 
const MINI_APP_URL = process.env.MINI_APP_URL; 
const NETLIFY_URL = process.env.NETLIFY_URL; 

const bot = new TelegramBot(TOKEN, { polling: true });

// जब कोई बॉट में /start दबाए
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome to AI Study Core! 🚀\n\nClick the button below to start your UPSC / NEET Quiz and earn Web3 SBT Certificates.", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "🚀 Open AI Quiz App", url: MINI_APP_URL }]
            ]
        }
    });
});

// बॉट के नीचे "Open Quiz" का परमानेंट Menu Button सेट करने के लिए
bot.setChatMenuButton({
    menu_button: JSON.stringify({
        type: 'web_app',
        text: 'Open Quiz',
        web_app: { url: NETLIFY_URL } 
    })
}).then(() => {
    console.log("Menu button configured successfully!");
}).catch((err) => {
    console.error("Error setting menu button:", err);
});

// Render के लिए बेसिक रूट
app.get('/', (req, res) => {
    res.send('AI Study Core Backend is running securely!');
});

app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});
