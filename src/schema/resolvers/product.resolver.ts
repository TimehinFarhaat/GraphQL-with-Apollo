import { products } from "../../data/products";
import { z } from "zod";
import { validateInput } from "../../utils/validation";
import { UserInputError } from "apollo-server";


//CreateProductSchema defines a validation rule that ensures the user’s name is not empty and the email is in a valid format before creating a user.
const CreateProductSchema = z.object({
    name: z.string().min(1),

    //It checks that the price is a string like $12.99, and shows an error if it’s not.
    price: z.string().regex(/^\$\d+(\.\d{2})?$/, {
        message: "Price must be in the format $12.99"
    })
});

//productResolvers handles fetching all or one product and creating a new product after validating the input.

export const productResolvers = {
    Query: {
        products: () => products,   //returns the full list of products.
        product: (_: any, { id }: { id: string }) => products.find(u => u.id === id),   //takes an id and returns the product with that matching id
    },


    Mutation: {

        //  createProduct takes input ( name and price), checks if it's valid using CreateProductSchema.

        createProduct: async (_: any, { input }: { input: any }) => {
            const result = validateInput(CreateProductSchema, input);
            if (!result.success) throw new UserInputError("Invalid input", result.errors);

            const newProduct = {
                id: String(products.length + 1),
                ...input,
            };
            products.push(newProduct);
            return newProduct;
        },

        updateProduct: (_: any, { input }: { input: any }) => {
            const { id, name, price } = input;
            const product = products.find(p => p.id === id);
            if (!product) throw new Error("Product not found");

            if (name) product.name = name;
            if (price) product.price = price;

            return product;
        },

        deleteProduct: (_: any, { id }: { id: string }) => {
            const index = products.findIndex(product => product.id === id);
            if (index === -1) return false; // User not found
            products.splice(index, 1); // Remove user from the array
            return true;
        }
    }

};
