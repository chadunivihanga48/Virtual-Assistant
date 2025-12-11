import express from "express";
import { getCurrentUser, updateAssistant } from "../controllers/user.controllers.js"
import isAuth from "../middlewears/isAuth.js";
import upload from "../middlewears/multer.js";

const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrentUser)
userRouter.post("/update", isAuth, upload.single("assistantImage"), updateAssistant)

export default userRouter;