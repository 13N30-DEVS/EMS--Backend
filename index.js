import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';
import attendanceRoutes from './routes/attendance.js';
import queryRoutes from './routes/queryRoutes.js';  // Import the query routes
import dashboardRouter from './routes/dashboard.js';
import connectToDatabase from './db/db.js';
import newUserRouter from './routes/newUser.js'; // If you have separate file, ensure correct route.

connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

// Use routes for different modules
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/query', queryRoutes);  // Add the query routes
app.use('/api/dashboard', dashboardRouter);
app.use('/api/signup', newUserRouter); // Ensure proper usage

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
