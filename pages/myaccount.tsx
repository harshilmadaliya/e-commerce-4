import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import Head from "next/head";

function Myaccount(props) {
  const router = useRouter();

  const [getname, setgetname] = useState()
  const [getemail, setgetemail] = useState()

  const capitalizeFirstLetter = (str:any) => {
    // Check if the input is a non-empty string
    if (typeof str === 'string' && str.length > 0) {
        // Capitalize the first letter and concatenate the rest of the string
        return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
        // Return an empty string or the original input if it's not a valid string
        return str;
    }
}

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("myuser"));
    if (user) {
      
      setgetname(user.name);
      setgetemail(user.email)
      
    }

  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <Head>
        <title>Account</title>
      </Head>
      <div className="mx-10 my-16 rounded-md shadow-xl shadow-gray-300 bg-slate-100 md:w-2/3">
        <div className="flex p-3 justify-between md:px-10 md:py-6">
          <div>
            <VscAccount size={35} />
          </div>
          <div className="text-2xl font-bold">{capitalizeFirstLetter(getname)}</div>
        </div>
        <div className="my-10">
          <p className="px-3 md:px-10">Email : {getemail}</p>
        </div>
        <div className="p-3 font-mono text-xs md:px-10">
          <pre className="font-mono">heyy {capitalizeFirstLetter(getname)}👋!,</pre>
          <pre> </pre>
          <p>
            &nbsp; &nbsp;I wanted to extend my heartfelt thanks for taking the
            time to visit my website. Your support means a lot to me, and I
            truly appreciate you exploring what I have created. Your visit not
            only made my day but also reminded me of the wonderful friendships
            that make these endeavors meaningful. If you have any thoughts,
            feedback, or suggestions based on your experience on the website, I
            would love to hear them.
          </p>
        </div>
        <div className=" flex justify-center">
          <div className=" hover:text-gray-500 cursor-pointer my-10">Logout</div>
        </div>
      </div>
    </div>
  );
}

export default Myaccount;
