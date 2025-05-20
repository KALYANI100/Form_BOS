import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import FeedbackForm from './models/FeedBackForm.js';
import FeedbackResponse from './models/FeedBackResponse.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));

// Route: Get Feedback Form by ID
app.get('/api/feedback/form/:id', async (req, res) => {
    console.log(req.params.id);
  try {
    const form = await FeedbackForm.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Form not found' });
    res.json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route: Submit Feedback Response
app.post('/api/feedback/form/:id/submit', async (req, res) => {
  try {
    const form = await FeedbackForm.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Form not found' });

    const response = new FeedbackResponse({
      formId: form._id,
      clientEmail: req.body.clientEmail,
      answers: req.body.answers,
      eventId: form.eventId,
      eventTitle: form.eventTitle
    });

    await response.save();

    form.responseCount += 1;
    await form.save();

    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
