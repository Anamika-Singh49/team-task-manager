const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Done"],
    default: "Pending"
  },
  dueDate: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setDate(date.getDate() + 2);
      return date;
    }
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);