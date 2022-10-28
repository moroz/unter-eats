import { listCategoriesQuery } from "@api/queries";
import { Category } from "@interfaces";
import Layout from "@layout";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  categories: Category[];
}

const ProductPage: React.FC<Props> = ({ categories }) => {
  const { query } = useRouter();

  const backUrl = `/menu/${query.ref ?? ""}`;

  const activeCategory = query.ref
    ? categories.find((c) => c.slug === query.ref)
    : categories[0];

  return (
    <Layout categories={categories}>
      <Link href={backUrl}>&lt;&lt; {activeCategory?.namePl}</Link>
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
