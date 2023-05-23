import logo from '../img/amw.png'
import avtar from '../img/avtar.png'
const Header = () => {
    return (
        <div className='h-14 w-auto shadow bg-purple-950'>
            <div className='flex justify-between'>
                <div className='mr-auto'><img src={logo} alt='logo-amw' className='h-10 w-auto' /></div>
                <div>
                    <span className='text-white font-bold text-base'>Inventory Management System</span>
                </div>
                <div className='ml-auto'>
                    <img src={avtar} alt='avtar' className='h-10 w-auto' />
                </div>
            </div>

        </div>
    )
}

export default Header