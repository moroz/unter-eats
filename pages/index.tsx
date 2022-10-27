import { getCategoryQuery } from "@api/queries";
import { Category } from "@interfaces";
import { GetStaticProps } from "next";
import React from "react";

interface Props {
  category: Category;
}

const Home: React.FC<Props> = ({ category }) => {
  return (
    <div>
      <h1>{category.namePl}</h1>
      {category.products.map((product) => (
        <article key={product.id}>
          <h2>{product.namePl}</h2>
          <p>{product.descriptionPl}</p>
          <p>{product.price} PLN</p>
          <button>Do koszyka</button>
        </article>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const slug = "burgery";
  const data = await getCategoryQuery({ id: slug });

  return {
    props: {
      category: data.data.category
    }
  };
};

export default Home;
