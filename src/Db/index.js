import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const connectionStatus = await mongoose.connect(
      `${process.env.DB_URI}/${process.env.DB_Name}`
    );
    console.log(
      `\n MongoDB connected....=> ${connectionStatus.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection Error", error);
    process.exit(1);
  }
};
export default connectDB;
