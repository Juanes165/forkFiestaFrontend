"use client";
import React, { useEffect, useState } from 'react';
import { Header } from '../../../components';

function Menu() {

    const gatewayApiUrl = process.env.NEXT_PUBLIC_GATEWAY_API_URL

    const [menu, setMenu] = useState([])

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(`${gatewayApiUrl}/menu`)
            const data = await response.json()
            setMenu(data.foods)
        }
        fetchMenu()
    }, [])

    return (
        <div>
            <Header />
            <div className='container mx-auto'>
                <h1 className='text-3xl font-semibold'>Our Menu</h1>
                {menu.map((item) => (
                    <div key={item.id} className='flex justify-between items-center py-4'>
                        <div className='flex items-center'>
                            <img src={item.image} alt={"item-img"} className='w-12 h-12 rounded-full' />
                            <div className='ml-4'>
                                <h1 className='text-lg font-semibold mx-4'>{item.name}</h1>
                                <p className='text-sm font-light mx-4'>{item.description}</p>
                            </div>
                        </div>
                        <span className='text-lg font-semibold'>${item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
