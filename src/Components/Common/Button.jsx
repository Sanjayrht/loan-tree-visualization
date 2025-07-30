const Button = ({ title, icon, handleClick, type = "button" }) => {
    return (
        <button
            type={type}
            className='flex items-center gap-2 main-grad text-xs text-white px-4 py-2 rounded-xl font-semibold cursor-pointer'
            onClick={handleClick}
        >
            {icon} {title}
        </button>
    );
}

export default Button;
