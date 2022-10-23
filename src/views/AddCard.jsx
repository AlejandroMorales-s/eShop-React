import React from "react";
import ReactDocumentTitle from "react-document-title";
import Navbar from "../components/navbar/Navbar";
import CardForm from "../components/myCards/CardForm";
import Breadcrumb from "../components/breadcrumbTrail/Breadcrumb";

export default function AddCard() {
  const breadcrumb = [
    {
      link: "/account",
      text: "My account",
    },
    {
      link: "/account/my-cards",
      text: "My cards",
    },
    {
      link: "/account/add-card",
      text: "Add card",
    },
  ];
  return (
    <>
      <ReactDocumentTitle title="Add card" />
      <Navbar />
      <Breadcrumb array={breadcrumb} />
      <CardForm />
    </>
  );
}
