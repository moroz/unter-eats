import { query } from "@api/query";
import { gql, useQuery } from "@apollo/client";

export const IS_STORE_OPEN = gql`
  query IsStoreOpen {
    isStoreOpen
  }
`;

export interface IsStoreOpenQueryResult {
  isStoreOpen: boolean;
}

export const useIsStoreOpenQuery = () =>
  useQuery<IsStoreOpenQueryResult>(IS_STORE_OPEN, {
    fetchPolicy: "cache-and-network"
  });

export const getStoryOpenState = query<IsStoreOpenQueryResult>(IS_STORE_OPEN);
