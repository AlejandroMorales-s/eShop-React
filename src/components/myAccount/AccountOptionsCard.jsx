import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export default function AccountOptionsCard({ card }) {
  const {
    title, icon, link, desc,
  } = card;
  return (
    <Link to={link}>
      <div className="bg-white flex justify-between items-center gap-2 p-2 rounded shadow-containersShadow w-100 dark:bg-darkBg border-2 border-gray dark:border-gray-grayDark hover:-translate-y-0.5 hover:border-primary dark:hover:border-primary-light transition-all ease-in-out delay-50">
        <div className="bg-white flex justify-between items-center gap-2 w-100 dark:bg-darkBg">
          <div className="w-fit">
            <p>{icon}</p>
          </div>
          <div className="w-100">
            <h3 className="text-subtitle font-medium dark:text-gray">{title}</h3>
            <p className="text-text">{desc}</p>
          </div>
          <IoIosArrowForward className="text-primary dark:text-primary-light text-[30px]" />
        </div>
      </div>
    </Link>
  );
}
