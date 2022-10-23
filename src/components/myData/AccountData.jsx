import React, { useContext } from "react";
import { globalContext } from "../globalContext/GlobalContext";

export default function AccountData() {
  const { user } = useContext(globalContext);
  return (
    <>
      <h2 className="text-center font-semibold text-title dark:text-gray m-3">Account data</h2>
      <div className="flex flex-col sm:flex-row gap-1 w-95 max-w-[1000px] m-auto">
        <div className="w-100 rounded border-2 border-gray dark:border-gray-grayDark p-2 bg-white shadow-containersShadow dark:bg-darkBg">
          <p className="text-text dark:text-gray">
            <span className="font-semibold text-bold text-boldText dark:text-white">User ID:</span>
            {" "}
            {user.id}
          </p>
        </div>
        <div className="w-100 rounded border-2 border-gray dark:border-gray-grayDark p-2 bg-white shadow-containersShadow dark:bg-darkBg">
          <p className="text-text dark:text-gray">
            <span className="font-semibold text-bold text-boldText dark:text-white">Email:</span>
            {" "}
            {user.email}
          </p>
        </div>
      </div>
    </>
  );
}
