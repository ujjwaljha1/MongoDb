import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [signupData, setSignupData] = useState({
        username: "",
        password: ""
    });

    const handleSignup = (e) => {
        const { name, value } = e.target;
        setSignupData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Signup Data:", signupData);
        try {
            const response = await axios.post("http://localhost:3030/register", signupData);
            console.log("Response:", response.data);
            // Handle successful signup (e.g., show success message, redirect, etc.)
        } catch (error) {
            console.error("Error signing up:", error);
            // Handle signup error (e.g., show error message to the user)
        }
    };

    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={signupData.username}
                    onChange={handleSignup}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={handleSignup}
                    required
                />
                <button type="submit">Signup</button>
                <p>Already registered?
                    <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
