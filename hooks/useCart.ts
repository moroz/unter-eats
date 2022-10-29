import { useContext } from "react";
import CartContext from "@/lib/cart/CartContext";
import useHydrated from "./useHydrated";

const useCart = () => {
  const hydrated = useHydrated();
  const cart = useContext(CartContext)!;
  return hydrated ? cart : { ...cart, items: [] };
};

export default useCart;
