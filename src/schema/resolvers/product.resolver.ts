import { products } from "../../data/products";
import { validateInput } from "../../utils/validateInput";
import { UserInputError } from "apollo-server";
import { CreateProductSchema, UpdateProductSchema } from '../Validation/product.schema';
import { normalizeProductIds } from "../../utils/normalizeIds";



//productResolvers handles fetching all or one product and creating a new product after validating the input.

export const productResolvers = {
    Query: {
        products: () => {
            if (products.length === 0) {
                throw new UserInputError("No products available");               //throws an error if product list is empty
            }
            return products;             //returns the full list of products.
        },

        filterProducts: (_: any, { name, price }: { name?: string; price?: string }) => {
            // If both name and price are not provided, throw an error
            if (!name && !price) {
                throw new Error("Provide at least a name or price to filter.");
            }

            // Filter the products based on name and/or price
            return products.filter(product => {
                // Check if product name includes the input name (case-insensitive), or skip if name is not provided
                const matchesName = name ? product.name.toLowerCase().includes(name.toLowerCase()) : true;

                // Check if product price matches exactly, or skip if price is not provided
                const matchesPrice = price ? product.price === price : true;

                // Include the product only if it matches both conditions
                return matchesName && matchesPrice;
            });
        }



    },



    Mutation: {

        //  createProduct takes input ( name and price), checks if it's valid using CreateProductSchema.
        createProduct: (_: any, { input }: { input: any }) => {
            const result = validateInput(CreateProductSchema, input);
            if (!result.success) {
                throw new UserInputError("Invalid input", { errors: result.errors });   //throws an error if the creation of product is nort succesful
            }

            const newProduct = {
                id: String(products.length + 1),   //increases the length of the list of product
                ...input
            };
            products.push(newProduct);   //add the created product to the list of products
            return newProduct;     // returns the created product
        },


        //  updateProduct takes input ( name and price), checks if it's valid using updateProductSchema.
        updateProduct: (_: any, { input }: { input: any }) => {
            const result = validateInput(UpdateProductSchema, input);
            if (!result.success) {
                throw new UserInputError("Invalid input", { errors: result.errors });    //throws an error if the new values are not in correct format
            }

            const product = products.find(p => p.id === input.id);
            if (!product) throw new UserInputError("Product not found");    //throws an error if products with the given Id is not found

            if (input.name) product.name = input.name;              //assign neww value to product name
            if (input.price) product.price = input.price;            //asssign new value to price

            return product;         //returns the updated product
        },


        //deleteProduct takes the input{id} and delete the rpoduct with that id if it exist
        deleteProduct: (_: any, { id }: { id: string }) => {
            const index = products.findIndex(p => p.id === id);
            if (index === -1) throw new UserInputError("Product not found");          // throws an error if product with the id is not found

            products.splice(index, 1);     //remove the product from the list of products
            normalizeProductIds();      // this is to reasign ids so that the id can be brought according to find a product with name is preferrable
            return true;
        }

    }

};








