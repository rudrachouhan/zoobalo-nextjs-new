"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import logo1 from "../../assets/images/logo1.png";
import Link from "next/link";
import axios from "axios";
import { ShowLogin } from '../../components/ShowLogin' 

const page = () => {

  const [login, setLogin] = useState(true);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    phone: "",
    balance: "",
  });
  const [delBoyDetails, setDelBoyDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState<undefined | string>(undefined);

  const handleUserSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !userDetails.name ||
      !userDetails.address ||
      !userDetails.phone ||
      userDetails.balance == undefined
    ) {
      return setShowError("Please enter details!");
    }

    await axios.post(
      "http://localhost:5000/createUser",
      {
        name: userDetails.name,
        address: userDetails.address,
        phone: userDetails.phone,
        balance: userDetails.balance,
      },
      {
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        },
      }
    );

    setUserDetails({name: '', address: '', balance: '', phone: ''})
  };

  const handleDelBoySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !userDetails.name ||
      !userDetails.address ||
      !userDetails.phone ||
      !userDetails.balance
    ) {
      setShowError("Please enter details!");
    }
  };
  return (
    <>
      {login ? <ShowLogin /> :
        <div>
          <div className="bg-white border-b border-slate-200 sticky top-0 flex justify-between px-8 sm:px-12 py-6 z-10">
            <div className="flex items-center justify-center">
              <Image src={logo1} alt="logo" className="w-28 h-12" />
              <div className="hidden sm:flex items-center  gap-10 ml-12 text-lg font-medium">
                <Link href="/users">Users</Link>
              </div>
            </div>
          </div>
          <h1 className="text-4xl mt-5 ml-12 text-[#FF5F1F]">
            Hi! <span className="text-green-500">Admin</span>{" "}
          </h1>
          {showError && (
            <div className="text-red-500 ml-12 text-2xl mt-4">{showError}</div>
          )}
          <div className="flex">
            <form
              onSubmit={handleUserSubmit}
              className="ml-16 flex flex-col gap-3 w-[40%]"
            >
              <h1 className="text-3xl mt-5">Create a User:</h1>
              <input
                type="text"
                value={userDetails.name}
                name="name"
                onChange={(e) => {
                  setShowError(undefined);
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Name"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="text"
                value={userDetails.address}
                name="address"
                onChange={(e) => {
                  setShowError(undefined);
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Address"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="tel"
                value={userDetails.phone}
                name="phone"
                onChange={(e) => {
                  setShowError(undefined);
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Phone Number"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="number"
                value={userDetails.balance}
                name="balance"
                onChange={(e) => {
                  setShowError(undefined);
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="User's Balance"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <button
                type="submit"
                className="p-2 rounded-lg text-xl text-white bg-green-500 w-[22%]"
              >
                Create
              </button>
            </form>

            <form
              onSubmit={handleDelBoySubmit}
              className="ml-24 flex flex-col gap-3 w-[40%]"
            >
              <h1 className="text-3xl mt-5">Create a Delivery Boy Account:</h1>
              <input
                type="text"
                name="name"
                value={delBoyDetails.name}
                onChange={(e) => {
                  setShowError(undefined);
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Name"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={delBoyDetails.email}
                onChange={(e) => {
                  setShowError(undefined);
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Email Address"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="password"
                name="password"
                value={delBoyDetails.password}
                onChange={(e) => {
                  setShowError(undefined);
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Password"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <button
                type="submit"
                className="p-2 rounded-lg text-xl text-white bg-green-500 w-[22%]"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      }
      </>
  );
};

export default page;
