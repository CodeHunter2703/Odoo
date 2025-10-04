const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
// const multer = require("multer"); // REMOVED

// Models (Using your specified filenames)
const User = require("./models/User");
const Company = require("./models/ompany");
const Expense = require("./models/EExpense");

// --- Configuration ---
const saltRounds = 10;

// --- Connect to MongoDB ---
mongoose
  .connect("mongodb://localhost:27017/expenseapp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo connection error:", err));

const app = express();

// --- Middleware ---
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "-1");
  next();
});

// Increase payload size limit to accept the Base64 string
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

// --- API Routes ---

// Admin: Add a new user
app.post("/api/admin/add-user", async (req, res) => {
  const { email, password, role, manager } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: "Missing required fields" });
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ email, password: hashedPassword, role, manager });
    await user.save();
    res.status(201).json({ message: "User added successfully!" });
  } catch (err) {
    res.status(400).json({ message: "User already exists or there was an error." });
  }
});

// Public: Signup a new user
app.post("/api/signup", async (req, res) => {
  const { email, password, company, country, role, manager } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: "Missing required fields" });
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ email, password: hashedPassword, company, country, role, manager });
    await user.save();
    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    res.status(400).json({ message: "User already exists or there was an error." });
  }
});

// Public: Login a user
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials." });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });
  res.json({ message: "Login successful!", role: user.role, userEmail: user.email });
});

// Employee: Submit an expense (NO MULTER)
app.post("/api/employee/submit-expense", async (req, res) => {
  // We now expect 'receipt' to be a Base64 string
  const { user, amount, currency, category, description, date, receipt } = req.body;
  if (!user || !amount) return res.status(400).json({ message: "Missing required fields" });
  const expense = new Expense({
    user,
    amount,
    currency,
    category,
    description,
    date,
    receipt_base64: receipt, // Save the Base64 string
    status: "Pending",
  });
  await expense.save();
  res.json({ message: "Expense submitted!" });
});

// Employee: Get their expense history
app.get("/api/employee/expenses", async (req, res) => {
  const { user } = req.query;
  try {
    const list = await Expense.find({ user });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
});

// Manager: Get pending expenses
app.get("/api/manager/pending-expenses", async (req, res) => {
  try {
    const list = await Expense.find({ status: "Pending" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});