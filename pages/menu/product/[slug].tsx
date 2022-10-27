import { listCategoriesQuery } from "@api/queries";
import Layout from "@layout";
import { GetServerSideProps } from "next";
import React from "react";

interface Props {}

const ProductPage: React.FC<Props> = () => {
  return (
    <Layout>
      <p>Hello world!</p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    data: { categories }
  } = await listCategoriesQuery();

  return {
    props: {
      categories
    }
  };
};

export default ProductPage;
