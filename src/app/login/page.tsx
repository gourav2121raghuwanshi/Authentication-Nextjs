"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisable] = React.useState(true);
  const [loading, setloading] = React.useState(false);

  const onLogin = async () => {
    try {
      setButtonDisable(true);
      setloading(true);
      const res = await axios.post("/api/users/login", user);
      console.log(res);
      toast.success("Login Success");
      router.push("/profile");
      setButtonDisable(false);
      setloading(false);
    } catch (err) {
      console.log("Login failed" + err);
      toast.error("Successfully toasted!");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2  ">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="w-[70%] text-center">
        {loading ? "processing" : "Login"}
      </h1>
      <div className="flex gap-3 items-center mt-4 mx-auto w-[70%]">
        <label htmlFor="email"></label>
        <input
          className="rounded-lg px-2 py-2 w-full text-gray-600 "
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        ></input>
      </div>
      <div className="flex gap-3 items-center mt-4 mx-auto w-[70%]">
        <label htmlFor="password"></label>
        <input
          className="rounded-lg px-2 py-2  w-full text-gray-900 "
          id="password"
          type="text"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        ></input>
      </div>
      <button
        onClick={onLogin}
        className="p-3 w-[68%] mb-2 text-gray-900 border-gray-300 duration-300  transition-all hover:scale-95 focus:outline-none bg-blue-400 rounded-lg mt-4 ">
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/signup">Not Signed Up</Link>
    </div>
  );
};

export default LoginPage;
