"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';


const Header = ({ setShowForm }) => {

	// API GATEWAY URL
    const gatewayApiUrl = process.env.NEXT_PUBLIC_GATEWAY_API_URL;
	const [showMenu, setShowMenu] = useState(false);
	const [userData, setUserData] = useState([])
	const user = useAuth().user;
	const logout = useAuth().logout;

	const router = useRouter();

	const handleLogout = (e) => {
		e.preventDefault();
		logout();
		setShowMenu(false);
		router.push('/');
	};

	useEffect(() => {
		// Verifica si el usuario está autenticado antes de hacer la solicitud de usuario
		if (user) {
		  const fetchUser = async () => {
			const response = await fetch(`${gatewayApiUrl}/users/${user.uid}`);
			const data = await response.json();
			setUserData(data);
		  };
		  fetchUser();
		}
	  }, [user]);

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
					{user && userData && userData.length > 0 && userData[0].role == 'Client' && (
						<>
						<Link href="/">
							<span className="sm:text-xs md:text-xs lg:text-xl mx-4">HOME</span>
						</Link>
						<Link href="/user/menu">
							<span className="sm:text-xs md:text-xs lg:text-xl mx-4">OUR FOOD</span>
						</Link>
						<Link href="/user/reservation">
							<span className="sm:text-xs md:text-xs lg:text-xl mx-4">RESERVATION</span>
						</Link>
						<Link href="/user/order">
							<span className="sm:text-xs md:text-xs lg:text-xl mx-4">ABOUT</span>
						</Link>
						</>
					)}

					{user && userData && userData.length > 0 && userData[0].role == 'Admin' && (
						<>
						<Link href="/">
							<span className="sm:text-xs md:text-xs lg:text-xl mx-4">HOME</span>
						</Link>
						<Link href="/admin/menu">
							<span className="sm:text-xs md:text-xs lg:text-xl mx-4">OUR FOOD</span>
						</Link>
						<Link href="/admin/reservation">
							<span className="sm:text-xs md:text-xs lg:text-xl mx-4">RESERVATION</span>
						</Link>
						<Link href="/admin/order">
							<span className="sm:text-xs md:text-xs lg:text-xl mx-4">ABOUT</span>
						</Link>
						</>
					)}

					{!user ? (
						<span
							className="sm:text-xs md:text-xs lg:text-xl mx-4 bg-orange-500 sm:px-6 md:px-8 lg:px-16  py-4 rounded-full text-white cursor-pointer"
							onClick={() => setShowForm(true)}>
							LOGIN
						</span>
					) : (
						<>
						<div className='flex flex-row items-center' onClick={() => setShowMenu(!showMenu)}>
							<img
								src={user.photoURL ? user.photoURL : "/img/profileIcon.png"}
								width={60}
								height={60}
								className='border-4 border-orange-500 rounded-full transform translate-x-12 bg-white'
							>
							</img>
							<span
								className="sm:text-xs md:text-xs lg:text-xl mx-4 bg-orange-500 sm:px-6 md:px-8 lg:px-16 py-2 rounded-full text-white cursor-pointer text-center"
							>
								{user.displayName ? user.displayName.split(" ")[0] : "name"}
							</span>
							{/* svg of arrow down */}
							<svg width="24px" height="24px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className='-translate-x-14 cursor-pointer' fill="#FFFFFF">

								<path d="M0 0h48v48H0z" fill="none" />
								<g id="Shopicon">
									<polygon points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586" />
								</g>
							</svg>

						</div>
						<div>
							{showMenu && (
								<div className="absolute w-60 px-5 py-3 bg-orange-500 rounded-lg shadow border mt-12 -translate-x-60 -translate-y-2 z-50">
								<ul className="space-y-3 text-white">
									<li className="font-medium">
										<Link href={user && userData && userData.length > 0 && userData[0].role === 'Admin' ? '/admin/profile' : '/user/profile'} className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-white text-white">
											<div className="mr-3">
												<svg className="w-6 h-6" fill="white" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
											</div>
											<span className='text-white text-lg'>Profile</span>
										</Link>
									</li>
					
									<hr className="border-white" />
					
									<li className="font-medium">
										<div className="flex cursor-pointer items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600" onClick={handleLogout}>
											<div className="mr-3 text-white">
												<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
											</div>
											<span className='text-white text-lg'>Logout</span>
										</div>
									</li>
								</ul>
							</div>
							)}
						</div>
						</>
					)}
				</div>

			</div>

		</header>
	);
};

export default Header;
