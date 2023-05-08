const express = require('express');
const bodyParser = require('body-parser');
const { connectDb } = require('./db');
const { OpenAIApi } = require('openai');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const openai = new OpenAIApi({
  apiKey: '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'
});

app.post('/api/ask', async (req, res) => {
  try {
    // Get the user's prompt from the request
    const { prompt } = req.body;

    // Call the OpenAI API and get the response
    const openaiResponse = await openai.createCompletion({
      engine: 'text-davinci-002',
      prompt: `User: ${prompt}\nAI:`,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const answer = openaiResponse.choices[0].text.trim();

    // Send the AI's response back to the frontend
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get a response from the AI' });
  }
});

const PORT = process.env.PORT || 5001;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
