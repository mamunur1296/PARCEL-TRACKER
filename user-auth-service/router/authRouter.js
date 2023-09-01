import express from "express";
import authRouter from "../controler/index.js";


const userRouter=express.Router()



userRouter.get("/",authRouter.getUser );
userRouter.post("/addusers",authRouter.postUser);
userRouter.put("/updateuser/:userId",authRouter.updateUser);
userRouter.delete("/deleteusers",authRouter.deleteUser);

const configureUserControler=(app)=>{
    app.use("/user" , userRouter)
}

export default configureUserControler;