const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.AI_API_KEY;

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: userMessage }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                }
            }
        );

        const aiReply = response.data.choices[0].message.content;
        res.json({ reply: aiReply });

    } catch (err) {
        console.error(err);
        res.json({ reply: "خطا در ارتباط با هوش مصنوعی" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
