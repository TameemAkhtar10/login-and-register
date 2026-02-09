import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://login-and-register-4.onrender.com/api/auth/login",
        { email, password }
      )

      setMessage(res.data.message)
      setIsError(false)

      setTimeout(() => {
        navigate("/")
      }, 1000)
    } catch (err) {
      const msg =
        err.response?.data?.message || "Server error, try again"
      setMessage(msg)
      setIsError(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin()
    setEmail("")
    setPassword("")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800">

        <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />

        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 backdrop-blur-3xl rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/20 backdrop-blur-3xl rounded-full blur-[120px]" />

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-sm sm:max-w-md bg-white/15 backdrop-blur-3xl border border-white/30 rounded-3xl shadow-2xl shadow-black/30 p-6 sm:p-8">

            <div className="mx-auto w-14 h-14 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6z" />
              </svg>
            </div>

            <h2 className="text-center text-2xl sm:text-3xl font-bold text-white">
              Welcome Back 👋
            </h2>

            {message && (
              <p className={`text-center text-sm mb-4 ${isError ? "text-red-300" : "text-green-300"}`}>
                {message}
              </p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-white/80 text-sm">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 outline-none focus:ring-4 focus:ring-white/20 transition"
                />
              </div>

              <div>
                <label className="text-white/80 text-sm">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 outline-none focus:ring-4 focus:ring-white/20 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-white font-semibold hover:bg-white/30 hover:scale-[1.02] transition-all"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-white/70 text-sm mt-6">
              Don’t have an account?{" "}
              <span
                className="text-white font-semibold cursor-pointer hover:underline"
                onClick={() => navigate(-1)}
              >
                Sign Up
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
