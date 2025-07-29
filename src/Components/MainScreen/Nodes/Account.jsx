import React from 'react';
import { MdAccountBalanceWallet } from "react-icons/md";
import { useNode } from '../../../Context/TreeContext';
import { Handle, Position } from '@xyflow/react';

const Account = ({ data }) => {
    const { handleShow } = useNode()
    return (
        <div className='rounded-[3px] overflow-hidden bg-pink-100 min-w-20' onClick={() => handleShow(data)}>
            {/* <Handle type='target' position={Position.Top}/> */}
            <div className='flex items-center gap-1 text-[8px] font-semibold px-1 bg-green-300'>
                <MdAccountBalanceWallet />
                <span>Account</span>
            </div>
            <div className='text-[8px] p-1'>
                <p className='font-semibold'>{data.name}</p>
                <p>{data.address}</p>
            </div>
            <Handle type='source' position={Position.Right}/>
        </div>
    );
}

export default Account;
