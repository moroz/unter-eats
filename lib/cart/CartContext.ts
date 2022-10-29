import useCartReducer from "@/hooks/useCartReducer";
import React from "react";

type CartContextType = ReturnType<typeof useCartReducer>;

const CartContext = React.createContext<CartContextType | null>(null);

export default CartContext;
