import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Sick", "Leave"],
    default: null
  }
  
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
