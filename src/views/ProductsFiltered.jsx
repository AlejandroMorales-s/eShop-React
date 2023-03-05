import React, { useState } from "react";
import DocumentTitle from "react-document-title";
import { useSelector } from "react-redux";
import Modal from "../components/modals/Modal";
import Navbar from "../components/navbar/Navbar";
import ProductCard from "../components/productCard/ProductCard";
import { selectProductsFiltered } from "../features/filters/filtersSlice";

export default function ProductsFiltered() {
  const productsFiltered = useSelector(selectProductsFiltered);
  const [showingModal, setShowingModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    message: "",
  });
  return (
    <>
      <DocumentTitle title="Search" />
      <Navbar />
      <h2 className="text-center font-semibold text-title dark:text-gray m-3">
        {productsFiltered.length}{" "}
        {productsFiltered.length > 1 ? "products" : "product"} found
      </h2>
      <div className="grid relative grid-cols-1 sm:grid-cols-4 gap-2 w-95 max-w-[1000px] m-auto">
        {productsFiltered.map((product) => (
          <ProductCard
            key={product.id}
            setShowingModal={setShowingModal}
            setModalMessage={setModalMessage}
            product={product}
          />
        ))}
      </div>
      {showingModal && (
        <Modal
          type="success"
          title={modalMessage.title}
          desc={modalMessage.message}
          setShowingModal={setShowingModal}
        />
      )}
    </>
  );
}
