import { MdAccountBalanceWallet } from "react-icons/md";
import { useNode } from '../Context/TreeContext';
import Button from './Common/Button';
import { v4 as uuidv4 } from 'uuid';

const AddNode = () => {
    const { dispatch } = useNode()

    const handleAddAccount = () => {
        let uniqueId = uuidv4()
        const obj = {
            id: uniqueId,
            data: {
                id: uniqueId,
                name: "user",
                address: "xyz",
                type: "account"
            },
            type: "account",
            position: { x: 0, y: 0 }
        }
        dispatch({ type: "ADD_NODE", payload: obj })
    }

    return (
        <div className='flex justify-end items-center gap-2 mt-2 pe-2.5'>
            <h2 className='text-xl font-semibold me-4'>Add Nodes</h2>
            <Button
                title="Account"
                icon={<MdAccountBalanceWallet />}
                handleClick={handleAddAccount}

            />
        </div>
    );
}

export default AddNode;
