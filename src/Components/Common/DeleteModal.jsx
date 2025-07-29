import { FiAlertTriangle } from "react-icons/fi";
import Button from "./Button";

const DeleteModal = ({ show, onClose, onConfirm, title = "Delete Node" }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/20" onClick={onClose} />

            <div className="bg-white rounded-lg p-6 shadow-xl z-10 max-w-sm mx-4">
                <div className="flex items-center mb-4">
                    <FiAlertTriangle className="h-6 w-6 text-[var(--primary)] mr-3" />
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>

                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this node?
                    <br />
                    <span className="text-[var(--primary)] text-xs font-medium">
                        All child nodes will be permanently deleted.
                    </span>
                </p>

                <div className="flex space-x-3">
                    <Button
                        handleClick={onConfirm}
                        title={"Delete"}
                    />
                    <Button
                        handleClick={onClose}
                        title={"Cancel"}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;