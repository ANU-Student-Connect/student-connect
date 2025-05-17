import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  }
}, { timestamps: true });

const Avatar = mongoose.model("Avatar", avatarSchema);

export default Avatar;
