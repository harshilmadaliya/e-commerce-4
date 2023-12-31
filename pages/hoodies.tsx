import React from "react";
import Link from "next/link";
const mongoose = require("mongoose");
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addTocart } from "../reduxstore/features/cartSlice";
// import { dbConnect } from "@/middleware/mongooes";

import connectDb from '@/middleware/mongoose'
import Product from "@/models/product";

function Hoodies({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (a: any) => {
    dispatch(addTocart(a));
  };
  return (
    <div>
      <section className="text-gray-400 body-font min-h-screen">
        <div className="container px-5 my-24 mx-auto">
          <div className="flex flex-wrap -m-3">
            {Object.keys(product).map((item: any) => (
              <Link
                key={item._id}
                href={`/product/${product[item].slug}`}
                className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg"
              >
                <div className="" key={item._id}>
                  <div className="flex relative h-48 rounded justify-center items-center overflow-hidden">
                    <Image
                      alt="ecommerce"
                      className="object-cover h-fit object-center w-[100px] rounded-md block"
                      height={150}
                      width={150}
                      src={`${product[item].img}`}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {product[item].category}
                    </h3>
                    <h2 className="text-gray-500 title-font text-lg font-medium">
                      {product[item].title}
                    </h2>
                    <p className="mt-1">${product[item].price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  // const con = await dbConnect()
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected mongodb");
  }

  let products = await Product.find({ category: "hoodies" });
  let hoodies = {};
  for (let item of products) {
    if (item.title in hoodies) {
      if (
        !hoodies[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].color.push(item.color);
      }
      if (
        !hoodies[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].size.push(item.size);
      }
    } else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color];
        hoodies[item.title].size = [item.size];
      }else{
        hoodies[item.title].color = [];
        hoodies[item.title].size = [];

      }
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(hoodies)),
    }, // will be passed to the page component as props
  };
}

export default Hoodies;
