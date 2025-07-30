import userImg from "../assets/Images/user.jpg"
import { ImTree } from "react-icons/im";

const Header = () => {
    return (
        <div className='w-full px-4 py-1 sm:px-8 sm:py-2 main-grad flex flex-col sm:flex-row  sm:justify-between sm:items-center gap-3 sm:gap-0 rounded-2xl rounded-t-none text-white'>

            <h1 className='flex items-center gap-2 font-bold text-xl sm:text-2xl'>
                <ImTree className='text-lg sm:text-2xl' />
                Tree Virtualizer
            </h1>
            <div className='flex items-center gap-2'>
                <div className='main-grad p-1.5 sm:p-2 rounded-full w-10 h-10 sm:w-12 sm:h-12'>
                    <img
                        src={userImg}
                        alt='User'
                        className='rounded-full w-full h-full object-cover'
                    />
                </div>
                <div className='text-sm sm:text-base'>
                    <h2 className='font-semibold'>Sanjay</h2>
                    <p className='text-xs sm:text-sm'>sanjay@xyz.com</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
