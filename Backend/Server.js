const express = require("express");
const connectDB = require("./Db/DbConnection");
const User = require("./Db/User");
const cors = require("cors");

const app = express();
const PORT = 3030;

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON bodies
app.use(express.json());

app.post("/register", async (req, res) => {
    console.log("Request Body:", req.body); // Log the request body for debugging
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: "Please provide a username and password" });
    }

    try {
        // Check if the username already exists
        let existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ msg: "Username already exists" });
        }

        // Create a new user
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).send("Server Error");
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        res.status(200).json({ msg: "Login successful" });
        console.log(req.body);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
