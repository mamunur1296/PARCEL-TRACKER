import express from "express";
import mongoose from "mongoose";
import models from "./user-auth-service/models/index.js";
const app = express();
const port = 5000;
app.use(express.json());

const log = (msg) => console.log(msg); 




const url = "mongodb://0.0.0.0:27017/PARCEL-TRACKER";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbconnect = async () => {
    try {
      await mongoose.connect(url, options);
      log("MongoDB connected successfully");
      // You can perform additional operations here if needed
    } catch (error) {
        console.log("MongoDB connection did not succeed:", error);
    }
  };

dbconnect();



app.get("/", (req, res) => {
    res.status(200).send("This server is running successfully");
});

app.post("/users", async (req, res) => {
    try {
      const { userName } = req.body;
      const createdAt = Date.now();
  
      // Create a new user instance
      const newUser = new models.User({ userName, createdAt });
  
      // Save the user to the database
      const createdUser = await newUser.save();
  
      // Respond with a success message and created user data
      res.status(201).json({ message: "User created successfully", Id: createdUser._id });
    } catch (error) {
      // Handle any errors that occur during user creation
      console.log("Error creating user:", error);
      res.status(500).json(error);
    }
  });
app.listen(port, () => {
    console.log(`This server is running on port ${port}`);
});

log(models);
