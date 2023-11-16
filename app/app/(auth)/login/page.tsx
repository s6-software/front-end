"use client"; // If used in Pages Router, is no need to add "use client"

import React from "react";
import { useState } from "react";
const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    );
  };

  return (
    <div className="flex h-screen">
      {/* Left side cover */}
      <div
        className="w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://art.metro.net/wp-content/uploads/2021/02/placeholder.png")',
        }}
      >
        <div className="h-full flex flex-col justify-center items-center absolute inset-0 bg-black bg-opacity-40">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-white">
              Welcome to Your App
            </h1>
            <p className="text-lg text-white mb-8">
              Discover a secure and seamless login experience.
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Right side login form */}
      <div className="w-1/2 bg-gray-800 p-8 flex justify-center items-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="text-white block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-white block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

interface buttonProps {
  text: string;
}

const Button = ({ text }: buttonProps) => (
  <button className="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded duration-100">
    {text}
  </button>
);

export default Home;
