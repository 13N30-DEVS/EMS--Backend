import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import Department from "../models/Department.js";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Corrected from 'designation' to 'destination'
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Add new employee
const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;
    console.log("-------------------------------------", req.body);

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ success: false, error: "User already registered" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({
      username: name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    // Save user
    const savedUser = await newUser.save().catch((err) => {
      console.log(err);
    });
    console.log("-=-=-=-=-====-=-=-=-=-=-=-=-==-=-=-=-user", savedUser);
    if (!savedUser) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to save user" });
    }

    // Create the employee
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    // Save employee
    const savedEmployee = await newEmployee.save();
    console.log(savedEmployee);
    if (!savedEmployee) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to save employee" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Employee created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error while adding employee" });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error retrieving employees" });
  }
};

// Get employee by

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee;
    employee = await Employee.findById(id)
      .populate("userId", { password: 0 }) // Exclude password field
      .populate("department"); // Populate department details

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error retrieving employee" });
  }
};

// Update employee details
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, maritalStatus, designation, department, salary } = req.body;

  try {
    // Find the employee
    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    // Find the user associated with the employee
    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      employee.userId,
      { name },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to update user" });
    }

    // Update the employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        maritalStatus,
        designation,
        salary,
        department,
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to update employee" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Employee updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error updating employee" });
  }
};

const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employeesByDepId server error" });
  }
};

export {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
};
