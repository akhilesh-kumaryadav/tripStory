import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
  },
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  googleId: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
