import { MdAccountBalanceWallet } from "react-icons/md";
import { useNode } from '../Context/TreeContext';
import Button from './Common/Button';
import { FaHandHoldingDollar } from "react-icons/fa6";
import { BiExport } from "react-icons/bi";

const AddNode = () => {
    const { handleAddAccount, onAddLoan, handleExport } = useNode()

    return (
        <div className='flex ps-5 items-center gap-2 mt-2 pe-2.5'>
            <h2 className='text-md font-semibold me-4'>Add Nodes</h2>
            <Button
                title="Account"
                icon={<MdAccountBalanceWallet />}
                handleClick={handleAddAccount}

            />
            <Button
                title="Loan"
                icon={<FaHandHoldingDollar />}
                handleClick={() => onAddLoan(false)}
            />

            <h2 className='text-md font-semibold ms-3 me-2'>Export Data</h2>
            <Button
                title="Export JSON"
                icon={<BiExport />}
                handleClick={handleExport}
            />
        </div>
    );
}

export default AddNode;
