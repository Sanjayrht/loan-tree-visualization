import { Handle, Position } from '@xyflow/react';
import { FaHandHoldingDollar } from "react-icons/fa6";
import { useNode } from '../../../Context/TreeContext';

const Loan = ({ data }) => {
    const { handleShow } = useNode()
console.log(data);
    return (
        <div className='rounded-[3px] overflow-hidden bg-pink-100 min-w-20' onClick={() => handleShow(data)}>
            {data.isChild &&
                <Handle type='target' position={Position.Left} />
            }
            <div className='flex items-center gap-1 text-[8px] px-1 font-semibold bg-yellow-300'>
                <FaHandHoldingDollar />
                <span>Loan</span>
            </div>
            <div className='text-[8px] p-1'>
                <p>${data.amount}</p>
            </div>
            <Handle type='source' position={Position.Right} />
        </div>
    );
}

export default Loan;
