import { CartActionType } from "@/lib/cart/CartAction";
import { CartState } from "@/lib/cart/CartState";
import CartReducer, { initialState } from "@/lib/cart/reducer";
import { useReducer, useCallback, useMemo, useEffect } from "react";

const CART_KEY = "__ARTESANO_CART";

const persist = (state: CartState) => {
  localStorage.setItem(CART_KEY, JSON.stringify(state));
};

export default function useCartReducer() {
  const [state, dispatch] = useReducer(
    CartReducer,
    initialState,
    (defaultValue) => {
      if (typeof window === "undefined") return defaultValue;

      const persistedStateJSON = localStorage.getItem(CART_KEY);
      const parsed = persistedStateJSON && JSON.parse(persistedStateJSON);
      return parsed ?? defaultValue;
    }
  );
  const { items } = state;

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(state));
  }, [state]);

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
    changeItemQuantity
  };
}
