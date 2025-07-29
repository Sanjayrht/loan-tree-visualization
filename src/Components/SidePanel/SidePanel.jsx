import { useEffect, useState } from 'react';
import { useNode } from '../../Context/TreeContext';
import { ImCross } from "react-icons/im";
import InputField from '../Common/InputField';
import Button from '../Common/Button';
import { FaHandHoldingDollar, FaTrash } from 'react-icons/fa6';
import { MdOutlineRealEstateAgent } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import DetailsForm from './DetailsForm';
import DeleteModal from '../Common/DeleteModal';

const SidePanel = () => {
    const { nodeActive, handleClose, dispatch } = useNode()
    const [state, setState] = useState({})
    const [show, setShow] = useState(false)

    const onAddLoan = () => {
        let uniqueId = uuidv4()
        const obj = {
            id: uniqueId,
            data: {
                id: uniqueId,
                user: state.name,
                amount: "1000",
                type: "loan"
            },
            type: "loan",
            position: { x: 0, y: 0 }
        }

        const edgeData = {
            id: `${state.id}-${uniqueId}`, source: state.id, target: uniqueId, type: 'smoothstep', animated: true
        }

        dispatch({ type: "ADD_NODE", payload: obj })
        dispatch({ type: "ADD_EDGE", payload: edgeData })
    }

    const onAddCollateral = () => {
        let uniqueId = uuidv4()
        const obj = {
            id: uniqueId,
            data: {
                id: uniqueId,
                user: state.name,
                item: "car",
                type: "collateral"
            },
            type: "collateral",
            position: { x: 0, y: 0 }
        }

        const edgeData = {
            id: `${state.id}-${uniqueId}`, source: state.id, target: uniqueId, type: 'smoothstep', animated: true
        }

        dispatch({ type: "ADD_NODE", payload: obj })
        dispatch({ type: "ADD_EDGE", payload: edgeData })
    }

    const onDeleteNode = () => {
        dispatch({ type: "DELETE_NODE", payload: state.id })
        setShow(false)
        handleClose()
    }


    useEffect(() => {
        if (nodeActive.show) {
            setState(nodeActive.data)
        }
        return () => {
            setState({})
        }
    }, [nodeActive.show])


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
                    <h2 className='mb-2 text-xs font-semibold'>ID : {state.id}</h2>
                    <div>
                        <h1 className='font-semibold'></h1>
                        <Button
                            title="Delete Node"
                            handleClick={() => setShow(true)}
                            icon={<FaTrash />}
                        />
                    </div>
                    {state.type !== "collateral" &&
                        <div className='mt-5'>
                            <h1 className='font-semibold'>Add Node</h1>
                            <div className='flex gap-2 my-2'>

                                {state.type !== "loan" &&
                                    <Button
                                        title="Loan"
                                        handleClick={onAddLoan}
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

                    <DetailsForm
                        state={state}
                        setState={setState}
                    />
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
