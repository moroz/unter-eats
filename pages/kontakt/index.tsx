import React from "react";
import Layout from "@components/layout";
import { Category } from "@interfaces";
export { getCategoriesCallback as getServerSideProps } from "@api/queries";

// TODO: Only load categories on pages where it's necessary
interface Props {
  categories: Category[];
}

const ContactPage: React.FC<Props> = ({ categories }) => {
  return (
    <Layout title="Kontakt" categories={categories}>
      <p>Hello world!</p>
    </Layout>
  );
};

export default ContactPage;
