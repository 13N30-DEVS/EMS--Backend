import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
};

connectToDatabase()
  .then(() => {
    console.log("Connected to MongoDB Successfully");
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });

export default connectToDatabase;
