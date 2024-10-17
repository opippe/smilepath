import Image from 'next/image';
import { useState } from 'react';
import avatar from "../../public/images/avatar-placeholder.png";
import logo from "../../public/images/logo.png";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Header = () => {
    const [user, setUser] = useState({ firstName: 'Guilherme', profilePic: avatar });

    return (
        <header className="sticky top-0 left-0 w-full z-50 bg-sky-950 shadow-md p-4 flex items-center justify-between">
            {/* App Name */}
            <div className="text-3xl text-white" style={{ fontFamily: 'Protest Riot' }}>
                SmilePath
            </div>

            {/* Logo */}
            <Image
                src={logo}
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
            />

            {/* Search Bar */}
            <div className="flex-grow mx-96 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Procurando por algo?"
                    className="w-full p-2 pl-10 border border-cyan-10 text-black rounded-lg focus:outline-none focus:ring focus:ring-sky-900"
                />
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2 text-white">
                <Image
                    src={user.profilePic}
                    alt="Profile Picture"
                    width={30}
                    height={30}
                    className="rounded-full"
                />
                <span>{user.firstName}</span>
            </div>
        </header>
    );
};

export default Header;