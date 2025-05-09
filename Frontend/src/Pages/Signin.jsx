import React from 'react';
import image from "../assets/SigninImage.jpg";

function Signin() {
  return (
    <div className="w-screen h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full max-w-7xl">
        
        {/* Left Image Section */}
        <div className="bg-black opacity-90 rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt="Sign in visual"
            className="rounded-2xl object-cover w-full h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h2>

            <input
              type="text"
              placeholder="Email"
              className="w-full p-3 mb-4 rounded-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-6 rounded-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            />
            <button className="w-full bg-black text-white p-3 rounded-full drop-shadow-md shadow-black opacity-90 hover:opacity-75 transition duration-300 ease-in-out">
              Sign In
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signin;
