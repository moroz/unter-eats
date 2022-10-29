import { gql, useQuery } from "@apollo/client";
import { Product } from "@interfaces";

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
