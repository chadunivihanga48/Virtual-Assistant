import express from "express";
import { generateResponse } from "../controllers/chat.controllers.js";
import isAuth from "../middlewears/isAuth.js";

const chatRouter = express.Router();

chatRouter.post("/", isAuth, generateResponse);

export default chatRouter;
