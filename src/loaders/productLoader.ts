import DataLoader from "dataloader";  //a tool that helps batch and cache database requests to improve performance.
import { products} from "../data/products";


//This creates a tool that helps load many products by their IDs at once, instead of one by one — making the app faster and more efficient.
export const productLoader = new DataLoader(async (ids: readonly string[]) => {
  return ids.map(id => products.find(product => product.id === id));
});