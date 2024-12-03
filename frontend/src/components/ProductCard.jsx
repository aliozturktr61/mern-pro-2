import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { MdEdit, MdDelete } from "react-icons/md";

const ProductCard = ({ product, edit }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 relative mx-auto"
    >
      <Slider {...settings}>
        {product?.images?.map((image, i) => (
          <img className="h-[300px]" key={i} src={image.url} alt={product.name} />
        ))}
      </Slider>
      <div className="p-4">
        <div className="text-xl font-semibold text-gray-800">{product?.name}</div>
        <div className="text-lg font-bold text-gray-900">{product?.price} TL</div>
      </div>
      {edit && (
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <MdEdit size={24} className="text-blue-500 cursor-pointer" />
          <MdDelete size={24} className="text-red-500 cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
