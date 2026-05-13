import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUserShield } from "react-icons/fa6";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ================= LOGIN =================

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    try {

      // LOGIN API

      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      );

      // SAVE USER

      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful 🚀");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {

        setError(error.response.data.message);

      } else {

        setError("Server Error");

      }

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2b0036] via-[#05052d] to-[#00145c] px-4">

      {/* LOGIN BOX */}

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-[40px] shadow-2xl px-8 py-10">

        {/* ICON */}

        <div className="flex justify-center mb-5">

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center shadow-lg">

            <FaUserShield className="text-white text-5xl" />

          </div>

        </div>

        {/* TITLE */}

        <h1 className="text-5xl font-bold text-center text-purple-300">
          Login
        </h1>

        {/* SUBTITLE */}

        <p className="text-center text-gray-300 mt-3 mb-8 text-xl">
          Welcome back to your task manager
        </p>

        {/* ERROR */}

        {error && (
          <p className="text-red-400 text-center mb-5 text-lg font-semibold">
            {error}
          </p>
        )}

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-6"
        >

          {/* EMAIL */}

          <div className="w-[88%] flex items-center rounded-2xl bg-white/10 border border-white/20 px-5">

            <MdEmail className="text-white text-2xl mr-4" />

            <input
              type="email"
              placeholder="Enter gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              className="w-full py-4 bg-transparent text-white text-xl placeholder-gray-300 outline-none border-none focus:outline-none focus:ring-0"
              style={{
                backgroundColor: "transparent",
                WebkitBoxShadow:
                  "0 0 0px 1000px transparent inset",
                WebkitTextFillColor: "white",
                caretColor: "white",
                transition:
                  "background-color 5000s ease-in-out 0s",
              }}
            />

          </div>

          {/* PASSWORD */}

          <div className="w-[88%] flex items-center rounded-2xl bg-white/10 border border-white/20 px-5">

            <FaLock className="text-white text-2xl mr-4" />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full py-4 bg-transparent text-white text-xl placeholder-gray-300 outline-none border-none focus:outline-none focus:ring-0"
              style={{
                backgroundColor: "transparent",
                WebkitBoxShadow:
                  "0 0 0px 1000px transparent inset",
                WebkitTextFillColor: "white",
                caretColor: "white",
                transition:
                  "background-color 5000s ease-in-out 0s",
              }}
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-[88%] py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold text-2xl hover:scale-105 duration-300 shadow-lg"
          >
            Login
          </button>

        </form>

        {/* SIGNUP */}

        <p className="text-center text-gray-300 mt-7 text-xl">

          Don't have an account?{" "}

          <Link
            to="/"
            className="text-pink-400 font-bold hover:text-pink-300"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;