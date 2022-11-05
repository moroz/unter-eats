import React from "react";
import Layout from "@layout";
import { Category } from "@interfaces";
export { getServerSideProps } from "./menu/[[...slug]]";

interface Props {
  categories: Category[];
}

const Home: React.FC<Props> = ({ categories }) => {
  return <Layout title="Artesano" categories={categories}></Layout>;
};

export default Home;
