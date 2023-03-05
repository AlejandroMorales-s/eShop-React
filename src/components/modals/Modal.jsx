import React, { useEffect } from "react";
import {
  AiOutlineClose,
  AiFillCheckCircle,
  AiFillInfoCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  resetModal,
  selectModalClosing,
  selectModalData,
  selectModalStatus,
  setClosingModal,
} from "../../features/modal/modalSlice";

export default function Modal() {
  //* Selectors
  const data = useSelector(selectModalData);
  const modalClosing = useSelector(selectModalClosing);
  const modalStatus = useSelector(selectModalStatus);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setClosingModal());
    setTimeout(() => {
      dispatch(resetModal());
    }, 650);
  };

  const modalTypesIcons = {
    info: (
      <AiFillInfoCircle className="text-[70px] text-blue w-[25px] h-[25px]" />
    ),
    warning: (
      <MdError className="text-[70px] text-yellowModal w-[25px] h-[25px]" />
    ),
    success: (
      <AiFillCheckCircle className="text-[25px] text-greenModal w-[25px] h-[25px]" />
    ),
    error: (
      <AiFillCloseCircle className="text-[25px] text-red w-[25px] h-[25px]" />
    ),
  };

  useEffect(() => {
    if (modalStatus) console.log("opened");
  }, []);

  return (
    <div
      className={`rounded animate-modalIn z-30 p-2 h-fit items-start sticky bottom-2 left-2 sm:bottom-2 sm:left-2 w-fit flex gap-2 dark:bg-darkBg border-l-[5px] dark:border-y-2 dark:border-r-2 shadow-containersShadow dark:border-r-gray-grayDark dark:border-y-gray-grayDark 
      ${data.type === "info" && "border-blue bg-lightBlue"} 
      ${data.type === "error" && "border-red bg-lightRed"} 
      ${data.type === "success" && "border-greenModal bg-lightGreenModal"} 
      ${data.type === "warning" && "border-yellowModal bg-lightYellowModal"}
      ${modalClosing && "animate-modalOut"}
      `}
    >
      {modalTypesIcons[data.type]}
      <div>
        <h2 className=" dark:text-white text-bold font-semibold">
          {data.title}
        </h2>
        <p className="dark:text-gray">{data.message}</p>
      </div>
      <AiOutlineClose
        onClick={closeModal}
        className="text-[15px] w-[15px] h-[15px] dark:text-white cursor-pointer"
      />
    </div>
  );
}
