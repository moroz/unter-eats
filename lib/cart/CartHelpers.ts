import { CartItem, Product } from "@interfaces";

export const transformProducts = (
  products?: Product[]
): Record<string, Product> => {
  if (!products) return {};
  return Object.fromEntries(products.map((p) => [p.id, p]));
};

export const calculateTotal = (items: CartItem[], products: Product[]) => {
  const transformedProducts = transformProducts(products);
  return items.reduce((acc, item) => {
    const product = transformedProducts[item.id];
    if (!product) return acc;
    return acc + Number(product.price) * item.quantity;
  }, 0);
};
