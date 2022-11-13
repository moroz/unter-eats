import { query } from "@api/query";
import { gql } from "@apollo/client";
import { Category } from "@interfaces";
import { GetServerSideProps } from "next";

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      namePl
      slug
      products {
        id
        namePl
        price
        descriptionPl
        imageUuid
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

export const LIST_CATEGORIES = gql`
  query ListCategories {
    categories {
      id
      namePl
      slug
    }
  }
`;

export interface ListCategoriesQueryResult {
  categories: Category[];
}

export const listCategoriesQuery =
  query<ListCategoriesQueryResult>(LIST_CATEGORIES);

export const getCategoriesCallback: GetServerSideProps = async () => {
  const {
    data: { categories }
  } = await listCategoriesQuery();
  return {
    props: {
      categories
    }
  };
};
