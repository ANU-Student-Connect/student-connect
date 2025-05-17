import Avatar from "../models/avatar.model.js";

export const getAllAvatars = async (req, res) => {
  try {
    const avatars = await Avatar.find(); 
    res.status(200).json(avatars);
  } catch (error) {
    console.error("Error fetching avatars:", error);
    res.status(500).json({ message: "Failed to fetch avatars." });
  }
};
