import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const getAttendance = async (req, res) => {
    try {
        const date = new Date().toISOString().split('T')[0];

        const attendance = await Attendance.find({ date }).populate({
            path: 'employeeId',
            populate: [
                'userId',
                'department'
            ]
        });

        res.json({ success: true, attendance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { status } = req.body;
        const date = new Date().toISOString().split("T")[0];
        const employee = await Employee.findOne({ employeeId })

        const attendance = await Attendance.findOneAndUpdate(
            { employeeId: employee._id, date },
            { status },
            { new: true }
        );

        res.status(200).json({ success: true, attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Generates an attendance report grouped by date.
 *
 * Retrieves attendance records from the database based on optional date, limit, and skip query parameters.
 * The results are populated with employee details and grouped by date. Each grouped record includes
 * the employee ID, name, department name, and attendance status.
 *
 * @param {Object} req - The request object containing query parameters for filtering and pagination.
 * @param {Object} res - The response object used to send back the attendance report data.
 *
 * @returns {Object} - A JSON response with grouped attendance data or an error message in case of failure.
 */

const attendanceReport = async (req, res) => {
    try {
        const { date, limit = 5, skip = 0 } = req.query;
        const query = {};
        if (date) {
            query.date = date;
        }
        const attendanceData = await Attendance.find(query).populate({
            path: 'employeeId',
            populate: [
                'userId',
                'department'
            ]
        }).sort({date: -1}).limit(parseInt(limit)).skip(parseInt(skip))
        const groupData = attendanceData.reduce((result, record) => {
            if (!result[record.date]) {
                result[record.date] = []
            }
            result[record.date].push({
                employeeId: record.employeeId.employeeId,
                employeeName: record.employeeId.userId.name,
                departmentName: record.employeeId.department.dep_name,
                status: record.status || "Not Marked"
            })
            return result
        }, {})
        return res.status(201).json({ success: true, groupData })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export { getAttendance, updateAttendance, attendanceReport };
