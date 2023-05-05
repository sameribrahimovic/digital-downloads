import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { getProducts } from "lib/data";
import Heading from "components/Heading";

export default function Dashboard({ products }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (!session) {
    router.push("/");
  }

  //check if the user has a name, else redirect to /setup
  if (session && !session.user.name) {
    router.push("/setup");
  }

  return (
    <div>
      <Head>
        <title>Digital Downloads</title>
        <meta name="description" content="Digital Downloads Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading />

      <h1 className="flex justify-center mt-20 text-xl">Dashboard</h1>
      <div className="flex justify-center mt-10">
        <Link href={`/dashboard/new`}>
          <a className="text-xl border p-2">Create a new product</a>
        </Link>
      </div>

      {/* after we get products from db, show them here */}
      <div className="flex justify-center mt-10">
        <div className="flex flex-col w-full ">
          {products &&
            products.map((product, index) => (
              <div
                className="border flex justify-between w-full md:w-2/3 xl:w-1/3 mx-auto px-4 my-2 py-5 "
                key={index}
              >
                {product.image && (
                  <img src={product.image} className="w-14 h-14 flex-initial" />
                )}
                <div className="flex-1 ml-3">
                  <p>{product.title}</p>
                  {product.free ? (
                    <span className="bg-white text-black px-1 uppercase font-bold">
                      free
                    </span>
                  ) : (
                    <p>${product.price / 100}</p>
                  )}
                </div>
                <div className="">
                  <Link href={`/dashboard/product/${product.id}`}>
                    <a className="text-sm border p-2 font-bold uppercase">
                      Edit
                    </a>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { props: {} };

  let products = await getProducts({ author: session.user.id }, prisma);
  products = JSON.parse(JSON.stringify(products));

  return {
    props: {
      products,
    },
  };
}
