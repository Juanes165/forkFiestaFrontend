"use client";
import React, { useState } from 'react';

function MenuForm({ showMenuForm, setShowMenuForm}) {

    // API URL
    const gatewayApiUrl = process.env.NEXT_PUBLIC_GATEWAY_API_URL;

    // Food item
    const initialFood = {
        name: "",
        price: 0,
        description: "",
        category: ""
    };
    const [food, setFood] = useState(initialFood);

    const handleChange = (event) => {
        setFood({ ...food, [event.target.name]: event.target.value})
    };

    //Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${gatewayApiUrl}/menu`;

        const body = {
            name: food.name,
            price: food.price,
            description: food.description,
            category: food.category,
        };
        console.log(body)

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
                setFood(initialFood);
                setShowMenuForm(false);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <>
            {showMenuForm ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="relative bg-white rounded-lg shadow px-12 py-6">
                                {/*close button*/}
                                <button type="button" onClick={() => setShowMenuForm(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close</span>
                                </button>

                                <div className="px-6 py-6 lg:px-8">

                                    {/*form header*/}
                                    <div className="flex flex-row justify-between px-4 mb-4">
                                        <h3 className={`mb-4 text-3xl font-semibold pb-2 px-6 cursor-pointer text-gray-600`}>Add a new item to the menu</h3>
                                    </div>

                                    {/*form body*/}
                                    <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                                        {/* reservation name */}
                                        <div>
                                            <label htmlFor="food_name" className="block mb-2 text-sm font-medium text-gray-900">Name of the item</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="Food Name"
                                                value={food.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* date */}
                                        <div>
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                            <input
                                                type="number"
                                                name="price"
                                                id="price"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="$ 0"
                                                value={food.price}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* hour */}
                                        <div>
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Food description</label>
                                            <input
                                                type="text"
                                                name="description"
                                                id="description"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="Add the description for your new menu item"
                                                value={food.description}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* guest number */}
                                        <div>
                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                            <input
                                                type="text"
                                                name="category"
                                                id="category"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="Indicate the category in which your item is found"
                                                value={food.category}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/*button make reservation*/}
                                        <button type="submit" className="w-full text-white bg-orange-500 hover:bg-orange-600 font-semibold rounded-full py-3 text-center">
                                            Add item
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

export default MenuForm;