import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

import middleware from "middleware/middleware";
import nextConnect from "next-connect";

import { upload } from "lib/upload";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Not logged in" });
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return res.status(401).json({ message: "User not found" });

  //at this point we have a user from db and the session and we can create the product
  const product = await prisma.product.create({
    data: {
      title: req.body.title[0],
      free: req.body.free[0] === "true" ? true : false,
      //multiply with 100 to avoid working with decimals and avoid errors!
      //and stor number as integer
      price: Number(req.body.price[0]) * 100,
      description: req.body.description[0],
      author: {
        connect: { id: user.id },
      },
    },
  });

  //logic to upload image and product
  let image_url = null;
  let product_url = null;

  if (req.files.image) {
    image_url = await upload({
      file: req.files.image[0],
      user_id: user.id,
    });
  }

  if (req.files.product) {
    product_url = await upload({
      file: req.files.product[0],
      user_id: user.id,
    });
  }

  const data = {
    url: product_url,
  };

  if (image_url) {
    data.image = image_url;
  }

  await prisma.product.update({
    where: { id: product.id },
    data,
  });

  res.end();
  return;
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
