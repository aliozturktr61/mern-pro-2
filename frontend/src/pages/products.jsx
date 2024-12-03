import React, { useEffect, useState } from "react";
import Filter from '../components/Filter'
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import ReactPaginate from 'react-paginate';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { keyword } = useSelector((state) => state.general);
  const [price, setPrice] = useState({ min: 0, max: 30000 });
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 3;
  const currentItems = products?.products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products?.products?.length / 3);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % products?.products?.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(getProducts({ keyword, price, rating, category }));
  }, [dispatch, keyword, price, rating, category]);

  return (
    <div className="mx-3 min-h-screen">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-1/4">
          <Filter setPrice={setPrice} setRating={setRating} setCategory={setCategory} />
        </div>
        <div className="w-full md:w-3/4">
          {loading ? (
            "loading...."
          ) : (
            products?.products && (
              <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
                {currentItems?.map((product, i) => (
                  <ProductCard product={product} key={i} />
                ))}
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex justify-center mt-5 sm:mt-36">
        <ReactPaginate
          breakLabel="..."
          nextLabel="İleri >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Geri"
          renderOnZeroPageCount={null}
          containerClassName="flex gap-2"
          pageLinkClassName="px-3 py-2 border rounded hover:bg-gray-200"
          previousLinkClassName="px-3 py-2 border rounded hover:bg-gray-200"
          nextLinkClassName="px-3 py-2 border rounded hover:bg-gray-200"
          activeClassName="bg-blue-500 text-white"
        />
      </div>
    </div>
  );
};

export default Products;
