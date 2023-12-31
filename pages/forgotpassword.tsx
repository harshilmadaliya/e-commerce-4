"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    cPassword: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onchange = (e: any) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };

  const handleSendEmail = async (e: any) => {
    e.preventDefault();
    const data = { email: email, sendEmail: true, token: router.query.token };

    const response = await fetch(`/api/forgotpassword`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      toast.success(result.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(result.error, {
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

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    const data = {
      email: email,
      sendEmail: false,
      password: passwordInfo.password,
      changePassword: passwordInfo.cPassword,
      tokenquery: router.query.token,
    };

    const response = await fetch(
      `/api/forgotpassword?token=${router.query.token}`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    if (result.success) {
      toast.success(result.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push('/login')
        
      }, 2000);
    } else {
      toast.error(result.error, {
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
    <div>
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
      <div className="flex justify-center items-center min-h-[78vh]">
        {router.query.token && (
          <form className="w-full max-w-sm space-y-5" action="/POST">
            <div className="flex justify-center py-6">
              {router.query.token ? <div className="font-bold text-2xl">Select New Password</div> :<div className="font-bold text-2xl">Forgot Password</div>}
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
                value={passwordInfo.password}
                type="password"
                name="password"
                id="password"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2  ring-1 ring-slate-200"
              />
            </div>
            <div className="md-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                New Password
              </label>
              <input
                onChange={onchange}
                value={passwordInfo.cPassword}
                type="password"
                name="cPassword"
                id="cPassword"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2  ring-1 ring-slate-200"
              />
            </div>
            {passwordInfo.password == passwordInfo.cPassword &&
            passwordInfo.password != "" ? (
              <p className="text-green-700">Password Match</p>
            ) : (
              <p className="text-red-700">Password Doesn't match</p>
            )}
            <button
              type="submit"
              disabled={
                passwordInfo.password != passwordInfo.cPassword ||
                passwordInfo.password == ""
              }
              onClick={handleChangePassword}
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white  disabled:bg-slate-700 hover:bg-slate-800 w-full"
            >
              Reset Password
            </button>
          </form>
        )}
        {!router.query.token && (
          <form className="w-full max-w-sm space-y-5" action="/forgotPassword">
            <div className="flex justify-center py-6">
              <div className="font-bold text-2xl">Forgot Password</div>
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
                value={email}
                type="email"
                name="email"
                id="email"
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2  ring-1 ring-slate-200"
              />
            </div>
            <button
              type="submit"
              onClick={handleSendEmail}
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
