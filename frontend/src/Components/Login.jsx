import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const handleLogin = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login Data:", loginData);
        // Here you can handle the login logic, such as sending a request to your backend
        try {
            const response = await axios.post("http://localhost:3030/login", loginData);
            console.log("Response:", response.data);
            // Handle successful login (e.g., store token, redirect, etc.)
        } catch (error) {
            console.error("Error logging in:", error);
            // Handle login error (e.g., show error message to the user)
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={handleLogin}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleLogin}
                    required
                />
                <button type="submit">Login</button>
                <p>Not registered yet?
                    <Link to="/signup">SignUp</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
