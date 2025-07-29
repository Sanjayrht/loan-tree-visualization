import React from 'react';
import userImg from "../assets/Images/user.jpg"
import { ImTree } from "react-icons/im";

const Header = () => {
    return (
        <div className='w-full h-15 px-5 bg-[var(--mute-bg)] flex justify-between items-center rounded-2xl'>
            <h1 className='flex items-center gap-2 font-bold text-2xl text-[var(--primary)]'> <ImTree /> Tree Virtualizer</h1>
            <div className='flex items-center gap-2'>
                <div className='main-grad p-2 rounded-full w-12 h-12'>
                    <img src={userImg} alt='' className='rounded-4xl' />
                </div>
                <div>
                    <h2 className='font-bold text-sm'>Sanjay</h2>
                    <p className='text-sm text-gray-500'>sanjay@xyz.com</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
