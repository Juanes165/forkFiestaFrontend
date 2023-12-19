"use client";
import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";

function ReservationForm({ showReservationForm, setShowReservationForm }) {

    // API URL
    const gatewayApiUrl = process.env.NEXT_PUBLIC_GATEWAY_API_URL;

    // User
    const { user } = useAuth();

    // Reservation
    const initialReservation = {
        reservation_name: "",
        date: "",
        hour: "",
        guest_number: "",
        event_type: "",
    };
    const [reservation, setReservation] = useState(initialReservation);

    const handleChange = (event) => {
        setReservation({ ...reservation, [event.target.name]: event.target.value });
    };

    // Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${gatewayApiUrl}/create-reservation`;

        const body = {
            reservation_name: reservation.reservation_name,
            uid: user.uid,
            date: reservation.date,
            hour: reservation.hour,
            guest_number: reservation.guest_number,
            event_type: reservation.event_type,
        };
        console.log(body)

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setReservation(initialReservation);
                setShowReservationForm(false);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        window.location.reload();
    };

    return (
        <>
            {showReservationForm ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="relative bg-white rounded-lg shadow px-12 py-6">
                                {/*close button*/}
                                <button type="button" onClick={() => setShowReservationForm(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close</span>
                                </button>

                                <div className="px-6 py-6 lg:px-8">

                                    {/*form header*/}
                                    <div className="flex flex-row justify-between px-4 mb-4">
                                        <h3 className={`mb-4 text-3xl font-semibold pb-2 px-6 cursor-pointer text-gray-600`}>Make a reservation</h3>
                                    </div>

                                    {/*form body*/}
                                    <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                                        {/* reservation name */}
                                        <div>
                                            <label htmlFor="reservation_name" className="block mb-2 text-sm font-medium text-gray-900">Reservation Name</label>
                                            <input
                                                type="text"
                                                name="reservation_name"
                                                id="reservation_name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="Your Reservation Name"
                                                value={reservation.reservation_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* date */}
                                        <div>
                                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                                            <input
                                                type="text"
                                                name="date"
                                                id="date"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="YYYY-MM-DD"
                                                value={reservation.date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* hour */}
                                        <div>
                                            <label htmlFor="hour" className="block mb-2 text-sm font-medium text-gray-900">Hour</label>
                                            <input
                                                type="text"
                                                name="hour"
                                                id="hour"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="HH:MM AM/PM"
                                                value={reservation.hour}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* guest number */}
                                        <div>
                                            <label htmlFor="guest_number" className="block mb-2 text-sm font-medium text-gray-900">Number of Guests</label>
                                            <input
                                                type="number"
                                                name="guest_number"
                                                id="guest_number"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="1"
                                                value={reservation.guest_number}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* event type */}
                                        <div>
                                            <label htmlFor="event_type" className="block mb-2 text-sm font-medium text-gray-900">Event Type</label>
                                            <input
                                                type="text"
                                                name="event_type"
                                                id="event_type"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="e.g., Birthday, Anniversary"
                                                value={reservation.event_type}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/*button make reservation*/}
                                        <button type="submit" className="w-full text-white bg-orange-500 hover:bg-orange-600 font-semibold rounded-full py-3 text-center">
                                            Make Reservation
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

export default ReservationForm;