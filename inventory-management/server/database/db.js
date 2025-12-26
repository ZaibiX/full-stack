import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Correct connection string with proper database name
    await mongoose.connect(process.env.MONGO_URI   );
    console.log("Connected to MongoDB!");

    // Define a schema for your product
    const productSchema = new mongoose.Schema({
      name: String,
    });

    // Define the model for the 'Product' schema
    const Product = mongoose.model("Product", productSchema); // Collection name will be "products"

    // Create a new product instance
    const newProduct = new Product({ name: "pcc" });

    // Save the product to the database
    await newProduct.save();
    console.log("Product saved: pcc");
  } catch (error) {
    console.log("OH NO ERROR");
    console.log(error);
  }
};

export default connectDB;
