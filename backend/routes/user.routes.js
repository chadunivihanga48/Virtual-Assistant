import express from "express";
import { signUp } from "../controllers/auth.controllers.js";

const useRouter = express.Router()

userRouter.post("/signup", signUp)
userRouter.post("/signin", Login)
userRouter.get("/logout", logOut)

export default useRouter;