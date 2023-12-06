"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn, signOut } from "next-auth/react";

function give_password_strength_score(password: string, setPassword: any) {
  setPassword(password);
  let text_length_score = 0;
  let case_score = 0;
  let special_score = 0;

  // has length
  if (password.length > 8) {
    text_length_score += 1;
  }
  if (password.length > 12) {
    text_length_score += 1;
  }

  // has Caps and Lowercase
  if (password.match(/[a-z]/)) {
    case_score += 1;
  }
  if (password.match(/[A-Z]/)) {
    case_score += 1;
  }

  // has numbers
  if (password.match(/[0-9]/)) {
    special_score += 1;
  }
  // has symbols
  if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
    special_score += 1;
  }

  const current_score = text_length_score + case_score + special_score;
  const calculation =
    (current_score / 6) * (text_length_score / text_length_score) * 100;
  const final_score = isNaN(calculation) ? 0 : calculation;
  return {
    text_length_score: text_length_score,
    case_score: case_score,
    special_score: special_score,
    final_score: final_score,
  };
}

const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordScores, setPasswordScores] = useState([0, 0, 0, 0, 0, 0]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      username: username,
      password: password,
      callbackUrl: "/home",
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let obj = give_password_strength_score(e.target.value, setPassword);
    setPasswordScores([
      obj["text_length_score"],
      obj["case_score"],
      obj["special_score"],
    ]);
    setPasswordStrength(obj["final_score"]);
  };

  const submitAvailable =
    password === confirmPassword && passwordStrength === 100;

  const passwordsMatch = password === confirmPassword;

  const passwordsMatchMessage = passwordsMatch ? true : false;

  return (
    <div
      id="wrapper"
      className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Or{" "}
          <Link
            href="/Auth/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Login to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div id="displayname-input">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Displayname
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="john doe"
                  type="text"
                  minLength={5}
                  required
                />
              </div>
            </div>

            <div id="email-input">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="example@gmail.com"
                  type="email"
                  required
                />
              </div>
            </div>

            <div id="password-input">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="********"
                  type="password"
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              {password.length > 0 && (
                <div>
                  <PasswordProgressBar percentage={passwordStrength} />

                  <PasswordAssist
                    text="Password must be at least 8 characters"
                    number={passwordScores[0]}
                  />
                  <PasswordAssist
                    text="Must contain 1 upper and lower case character"
                    number={passwordScores[1]}
                  />
                  <PasswordAssist
                    text="Password must contain at least 1 number and symbols"
                    number={passwordScores[2]}
                  />
                </div>
              )}
            </div>

            <div id="password-input-confirmation">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="********"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-sm text-red-500">Passwords do not match.</p>
              )}
            </div>

            <div id="submit">
              <button
                type="submit"
                disabled={!submitAvailable}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

interface PasswordProgressBarProps {
  percentage: number;
}

const PasswordAssist = ({ text, number }: { text: string; number: number }) => {
  return (
    <div className="flex grid-cols-2">
      {number === 2 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="green"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}

      <p>{text}</p>
    </div>
  );
};
const PasswordProgressBar = ({ percentage }: PasswordProgressBarProps) => {
  function colorFromPercentage(percentage: number) {
    let cor = "${PasswordProgressBarProps}";
    percentage = percentage;
    let data_set = [1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 6 / 6];

    switch (true) {
      case percentage < 50:
        return "bg-red-500";
      case percentage >= 50 && percentage < 75:
        return "bg-yellow-500";
      case percentage >= 75:
        return "bg-green-500";
      default:
        return "bg-red-500";
    }
  }

  return (
    <div className="mt-2 ml-1 mr-1">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-500">
        <div
          className={`bg-gray-500 h-2.5 rounded-full ${colorFromPercentage(
            percentage
          )} transition-width duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default page;
