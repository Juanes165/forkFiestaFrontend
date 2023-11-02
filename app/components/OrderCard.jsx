"use client";
import React, { useState } from 'react';
import moment from 'moment';

function OrderCard(props) {

    const [showDetails, setShowDetails] = useState(false);

    // order info
    const order = props.order;
    const order_details = JSON.parse(order.order)
    const total = order_details == 0 ? 0 : order_details.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity
    }, 0);

    return (
        <div className="border-2 border-gray-300 bg-gray-100 rounded-lg px-8 py-3 mb-6">
            <div className="flex flex-row justify-between mb-2">
                <div className='flex flex-col'>
                    <h2>{order.name}</h2>
                    <p>{order.address}</p>
                </div>

                <div className='flex flex-row items-center'>
                    <p className={`font-semibold text-xl ${orderStatusTextFormat(order.status)}`}>{order.status}</p>
                    <div className="pl-4 h-full flex items-center cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
                        <svg width="24px" height="24px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000">

                            <path d="M0 0h48v48H0z" fill="none" />
                            <g id="Shopicon">
                                <polygon points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            {showDetails && (
                <>
                    <div className='flex flex-col mb-2'>
                        {order_details.map((item, index) => {
                            return (
                                <div className='flex flex-row justify-between' key={index}>
                                    <div className='flex flex-row'>
                                        <p className='font-semibold'>{item.quantity}x</p>
                                        <p className='pl-2'>{item.name}</p>
                                    </div>
                                    <p>${new Intl.NumberFormat('en-US').format(item.price * item.quantity)}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className='flex flex-col'>
                            <p className='text-gray-500'>Order ID: {order.order_id}</p>
                            <p className='text-gray-500'>Order Date: {moment(order.created_at).format("DD/MM/YY")}</p>
                        </div>
                        <div className='flex flex-col box-content w-1/2'>
                            <p className='text-gray-500'>Total: ${new Intl.NumberFormat('en-US').format(total)}</p>
                            <p className='text-gray-500'>Payment: {order.payment_method}</p>
                        </div>
                    </div>
                </>
            )}


        </div>
    );
}

const orderStatusTextFormat = (status) => {
    switch (status) {
        case 'Pending':
            return 'text-gray-500';
        case 'In Progress':
            return 'text-yellow-500';
        case 'Completed':
            return 'text-green-500';
        case 'Cancelled':
            return 'text-red-500';
        default:
            return 'hidden';
    }
}

export default OrderCard;
