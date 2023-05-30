import { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../img/amw.png'
import avtar from '../img/avtar.png'
const Header = () => {

    const [isLogin, setIsLogin] = useState(useState(localStorage.getItem('isLogin')))
    const [menu, setMenu] = useState(false);
    const toogleMenu = () => {
        setMenu(menu ? false : true);
    }

    const signOut = () => {
        console.log('signOut');
    }
    
    return (
        <div className='h-14 w-auto shadow bg-purple-950'>
            <div className='flex justify-between'>
                <div className='mr-auto'><Link to="/"> <img src={logo} alt='logo-amw' className='h-10 w-auto' /></Link></div>
                <div>
                    <span className='text-white font-bold text-base'>Inventory Management System</span>
                </div>
                <div className='ml-auto'>
                    <img src={avtar} alt='avtar' className='h-10 w-auto' onClick={toogleMenu} />
                    <div className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${(!menu) ? 'hidden' : ''}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className="py-1" role="none">
                            <Link to="profile" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</Link>

                            <button type="submit" onClick={signOut} className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header