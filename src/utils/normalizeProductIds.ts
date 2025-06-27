import { products } from '../data/products';

export function normalizeProductIds() {
  products.forEach((product, index) => {
    product.id = String(index + 1);
  });
}
