"use client";

// icons imports
import { IoStorefront } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { RiAccountPinBoxLine } from "react-icons/ri";


import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromcart,
  clearCart,
  addTocart,
  removeItemQty,
} from "../reduxstore/features/cartSlice";
import { useRouter } from "next/router";

function Navbar(props: { user: { value: any; }; logout: React.MouseEventHandler<HTMLLIElement>; }) {
  const [displaytoggle, setDisplaytoggle] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const totalValue = useSelector((state: any) => state.cart.totalValue);
  const router = useRouter();
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    
    {totalValue == 0 ? setSidebar(false) : setSidebar(true)}
    if (router.pathname === "/chackout") {
      setSidebar(false);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  const ref = useRef<HTMLDivElement | null>(null);

  // const ref = useRef()
  const [closeBut, setcloseBut] = useState(false);
  const toggelClick = () => {
    setSidebar(!sidebar);
    setcloseBut(!closeBut)
  };

  return (
    <div className="m-2  shadow-md">
      {/* <div className="fixed"> */}
      <nav className="flex-none z-20 bg-white  md:flex">
        <div className="flex">
          <div className="mx-3">
            <Link href={"/"}>
              <IoStorefront size={30} />
            </Link>
          </div>
          <p className="font-bold text-lg my-1 mx-2">
            <Link href={"/"}>E-Commerce</Link>
          </p>
        </div>
        <ul className="flex md:space-x-4 font-medium my-2 md:mx-10 justify-evenly">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/hoodies"}>Hoodies</Link>
          </li>
          <li>
            <Link href={"/mugs"}>Mugs</Link>
          </li>
          <li>
            <Link href={"/tshirts"}>T-shirts</Link>
          </li>
        </ul>

        <div className="md:mx-3 absolute top-2.5 right-2 flex cursor-pointer">
          {props.user.value && (
            <div className="mx-2" onMouseOver={() => setDisplaytoggle(true)} onClick={()=> setDisplaytoggle(!displaytoggle)}>
              <RiAccountPinBoxLine size={25} />
            </div>
          )}
          {displaytoggle && (
            <div
              className="rounded-md absolute w-44 z-50 right-14 top-6 bg-white border shadow-2xl"
              onMouseLeave={() => setDisplaytoggle(!displaytoggle) } 
            >
              <div className="">
                <ul className="p-3">
                  <Link href={"/myaccount"}>
                    <li className="hover:text-gray-500">My Account</li>
                  </Link>
                  <hr className="my-0.5" />
                  <Link href={"/orders"}>
                    <li className="hover:text-gray-500">Orders</li>
                  </Link>
                  <hr className="my-0.5" />
                  <li className="hover:text-gray-500" onClick={props.logout}>
                    Logout
                  </li>
                  {/* <hr className="my-0.5" /> */}
                </ul>
              </div>
            </div>
          )}
          {!props.user.value && (
            <div className="mx-2">
              <Link href={"/login"}>
                <div className="hover:text-indigo-500">Login</div>
              </Link>
            </div>
          )}
          <div className="mx-2">
            {closeBut ? (
              <IoCloseSharp size={25} onClick={toggelClick} />
            ) : (
              <MdOutlineShoppingCart onClick={toggelClick} size={25} />
            )}
          </div>
        </div>
      </nav>

      <div
        ref={ref}
        className={`Cart absolute bg-white rounded-md shadow-lg  top-0 ${
          sidebar ? "right-0" : "-right-96"
        } border h-auto w-full sm:w-96 mt-12 z-20 p-3 transition-all ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <p className="py-2 font-semibold">Shopping cart</p>

        {cart.cartItems?.map((item: any) => (
          <div key={item._id} className="CartItem flex py-5  rounded-sm">
            <div className="flex">
              <Image
                height={200}
                width={200}
                className="object-contain w-24 rounded  "
                src={item.img}
                alt="hiii i am in alt on navbar"
              />
            </div>
            <div className="w-full mx-4">
              <div className="flex justify-between">
                <div className="font-medium text-md">
                  {item.title}({item.color}/{item.size}){" "}
                </div>
                <div className="font-medium text-md">${item.price}</div>
              </div>
              <div className="text-xs mt-1 text-gray-500">Available Qty :{item.availableQty}</div>
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

        {totalValue === 0 ? (
          <div className="text-center my-2 font-sans">
            Pleace add product you like
          </div>
        ) : (
          <>
            <div className="text-center my-2 font-sans">
              Total Amount : {Math.floor(totalValue * 100) / 100}
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleClearCart}
                className="border bg-[#4f46e5] text-white p-1 px-2 m-2 rounded-md"
                type="button"
              >
                Clear
              </button>
              <Link href={"/chackout"}>
                <button
                  className="border bg-[#4f46e5] text-white p-1 px-2 m-2 rounded-md"
                  type="button"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
      {/* <Sidebar/> */}
    </div>
  );
}

export default Navbar;
