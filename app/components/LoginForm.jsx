"use client"
import React, { useState, useRef  } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const cloudinary_URL = 'https://api.cloudinary.com/v1_1/proyectogca/image/upload';
const cloudinary_upload_preset = 'sk5zjw47';

function LoginForm({ showForm, setShowForm }) {

    const [error, setError] = useState(null);

    const { login, register, loginWithGoogle } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [role, setRole] = useState('Admin');
   
    // const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
    // const [verificationSent, setVerificationSent] = useState(false);
    // const [emailExists, setEmailExists] = useState(false);

    const [showLogin, setShowLogin] = useState(true);

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinary_upload_preset);

        try {
            const res = await axios.post(cloudinary_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const image = res.data.url;
            setPhotoURL(image); // Store the URL in the photoURL state
        } catch (err) {
            console.log(err);
        }
    };
    const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
    };

    const handleLoginEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleLoginPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            setShowForm(false);
        } catch (error) {
            setError('Invalid username or password');
        }
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginWithGoogle();
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setShowForm(false);          
        } catch (error) {
            1;
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(photoURL);
        try {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setShowForm(false);
            // setVerificationSent(true);
            // setEmailExists(false);
            // Aquí puedes capturar el nombre de usuario del formulario (por ejemplo, de un input) y pasarlo a la función register.
            // const displayName = "NombreDeUsuario"; // Reemplaza esto por la forma en que obtienes el nombre de usuario del formulario.
            await register(email, password, displayName, photoURL);
            
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <>
            {showForm ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="relative bg-white rounded-lg shadow px-12 py-6">
                                {/*close button*/}
                                <button type="button" onClick={() => setShowForm(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close</span>
                                </button>

                                <div className="px-6 py-6 lg:px-8">

                                    {/*form header*/}
                                    <div className="flex flex-row justify-between px-4 mb-4">
                                        <h3 onClick={() => setShowLogin(true)} className={`mb-4 text-3xl font-semibold pb-2 px-6 cursor-pointer ${showLogin ? "text-orange-600 border-b-8 border-orange-600 border-separate border-spacing-y-10" : "text-gray-600"}`}>Sign in</h3>
                                        <h3 onClick={() => setShowLogin(false)} className={`mb-4 text-3xl font-semibold pb-2 px-6 cursor-pointer ${!showLogin ? "text-orange-600 border-b-8 border-orange-600 border-separate border-spacing-y-10" : "text-gray-600"}`}>Register</h3>
                                    </div>

                                    {/*form body*/}
                                    <form className="space-y-6" onSubmit={(e) => showLogin? handleLogin(e) : handleRegister(e)}>

                                        {/*email*/}
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="name@email.com"
                                                value={email}
                                                onChange={handleLoginEmailChange}
                                                required />
                                        </div>
                                        {/* Nombre de usuario */}
                                        {showLogin ? null : (
                                        <div>
                                            <label htmlFor="displayName" className="block mb-2 text-sm font-medium text-gray-900">Nombre de Usuario</label>
                                            <input
                                                type="text"
                                                name="displayName"
                                                id="displayName"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="Your Name"
                                                value={displayName}
                                                onChange={handleDisplayNameChange}
                                                required
                                             />
                                        </div>
                                        )}
                                        {/* Campo de entrada para cargar la imagen */}
                                        {showLogin ? null : (
                                        <div>
                                            <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900">Profile Picture</label>
                                            <input
                                                type="file"
                                                name="profilePicture"
                                                id="profilePicture"
                                                accept="image/*"
                                                className="block w-full text-sm border border-gray-300 rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-orange-200 file:text-orange-700 hover:file:bg-orange-500 hover:file:text-white"
                                                //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                onChange={handleUploadFile}
                                            />
                                        </div>
                                        )}
                                        {/*password*/}

                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={handleLoginPasswordChange}
                                                required />
                                        </div>

                                        {/*confirm password*/}
                                        {showLogin ? null : (
                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                    placeholder="••••••••"
                                                    value={confirmPassword}
                                                    onChange={handleConfirmPasswordChange}
                                                    required />
                                            </div>
                                        )}

                                        <div className="flex justify-center text-red-500">
                                            {error}
                                        </div>

                                        {/*button login with password*/}
                                        <button type="submit" className="w-full text-white bg-orange-500 hover:bg-orange-600 font-semibold rounded-full py-3 text-center">
                                            {showLogin ? "Login to your account" : "Create your account"}
                                        </button>

                                        {/*button login with google*/}
                                        <button type="button" className="w-full text-black bg-white hover:bg-gray-100 border border-black rounded-full py-3 text-center" onClick={handleGoogleLogin}>
                                            <div className='flex flex-row justify-center'>
                                                <FcGoogle />
                                                <span className='ml-4'>Login with Google</span>
                                            </div>
                                        </button>

                                        {/*links*/}
                                        <div className="text-sm font-medium text-gray-500">
                                            Not registered? <a href="#" className="text-blue-700 hover:underline">Create account</a>
                                        </div>
                                        <a href="#" className="text-sm text-blue-700 hover:underline">Lost Password?</a>
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

export default LoginForm;
