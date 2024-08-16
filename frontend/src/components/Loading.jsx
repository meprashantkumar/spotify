import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#212121]">
      <div className="w-16 h-16 border-4 border-green-500 border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
