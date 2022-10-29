import { Reducer } from "react";
import { CartAction, CartActionType } from "./CartAction";
import { CartState } from "./CartState";

export const initialState = {
  items: []
};

const CartReducer: Reducer<CartState, CartAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CartActionType.AddItem: {
      const existing = state.items.find((i) => i.id === action.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.id !== action.id) return item;
            return {
              ...item,
              quantity: item.quantity + 1
            };
          })
        };
      }
      return {
        ...state,
        items: [...state.items, { id: action.id, quantity: 1 }]
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
