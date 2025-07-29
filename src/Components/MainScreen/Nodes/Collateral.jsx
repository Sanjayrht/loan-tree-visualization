import { Handle, Position } from '@xyflow/react';
import React from 'react';
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { useNode } from '../../../Context/TreeContext';

const Collateral = ({ data }) => {
    const { handleShow } = useNode()

    return (
        <div className='rounded-[3px] overflow-hidden bg-pink-100 min-w-20' onClick={() => handleShow(data)}>
            <Handle type='target' position={Position.Left} />
            <div className='flex items-center px-1 bg-red-400 gap-1 text-[8px] font-semibold '>
                <MdOutlineRealEstateAgent />
                <span>Collateral</span>
            </div>
            <div className='text-[8px] p-1'>
                <p>{data.item}</p>
            </div>
        </div>
    );
}

export default Collateral;
