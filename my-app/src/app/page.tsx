"use client";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const Router = useRouter();
  function handleRedirect() {
    Router.push("/Auth/login");
  }

  return (
    <div className="bg-gray-800 text-white h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg mb-8">Your note management portal</p>
        <button
          onClick={handleRedirect}
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          Start
        </button>

        <div className="mt-8">
          <h1 className="text-lg font-bold text-black">api endpoints</h1>
          <h1 className="text-lg font-bold text-black">
            {process.env.NEXT_PUBLIC_USERSERVICE_URL}
          </h1>
          <h1 className="text-lg font-bold text-black">
            {process.env.NEXT_PUBLIC_NOTESERVICE_URL}
          </h1>
        </div>
      </div>
    </div>
  );
}
