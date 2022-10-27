import { query } from "@api/query";
import { gql } from "@apollo/client";
import { Category } from "@interfaces";

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      nameEn
      namePl
      slug
      products {
        id
        nameEn
        namePl
        price
        descriptionPl
        slug
      }
    }
  }
`;

export interface GetCategoryQueryResult {
  category: Category | null;
}

export interface GetCategoryQueryVariables {
  id: string;
}

export const getCategoryQuery = query<
  GetCategoryQueryResult,
  GetCategoryQueryVariables
>(GET_CATEGORY);
