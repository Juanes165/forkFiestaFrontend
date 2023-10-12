import React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <header>
            <div className="w-full mb-8">
                <div className="w-full flex justify-between inline-block py-8">
                    <div className="float-left block mx-10">
                        <Link href="/">
                            <span className="sm:text-2xl md:text-2xl lg:text-3xl font-bold">FORK.</span>
                            <span className="sm:text-2xl md:text-2xl lg:text-3xl font-bold text-orange-500">FIESTA</span>
                        </Link>
                    </div>
                    <div className="float-right block mx-10">
                        <Link href="/cart">
                            <span className="sm:text-sm md:text-sm lg:text-xl mx-4">HOME</span>
                        </Link>
                        <Link href="/cart">
                            <span className="sm:text-sm md:text-sm lg:text-xl mx-4">OUR FOOD</span>
                        </Link>
                        <Link href="/cart">
                            <span className="sm:text-sm md:text-sm lg:text-xl mx-4">RESERVATION</span>
                        </Link>
                        <Link href="/cart">
                            <span className="sm:text-sm md:text-sm lg:text-xl mx-4">ABOUT</span>
                        </Link>
                        <Link href="/cart">
                            <span className="sm:text-sm md:text-sm lg:text-xl mx-4 bg-orange-500 sm:px-12 md:px-12 lg:px-16  py-4 rounded-full text-white">LOGIN</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;