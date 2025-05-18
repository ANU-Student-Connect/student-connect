import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => { 
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json({ users: filteredUsers });

    } catch (error) {
        console.error("Error in getUsersForSidebar", error.message);
        res.status(500).json({ message: "Internal server Error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error in getUserById", error.message);
        res.status(500).json({ message: "Internal server Error" });
    }
};

// POST /api/users/edit
export const editUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" }); 
    }

    res.status(200).json({ message: "User updated", user: updatedUser }); 
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
