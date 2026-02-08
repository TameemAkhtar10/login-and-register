import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setMessage(" Please fill all fields");
            setIsError(true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage(" Invalid email format");
            setIsError(true);
            return;
        }

        if (password.length < 6) {
            setMessage(" Password must be at least 6 characters");
            setIsError(true);
            return;
        }

        setLoading(true);
        setMessage("");
        setIsError(false);

        try {
            const res = await axios.post(
                'http://localhost:3000/api/auth/rugitser',
                { name, email, password }
            );

            setMessage("✅ " + (res.data.message || "Account created successfully"));
            setIsError(false);

            setName("");
            setEmail("");
            setPassword("");

           

        } catch (err) {
            let errorMsg = "❌ Something went wrong";

            if (err.response) {
                if (err.response.status === 409) {
                    errorMsg = "❌ This email is already registered";
                } else {
                    errorMsg = "❌ " + (err.response.data?.message || "Registration failed");
                }
            } else if (err.request) {
                errorMsg = "❌ Server not responding. Is backend running?";
            }

            setMessage(errorMsg);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        handleRegister();
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800">

            <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white/15 backdrop-blur-3xl border border-white/30 rounded-3xl shadow-2xl p-8">

                    <h2 className="text-center text-3xl font-bold text-white mb-2">
                        Create Account ✨
                    </h2>

                    {message && (
                        <div className={`text-center text-sm mb-4 p-3 rounded-xl ${
                            isError
                                ? "bg-red-500/20 border border-red-500/40 text-red-100"
                                : "bg-green-500/20 border border-green-500/40 text-green-100"
                        }`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handlesubmit} className="space-y-4">

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-2xl bg-white/10 text-white outline-none"
                        />

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-2xl bg-white/10 text-white outline-none"
                        />

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-2xl bg-white/10 text-white outline-none"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-2xl bg-white/20 text-white font-semibold disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Sign Up"}
                        </button>
                    </form>

                    <button
                        onClick={() => navigate("/login")}
                        className="text-white/70 text-sm mt-6 w-full text-center"
                    >
                        Already have an account? Log In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
