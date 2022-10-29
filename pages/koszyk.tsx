import useCart from "@/hooks/useCart";
import { transformProducts } from "@/lib/cart/CartHelpers";
import { useGetProductsQuery } from "@api/queries";
import Layout from "@layout";
import React from "react";

interface Props {}

const CartPage: React.FC<Props> = () => {
  const { items, removeItem } = useCart();
  const ids = items.map((i) => i.id);

  const { data } = useGetProductsQuery(ids);
  const products = transformProducts(data?.products);

  return (
    <Layout title="Koszyk">
      {data && (
        <ul>
          {items.map(({ id, quantity }) => {
            const product = products[id];
            if (!product) return null;
            return (
              <li key={id}>
                {product.namePl}, {product.price} &times; {quantity}
                <button onClick={() => removeItem(id)}>Remove</button>
              </li>
            );
          })}
        </ul>
      )}
    </Layout>
  );
};

export default CartPage;
