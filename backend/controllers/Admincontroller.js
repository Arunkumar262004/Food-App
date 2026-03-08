import Admin from "../models/Adminmodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// POST /api/admin/login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 3. Sign JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Utility: seed the first admin (run once)
export const seedAdmin = async (req, res) => {
  try {
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) {
      return res.json({ success: false, message: "Admin already exists" });
    }
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const admin = new Admin({ email: process.env.ADMIN_EMAIL, password: hashed });
    await admin.save();
    res.json({ success: true, message: "Admin seeded successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};