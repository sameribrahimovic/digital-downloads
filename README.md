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

4. Show products from db to dashboard

- create lib/data.js(talks to db true PRISMA) and add getProducts() that gets all products from db,
- in pages/dashboard/index.js add the getServerSideProps() function at the end to handle data server side and return products that can be displayed tru JSX on dashboard
- for that we need to pass {products} parameter that we get from getServerSideProps() :
  ~ export default function Dashboard({ products }) {}

5. Edit product funcionality

- Create the file pages/dashboard/product/[id].js,
- In this file we need to have getServerSideProps() that return single product from db, and pass that product to Product function :
  export default function Product({ product }) {
  return <div></div>
  }
- in /lib/data.js add new helper method getProduct() to get single product from db,
  and pass that to getServerSideProps() on product/[id].js,

6. Show list of products on users profile page and the signle product page

- First, add a “View” link into our dashboard next to Edit button :
    <Link href={`/product/${product.id}`}>
        <a className='text-sm border p-2 font-bold uppercase ml-2'>
            View
        </a>
    </Link>

- Create the file pages/product/[id].js - when user clik on View button,
- this page contains all relativ data of created product, like price, title, image, description...
- Also crete pages/profile/[id].js to list and show all product created by specific user,
