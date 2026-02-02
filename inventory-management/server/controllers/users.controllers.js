import User from "../models/users.model.js";
import {signUp} from "./auth.controllers.js";

// --- 1. READ ALL USERS ---
export const readAllUsers = async (req, res) => {
    try {
        // Find all users but EXCLUDE the password field for security
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// --- 2. UPDATE / EDIT USER ---
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, role },
            { new: true, runValidators: true } // 'new' returns the updated doc
        ).select("-password");

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// --- 3. DELETE USER ---
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Security: Prevent Admin from deleting their own account
        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot delete your own admin account!" });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

export function createUser(req, res) {
    // Implementation for creating a new user
    return signUp(req, res);
}