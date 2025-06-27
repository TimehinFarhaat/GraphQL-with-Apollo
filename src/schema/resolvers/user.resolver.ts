import { users } from "../../data/users";
import { validateInput } from "../../utils/validateInput";
import { UserInputError } from "apollo-server";
import { UpdateUserSchema, CreateUserSchema } from '../Validation/user.schema';
import { normalizeUserIds } from "../../utils/normalizeIds";



//userResolvers handles fetching all or one user and creating a new user after validating the input.

export const userResolvers = {

  Query: {
    users: () => {
      if (users.length === 0) {
        throw new UserInputError("No users found");    //throws error if user list is empty
      }
      normalizeUserIds(); //reassigns id to users;cus the id is just a number to get a user it is preferrable to use email cus it is distinct
      // Reassign sequential IDs starting from 1
      return users; //users: returns the full list of user. 
    },
    //  to get a single user by their email
    getUserByEmail: (_: any, { email }: { email: string }) => {
      // Convert both stored and input email to lowercase for case-insensitive comparison
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      // If no user matches the email, throw an error
      if (!user) throw new UserInputError("User with this email not found.");

      // Return the matched user
      return user;
    },

    // Resolver to get a list of users by name (supports partial matching)
    getUsersByName: (_: any, { name }: { name: string }) => {
      // Filter users whose names contain the input name (case-insensitive)
      const result = users.filter(u =>
        u.name.toLowerCase().includes(name.toLowerCase())
      );

      // If no users match, throw an error
      if (result.length === 0)
        throw new UserInputError("No users found with this name.");

      // Return the list of matching users
      return result;
    }


  },



  Mutation: {
    //  createUser takes input ( name and email), checks if it's valid using CreateUserSchema.
    createUser: (_: any, { input }: { input: any }) => {
      // Validate input with Zod schema
      const result = validateInput(CreateUserSchema, input);
      if (!result.success) {
        throw new UserInputError("Invalid input", { errors: result.errors });
      }

      // Check for existing user with the same email
      const existingUser = users.find(u => u.email === input.email);
      if (existingUser) {
        throw new UserInputError("User with this email already exists");
      }

      // Create and return new user
      const newUser = {
        id: String(users.length + 1),
        ...input,
      };
      users.push(newUser);
      normalizeUserIds();
      return newUser;
    }
    ,

    //  updateUser takes input ( name and email), checks if it's valid using UpdateUserSchema.
    updateUser: (_: any, { input }: { input: any }) => {
      // Clean out empty strings
      const cleanedInput = {
        ...input,
        name: input.name?.trim() === '' ? undefined : input.name,
        email: input.email?.trim() === '' ? undefined : input.email,
      };

      // Validate the cleaned input
      const result = validateInput(UpdateUserSchema, cleanedInput);
      if (!result.success) {
        throw new UserInputError("Invalid input", { errors: result.errors });
      }

      // Find the user
      const user = users.find(u => u.id === cleanedInput.id);
      if (!user) throw new UserInputError("User not found");

      // Prevent update if no valid field provided
      if (!cleanedInput.name && !cleanedInput.email) {
        throw new UserInputError("Please provide a name or email to update.");
      }

      // Apply updates
      if (cleanedInput.name) user.name = cleanedInput.name;
      if (cleanedInput.email) user.email = cleanedInput.email;

      return user;
    },




    deleteUser: (_: any, { id, email }: { id?: string, email?: string }) => {
      let index = -1;

      // Delete by ID if provided
      if (id) {
        index = users.findIndex(u => u.id === id);
      }

      // If not found or not provided, try deleting by email
      if (index === -1 && email) {
        index = users.findIndex(u => u.email === email);
      }

      // If still not found, throw error
      if (index === -1) {
        throw new UserInputError("User not found with given ID or email");
      }

      users.splice(index, 1);  //remove user from  list of user
      normalizeUserIds();
      return true;
    }





  }
};


