import React from "react";
import ReactDocumentTitle from "react-document-title";
import AccountData from "../components/myData/AccountData";
import PersonalData from "../components/myData/PersonalData";
import Navbar from "../components/navbar/Navbar";
import Breadcrumb from "../components/breadcrumbTrail/Breadcrumb";

export default function MyData() {
  const breadcrumb = [
    {
      link: "/account",
      text: "My account",
    },
    {
      link: "/account/my-data",
      text: "My data",
    },
  ];
  return (
    <>
      <ReactDocumentTitle title="My data" />
      <Navbar />
      <Breadcrumb array={breadcrumb} />
      <AccountData />
      <PersonalData />
    </>
  );
}
