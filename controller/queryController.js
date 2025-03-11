import Query from "../models/queryModel.js";

// Function to handle the submission of a new query
const submitQuery = async (req, res) => {
  try {
    const { name, email, phone, query } = req.body;

    // Create a new query entry in the database
    const newQuery = new Query({ name, email, phone, query });
    
    // Save the query to the database
    await newQuery.save();

    // Send success response
    res.status(201).json({ success: true, message: 'Query submitted successfully', data: newQuery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get all the queries (admin can view them)
const getQueries = async (req, res) => {
  try {
    const queries = await Query.find().sort({ submittedAt: -1 }); // Sort by latest query first
    res.status(200).json({ success: true, data: queries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { submitQuery, getQueries };
