import { getCategoryQuery, listCategoriesQuery } from "@api/queries";
import { CategoryNavigation } from "@components";
import { Category } from "@interfaces";
import Layout from "@layout";
import { GetServerSideProps } from "next";
import React from "react";

interface Props {
  category: Category;
  categories: Category[];
}

const Menu: React.FC<Props> = ({ category, categories }) => {
  return (
    <Layout title={category.namePl}>
      <CategoryNavigation categories={categories} />
      <h2>{category.namePl}</h2>
      {category.products.map((product) => (
        <article key={product.id}>
          <h3>{product.namePl}</h3>
          <p>{product.descriptionPl}</p>
          <p>{product.price} PLN</p>
          <button>Do koszyka</button>
        </article>
      ))}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const {
    data: { categories }
  } = await listCategoriesQuery();
  const slug = params?.slug?.[0] ?? categories[0].slug;
  const categoryQuery = await getCategoryQuery({ id: slug });

  return {
    props: {
      category: categoryQuery.data.category,
      categories: categories
    }
  };
};

export default Menu;
