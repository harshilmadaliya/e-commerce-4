import React, { useEffect, useState } from "react";
import Order from "@/models/order";
var jwt = require("jsonwebtoken");
import mongoose from "mongoose";
import Image from "next/image";
// import { dbConnect } from "@/middleware/mongooes";

function MyOrder({ orders }) {
  const products = orders.products.cartItems;
 
  return (
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-2/3 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                E-Commerce
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                #{orders.userId}
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                  Your Products
                </a>
              </div>
              <div className="leading-relaxed mb-4">
                <table className="table-fixed">
                  <thead>
                    <tr>
                      <th className="w-1/2 px-4 py-2 text-start">Name</th>
                      <th className="w-1/4 px-4 py-2 text-start">Quantity</th>
                      <th className="w-1/4 px-4 py-2 text-start">Price</th>
                      <th className="w-1/4 px-4 py-2 text-start">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(products).map((key) => {
                      return (
                        <tr key={products[key]._id} className=" border-gray-500 border-y-2 rounded-lg ">
                          <td className="px-4 py-2">
                            {products[key].title}({products[key].color}/
                            {products[key].size})
                          </td>
                          <td className=" text-center px-4 py-2">
                            {products[key].itemQty}
                          </td>
                          <td className=" px-4 py-2">₹{products[key].price}</td>
                          <td className=" px-4 py-2">
                          ₹{products[key].totalValue}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Owner Name</span>
                <span className="ml-auto text-gray-900">{orders.name}</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Address</span>
                <span className="ml-auto text-gray-900">{orders.address}</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Total Amount</span>
                <span className="ml-auto text-gray-900">₹{orders.amount}</span>
              </div>
              <div className="flex">
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Treak Your Order
                </button>
              </div>
            </div>
            <Image
              alt="ecommerce"
              width={200}
              height={200}
              className="lg:w-1/3 w-full lg:h-80 h-64 object-cover lg:mt-36 object-center rounded"
              src="https://www.iexposure.com/insights-images/google-places-label/completed-google-places-label.png"
            />
          </div>
        </div>
      </section>
  );
}

export async function getServerSideProps(context: any) {
  // const con = await dbConnect()
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected mongodb");
  }

  let orders = await Order.findById({ _id: context.query._id });

  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) }, // will be passed to the page component as props
  };
}

export default MyOrder;
