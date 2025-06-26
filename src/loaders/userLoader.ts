import DataLoader from "dataloader";    //a tool that helps batch and cache database requests to improve performance.
import { users } from "../data/users";


//This creates a tool that helps load many users by their IDs at once, instead of one by one — making the app faster and more efficient.
export const userLoader = new DataLoader(async (ids: readonly string[]) => {
  return ids.map(id => users.find(user => user.id === id));
});

