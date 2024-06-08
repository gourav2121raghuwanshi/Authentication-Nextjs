"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { useState,useEffect } from "react";

const page = () => {
  const router = useRouter();
  const [userdata, setUserData] = React.useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("Response data:", res.data); // Log response data
      const userData = res.data; // Assuming the data is directly accessible
      console.log("User data:", userData);
      setUserData(userData._id); // Assuming _id is a direct property of userData
   
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
  getUserDetails();
},[])
// if(userdata) console.log(userdata);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="mb-3">Profile</h1>
      <h2>
        {userdata === "nothing" ? (
             <span           className="bg-blue-300 p-3 mb-4 text-black">Nothing</span> 
      
        ) : (
          <Link 

          href={`/profile/${userdata}`}>
          <span           className="bg-blue-300 p-3  text-black">  Go to user</span> 
            </Link>
        )}
      </h2>
      <button onClick={logout} className="rounded-lg p-2 mt-3 bg-blue-400">
        Logout
      </button>
      <button onClick={getUserDetails} className="rounded-lg p-2 mt-3 bg-green-400">
      getUserDetails
      </button>
    </div>
  );
};

export default page;
