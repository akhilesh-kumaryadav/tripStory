import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";
import { AppError } from "../utils/AppError.js";
import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from "../utils/constants.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModal.findOne({ email });
    if (!user) {
      throw new AppError(NOT_FOUND, "Invalid credentials.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError(UNAUTHORIZED, "Invalid credentials.");
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res
      .cookie("token", token, { expires: new Date(Date.now() + 900000) })
      .json({
        result: true,
        status: 200,
        message: "Sign in successfully done!!!",
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

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      throw new AppError(BAD_REQUEST, "User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token", token, { expires: new Date(Date.now() + 90000) }).json({
      result: true,
      status: 201,
      message: "User Added To the database.",
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

export const signOut = (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) }).json({
      result: true,
      status: 200,
      message: "Logout Successfully.",
    });
  } catch (error) {
    res.json({
      result: false,
      status: error.status ?? 400,
      message: error.message ?? "Something went wrong.",
    });
  }
};
