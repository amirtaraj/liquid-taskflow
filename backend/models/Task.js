import mongoose from 'mongoose';


const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String }, // YYYY-MM-DD
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Task', TaskSchema);