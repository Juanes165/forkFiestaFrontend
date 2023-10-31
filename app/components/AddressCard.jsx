import React from 'react';

function AddressCard(props) {
    return (
        <div className="border-2 border-black py-2 px-8 my-4 rounded-lg w-3/4">
            <h2 className='text-xl font-semibold'>{props.name}</h2>
            <p>{props.address}</p>
            <p>{props.address_details}</p>
            <p>Phone: <span className='font-semibold'>{props.phone}</span></p>
            <p>{props.city}</p>
        </div>
    );
}

export default AddressCard;
