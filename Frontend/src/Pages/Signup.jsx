import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../assets/SigninImage.jpg"
function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageFile: null,
    imagePreview: defaultImage,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        toast.error("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

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
    formDataToSend.append('name', name);
    formDataToSend.append('email', email);
    formDataToSend.append('password', password);
    formDataToSend.append('confirmPassword', confirmPassword);
    formDataToSend.append('occupation', occupation);
    formDataToSend.append('dob', dob);
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

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
          <h1 className="text-3xl text-amber-100 font-bold mb-2">Create Account</h1>
          <p className="text-amber-200">Join our community today</p>
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="imageUpload" className="cursor-pointer">
            <img
              src={formData.imagePreview}
              alt="avatar"
              className="h-32 w-32 rounded-full border-4 border-amber-400 shadow-lg object-cover hover:opacity-90 transition"
            />
            <p className="mt-2 text-sm text-amber-300 hover:text-amber-200">
              Upload Your Photo
            </p>
          </label>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <form className="space-y-5 " onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-amber-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg  border border-amber-200 text-white placeholder-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="John Doe"
            />
          </div>

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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-amber-300 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg  border border-amber-200 text-white placeholder-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Already have account */}
        <div className="mt-6 text-center">
          <p className="text-amber-100">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer transition-colors duration-300"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
