import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";



function Orders() {



  const [orders, setorder] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fatchtoken = async () => {
      let a = JSON.parse(localStorage.getItem('myuser'))
      const response = await fetch(`/api/orders`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: a.token }),
      });
      let b = await response.json();
      setorder(b.orders);
    };
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    } else {
      fatchtoken();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const formatDateTime = (inputDate: any) => {
    const date = new Date(inputDate);

    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    // Get hours, minutes, and seconds
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Combine to form the formatted date and time
    const formattedDateTime = ` ${hours}:${minutes}:${seconds} / ${day}-${month}-${year}`;

    return formattedDateTime;
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="h-auto w-8/12 ">
        <p className="font-semibold text-center text-lg my-3">Your All Orders</p>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-400 ">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium uppercase txt"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium uppercase txt"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium uppercase txt"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium uppercase txt"
                      >
                        Date / Time
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium uppercase txt"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                   

                    {orders.map((item: any) => {
                      return (
                        <tr key={item._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            {item.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            {item.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            {formatDateTime(item.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            >
                              <Link href={`/order?_id=${item._id}`}>View</Link>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    
                              
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
