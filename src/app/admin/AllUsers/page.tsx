"use client";

import { Card } from "@/components/Card";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const page = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [searchinput, setSearchinput] = useState("");
  const [results, setResults] = useState([]);
  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/admin/user/get`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setIsFetchloading(false);
      data.map((user: any) => (user["show"] = true));
      const subscribedUsers = data.filter((user: any) => {
        return user.order.length > 0;
      });
      setUsers(subscribedUsers);
      setResults(data);
      setAllUsers(data);
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (results != undefined) {
      results.map((user: any) => {
        if (user.name.toLowerCase().indexOf(searchinput.toLowerCase()) !== -1) {
          user.show = true;
        } else {
          user.show = false;
        }
      });
      setResults(results);
    }

    if (!searchinput) {
      allUsers.map((user: any) => (user["show"] = true));
      setResults(allUsers);
    }
  }, [searchinput]);

  const handleCancel = () => {
    setShowPending(false);
    const cancelledUsers = users.filter((user: any) => {
      return user.order[0].NextMeal.isCancel == true;
    });
    setResults(cancelledUsers);
  };

  const handleSubscribe = () => {
    setShowPending(false);
    const subscribedUsers = allUsers.filter((user: any) => {
      return user.order.length > 0;
    });
    setResults(subscribedUsers);
  };

  const handlePaused = () => {
    setShowPending(false);
    const pausedUsers = users.filter((user: any) => {
      return user.order[0].NextMeal.isPause == true;
    });
    setResults(pausedUsers);
  };

  const handleUnsubscribed = () => {
    setShowPending(false);
    const unsubscribedUsers = allUsers.filter((user: any) => {
      return user.order.length == 0;
    });
    setResults(unsubscribedUsers);
  };

  const handlePendingDeliveries = async () => {
    setShowPending(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/admin/deliveries/get`,
      {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    setIsFetchloading(false);
    data.map((user: any) => (user["show"] = true));
    const res = data.filter((order: any) => {
      return order.isDelivered == false;
    });
    console.log(res);
    setResults(res);
  };

  return (
    <>
      <div className="ml-10 mt-4 pb-8">
        <div className="flex items-center">
          <input
            type="text"
            value={searchinput}
            onChange={(e) => setSearchinput(e.target.value)}
            placeholder="Search a User"
            className="p-2 border border-gray-200 rounded-lg outline-none w-[30%]"
          />

          <div className="flex gap-5 ml-12">
            <button
              onClick={handleSubscribe}
              className="bg-green-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              Subscribed
            </button>

            <button
              onClick={handleCancel}
              className="bg-red-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              Cancelled
            </button>

            <button
              onClick={handlePaused}
              className="bg-yellow-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              Paused
            </button>

            <button
              onClick={handleUnsubscribed}
              className="bg-red-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              Unsubscribed
            </button>

            <button
              onClick={handlePendingDeliveries}
              className="bg-yellow-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              Pending Deliveries
            </button>
          </div>
        </div>
        <div className="flex justify-between w-1/2 items-center">
          <h1 className=" mt-6 text-3xl mb-5">All Users: </h1>
        </div>
        {isFetchloading ? (
          <Loader2 className="animate-spin w-8 h-8" />
        ) : !showPending ? (
          <div className="flex flex-col gap-3">
            {results.map((user: any, index) => {
              return (
                <Card
                  className={`flex ${user.show ? "" : "hidden"}`}
                  id={user.id}
                  key={index}
                  _name={user?.name}
                  _address={user?.address}
                  _balance={user?.balance?.toString()}
                  _location={user?.location}
                  _mobile={user?.phone}
                  _type={
                    user?.order?.length > 1
                      ? "both"
                      : user?.order[0]?.tiffinTime.toLowerCase()
                  }
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {results.map((user: any, index) => {
              return (
                <Card
                  className={`flex ${user.show ? "" : "hidden"}`}
                  id={user.id}
                  key={index}
                  _name={user?.user?.name}
                  _address={user?.user?.address}
                  _balance={user?.user?.balance?.toString()}
                  _location={user?.user?.address}
                  _mobile={user?.user?.phone}
                  _type={user?.order?.tiffinTime}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default page;
