import mongoose from "mongoose";

const url = "mongodb://0.0.0.0:27017/PARCEL-TRACKER";
const options = {};

const dbconnect = async () => {
    try {
      await mongoose.connect(url, options);
      console.log("MongoDB connected successfully");
      // You can perform additional operations here if needed
    } catch (error) {
        console.log("MongoDB connection did not succeed:", error);
    }
  };

  export default dbconnect;