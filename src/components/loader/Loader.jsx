import React from "react";

export default function Loader() {
  return (
    <div className="absolute flex items-center justify-center w-full top-[200px]">
      <div className="dot-wave">
        <div className="dot-wave__dot" />
        <div className="dot-wave__dot" />
        <div className="dot-wave__dot" />
        <div className="dot-wave__dot" />
      </div>
    </div>
  );
}
