"use client";
import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";

function AddressForm({ showAddressForm, setShowAddressForm }) {

    // API URL
    const gatewayApiUrl = process.env.NEXT_PUBLIC_GATEWAY_API_URL;

    // User
    const { user } = useAuth();

    // Address
    const initialAddress = {name: "", address: "", address_details: "", phone: "", city: ""};
    const [address, setAddress] = useState(initialAddress);

    const handleChange = (event) => {
        setAddress({ ...address, [event.target.name]: event.target.value });
    };

    // Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${gatewayApiUrl}/create-address`;

        const body = {
            user_id: user.uid,
            name: address.name,
            address: address.address,
            address_details: address.address_details,
            phone: address.phone,
            city: address.city,
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setAddress(initialAddress);
                setShowAddressForm(false);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };



    return (
        <>
            {showAddressForm ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="relative bg-white rounded-lg shadow px-12 py-6">
                                {/*close button*/}
                                <button type="button" onClick={() => setShowAddressForm(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close</span>
                                </button>

                                <div className="px-6 py-6 lg:px-8">

                                    {/*form header*/}
                                    <div className="flex flex-row justify-between px-4 mb-4">
                                        <h3 className={`mb-4 text-3xl font-semibold pb-2 px-6 cursor-pointer text-gray-600`}>Add new address</h3>
                                    </div>

                                    {/*form body*/}
                                    <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>

                                        {/* name */}
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="Your Name"
                                                value={address.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        {/*address*/}
                                        <div>
                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="123 Main St."
                                                value={address.address}
                                                onChange={handleChange}
                                                required />
                                        </div>

                                        {/* address details */}
                                        <div>
                                            <label htmlFor="address_details" className="block mb-2 text-sm font-medium text-gray-900">Address details</label>
                                            <input
                                                type="text"
                                                name="address_details"
                                                id="address_details"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="Apt 123, House, Leave on Porch, etc."
                                                value={address.address_details}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* phone */}
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="(312)-345-6789"
                                                value={address.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* city */}
                                        <div>
                                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="Cali"
                                                value={address.city}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/*button login with password*/}
                                        <button type="submit" className="w-full text-white bg-orange-500 hover:bg-orange-600 font-semibold rounded-full py-3 text-center">
                                            Add Address
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default AddressForm;
