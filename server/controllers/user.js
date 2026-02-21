import express from "express";

import UserModal from "../models/user.js";
import { AppError } from "../utils/AppError.js";
import { UNAUTHORIZED } from "../utils/constants.js";

const router = express.Router();

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModal.findOne({ _id: userId });
    if (!user) {
      throw new AppError(UNAUTHORIZED, "Unauthorized.");
    }

    res.json({
      results: true,
      status: 200,
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    res.json({
      result: false,
      status: error.status ?? 400,
      message: error.message ?? "Something went wrong.",
    });
  }
};

export default router;
