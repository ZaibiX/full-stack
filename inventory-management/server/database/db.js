import mongoose from "mongoose";
console.log("MongoDB URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    // Correct connection string with proper database name
    await mongoose.connect(process.env.MONGO_URI   );
    console.log("Connected to MongoDB!");

  } catch (error) {
    console.log("Mongo db error: ", error.message);
    
  }
};

export default connectDB;
