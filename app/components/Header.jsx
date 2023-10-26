import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';


const Header = ({ setShowForm }) => {

	const user = useAuth().user;
	const logout = useAuth().logout;

	const handleLogout = (e) => {
		e.preventDefault();
		logout();
	};

	return (
		<header className=" w-full">
			<div className="w-full flex justify-between items-center inline-block py-8">
				<div className="float-left block mx-10">
					<Link href="/">
						<span className="sm:text-xl md:text-xl lg:text-3xl font-bold">FORK.</span>
						<span className="sm:text-xl md:text-xl lg:text-3xl font-bold text-orange-500">FIESTA</span>
					</Link>
				</div>
				<div className="flex flex-row mx-10 items-center">
					<Link href="/cart">
						<span className="sm:text-xs md:text-xs lg:text-xl mx-4">HOME</span>
					</Link>
					<Link href="/cart">
						<span className="sm:text-xs md:text-xs lg:text-xl mx-4">OUR FOOD</span>
					</Link>
					<Link href="/cart">
						<span className="sm:text-xs md:text-xs lg:text-xl mx-4">RESERVATION</span>
					</Link>
					<Link href="/cart">
						<span className="sm:text-xs md:text-xs lg:text-xl mx-4">ABOUT</span>
					</Link>

					{user ? (
    					<div className='flex flex-row items-center'>
        					<img
            					src={user.photoURL}
            					width={60}
            					height={60}
            					className='border-4 border-orange-500 rounded-full transform translate-x-12'
        					/>
        				<span
            				className="sm:text-xs md:text-xs lg:text-xl mx-4 bg-orange-500 sm:px-6 md:px-8 lg:px-16 py-2 rounded-full text-white cursor-pointer text-center"
        				>
           				 {user.displayName ? user.displayName.split(" ")[0] : "User"}
        				</span>
    					</div>
						) : (
    					<span
        					className="sm:text-xs md:text-xs lg:text-xl mx-4 bg-orange-500 sm:px-6 md:px-8 lg:px-16  py-4 rounded-full text-white cursor-pointer"
        					onClick={() => setShowForm(true)}>
       						LOGIN
    					</span>
						)}
					<div className="cursor-pointer border" onClick={handleLogout}>
						cerrar sesión xd
					</div>
				</div>

			</div>

		</header>
	);
};

export default Header;
