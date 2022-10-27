import { DocumentNode } from "graphql";
import { initializeApollo } from "./client";

export const query =
  <R, V = {}>(document: DocumentNode) =>
  (variables?: V) => {
    const client = initializeApollo();
    return client.query<R, V>({
      query: document,
      variables
    });
  };
