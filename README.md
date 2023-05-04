1. Data model

- Authenticated users will be able to create products and sell them, so we’ll have a Product model,
- A product has an author, so we need to add relations between of two :
  model Product {
  ...
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId String
  }
  ...and :

model User {
//...
products Product[]
}

- People purchase products, so we gonna have Purchace model with relation to the Product and User model :

model Product {
//...
purchases Purchase[]
}
...and :
model User {
//...
purchases Purchase[]
}

- npx prisma migrate dev to save schema changes and apply changes to db.

2. Authentication

- After user log in, redirect to /dashboard, that we need to create,
- but before, if user does not have a name, redirect to /setup to setup a user name, and after redirect to dashboard,
- also create Heading. js component that holds navbar with text logo and login/logout button,
- import Heading component into index.js
