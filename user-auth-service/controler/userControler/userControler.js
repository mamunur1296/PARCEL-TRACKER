import { NotFound } from "../../../utill/errors.js";
import models from "../../models/index.js";


export const getUser= async (req, res ,next) => {
    try {
        const allUsers = await models.User.find({});
    
        res.status(200).json({
          message: "All users retrieved successfully",
          users: allUsers,
        });
      } catch (error) {
        return next(error , req , res);
      }
}


export const postUser=async (req, res , next) => {
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
      return next(error , req , res);
    }
  }

  export const deleteUser = async (req, res, next) => {
    try {
      const userId = req.query.id;
      // Check if the user exists before attempting to delete
      const userToDelete = await models.User.findById({ _id: userId });
  
      if (!userToDelete) {
        throw new NotFound('User not found'); // Throw a custom NotFound error
      }
  
      await models.User.findByIdAndDelete({ _id: userId });
  
      res.status(200).json({
        message: 'User deleted successfully',
        deletedUser: userToDelete,
      });
    } catch (error) {
      return next(error , req , res); // Pass the error to the error handling middleware
    }
  };
  export const updateUser= async (req, res , next) => {

    try {
        const userId = req.params.userId; // Extract the user ID from the route parameter
        const updateData = req.body; // Get the update data from the request body
    
        // Check if the user exists before attempting to update
        const userToUpdate = await models.User.findById({_id:userId});
    
        if (!userToUpdate) {
          throw new NotFound('User not found'); // Throw a custom NotFound error
        }
    
        // Update the user's information
        const rejult=await models.User.findByIdAndUpdate({_id:userId}, updateData);
    
        res.status(200).json({
          message: "User updated successfully",
          rejult:rejult,
        });
      } catch (error) {
        return next(error , req , res); // Pass the error to the error handling middleware
      }
}