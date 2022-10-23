import React from "react";
import DocumentTitle from "react-document-title";
import AddProductForm from "../components/addProduct/AddProductForm";
import Navbar from "../components/navbar/Navbar";

export default function AddProduct() {
  return (
    <>
      <DocumentTitle title="Add a product" />
      <Navbar />
      <AddProductForm />
    </>
  );
}
