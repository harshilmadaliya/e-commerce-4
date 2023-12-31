"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosAdd } from "react-icons/io";
import { HiMiniMinusSmall } from "react-icons/hi2";
import Qrcode from "../public/Qrcode.jpg";

import { useDispatch, useSelector } from "react-redux";
import {
  removeFromcart,
  clearCart,
  addTocart,
  removeItemQty,
} from "../reduxstore/features/cartSlice";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Chackout(props: any) {
  const router = useRouter();
  const [allInfo, setAllInfo] = useState({
    firstname: "",
    phone: null,
    country: "",
    address: "",
    city: "",
    state: "",
    pincode: null,
  });
  const [email, setemail] = useState("");
  const [showpayment, setShowpayment] = useState(false);
  const onchange = (e: any) => {
    setAllInfo({ ...allInfo, [e.target.name]: e.target.value });
  };

  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("myuser"));
    if (user) {
      setUser(user);
      setemail(user.email);
    }
  }, []);

  const totalValue = useSelector((state: any) => state.cart.totalValue);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  const handleSubmit = async (e: any) => {
    
    e.preventDefault();
    const data = {
      email: email,
      name: allInfo.firstname,
      address: allInfo.address,
      totalValue,
      cart,
      pincode: allInfo.pincode,
      phone: allInfo.phone,
    };
    const response = await fetch(`/api/prepayment`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!result.success) {
      toast.error(result.error, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
    setShowpayment(true);
    dispatch(clearCart());
  };
  
  const endpayment = () =>{
    setShowpayment(false)
    router.push("/orders");
  }

  const handleRemoveFromCart = (item: any) => {
    dispatch(removeFromcart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const addQty = (a: any) => {
    dispatch(addTocart(a));
  };
  const removeQty = (a: any) => {
    dispatch(removeItemQty(a));
  };
  return (
    <>
      <div>
        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <div className="text-center my-6 font-semibold text-xl">
          Checkout Your Order
        </div>

        <div className="flex justify-center">
          <div className="w-8/12 border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    required
                    value={allInfo.firstname}
                    onChange={onchange}
                    type="text"
                    name="firstname"
                    id="firstname"
                    autoComplete="given-name"
                    className="block w-full  px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                  
                    value={allInfo.phone}
                    onChange={onchange}
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="family-name"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  {props.user.value ? (
                    <input
                      value={props.user.email}
                      onChange={onchange}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block  w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      readOnly
                    />
                  ) : (
                    <input
                      value={email}
                      onChange={onchange}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    value={allInfo.address}
                    onChange={onchange}
                    type="text"
                    name="address"
                    id="address"
                    autoComplete="street-address"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    value={allInfo.city}
                    onChange={onchange}
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    value={allInfo.state}
                    onChange={onchange}
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="address-level1"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    value={allInfo.pincode}
                    onChange={onchange}
                    type="text"
                    name="pincode"
                    id="pincode"
                    autoComplete="postal-code"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="">
          <div className="flex justify-center">
            <div className="md:w-8/12  border-b border-gray-900/10 pb-12">
              <p className="text-lg font-bold my-3">Your Products :</p>
              {cart.cartItems?.map((item: any) => (
                <div
                  key={item._id}
                  className="CartItem flex px-3 py-5 border shadow-lg rounded-md"
                >
                  <div className="flex">
                    <Image
                      height={200}
                      width={200}
                      className="object-contain w-24 rounded  "
                      src={item.img}
                      alt=""
                    />
                  </div>
                  <div className="w-full mx-4">
                    <div className="flex justify-between">
                      <div className="font-medium text-md">
                        {item.title}({item.color}/{item.size}){" "}
                      </div>
                      <div className="font-medium text-md">${item.price}</div>
                    </div>
                    <div className="text-xs mt-1 text-gray-500">
                      Available Qty : {item.availableQty}
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex">
                        <a
                          className="bg-slate-300 rounded-sm mr-2 cursor-pointer"
                          onClick={() => addQty(item)}
                        >
                          <IoIosAdd size={20} />
                        </a>
                        <div className="text-sm font-md text-gray-500">
                          Qty {item.itemQty}
                        </div>
                        <a
                          className="bg-slate-300 rounded-sm mx-2 cursor-pointer"
                          onClick={() => removeQty(item)}
                        >
                          <HiMiniMinusSmall size={20} />
                        </a>
                      </div>
                      <div
                        onClick={() => handleRemoveFromCart(item)}
                        className="text-sm font-md text-indigo-600 hover:text-indigo-500 cursor-pointer"
                      >
                        Remove
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="my-2">
            <p className="text-center ">Total Value : {totalValue}</p>
          </div>
          <div className="flex justify-center my-4">
            <button
              onClick={handleClearCart}
              className="border bg-black px-8 py-1.5  mx-2 hover:bg-slate-800 text-white rounded-md"
              type="button"
            >
              Clear
            </button>
            <button
              onClick={handleSubmit}
              className="border bg-black px-8 py-1.5 mx-2 hover:bg-slate-800 text-white rounded-md"
              type="submit"
            >
              Pay With GPay
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute bg-transparent w-[100vw] h-[100vh] top-0 right-0 ${
          showpayment ? "" : "hidden"
        }`}
      >
        <div className="bg-gray-100 lg:m-32 rounded-2xl shadow-xl shadow-slate-400 my-20 mx-8 lg:p-16 px-8 py-7">
          <div className="w-full  justify-between">
            <div>
              <Image alt="nckn" className="mx-auto" width={200} src={Qrcode} />
            </div>
            <div>
              <p className="text-center py-2">Hello!</p>
              <p className="text-center py-1">
                This is only for fun so please not take it seriously
              </p>
            </div>

            <div className="flex mx-auto">
              <button
                className="border-2 justify-center mx-auto my-3 text-indigo-800  border-indigo-800 px-8 py-1.5 hover:border-slate-800 hover:text-slate-800 rounded-md"
                type="button"
                onClick={endpayment}
              >
                Ok Don't Worry
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chackout;
