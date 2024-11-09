const Groq = require("groq-sdk");
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: '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' });

app.post('/chatbot/message', async (req, res) => {
  const { chats } = req.body;
  console.log(req.body)
  const result = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: 'i am virtual assistant',
      },
      chats
    ],
    model: "llama3-8b-8192",
  });

  res.json({
    output: result.choices[0].message?.content
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
