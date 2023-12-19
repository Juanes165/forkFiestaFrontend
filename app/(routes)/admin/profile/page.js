"use client"
import React, { useEffect, useState } from "react";
import { Header, Loader } from "../../../components";
import { useAuth } from '../../../context/AuthContext.jsx';
import { OrderCard } from "../../../components";

const Profile = () => {

    // API GATEWAY URL
    const gatewayApiUrl = process.env.NEXT_PUBLIC_GATEWAY_API_URL;

    // User
    const { user } = useAuth();
    console.log(user)

    // Getting user address
    const [userOrders, setUserOrders] = useState([]);
    useEffect(() => {
        if (!user) return;

        const fetchUserOrders = async () => {
            const response = await fetch(`${gatewayApiUrl}/orders`);
            const data = await response.json();
            console.log(data)
            setUserOrders(data.reverse());
        };

        fetchUserOrders();
    }, [user]);

    // Loader
    if (!user) {
        return <Loader />;
    }

    return (
        <>
            <Header slug={"/"} />

            <div className="container mx-auto px-6 md:px-0">
                <div className="grid grid-cols-1">
                    <div className="flex justify-center py-6">
                        <span className="text-4xl md:text-4xl lg:text-5xl font-semibold mb-4 text-dark-slate-blue">
                            Order status
                        </span>
                    </div>

                    <div className="grid grid-cols-3 w-full rounded-3xl">
                        <div className="col-span-3 md:col-span-1 py-8 md:py-24 px-4 bg-gray-200 rounded-3xl items-start">
                            <div className="w-full flex justify-center">
                                <img
                                    src={user.photoURL ? user.photoURL : "/profileIcon.png"}
                                    className="border border-8 align-middle mx-6 font-semibold rounded-full my-2"
                                    alt="profile"
                                    width="200px"
                                    height="200px"
                                />
                            </div>
                            <div className="flex justify-center items-center justify-items-center pt-2 px-4">
                                <span className="text-3xl md:text-lg lg:text-3xl font-semibold text-dark-slate-blue flex justify-center items-center justify-items-center justify-self-center">
                                    <center>{user.displayName}</center>
                                </span>
                            </div>
                            <div className="flex justify-center items-center justify-items-center pt-2 px-4 mt-8">
                                <span className="text-xl md:text-lg lg:text-xl text-dark-slate-blue flex justify-center items-center justify-items-center justify-self-center">
                                    <center>{user.email}</center>
                                </span>
                            </div>
                        </div>

                        <div className="col-span-3 md:col-span-2 md:py-2">

                            <div className="flex flex-col justify-center px-4 mb-8">
                                <span className="text-xl md:text-3xl lg:text-3xl font-semibold mb-4 py-2 bg-orange-500 text-white px-4 py-2 w-full">
                                    Orders history
                                </span>
                                <div className="flex flex-col mt-2">
                                    {userOrders.map((order, index) => (
                                        <OrderCard key={index} order={order} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

export default Profile;