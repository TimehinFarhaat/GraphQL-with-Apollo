This project is a GraphQL API built using Apollo Server and TypeScript. It allows CRUD operations on Users and Products, with validations, error handling, and filtering features.

📂 Features
✅ Users
createUser(input) → Creates a new user

getUsers() → Returns all users

updateUser(input) → Update a user's name or email

deleteUser(id) → Delete user by ID

deleteUserByEmail(email) → Delete user by email

getUserByEmail(email) → Get a user by email

getUsersByName(name) → Get a list of users by name

✅ Products
createProduct(input) → Add a new product

getProducts() → Fetch all products

updateProduct(input) → Update product's name or price

deleteProduct(id) → Delete a product by ID

filterProducts(name, price) → Get products that match a name or price

🚀 Technologies Used
Node.js

TypeScript

Apollo Server

GraphQL

Zod for validation

DataLoader for optimization

🔧 Setup Instructions

git clone https://github.com/your-username/GraphQL-with-Apollo.git
cd GraphQL-with-Apollo
npm install
npm run dev


Project Structure
├── src/
│   ├── data/                      → Static in-memory data
│   │   ├── users.ts               → Hardcoded users array
│   │   └── products.ts            → Hardcoded products array
│
│   ├── loaders/                   → DataLoader setup for batching
│   │   ├── userLoader.ts          → Batch-load users by ID
│   │   └── productLoader.ts       → Batch-load products by ID
│
│   ├── schema/                      → GraphQL resolvers and validation
│   │   ├── resolvers/              
│   │   │   ├── user.resolver.ts     → User resolver functions
│   │   │   └── product.resolver.ts  → Product resolver functions
│   │   ├── validation/              → Zod schemas for input validation
│   │   │   ├── user.schema.ts       → User validation schema
│   │   │   └── product.schema.ts    → Product validation schema
|
│   ├── utils/                     → Utility functions
│   │   ├── validateInput.ts       → Zod validation helper
│   │   ├── reorderIds.ts          → ID reordering utility after deletion
│
│   ├── validation/                → Zod schemas
│   │   ├── user.schema.ts         → Create & update schema for user
│   │   └── product.schema.ts      → Create & update schema for product
│
│   └── index.ts                   → Apollo Server initialization





🧪 Sample Playground Queries
USER
📌 Create User
mutation {
createUser(input: { name: "Alice", email: "alice@example.com" }) {
id
name
email
}
}

📌 Get All Users
query {
users {
id
name
email
}
}

📌 Update User
mutation {
updateUser(input: { id: "1", name: "Alicia" }) {
id
name
email
}
}
📌 Delete User
BY ID     BY EMAIL(change id to email)
mutation {
  deleteUser(id: "2")
}

📌 Get User by Email
query {
getUserByEmail(email: "alice@example.com") {
id
name
email
}
}

PRODUCT
📌 Create Product
mutation {
createProduct(input: { name: "Viva", price: "$10" }) {
id
name
price
}
}

📌 Filter Products
query {
filterProducts(name: "choco") {
id
name
price
}
}

📮 Postman Setup
POST Request
URL: http://localhost:4000/
Method: POST
Body: raw → JSON
Headers:
Content-Type: application/json

{
"query": "mutation { createUser(input: { name: \"Jane\", email: \"jane@example.com\" }) { id name email } }"
}
{
"query": "query { getUsersByName(name: \"ali\") { id name email } }"
}

you can change it depending on what you want to test for i.e changing create to update and passing evrything neccesary or vhanging createUser and passing neccesary parameters

❗ Error Handling
Invalid Input: Returns specific error messages (e.g., invalid email, name required)

Email Already Exists: Prevents duplicate users

User Not Found: On update or delete

Empty List: Throws "No users found" when user list is empty

Filter Conditions Missing: E.g., in filterProducts
