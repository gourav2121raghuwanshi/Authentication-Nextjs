"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const verifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyEmail", { token });
      console.log(res);
      setVerified(true);
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    }
  };
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-4xl ">Verify Email</h1>
      <h2 className="p-2 bg-orange-400 rounded-lg ">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h1 className="text-4xl ">Email Verified</h1>
          <Link href="/login">Login </Link>
        </div>
      )}
      {error && (
        <div>
          <h1 className="text-4xl bg-red-400 text-black">Error</h1>
        </div>
      )}
    </div>
  );
};

export default verifyEmailPage;
