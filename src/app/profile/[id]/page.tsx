import React from "react";

const userProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="mb-3">Profile</h1>

      <p className="text-5xl text-blue-500  ">ID {params.id}</p>
    </div>
  );
};

export default userProfile;
