const express = require("express");
const connectDB = require("./Db/DbConnection");
const User = require("./Db/User");

const app = express();
const PORT = 3030;

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON bodies
app.use(express.json());

// Registration endpoint
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        let existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ msg: "Username already exists" });
        }

        // Create a new user
        const newUser = new User({ username, password });
        await newUser.save();
        console.log(req.body)

        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//Login

//Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username exists
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Password is correct, send a success message
        res.status(200).json({ msg: "Login successful" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
