'use client';
import React, {useEffect, useState} from 'react';
import {Header, ReservationCard, ReservationForm} from '../../components';
import {useRouter} from 'next/navigation';
import {Loader} from '../../components';
import {auth} from '../../firebase.config';
const reservation = () => {
	// API GATEWAY URL
	const gatewayApiUrl = process.env.NEXT_PUBLIC_GATEWAY_API_URL;

	const [user, setUser] = useState(null);
	const router = useRouter();
	// Adding address form
	const [showReservationForm, setshowReservationForm] = useState(false);
	const [loading, setLoading] = useState(true);

	// Getting user reservation
	const [userReservation, setUserReservation] = useState(null);

	useEffect(() => {
		const fetchUserReservation = async () => {
			const response = await fetch(`${gatewayApiUrl}/reservations/${user.uid}`);
			const data = await response.json();
			console.log(data);
			setUserReservation(data);
		};
		if (!user) return;

		fetchUserReservation();
	}, [user]);

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

	// Loader
	if (!user) {
		return <Loader />;
	}

	console.log(userReservation);
	return (
		<>
			<Header slug={'/'} />
			<ReservationForm showReservationForm={showReservationForm} setShowReservationForm={setshowReservationForm} />
			<div className="container mx-auto px-6 md:px-0">
				<div className="grid grid-cols-1">
					<div className="flex justify-center py-6">
						<span className="text-4xl md:text-4xl lg:text-5xl font-semibold mb-4 text-dark-slate-blue">Your reservation</span>
					</div>
					<div className="flex flex-col justify-center px-4 mb-8">
						<span className="text-xl md:text-3xl lg:text-3xl font-semibold mb-4 py-2 bg-orange-500 text-white px-4 py-2 w-full">Reservations</span>
						<div className="flex flex-col mt-2">
							{userReservation &&
								typeof value !== 'object' &&
								userReservation.constructor !== Object &&
								userReservation.map((reservation, index) => <ReservationCard key={index} reservation={reservation} />)}
							<span onClick={(e) => setshowReservationForm(true)} className="cursor-pointer hover:underline">
								+ Reservation
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default reservation;
