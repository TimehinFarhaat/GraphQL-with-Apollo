import { users } from '../data/users';

export function normalizeUserIds() {
  users.forEach((user, index) => {
    user.id = String(index + 1);
  });
}
