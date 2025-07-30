import { useNode } from '../../Context/TreeContext';
import Button from '../Common/Button';
import InputField from '../Common/InputField';

const DetailsForm = () => {
    const { dispatch, nodeActive, handleChange } = useNode()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({ type: "UPDATE_NODE", payload: nodeActive.data })
    }

    return (
        <form onSubmit={handleSubmit} className='py-2'>
            {nodeActive.data?.type === "account" &&
                <>
                    <InputField
                        name="name"
                        handleChange={handleChange}
                        value={nodeActive.data?.name}
                        label="name"
                        placeholder="Enter Name"
                        required={true}
                    />

                    <InputField
                        name="address"
                        handleChange={handleChange}
                        value={nodeActive.data?.address}
                        label="address"
                        placeholder="Enter Address"
                        required={true}
                    />
                </>}
            {nodeActive.data?.type === "loan" &&
                <InputField
                    name="amount"
                    handleChange={handleChange}
                    value={nodeActive.data?.amount}
                    label="amount"
                    placeholder="Enter Amount"
                    required={true}
                />
            }
            {nodeActive.data?.type === "collateral" &&
                <InputField
                    name="item"
                    handleChange={handleChange}
                    value={nodeActive.data?.item}
                    label="Item Name"
                    placeholder="Enter Item"
                    required={true}
                />

            }
            <div className='flex justify-end mt-2'>
                <Button
                    type='submit'
                    handleClick={null}
                    title={"Submit"}
                />
            </div>
        </form>
    );
}

export default DetailsForm;
