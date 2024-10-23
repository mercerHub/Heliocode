import  mongoose  from "mongoose";

export const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/zeotap-assignment")

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};