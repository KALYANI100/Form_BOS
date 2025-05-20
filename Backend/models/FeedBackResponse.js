import mongoose from 'mongoose';

const feedbackResponseSchema = new mongoose.Schema({
  formId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'FeedbackForm', 
    required: true 
  },
  clientEmail: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  answers: { type: mongoose.Schema.Types.Mixed, required: true },
  eventId: { type: String },
  eventTitle: { type: String }
});
export default mongoose.model('FeedbackFormResponsew', feedbackResponseSchema);
