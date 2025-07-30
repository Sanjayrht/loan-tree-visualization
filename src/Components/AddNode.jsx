import { MdAccountBalanceWallet } from "react-icons/md";
import { useNode } from '../Context/TreeContext';
import Button from './Common/Button';
import { FaHandHoldingDollar } from "react-icons/fa6";
import { BiExport } from "react-icons/bi";

const AddNode = () => {
    const { handleAddAccount, onAddLoan, handleExport } = useNode();

    return (
        <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-2 px-4 sm:px-6'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3'>
                <h2 className='text-base sm:text-md font-semibold'>Add Nodes</h2>
                <div className='flex flex-wrap gap-2'>
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
                </div>
            </div>

            <div className='flex  sm:flex-row sm:items-center gap-2 sm:gap-3'>
                <h2 className='text-base sm:text-md font-semibold'>Export Data</h2>
                <Button
                    title="Export JSON"
                    icon={<BiExport />}
                    handleClick={handleExport}
                />
            </div>
        </div>
    );
};

export default AddNode;
