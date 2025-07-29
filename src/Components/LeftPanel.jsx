import React from 'react';
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdOutlineRealEstateAgent } from "react-icons/md";

const LeftPanel = () => {
    return (
        <div className='w-1/6 bg-[var(--mute-bg)] rounded-2xl mt-2 h-dvh'>
            <div className='p-4'>
                <h2 className='font-bold'>Add Nodes</h2>
                <ul className='flex flex-col gap-6 mt-7 text-[var(--secondary)]'>
                    <li className='flex items-center gap-2 text-md bg-amber-200'><MdAccountBalanceWallet size={25} />  Account</li>
                    <li className='flex items-center gap-2 text-md'><FaHandHoldingDollar size={25} />  Loan</li>
                    <li className='flex items-center gap-2 text-md'><MdOutlineRealEstateAgent size={25} /> Collateral</li>
                </ul>
            </div>
        </div>
    );
}

export default LeftPanel;
