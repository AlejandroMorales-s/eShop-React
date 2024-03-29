import React from "react";
import DocumentTitle from "react-document-title";
import { useSelector } from "react-redux";
import Breadcrumb from "../components/breadcrumbTrail/Breadcrumb";
import Navbar from "../components/navbar/Navbar";
import ProductCard from "../components/productCard/ProductCard";
import { selectWishlist } from "../features/wishlist/wishlistSlice";

export default function Wishlist() {
  const breadcrumb = [
    {
      link: "/account",
      text: "My account",
    },
    {
      link: "/account/my-wishlist",
      text: "My wishlist",
    },
  ];
  const wishlist = useSelector(selectWishlist);
  return (
    <>
      <DocumentTitle title="Wishlist" />
      <Navbar />
      <Breadcrumb array={breadcrumb} />
      <h2 className="text-center font-semibold text-title dark:text-gray m-3">
        My wishlist
      </h2>
      <div className="flex flex-col sm:grid sm:grid-cols-4 gap-2 w-95 max-w-[1000px] m-auto">
        {wishlist?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
