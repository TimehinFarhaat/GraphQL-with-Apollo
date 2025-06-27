import { users } from '../data/users';
import { products } from '../data/products';

export function normalizeUserIds() {
  users.forEach((user, index) => {
    user.id = String(index + 1);
  });
}



export function normalizeProductIds() {
  products.forEach((product, index) => {
    product.id = String(index + 1);
  });
}
