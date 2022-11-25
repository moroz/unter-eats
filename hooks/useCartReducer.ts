import { CartActionType } from "@lib/cart/CartAction";
import { CartState } from "@lib/cart/CartState";
import CartReducer, { CART_REVISION, initialState } from "@/lib/cart/reducer";
import { useReducer, useCallback, useEffect, useState } from "react";

const CART_KEY = "__ARTESANO_CART";

const persist = (state: CartState) => {
  localStorage.setItem(CART_KEY, JSON.stringify(state));
};

export default function useCartReducer() {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = useCallback(() => {
    setCartOpen((t) => !t);
  }, [setCartOpen]);

  const closeCart = useCallback(() => {
    setCartOpen(false);
  }, [setCartOpen]);

  const [state, dispatch] = useReducer(
    CartReducer,
    initialState,
    (defaultValue) => {
      if (typeof window === "undefined") return defaultValue;

      const persistedStateJSON = localStorage.getItem(CART_KEY);
      const parsed = persistedStateJSON && JSON.parse(persistedStateJSON);
      if (parsed?.revision !== CART_REVISION) return defaultValue;
      return parsed ?? defaultValue;
    }
  );
  const { items } = state;
  const [allIds, setAllIds] = useState(new Set(items.map((i) => i.productId)));

  useEffect(() => {
    persist(state);
  }, [state]);

  const addItem = useCallback(
    (id: string) => {
      dispatch({
        type: CartActionType.AddItem,
        id
      });
      setAllIds((all) => new Set([...all, id]));
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

  const reset = useCallback(() => {
    dispatch({ type: CartActionType.Reset });
  }, [dispatch]);

  return {
    items,
    reset,
    isEmpty: items.length === 0,
    removeItem,
    addItem,
    changeItemQuantity,
    open: cartOpen,
    toggleCart,
    closeCart,
    ids: [...allIds]
  };
}
