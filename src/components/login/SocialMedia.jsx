import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { SiFacebook } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { signInMethods } from "../../libs/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedStatus, loginWithSocialMedia } from "../../features/user/userSlice";
import { useEffect } from "react";

export default function SocialMedia() {
  const dispatch = useDispatch();
  const loggedStatus = useSelector(selectLoggedStatus);
  const navigate = useNavigate();

  const loginWithProvider = (id) => dispatch(loginWithSocialMedia(id))

  useEffect(() => {
    if (loggedStatus) navigate('/feed')
  }, [loggedStatus])
  
  return (
    <div>
      <p className=" font-semibold text-center border-b-2 border-gray mt-1.5 dark:text-gray dark:border-gray-grayDark">or</p>
      <div className="flex items-center justify-center gap-2 pt-2">
        <SiFacebook onClick={() => loginWithProvider(signInMethods.facebook)} className="h-3 w-3 text-fb" />
        <FcGoogle onClick={() => loginWithProvider(signInMethods.google)} className="h-3 w-3" />
        <BsGithub onClick={() => loginWithProvider(signInMethods.github)} className="h-3 w-3 dark:text-primary-light" />
      </div>
    </div>
  );
}
