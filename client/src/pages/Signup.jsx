import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      // ERROR

      if (!response.ok) {

        alert(data.message);
        return;

      }

      // SUCCESS

      alert("Signup Successful 🚀");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Signup failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2b0036] via-[#05052d] to-[#00145c] px-4">

      {/* BOX */}

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-[40px] shadow-2xl px-8 py-10">

        {/* ICON */}

        <div className="flex justify-center mb-5">

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center shadow-lg">

            <FaUserShield className="text-white text-5xl" />

          </div>

        </div>

        {/* TITLE */}

        <h1 className="text-5xl font-bold text-center text-purple-300">
          Sign Up
        </h1>

        {/* SUBTITLE */}

        <p className="text-center text-gray-300 mt-3 mb-8 text-xl">
          Create account to manage your tasks
        </p>

        {/* FORM */}

        <form
          onSubmit={handleSignup}
          className="flex flex-col items-center gap-6"
        >

          {/* NAME */}

          <div className="w-[88%] flex items-center rounded-2xl bg-white/10 border border-white/20 px-5">

            <FaUser className="text-white text-2xl mr-4" />

            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            Create Account
          </button>

        </form>

        {/* LOGIN */}

        <p className="text-center text-gray-300 mt-7 text-xl">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-pink-400 font-bold hover:text-pink-300"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;