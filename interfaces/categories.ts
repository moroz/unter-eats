import { Product } from "./products";

export interface Category {
  id: string;
  slug: string;
  insertedAt: string;
  updatedAt: string;
  nameEn: string | null;
  namePl: string;

  products: Product[];
}
