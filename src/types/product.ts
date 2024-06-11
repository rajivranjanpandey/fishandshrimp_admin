export type Product = {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  profit: number;
};
export type ProductAsset = {
  id?: number;
  url: string,
  position: number
}
export type UpdateProductAssets = {
  productId: string;
  assets: ProductAsset[]
}
export type DeleteProductAssets = {
  productId: string;
  assets: number[]
}