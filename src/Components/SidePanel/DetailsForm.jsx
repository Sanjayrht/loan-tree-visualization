import { useNode } from '../../Context/TreeContext';
import Button from '../Common/Button';
import InputField from '../Common/InputField';

const DetailsForm = ({ state, setState }) => {
    const { dispatch } = useNode()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({ type: "UPDATE_NODE", payload: state })
    }

    const handleChange = (e) => {
        let { name, value } = e.target
        if (name === "amount") {
            if (!isNaN(value)) {
                setState({
                    ...state,
                    [name]: value
                })
            }
        } else {
            setState({
                ...state,
                [name]: value
            })
        }

    }
    return (
        <form onSubmit={handleSubmit} className='py-2'>
            {state.type === "account" &&
                <>
                    <InputField
                        name="name"
                        handleChange={handleChange}
                        value={state?.name}
                        label="name"
                        placeholder="Enter Name"
                        required={true}
                    />

                    <InputField
                        name="address"
                        handleChange={handleChange}
                        value={state?.address}
                        label="address"
                        placeholder="Enter Address"
                        required={true}
                    />
                </>}
            {state.type === "loan" &&
                <InputField
                    name="amount"
                    handleChange={handleChange}
                    value={state?.amount}
                    label="amount"
                    placeholder="Enter Amount"
                    required={true}
                />
            }
            {state.type === "collateral" &&
                <InputField
                    name="item"
                    handleChange={handleChange}
                    value={state?.item}
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
