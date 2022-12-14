export interface Product {
  id: string;
  slug: string;
  nameEn: string | null;
  namePl: string;
  descriptionPl: string | null;
  descriptionEn: string | null;
  imageUuid: string | null;
  inStock: boolean;
  insertedAt: string;
  updatedAt: string;
  price: string;
}
