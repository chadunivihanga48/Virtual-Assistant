
import express from "express";
import { getCurrentUser } from "../controllers/user.controllers.js"
import isAuth from "../middlewears/isAuth.js";


const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrentUser)
userRouter.post("/update", isAuth, XMLHttpRequestUpload.single("assistantImage"), updateAssistant)

export default userRouter;