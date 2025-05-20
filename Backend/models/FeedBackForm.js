import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['text', 'checkbox', 'rating', 'multipleChoice'], 
    required: true 
  },
  text: { type: String, required: true },
  required: { type: Boolean, default: false },
  options: [{ type: String }]
});

const feedbackFormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['draft', 'active', 'archived'], 
    default: 'draft' 
  },
  questions: [questionSchema],
  eventId: { type: String },
  eventTitle: { type: String },
  responseCount: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// module.exports = mongoose.model('FeedbackForm', feedbackFormSchema);
export default mongoose.model('FeedbackForm', feedbackFormSchema);