import { useCartProductsQuery } from "@api/queries";
import CartItem from "@components/CartItem";
import useCart from "@hooks/useCart";
import React from "react";

interface Props {
  className?: string;
}

const Cart: React.FC<Props> = ({ className }) => {
  const { items } = useCart();
  const { products, loading } = useCartProductsQuery();

  if (loading) return null;

  return (
    <div className={className}>
      {items.map((item) => (
        <CartItem product={products[item.id]} cartItem={item} key={item.id} />
      ))}
    </div>
  );
};

export default Cart;
