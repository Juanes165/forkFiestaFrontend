import React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <header>
            <div className="container mx-auto px-10 mb-8">
                <div className="w-full inline-block py-8">
                    <div className="float-left block mx-10">
                        <Link href="/">
                            <span className="text-3xl font-bold">FORK.</span>
                            <span className="text-3xl font-bold text-orange-500">FIESTA</span>
                        </Link>
                    </div>
                    <div className="float-right block mx-10">
                        <Link href="/cart">
                            <span className="text-2xl mx-4">HOME</span>
                        </Link>
                        <Link href="/cart">
                            <span className="text-2xl mx-4">OUR FOOD</span>
                        </Link>
                        <Link href="/cart">
                            <span className="text-2xl mx-4">RESERVATION</span>
                        </Link>
                        <Link href="/cart">
                            <span className="text-2xl mx-4">ABOUT</span>
                        </Link>
                        <Link href="/cart">
                            <span className="text-2xl mx-4 bg-orange-500 px-16 py-4 rounded-full text-white">LOGIN</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;