import { CartActionType } from "@/lib/cart/CartAction";
import { CartState } from "@/lib/cart/CartState";
import CartReducer, { initialState } from "@/lib/cart/reducer";
import { useReducer, useCallback } from "react";

export default function useCartReducer() {
  const [{ items }, dispatch] = useReducer(CartReducer, initialState);

  const reset = useCallback(
    (state: CartState) => {
      dispatch({
        type: CartActionType.ResetState,
        state
      });
    },
    [dispatch]
  );

  const addItem = useCallback(
    (id: string) => {
      dispatch({
        type: CartActionType.AddItem,
        id
      });
    },
    [dispatch]
  );

  const changeItemQuantity = useCallback(
    (id: string, quantity: number) => {
      dispatch({
        type: CartActionType.ChangeItemQuantity,
        id,
        quantity
      });
    },
    [dispatch]
  );

  const removeItem = useCallback(
    (id: string) => {
      changeItemQuantity(id, 0);
    },
    [changeItemQuantity]
  );

  return {
    items,
    removeItem,
    addItem,
    changeItemQuantity,
    reset
  };
}
