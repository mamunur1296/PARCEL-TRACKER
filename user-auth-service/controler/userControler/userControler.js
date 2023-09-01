import models from "../../models/index.js";


export const getUser= async (req, res) => {
    try {
        const allUsers = await models.User.find();
    
        res.status(200).json({
          message: "All users retrieved successfully",
          users: allUsers,
        });
      } catch (error) {
        console.log("Error while fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users" });
      }
}


export const postUser=async (req, res) => {
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
  }

  export const deleteUser= async (req, res) => {

    try {
        const userId = req.query.id;
        // Check if the user exists before attempting to delete
        const userToDelete = await models.User.findById(userId);
        console.log(userToDelete);
    
        if (!userToDelete) {
          return res.status(404).json({ error: "User not found" });
        }
    
      await models.User.findByIdAndDelete(userId);
    
        res.status(200).json({
          message: "User deleted successfully",
          deletedUser: userToDelete,
          rejult,
        });
      } catch (error) {
        console.log("Error while deleting user:", error);
        res.status(500).json({ error: "An error occurred while deleting the user" });
      }
}
  export const updateUser= async (req, res) => {

    try {
        const userId = req.params.userId; // Extract the user ID from the route parameter
        const updateData = req.body; // Get the update data from the request body
    
        // Check if the user exists before attempting to update
        const userToUpdate = await models.User.findById(userId);
    
        if (!userToUpdate) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Update the user's information
        const rejult=await models.User.findByIdAndUpdate(userId, updateData);
    
        res.status(200).json({
          message: "User updated successfully",
          rejult:rejult,
        });
      } catch (error) {
        console.log("Error while updating user:", error);
        res.status(500).json({ error: "An error occurred while updating the user" });
      }
}