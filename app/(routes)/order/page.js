'use client';
import React, {useState, useEffect} from 'react';
import {Header} from '@/app/components';
import axios from 'axios';
import Swal from 'sweetalert2';
import {auth} from '../../firebase.config';

const OrderFoodPage = () => {
	const gatewayApiUrl = process.env.NEXT_PUBLIC_GATEWAY_API_URL; // The URL of the gateway API

	const [menu, setMenu] = useState([]); // The menu of the restaurant
	const [foodItems, setFoodItems] = useState([]); // The food items in the cart

	const [user, setUser] = useState(null); // User State
	const [phone, setPhone] = useState(null); // Phone State
	const [address, setAddress] = useState(null); // Address State
	const [paymentType, setPaymentType] = useState(null); // Payment Type State

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

	console.log(user);

	// Handle the addition of a food item to the cart
	const handleAddToCart = (foodItem) => {
		const newFoodItem = {...foodItem};
		if (newFoodItem.quantity == 0) return;
		setFoodItems([...foodItems, newFoodItem]);
	};

	// Handle the deletion of a food item from the cart
	const handleDeleteFromCart = (foodIndex) => {
		const newFoodItems = [...foodItems];
		newFoodItems.splice(foodIndex, 1);
		setFoodItems(newFoodItems);
	};

	// Handle the quantity change of a food item
	const handleQuantityChange = (e, foodId) => {
		const newQuantity = e.target.value;
		const newMenu = menu.map((foodItem) => {
			if (foodItem.id === foodId) {
				foodItem.quantity = newQuantity;
			}
			return foodItem;
		});
		setMenu(newMenu);
	};

	// TODO: Handle the checkout
	const handleCheckout = async () => {
		// Create the order message in the format required by the microservice
		const order_message = foodItems
			.map((foodItem, index) => {
				if (index == 0) return `-${foodItem.id},${foodItem.quantity}`;
				return `${foodItem.id},${foodItem.quantity}`;
			})
			.join('-');

		try {
			// Get the summary from the microservice
			const response = await axios.post(`${gatewayApiUrl}/write-order`, {
				order_message,
				order_sauces: '',
				order_juices: '',
			});

			// Separate the lines with <br> instead of \n
			const order_summary = response.data.message.order_summary.split('\n').join('<br>');

			// Show the summary in a modal
			Swal.fire({
				title: 'Your order summary',
				html: '<p>' + order_summary + '</p>',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Confirm order!',
				cancelButtonText: "No, I don't want to order",
				confirmButtonColor: 'green',
			}).then((result) => {
				if (result.isConfirmed) {
					const order = {
						order: order_summary,
						phone,
						address,
						name: user.displayName,
						payment_method: paymentType,
					};

					axios
						.post(`${gatewayApiUrl}/create-order`, order)
						.then((res) => {
							Swal.fire({
								title: 'Order confirmed',
								text: 'Your order is on the way! Thank you for ordering with us.',
								icon: 'success',
								confirmButtonText: 'OK',
								confirmButtonColor: 'green',
							});
						})
						.catch((err) => {
							console.log(err);
						});
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					Swal.fire({
						title: 'Order canceled',
						text: 'What a shame! We hope you order with us next time.',
						icon: 'error',
						confirmButtonText: 'OK',
						confirmButtonColor: 'gray',
					});
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	// Fetch the menu from the gateway API
	useEffect(() => {
		const fetchMenu = async () => {
			const response = await fetch(`${gatewayApiUrl}/menu`);
			const data = await response.json();
			const newMenu = data.foods.map((foodItem) => {
				foodItem.quantity = 0;
				return foodItem;
			});
			setMenu(newMenu);
		};
		fetchMenu();
	}, []);

	return (
		<>
			<Header />
			<div className="order-food-page bg-gray-100 p-10 rounded-md">
				<h1 className="text-2xl font-bold mb-4">Order Food</h1>

				<div className="food-items-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{menu.map((foodItem) => (
						<div key={foodItem.id} className="food-item bg-white rounded-md shadow-md p-4 flex flex-col justify-between">
							<p>{foodItem.food_id}</p>
							<img src={foodItem.image} alt={foodItem.name} className="w-full rounded-lg" />
							<h3 className="text-xl font-bold mt-2">{foodItem.name}</h3>
							<p className="text-gray-500 mb-2">${foodItem.price}</p>
							<div className="flex items-center">
								<input
									type="number"
									value={foodItem.quantity}
									onChange={(e) => handleQuantityChange(e, foodItem.id)}
									min={0}
									className="border border-gray-300 rounded-md px-2 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
								/>
								<button
									onClick={() => handleAddToCart(foodItem)}
									className="border-orange-400 border-2 text-orange-400 px-4 py-2 rounded-md font-bold hover:bg-orange-400 hover:text-white"
								>
									Add to Cart
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="cart-container bg-gray-200 p-4 rounded-md mt-8">
					<h3 className="text-xl font-bold mb-4">Cart</h3>
					<ul>
						{foodItems.map((foodItem, index) => (
							<li key={foodItem.id} className="flex items-center my-2">
								<p className="min-w-[200px]">
									{foodItem.quantity} x {foodItem.name}
								</p>
								<span className="text-gray-500 mx-4">|</span>
								<p className="min-w-[200px]">
									{foodItem.quantity} x {foodItem.price} = $ {foodItem.quantity * foodItem.price}
								</p>
								<span className="text-gray-500 mx-4">|</span>
								<button onClick={() => handleDeleteFromCart(index)} className="bg-red-500 text-white px-2 py-1 rounded-md font-bold hover:bg-red-600">
									X
								</button>
							</li>
						))}
						<li className="flex items-center my-2">
							<p className="min-w-[200px]">Total:</p>
							<span className="text-gray-500 mx-4">|</span>
							<p>$ {foodItems.reduce((total, foodItem) => total + foodItem.quantity * foodItem.price, 0)}</p>
						</li>
					</ul>

					<div className="mt-4">
						<h4 className="text-lg font-bold mb-2">Delivery Information</h4>
						<form>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
									Address
								</label>
								<input
									className="max-w-[400px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="address"
									type="text"
									placeholder="Your address"
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
									Phone Number
								</label>
								<input
									className="max-w-[400px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="phone"
									type="text"
									placeholder="Your phone number"
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
						</form>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentType">
							Payment Type
						</label>
						<select
							className="max-w-[400px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="paymentType"
							onChange={(e) => setPaymentType(e.target.value)}
						>
							<option value="">Select payment type</option>
							<option value="creditCard">Credit Card</option>
							<option value="debitCard">Debit Card</option>
							<option value="paypal">PayPal</option>
							<option value="paypal">Nequi</option>
							<option value="paypal">Cash</option>
						</select>
					</div>

					<button className="bg-orange-500 text-white px-4 py-2 rounded-md font-bold mt-4 hover:bg-green-500" onClick={handleCheckout}>
						Checkout
					</button>
				</div>
			</div>
		</>
	);
};

export default OrderFoodPage;
