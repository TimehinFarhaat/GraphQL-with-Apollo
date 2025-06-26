import { users } from "../../data/users";
import { z } from "zod";
import { validateInput } from "../../utils/validation";
import { UserInputError } from "apollo-server";


//CreateUserSchema defines a validation rule that ensures the user’s name is not empty and the email is in a valid format before creating a user.

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()              //It checks that the value is a valid email address.
});

//userResolvers handles fetching all or one user and creating a new user after validating the input.

export const userResolvers = {
  Query: {
    users: () => users,        //users: returns the full list of user.
    user: (_: any, { id }: { id: string }) => users.find(u => u.id === id),              //takes an id and returns the user with that matching id
  },



  Mutation: {
    //  createUser takes input ( name and email), checks if it's valid using CreateUserSchema.
    createUser: async (_: any, { input }: { input: any }) => {
      const result = validateInput(CreateUserSchema, input);
      if (!result.success) throw new UserInputError("Invalid input", result.errors);

      const newUser = {
        id: String(users.length + 1),
        ...input,
      };
      users.push(newUser);
      return newUser;
    },

    //  createUser takes input ( name and email), checks if it's valid using CreateUserSchema.
    updateUser: (_: any, { input }: { input: any }) => {
      const { id, name, email } = input;
      const user = users.find(u => u.id === id);
      if (!user) throw new Error("User not found");

      // if (name) user.name = name;
      // if (email) user.email = email;
      user.name = name;
      return user;
    },



    deleteUser: (_: any, { id }: { id: string }) => {
      const index = users.findIndex(user => user.id === id);
      if (index === -1) return false; // User not found
      users.splice(index, 1); // Remove user from the array
      return true;
    }



  }
};
