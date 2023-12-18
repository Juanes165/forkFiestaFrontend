"use client";
import React from 'react';
import moment from 'moment';

function ReservationCard(props) {
    const reservation = props.reservation;
    const reservationDate = moment(reservation.date).format("DD/MM/YY");
    console.log(reservation.uid)
    return (
        <div className="relative border-2 border-gray-300 bg-gray-100 rounded-lg px-8 py-3 mb-6">
            <div className="flex flex-row justify-between mb-2">
                <div className='flex flex-col'>
                    <h2>{reservation.reservation_name}</h2>
                    <p>Event:{reservation.event_type}</p>
                    <p>Date:{reservationDate}</p>
                </div>

                <div className='flex flex-row items-center'>
                    <p>{reservation.guest_number} Guests</p>
                    <div className="pl-4 h-full flex items-center">
                        {/* Agrega aquí cualquier icono o componente para mostrar detalles si es necesario */}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className='flex flex-col'>
                    <p className='text-gray-500'>Hour: {reservation.hour}</p>
                </div>
                
            </div>

            {/* Botón de eliminar */}
            <button
                className="absolute bottom-2 right-5 px-2 py-1 bg-red-500 text-white rounded-md cursor-pointer"
                onClick={() => handleDeleteReservation(reservation.id)}
            >
                Cancel reservation
            </button>
            
        </div>
    );
}

export default ReservationCard;