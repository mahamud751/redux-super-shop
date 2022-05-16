import { CART_DELETE, ITEM_ADD, ITEM_REMOVE } from "../types";
const initialState = {
  cart: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ITEM_ADD:
      const findItem = state.cart.findIndex((item) => item.id === action.payload.id);
      if (findItem >= 0) {
        state.cart[findItem].qtn += 1;
        return {
          ...state,
          cart: [...state.cart],
        };
      } else {
        const item = { ...action.payload, qtn: 1 };
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    case ITEM_REMOVE:
      const findRemoveItem = state.cart.findIndex((item) => item.id === action.payload.id);
      if (state.cart[findRemoveItem].qtn >= 1) {
        state.cart[findRemoveItem].qtn -= 1;
        return {
          ...state,
          cart: [...state.cart],
        };
      } else if (state.cart[findRemoveItem].qtn === 1) {
        const deleteCart = state.cart.filter((item) => item.id !== action.payload);
        return {
          ...state,
          cart: deleteCart,
        };
      }
    case CART_DELETE:
      const deleteCart = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cart: deleteCart,
      };
    default:
      return state;
  }
}
