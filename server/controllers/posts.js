import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";
import { AppError } from "../utils/AppError.js";
import { BAD_REQUEST } from "../utils/constants.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const LIMIT = 9;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      result: true,
      status: 200,
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.json({
      result: false,
      status: error.status ?? 400,
      message: error.message ?? "Something went wrong.",
    });
  }
};

export const getPostsBySearch = async (req, res) => {
  try {
    const { searchQuery, tags } = req.query;
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({
      result: true,
      status: 200,
      message: `Post of the search query fetched successfully`,
      data: posts,
    });
  } catch (error) {
    res.json({
      result: false,
      status: error.status ?? 400,
      message: error.message ?? "Something went wrong.",
    });
  }
};

export const getPostsByCreator = async (req, res) => {
  try {
    const { name } = req.query;
    const posts = await PostMessage.find({ name });

    res.json({
      result: true,
      status: 200,
      message: `Post of the creater ${name} fetched successfully`,
      data: posts,
    });
  } catch (error) {
    res.json({
      result: false,
      status: error.status ?? 400,
      message: error.message ?? "Something went wrong.",
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError(BAD_REQUEST, "Please provide the post id.");
    }

    const post = await PostMessage.findById(id);
    if (!post) {
      throw new AppError(BAD_REQUEST, `Post with id ${id} no found.`);
    }

    res.json({
      result: true,
      status: 200,
      message: "Post fetched successfully.",
      data: post,
    });
  } catch (error) {
    res.json({
      result: false,
      status: error.status ?? 400,
      message: error.message ?? "Something went wrong.",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = req.body;

    const newPostMessage = new PostMessage({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });

    await newPostMessage.save();

    res.json({
      result: true,
      status: 201,
      message: "Post added Successfully.",
      data: newPostMessage,
    });
  } catch (error) {
    res.json({
      result: false,
      status: error.status ?? 400,
      message: error.message ?? "Something went wrong.",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {
      creator,
      title,
      message,
      tags,
      selectedFile,
      _id: id,
    };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json({
      result: true,
      status: 201,
      message: "Post updated Successfully.",
      data: updatedPost,
    });
  } catch (error) {
    res.json({
      result: false,
      status: error.status ?? 400,
      message: error.message ?? "Something went wrong.",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({
      result: true,
      status: 200,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    res.json({
      result: false,
      status: error.status ?? 400,
      message: error.message ?? "Something went wrong.",
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      throw new AppError(BAD_REQUEST, "Unauthenticated");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(BAD_REQUEST, `No post with id: ${id}`);
    }

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json({
      result: true,
      status: 200,
      message: "Your like is successfully updated.",
      data: updatedPost,
    });
  } catch (error) {
    res.json({
      result: false,
      status: error.status ?? 400,
      message: error.message ?? "Something went wrong.",
    });
  }
};

export const commentPost = async (req, res) => {
  try {
    if (!req.userId) {
      throw new AppError(
        BAD_REQUEST,
        "You need to sign in order to comment on the post.",
      );
    }

    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.json({
      result: true,
      status: 200,
      message: "Your comment successfully added.",
      data: updatedPost,
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
