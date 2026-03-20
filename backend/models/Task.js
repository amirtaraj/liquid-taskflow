import mongoose from 'mongoose';




const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String }, // YYYY-MM-DD
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  completedAt: { type: Date }
});

TaskSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  if (this.isModified('completed')) {
    this.completedAt = this.completed ? new Date() : null;
  }
  next();
});

export default mongoose.model('Task', TaskSchema);