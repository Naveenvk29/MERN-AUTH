import express from "express";
import { registerUser } from "../Controllers/user.controllers.js";

const router = express.Router();

router.post("/", registerUser);

export default router;
