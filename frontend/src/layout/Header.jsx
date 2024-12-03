import React, { useState } from 'react';
import { SlBasket } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getkeyword } from '../redux/generalSlice';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { carts } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { name: "Profil", url: "/profile" },
    { name: "Admin", url: "/admin" },
    { name: "Çıkış", url: "/logout" },
  ];

  const keywordFunc = () => {
    dispatch(getkeyword(keyword));
    setKeyword('');
    navigate('/products');
  };

  const menuFunc = (item) => {
    if (item.name === "Çıkış") {
      localStorage.clear();
      window.location = "/";
    } else {
      window.location = item.url;
    }
  };

  return (
    <div className="bg-gray-100 h-16 px-4 flex items-center justify-between shadow-md">
      <Link to={'/'} className="text-4xl font-bold">Keyifli bir alışveriş deneyimi için e.com</Link>
      <div className="flex items-center gap-5">
        <div className="flex items-center">
          <input 
            value={keyword} 
            onChange={e => setKeyword(e.target.value)}
            className="p-2 border rounded-l-md outline-none"
            type="text"
            placeholder="Ara"
          />
          <button onClick={keywordFunc} className="p-2 bg-blue-500 text-white rounded-r-md">Ara</button>
        </div>

        <div className="relative">
          <img 
            onClick={() => setOpenMenu(!openMenu)}
            className="w-8 h-8 rounded-full cursor-pointer" 
            src={user?.user?.avatar?.url || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} 
            alt="User Avatar" 
          />
          {openMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-md z-10">
              {menuItems.map((item, i) => (
                <div 
                  onClick={() => menuFunc(item)} 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer" 
                  key={i}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <SlBasket size={30} />
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
            {carts?.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
