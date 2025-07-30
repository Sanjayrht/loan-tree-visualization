import { useState } from 'react';
import { useNode } from '../../Context/TreeContext';
import { ImCross } from "react-icons/im";
import Button from '../Common/Button';
import { FaHandHoldingDollar, FaTrash } from 'react-icons/fa6';
import { MdOutlineRealEstateAgent } from 'react-icons/md';
import DetailsForm from './DetailsForm';
import DeleteModal from '../Common/DeleteModal';

const SidePanel = () => {
    const { nodeActive, handleClose, dispatch, onAddCollateral, onAddLoan } = useNode()
    const [show, setShow] = useState(false)

    const onDeleteNode = () => {
        dispatch({ type: "DELETE_NODE", payload: nodeActive.data?.id })
        setShow(false)
        handleClose()
    }

    return (
        <>
            {nodeActive.show && <div className='fixed h-screen w-full bg-black opacity-[0.1] top-0 left-0 z-10' onClick={handleClose} />}
            <div className={`fixed w-85 h-full top-0 right-0 bg-white z-50 transform transition-transform duration-500 ease-in-out ${nodeActive.show ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex justify-between items-center p-3 text-[var(--light)] main-grad">
                    <h3 className="font-bold text-lg capitalize">
                        {nodeActive.data.type}
                    </h3>
                    <button
                        className="border border-white px-2 py-1 text-xs cursor-pointer rounded hover:bg-white hover:text-[var(--primary)] transition-colors"
                        onClick={handleClose}
                    >
                        <ImCross />
                    </button>
                </div>

                <div className="overflow-y-auto h-full p-2">
                    <h1 className='font-semibold'>Node Details</h1>
                    <h2 className='mb-2 text-xs font-semibold'>ID : {nodeActive.data?.id}</h2>
                    <div>
                        <h1 className='font-semibold'></h1>
                        <Button
                            title="Delete Node"
                            handleClick={() => setShow(true)}
                            icon={<FaTrash />}
                        />
                    </div>
                    {nodeActive.data?.type !== "collateral" &&
                        <div className='mt-5'>
                            <h1 className='font-semibold'>Add Node</h1>
                            <div className='flex gap-2 my-2'>

                                {nodeActive.data?.type !== "loan" &&
                                    <Button
                                        title="Loan"
                                        handleClick={() => onAddLoan(true)}
                                        icon={<FaHandHoldingDollar />}

                                    />
                                }
                                <Button
                                    title="Collateral"
                                    handleClick={onAddCollateral}
                                    icon={<MdOutlineRealEstateAgent />}

                                />
                            </div>
                        </div>
                    }

                    <DetailsForm />
                </div>
            </div>

            <DeleteModal
                show={show}
                onClose={() => setShow(false)}
                onConfirm={onDeleteNode}
            />
        </>
    );
}

export default SidePanel;
