import express from "express";
import bcrypt from "bcryptjs";
import {User} from "../models/User.js";
import auth from "../middleware/authmiddleware.js";

const router = express.Router();

/* 🔐 CHANGE PASSWORD */
router.put("/change-password", auth,async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ❌ DELETE ACCOUNT */
router.delete("/delete-account", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete account" });
  }
});

export default router;
