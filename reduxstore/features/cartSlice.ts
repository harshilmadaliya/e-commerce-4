import { createSlice } from "@reduxjs/toolkit";

// const [, setfirst] = useState(0)
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartQty: 0,
    totalValue: 0,
    itemQty: 0,
    total: 0,
  },
  reducers: {
    addTocart: (state: any, action: any) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].itemQty += 1;
        state.cartItems[itemIndex].totalValue =
          state.cartItems[itemIndex].itemQty * state.cartItems[itemIndex].price;
      } else {
        const tempProduct = {
          ...action.payload,
          itemQty: 1,
          totalValue: action.payload.price,
        };
        state.cartItems.push(tempProduct);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.totalValue = state.cartItems.reduce(
        (total: any, item: { totalValue: any; }) => total + item.totalValue,
        0
      );
    },
    removeFromcart: (state: any, action: any) => {
      const checkItem = state.cartItems.filter(
        (cartItem: { _id: any }) => cartItem._id !== action.payload._id
      );

      state.cartItems = checkItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.totalValue = state.cartItems.reduce(
        (total: any, item: { totalValue: any; }) => total + item.totalValue,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.totalValue = 0;
    },
    removeItemQty: (state: any, action: any) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].itemQty -= 1;
        state.cartItems[itemIndex].totalValue =
          state.cartItems[itemIndex].itemQty * state.cartItems[itemIndex].price;
        if (state.cartItems[itemIndex].itemQty <= 0) {
          const checkItem = state.cartItems.filter(
            (cartItem: { _id: any }) => cartItem._id !== action.payload._id
          );

          state.cartItems = checkItem;
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
      state.totalValue = state.cartItems.reduce(
        (total: any, item: { totalValue: any; }) => total + item.totalValue,
        0
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTocart, removeFromcart, clearCart, removeItemQty } =
  cartSlice.actions;

export default cartSlice.reducer;
