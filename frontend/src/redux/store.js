import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import generalSlice from "./generalSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    general: generalSlice,
    user: userSlice,
    cart: cartSlice,
  },
});

export default store;
