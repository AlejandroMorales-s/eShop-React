import React, { useContext, useRef } from "react";
import { globalContext } from "../globalContext/GlobalContext";

export default function PersonalData() {
  const { user } = useContext(globalContext);
  const phoneInput = useRef();
  const addPhone = () => {
    phoneInput.position = "absolute";
  };
  return (
    <>
      <h2 className="text-center font-semibold text-title dark:text-gray m-3">Personal data</h2>
      <div className="flex sm:flex-row flex-col gap-1 w-95 max-w-[1000px] m-auto">
        <div className="border-2 border-gray dark:border-gray-grayDark rounded bg-white w-100 shadow-containersShadow p-2 dark:bg-darkBg">
          <p className="text-text dark:text-gray">
            <span className="font-semibold text-bold text-boldText dark:text-white">Name: </span>
            {user.name}
          </p>
        </div>
        <div className="border-2 border-gray dark:border-gray-grayDark rounded bg-white w-100 shadow-containersShadow p-2 dark:bg-darkBg">
          <p className=" text-text dark:text-gray">
            <span className="font-semibold text-bold text-boldText dark:text-white">
              Phone number:
              {" "}
            </span>
            {user.phone === undefined
              ? (
                <>
                  <span
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.keyCode === 13) addPhone(); }}
                    onClick={addPhone}
                    className="text-fb cursor-pointer"
                  >
                    Add phone
                  </span>
                  <input ref={phoneInput} type="tel" name="" id="" className="rounded  border-2 border-primary" />
                </>
              )
              : `${user.phone}`}

          </p>
        </div>
      </div>
    </>
  );
}
