import { CartItem, Product } from "@interfaces";

export const transformProducts = (
  products?: Product[]
): Record<string, Product> => {
  if (!products) return {};
  return Object.fromEntries(products.map((p) => [p.id, p]));
};
