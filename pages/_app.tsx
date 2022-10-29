import "../styles/globals.scss";
import type { AppProps } from "next/app";
import useCartReducer from "@/hooks/useCartReducer";
import CartContext from "@/lib/cart/CartContext";
import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "@api/client";

export default function App({ Component, pageProps }: AppProps) {
  const cart = useCartReducer();

  return (
    <ApolloProvider client={initializeApollo()}>
      <CartContext.Provider value={cart}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </ApolloProvider>
  );
}
