import { Reducer } from "react";
import { CartAction } from "./CartAction";
import { CartState } from "./CartState";

export const initialState = {
  items: []
};

const CartReducer: Reducer<CartState, CartAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default CartReducer;
