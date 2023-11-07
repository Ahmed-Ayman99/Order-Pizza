import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./src/features/user/userSlice";
import cartSlice from "./src/features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

export default store;
