"use client"
import React, { useEffect, useState } from "react";
import { Header, Loader } from "../../../components";
import { useAuth } from '../../../context/AuthContext.jsx';
import { AddressCard, AddressForm, OrderCard } from "../../../components";
import { FiEdit } from 'react-icons/fi';

const Profile = () => {

    // API GATEWAY URL
    const gatewayApiUrl = process.env.NEXT_PUBLIC_GATEWAY_API_URL;

    // User
    const { user } = useAuth();
    const updateName = useAuth().updateName;

    // Adding address form
    const [showAddressForm, setShowAddressForm] = useState(false);

    // Getting user address
    const [userAddresses, setUserAddresses] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    useEffect(() => {
        const fetchUserAddresses = async () => {
            const response = await fetch(`${gatewayApiUrl}/address/${user.uid}`);
            const data = await response.json();
            setUserAddresses(data);
        };
        if (!user) return;

        const fetchUserOrders = async () => {
            const response = await fetch(`${gatewayApiUrl}/orders/${user.uid}`);
            const data = await response.json();
            console.log(data)
            setUserOrders(data.message.reverse());
        };

        fetchUserAddresses();
        fetchUserOrders();
    }, [user]);

    const [showChangeName, setShowChangeName] = useState(false);
    const [newName, setNewName] = useState("");

    // Change name
    const changeName = async (e) => {
        e.preventDefault();
        await updateName(newName);
        setShowChangeName(false);
        //window.location.reload();
    }

    // Loader
    if (!user) {
        return <Loader />;
    }

    return (
        <>
            <Header slug={"/"} />
            <AddressForm showAddressForm={showAddressForm} setShowAddressForm={setShowAddressForm} />
            <>
                {showChangeName && (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="relative bg-white rounded-lg shadow px-12 py-6">
                                    {/*close button*/}
                                    <button type="button" onClick={() => setShowChangeName(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close</span>
                                    </button>

                                    <div className="px-6 py-6 lg:px-8">

                                        {/*form header*/}
                                        <div className="flex flex-row justify-between px-4 mb-4">
                                            <h3 className={`mb-4 text-3xl font-semibold pb-2 px-6 cursor-pointer text-gray-600`}>Change your name</h3>
                                        </div>

                                        {/*form body*/}
                                        <form className="space-y-6" onSubmit={(e) => changeName(e)}>

                                            {/* name */}
                                            <div>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                    placeholder="Your Name"
                                                    value={newName}
                                                    onChange={(e) => setNewName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        

                                            {/*button send*/}
                                            <button type="submit" className="w-full text-white bg-orange-500 hover:bg-orange-600 font-semibold rounded-full py-3 text-center">
                                                Change name
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )}
            </>

            <div className="container mx-auto px-6 md:px-0">
                <div className="grid grid-cols-1">
                    <div className="flex justify-center py-6">
                        <span className="text-4xl md:text-4xl lg:text-5xl font-semibold mb-4 text-dark-slate-blue">
                            Your account
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
                                <div>
                                    <FiEdit className="ml-2 cursor-pointer w-6 h-6" onClick={() => setShowChangeName(true)} />
                                </div>
                            </div>
                            <div className="flex justify-center items-center justify-items-center pt-2 px-4 mt-8">
                                <span className="text-xl md:text-lg lg:text-xl text-dark-slate-blue flex justify-center items-center justify-items-center justify-self-center">
                                    <center>{user.email}</center>
                                </span>
                            </div>
                        </div>
                        <div className="col-span-3 md:col-span-1 md:py-2">

                            <div className="flex flex-col justify-center px-4 mb-8">
                                <span className="text-xl md:text-3xl lg:text-3xl font-semibold mb-4 py-2 bg-orange-500 text-white px-4 py-2 w-full">
                                    Your information
                                </span>

                                <div className="flex flex-col pt-2 px-4">
                                    <span className="text-3xl md:text-lg lg:text-3xl px-4 mb-2">
                                        Addresses
                                    </span>
                                    <div className="flex flex-col items-center justify-center">
                                        {userAddresses.map((address, index) => (
                                            <AddressCard key={index} name={address.name} address={address.address} address_details={address.address_details} phone={address.phone} city={address.city} />
                                        ))}
                                        <span onClick={(e) => setShowAddressForm(true)} className="cursor-pointer hover:underline">+ Add Address</span>
                                    </div>

                                </div>
                            </div>


                        </div>

                        <div className="col-span-3 md:col-span-1 md:py-2">

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