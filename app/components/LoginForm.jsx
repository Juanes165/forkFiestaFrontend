"use client"
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { FcGoogle } from 'react-icons/fc';

function LoginForm({ showForm, setShowForm }) {

    const [error, setError] = useState(null);

    const { login, register, loginWithGoogle } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
    // const [verificationSent, setVerificationSent] = useState(false);
    // const [emailExists, setEmailExists] = useState(false);

    const [showLogin, setShowLogin] = useState(true);

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
            //router.push('/');
        } catch (error) {
            setError('Usuario o contraseña inválidos');
        }
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginWithGoogle();
            //router.push('/');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setError('Usuario o contraseña inválidos');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            // setVerificationSent(true);
            // setEmailExists(false);
        } catch (error) {
            // setEmailExists(true);
            console.log(error);
        }
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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
