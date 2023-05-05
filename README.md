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

3. Create/Add new product into db

- Ddd a button in the dashboard to let user create a new product,
- After clickin on Crete new product button, redirect to :
  /dashboard/new that needs to be created,
- New page contains a form to get information that user want to store into db like :
  title, free or not, price, image...
- Create pages/dashboard/new.js endpoint to handle the form data and store info into db,
- crete middleware/middleware.js to handle file upload,
- install - npm install next-connect@0.12.2 multiparty,
- create lib/upload.js and run npm install aws-sdk (AWS library) to handle handle file uploading to AWS S3 bucket
