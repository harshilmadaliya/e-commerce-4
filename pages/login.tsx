import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

var jwt = require("jsonwebtoken");

function Login() {
  const router = useRouter();
  const [nameemailpass, setnameemailpass] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onchange = (e: any) => {
    setnameemailpass({ ...nameemailpass, [e.target.name]: e.target.value });
  };

  const handleSubmmit = async (e: any) => {
    e.preventDefault();
    const data = { ...nameemailpass, [e.target.name]: e.target.value };
    const response = await fetch(`/api/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      toast.success('Your are Successfully login', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      localStorage.setItem(
        "myuser",
        JSON.stringify({
          token: result.token,
          email: result.email,
          name: result.name,
        })
      );
      setTimeout(() => {
          
          location.href = `/`;
          
        }, 2000);
    }else {
      toast.error('Please check your Email and Password', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  return (
    <div className="mx-4 min-h-screen">
      <Head>
        <title>Login to E-Commerce</title>
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex justify-center py-6">
        <div className="font-bold text-2xl">E-Commerce</div>
      </div>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmmit}
          action="/login"
          className="w-full max-w-sm space-y-5"
        >
          <div className="md-6">
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Name
            </label>
            <input
              onChange={onchange}
              value={nameemailpass.name}
              type="name"
              name="name"
              id="name"
              className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2  ring-1 ring-slate-200"
            />
          </div>
          <div className="md-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email address
            </label>
            <input
              onChange={onchange}
              value={nameemailpass.email}
              type="email"
              name="email"
              id="email"
              className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2  ring-1 ring-slate-200"
            />
          </div>
          <div className="md-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              onChange={onchange}
              value={nameemailpass.password}
              type="password"
              name="password"
              id="password"
              className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2  ring-1 ring-slate-200"
            />
          </div>

          <button
            type="submit"
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
          >
            Sign to account
          </button>

          <p className="mt-8 text-center">
            <Link href={"/forgotpassword"} className="text-sm hover:underline">
              Forgot Password
            </Link>
          </p>
        </form>
      </div>
      <div className="">
        <div className="my-10 space-x-3 text-sm text-gray-900 flex items-center justify-center ">
          <p className="text-center ">Don't have an account</p>
          <Link
            href={"/signup"}
            className=" inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20 m-0"
          >
            <span>
              Create <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
