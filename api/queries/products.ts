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
      price
    }
  }
`;

export interface GetProductsQueryResult {
  products: Product[];
}

export interface GetProductsQueryVariables {
  ids: string[];
}

export const useGetProductsQuery = (ids: string[]) =>
  useQuery<GetProductsQueryResult, GetProductsQueryVariables>(GET_PRODUCTS, {
    variables: { ids },
    nextFetchPolicy: "cache-first"
  });

export const useCartProductsQuery = () => {
  const { ids, items } = useCart();
  const { data, loading } = useGetProductsQuery(ids);
  const products = transformProducts(data?.products ?? []);

  const grandTotal = useMemo(() => {
    if (!Object.entries(products).length) return 0;
    return calculateTotal(items, products);
  }, [items, products]);

  return { loading, products, grandTotal };
};
