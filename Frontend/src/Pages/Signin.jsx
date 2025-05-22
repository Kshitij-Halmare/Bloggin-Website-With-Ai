import React from 'react';
import image from "../assets/SigninImage.jpg";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Signin() {
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      imageFile: null,
    });

    
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, password, confirmPassword, occupation, dob, imageFile } = formData;

    if (!name || !email || !password || !confirmPassword || !occupation || !dob) {
      toast.error('All fields are required');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('email', email);
    formDataToSend.append('password', password);
    

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/user/register`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Registration successful!');
      localStorage.setItem("token",data.token);
      navigate('/signin');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen  p-4 overflow-hidden">
      {/* Form Container */}
      <div className="relative z-10  w-full max-w-md p-8 rounded-xl shadow-2xl border border-white/20 backdrop-blur-lg bg-white/5">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-amber-100 font-bold mb-2">WELCOME BACK !!</h1>
        </div>

        <form className="space-y-5 " onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-amber-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg  border border-amber-200 text-white placeholder-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-amber-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-amber-200 text-white placeholder-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-amber-500 hover:opacity-80 text-white font-semibold rounded-lg shadow-md shadow-amber-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Sigining..." : "Signin"}
          </button>
        </form>

        {/* Already have account */}
        <div className="mt-6 text-center">
          <p className="text-amber-100">
            Do not have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer transition-colors duration-300"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
