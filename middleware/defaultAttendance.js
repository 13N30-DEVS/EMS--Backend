import Attendance from '../models/Attendance.js'
import Employee from '../models/Employee.js'

const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const existingAttendance = await Attendance.findOne({ date });

    if (!existingAttendance) {
      const employees = await Employee.find({});        
      
      // Check for existing attendance before creating new records
const existingEmployeeAttendance = await Attendance.find({ date });
const existingEmployeeIds = existingEmployeeAttendance.map((att) => att.employeeId.toString());

  const attendance = employees
        .filter(employee => !existingEmployeeIds.includes(employee._id.toString())) // Filter out employees with existing attendance
        .map(employee => ({
          date,
          employeeId: employee._id,
          status: null
        }));

      if (attendance.length > 0) {
        await Attendance.insertMany(attendance); // Insert only new records
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

  

export default defaultAttendance
