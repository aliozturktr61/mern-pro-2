import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products, "pro")
  return (
    <>
      <div className="w-full h-64 overflow-hidden relative">
        <img
          src="https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/66a89b8b90f1f1e5af5b4f99_38%20-%20How%20to%20increase%20online%20grocery%20sales%20Hero.jpg"
          alt="Shopping"
          className="w-full h-full object-cover"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-5">
          {products?.products && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
              {products?.products?.map((product, i) => (
                <ProductCard product={product} key={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
