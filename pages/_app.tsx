import "../styles/globals.scss";
import type { AppProps } from "next/app";
import useCartReducer from "@/hooks/useCartReducer";
import CartContext from "@/lib/cart/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  const cart = useCartReducer();

  return (
    <CartContext.Provider value={cart}>
      <Component {...pageProps} />;
    </CartContext.Provider>
  );
}
