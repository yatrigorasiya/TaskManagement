const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'To Do' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });
  
  const Task = new mongoose.model('Task', taskSchema);
  
  module.exports = Task;