import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/config";
import { calculateTotal, transformProducts } from "@/lib/cart/CartHelpers";
import { gql, useQuery } from "@apollo/client";
import useCart from "@hooks/useCart";
import { Product } from "@interfaces";
import { useMemo } from "react";

export const GET_PRODUCTS = gql`
  query GetProducts($ids: [ID!]!) {
    products(ids: $ids) {
      id
      namePl
      inStock
      price
      imageUuid
    }
    isStoreOpen
  }
`;

export interface GetProductsQueryResult {
  products: Product[];
  isStoreOpen: boolean;
}

export interface GetProductsQueryVariables {
  ids: string[];
}

export const useGetProductsQuery = (ids: string[]) =>
  useQuery<GetProductsQueryResult, GetProductsQueryVariables>(GET_PRODUCTS, {
    variables: { ids },
    fetchPolicy: "cache-and-network"
  });

export const useCartProductsQuery = () => {
  const { ids, items } = useCart();
  const { data, loading } = useGetProductsQuery(ids);
  const products = transformProducts(data?.products ?? []);

  const productTotal = useMemo(() => {
    if (!Object.entries(products).length) return 0;
    return calculateTotal(items, products);
  }, [items, products]);

  const isFreeShipping = productTotal >= FREE_SHIPPING_THRESHOLD;
  const isStoreOpen = data?.isStoreOpen;

  const grandTotal = isFreeShipping
    ? productTotal
    : productTotal + SHIPPING_FEE;

  return {
    loading,
    products,
    productTotal,
    grandTotal,
    isFreeShipping,
    isStoreOpen
  };
};
