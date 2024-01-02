import Link from "next/link";
import Product from "@/models/product";
import { useEffect, useState } from "react";
const mongoose = require("mongoose");
import { addTocart } from "../../reduxstore/features/cartSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
// import { dbConnect } from "@/middleware/mongooes";

export default function Page({ product, variant }) {
  const dispatch = useDispatch();
  const [size, setsize] = useState(product.size);
  const [color, setcolor] = useState(product.color);

  const router = useRouter();
  useEffect(() => {
    setcolor(product.color);
    setsize(product.size);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const handleaddtocart = (a: any) => {
    dispatch(addTocart(a));
  };

  const refreshVarient = (newsize: any, newcolor: any) => {
    let url = `/product/${variant[newcolor][newsize]["slug"]}`;
    router.push(url);
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex justify-evenly flex-wrap">
            <Image
              alt="ecommerce"
              width={300}
              height={400}
              className=" w-[180px] object-cover flex mt-10 items-center h-fit object-center rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                E-Commerce
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}({product.color}/{product.size})
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  {product.availableQty === 0 ? (
                    <p className="text-red-600">Out Of Stock!</p>
                  ) : (
                    <p>Avaliable Qty : {product.availableQty} </p>
                  )}
                </span>
              </div>
              <p className="leading-relaxed">
                Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
                seitan poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean shorts keytar banjo tattooed umami
                cardigan.
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variant).includes("White") && Object.keys(variant["White"]).includes(size) && (<button className={`border-2  rounded-full w-6 h-6 focus:outline-none  ${color === "White" ? "border-black" : "border-gray-300" }`}onClick={(e) => {refreshVarient(size, "White")}}></button>)}
                  {Object.keys(variant).includes("Purple") && Object.keys(variant["Purple"]).includes(size) && (<button className={`border-2 bg-purple-700 rounded-full w-6 h-6 focus:outline-none  ${color === "Purple" ? "border-black" : "border-gray-300" }`}onClick={(e) => {refreshVarient(size, "Purple")}}></button>)}
                  {Object.keys(variant).includes("Red") && Object.keys(variant["Red"]).includes(size) && (<button className={`border-2  ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none  ${color === "Red" ? "border-black" : "border-gray-300"}`}onClick={(e) => {refreshVarient(size, "Red")}}></button>)}
                  {Object.keys(variant).includes("Browns") && Object.keys(variant["Browns"]).includes(size) && (<button className={`border-2  ml-1 bg-[#744113] rounded-full w-6 h-6 focus:outline-none  ${color === "Browns" ? "border-black" : "border-gray-300"}`}onClick={(e) => {refreshVarient(size, "Browns")}}></button>)}
                  {Object.keys(variant).includes("Pink") &&
                    Object.keys(variant["Pink"]).includes(size) && (
                      <button
                        className={`border-2  ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none  ${
                          color === "Pink" ? "border-black" : "border-gray-300"
                        }`}
                        onClick={(e) => {
                          refreshVarient(size, "Pink");
                        }}
                      ></button>
                    )}
                  {Object.keys(variant).includes("Blue") &&
                    Object.keys(variant["Blue"]).includes(size) && (
                      <button
                        className={`border-2  ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none  ${
                          color === "Blue" ? "border-black" : "border-gray-300"
                        }`}
                        onClick={(e) => {
                          refreshVarient(size, "Blue");
                        }}
                      ></button>
                    )}
                  {Object.keys(variant).includes("Black") &&
                    Object.keys(variant["Black"]).includes(size) && (
                      <button
                        className={`border-2  ml-1 bg-black rounded-full w-6 h-6 focus:outline-none  ${
                          color === "Black" ? "border-black" : "border-gray-300"
                        }`}
                        onClick={(e) => {
                          refreshVarient(size, "Black");
                        }}
                      ></button>
                    )}
                  {Object.keys(variant).includes("Green") &&
                    Object.keys(variant["Green"]).includes(size) && (
                      <button
                        className={`border-2  ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none  ${
                          color === "Green" ? "border-black" : "border-gray-300"
                        }`}
                        onClick={(e) => {
                          refreshVarient(size, "Green");
                        }}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVarient(e.target.value, color);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variant[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {Object.keys(variant[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {Object.keys(variant[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                        {Object.keys(variant[color]).includes("X") && (
                          <option value={"X"}>X</option>
                        )}
                      {Object.keys(variant[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                      {Object.keys(variant[color]).includes("XXL") && (
                        <option value={"XXL"}>XXL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
                <Link href={"/chackout"} className="ml-auto">
                  <button
                    disabled={product.availableQty == 0}
                    className="flex mx-1 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    CheckOut
                  </button>
                </Link>
                <button
                  disabled={product.availableQty == 0}
                  onClick={() => handleaddtocart(product)}
                  className="flex mx-1 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps(context: any) {
  // const con = await dbConnect()
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected mongodb");
  }

  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title });
  let colorSizeSlug = {}; // {red : {xl: {slug: 'wear-the-code-xl'}}}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variant: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}
