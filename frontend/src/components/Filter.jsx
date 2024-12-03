import React from "react";

const Filter = ({ setPrice, setRating, setCategory }) => {
  const categoryList = [
    "Çanta",
    "Ayakkabı",
    "Bilgisayar",
    "Telefon",
    "Pantolon",
  ];
  const ratingList = [1, 2, 3, 4, 5];

  return (
    <div className="w-[200px] p-4 bg-gray-100 rounded-md shadow-lg mt-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Filtreleme</h2>

      {/* Fiyat Aralığı */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-600 mb-2">Fiyat Aralığı</h3>
        <div className="flex items-center gap-2">
          <input
            onChange={(e) =>
              setPrice((prev) => ({ ...prev, min: e.target.value }))
            }
            className="border w-16 p-1 outline-none rounded-md text-gray-700"
            type="number"
            placeholder="Min"
          />
          <span>-</span>
          <input
            onChange={(e) =>
              setPrice((prev) => ({ ...prev, max: e.target.value }))
            }
            className="border w-16 p-1 outline-none rounded-md text-gray-700"
            type="number"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Kategori */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-600 mb-2">Kategori</h3>
        <ul className="space-y-2">
          {categoryList.map((category, i) => (
            <li
              onClick={() => setCategory(category)}
              key={i}
              className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-4" />

      {/* Puanlama */}
      <div>
        <h3 className="font-medium text-gray-600 mb-2">Puanlama</h3>
        <ul className="space-y-2">
          {ratingList.map((rating, i) => (
            <li
              onClick={() => setRating(rating)}
              key={i}
              className="text-sm text-yellow-500 cursor-pointer hover:text-yellow-600 transition"
            >
              {"★".repeat(rating)}{" "}
              <span className="text-gray-700 ml-1">{rating}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
