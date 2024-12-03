import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../redux/productSlice";
import Slider from "react-slick";
import { BsFillStarFill } from "react-icons/bs";
import Button from "../components/Button";
import { addToCart } from "../redux/cartSlice";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.products);
  
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id))
        .unwrap()
        .then((data) => {
          console.log(data, "Fetched Product Detail");
        })
        .catch((error) => {
          console.error("Error fetching product detail:", error);
        });
    }
  }, [dispatch, id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const addBasket = () => {
    const data = {
      id: product?.product?._id,
      name: product?.product?.name,
      price: product?.product?.price,
      image: product?.product?.images[0]?.url, // İlk resmi al
      quantity: quantity,
    };
    dispatch(addToCart(data));
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Azaltma
    }
  };

  const increment = () => {
    if (quantity < product?.product?.stock) {
      setQuantity(quantity + 1); // Arttırma
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="text-center">Yükleniyor...</div>
      ) : (
        <div className="mx-4 my-8 md:mx-10 lg:mx-20">
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {product?.product && (
              <div className="w-full md:w-1/2 lg:w-1/3">
                <Slider {...settings}>
                  {product?.product?.images.map((image, i) => (
                    <img key={i} className="h-[300px] w-full object-cover rounded-lg" src={image.url} alt={product?.product?.name} />
                  ))}
                </Slider>
              </div>
            )}
            <div className="flex flex-col gap-4 w-full md:w-1/2 lg:w-2/3">
              <h1 className="text-3xl font-bold">{product?.product?.name}</h1>
              <p className="text-xl text-gray-700">{product?.product?.description}</p>
              {product?.product?.stock > 0 ? (
                <div className="text-xl text-green-500">
                  Stok Sayısı: {product?.product?.stock}
                </div>
              ) : (
                <div className="text-xl text-red-500">Ürün stokta kalmamıştır</div>
              )}
              <div className="text-3xl">Kategori: {product?.product?.category}</div>
              <div className="text-3xl flex items-center gap-2">
                Rating: {product?.product?.rating} <BsFillStarFill />
              </div>
              <div className="flex items-center gap-4 mt-2">
                <button onClick={decrement} className="bg-gray-200 p-2 rounded-full text-2xl">-</button>
                <span className="text-2xl">{quantity}</span>
                <button onClick={increment} className="bg-gray-200 p-2 rounded-full text-2xl">+</button>
              </div>
              <div className="text-3xl">{product?.product?.price} ₺</div>
              <Button  text={"Sepete Ekle"} onClick={addBasket} />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Details;
