import express from "express";
const router = express.Router();

import { signIn, signUp, signOut, google } from "../controllers/auth.js";

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/signout", signOut);
router.post("/google", google);

export default router;
