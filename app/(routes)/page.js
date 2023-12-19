'use client';
import React, {useState, useEffect} from 'react';
import {AiOutlineInstagram} from 'react-icons/ai';
import {RiTwitterXLine} from 'react-icons/ri';
import {BiLogoFacebook} from 'react-icons/bi';
import {Header, LoginForm} from '@/app/components/';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {auth} from '../firebase.config';

export default function Home() {
	const [showForm, setShowForm] = useState(false);
	const [user, setUser] = useState(null); // User State
	const router = useRouter();

	// Verify if the user is authenticated
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			// 'user' will be null if the user is not authenticated
			if (user) {
				// User is signed in
				setUser(user);
			} else {
				// User is signed out
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	// If the user is not authenticated, show a login form
	const handleOnGoToOrder = () => {
		if (!user) {
			setShowForm(true);
		} else {
			router.push('/order');
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center ">
			<Header setShowForm={setShowForm} />
			<LoginForm showForm={showForm} setShowForm={setShowForm} />

			{/* section 1 */}
			<div className="grid grid-cols-12 w-full mt-20 my-auto">
				<div className="mx-24 2xl:mx-32 px:12 2xl:px-20 col-span-6">
					<span className="text-5xl 2xl:text-7xl">Have no time to prepare</span>
					<span className="text-5xl 2xl:text-7xl text-orange-500"> food</span>
					<span className="text-5xl 2xl:text-7xl">?</span>
					<div className="text-lg 2xl:text-2xl text-gray-400 mb-20 2xl:mb-32 mt-8">
						Your favourite restaurant now have online orders, enjoy the best food and drinks without leaving your home
					</div>
					<div>
						<span
							onClick={() => handleOnGoToOrder()}
							className="cursor-pointer xs:text-lg sm:text-xl md:text-xl lg:text-3xl bg-orange-500 xs:px-6 sm:px-8 md:px-8 lg:px-16 py-4 rounded-full text-white"
						>
							Order Food
						</span>
					</div>
					<div className="sm:text-3xl md:text-4xl lg:text-5xl my-16 inline-block">
						<div className="float-left block mx-8">
							<RiTwitterXLine />
						</div>
						<div className="float-right block mr-5">
							<AiOutlineInstagram />
						</div>
					</div>
				</div>
				<div className="col-span-6 rounded-l-[200px] mb-24">
					<img src="/img/landing_page/portrait.jpg" className="rounded-l-[200px] w-full h-full object-cover" alt="Logo" />
				</div>
			</div>

			{/* section 2 */}
			<div className="grid grid-cols-12 w-full my-20">
				<div className="col-span-6 my-16 rounded-r-[200px]">
					<img src="/img/landing_page/Pizza.png" className="w-full h-full object-cover rounded-r-[200px]" alt="Pizza" />
				</div>
				<div className="mx-2 px-20 col-span-6">
					<span className="text-4xl 2xl:text-6xl border-b-8 border-orange-500">OUR FOOD</span>

					<div className="mt-16 grid">
						<span className="text-2xl 2xl:text-3xl">Signature pizzas</span>
						<span className="text-md 2xl:text-xl text-gray-400 mt-2">The best pizzas of Cali!</span>
					</div>

					<div className="mt-8 grid">
						<span className="text-2xl 2xl:text-3xl">Oven-Baked Subs</span>
						<span className="text-md 2xl:text-xl text-gray-400 mt-2">
							Choose the ingredients, choose delivery time and enjoy elicious food without leaving your house
						</span>
					</div>

					<div className="mt-8 grid">
						<span className="text-2xl 2xl:text-3xl">Wings, Sides & More</span>
						<span className="text-md 2xl:text-xl text-gray-400 mt-2">Delicious wings for you and your family</span>
					</div>

					<div className="mt-24">
						<span
							onClick={() => handleOnGoToOrder()}
							className="cursor-pointer sm:text-xl md:text-xl lg:text-3xl bg-orange-500 sm:px-8 md:px-8 lg:px-16 py-4 rounded-full text-white"
						>
							Order Food
						</span>
					</div>
				</div>
			</div>

			{/* section 4 */}
			{/*<div class= 'bg-fixed' style="background-image: url(...)">*/}
			<div className="grid grid-cols-12 w-full bg-cover bg-center" style={{backgroundImage: 'url(img/landing_page/Map.png)'}}>
				<div className="mx-32 sm:col-span-12 md:col-span-12 lg:col-span-6">
					<span className="text-left text-4xl 2xl:text-6xl border-b-8 border-orange-500 mb-8">Contact us</span>
					<div className="bg-orange-500 my-10 px-10 sm:py-16 md:py-16 lg:py-20 rounded-lg w-full mb-16">
						<form className="grid">
							<input type="text" placeholder="Name" className="bg-white mb-8 sm:p-3 md:p-3 lg:p-4 rounded-lg" />

							<input type="text" placeholder="Email" className="bg-white mb-8 sm:p-3 lg:p-4 rounded-lg" />

							<input type="text" placeholder="Message" className="bg-white mb-8 sm:p-3 lg:p-4  rounded-lg" />

							<label>
								<input type="checkbox" className="p-4 mr-4" />
								<span className="text-white">I agree with all conditions</span>
							</label>
							<button className="bg-white rounded-lg mx-32 mt-8 text-orange-500 p-4">Send</button>
						</form>
					</div>
				</div>
			</div>
			{/*</div>*/}

			{/* footer */}
			<div className="bg-gray-800 w-full py-8 flex flex-col items-center justify-center">
				<div className="grid grid-cols-12 w-full mx-auto">
					<div className="col-span-4 mx-auto">
						<span className="text-white text-3xl font-bold">FORK.</span>
						<span className="text-orange-500 text-3xl font-bold">FIESTA</span>
					</div>
					<div className="col-span-3 flex flex-col">
						<div className="text-white text-xl font-extrabold mr-8">Contact</div>
						<div className="text-white mr-8">Street 42 #85C-13, Caney</div>
						<div className="text-white mr-8">Cali, Valle del Cauca</div>
						<div className="text-white mr-8">Telephone: +57 312 345 6789</div>
						<div className="text-white mr-8">E-mail: service@forkfiesta.com</div>
					</div>
					<div className="col-span-2 flex flex-col">
						<div className="text-white text-xl font-extrabold mr-4">Menu</div>
						<div className="text-white mr-4">About us</div>
						<div className="text-white mr-4">Reservation</div>
						<div className="text-white mr-4">Services</div>
						<div className="text-white mr-4">Contact</div>
					</div>
					<div className="col-span-3 flex flex-col">
						<span className="text-white font-extrabold">Follow Us</span>
						<div className="flex sm:text-lg md:text-xl lg:text-2xl my-8 inline-block">
							<div className="float-left text-orange-500 bg-white rounded-full p-2">
								<BiLogoFacebook />
							</div>
							<div className="float-middle text-orange-500 mx-4 bg-white rounded-full p-2">
								<RiTwitterXLine />
							</div>
							<div className="float-right text-orange-500 bg-white rounded-full p-2">
								<AiOutlineInstagram />
							</div>
						</div>
					</div>
				</div>
				<div className="text-white mt-8">© 2023 Fork.Fiesta. All rights reserved</div>
			</div>
		</div>
	);
}
