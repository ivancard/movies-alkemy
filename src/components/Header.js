import { NavLink } from 'react-router-dom';

export const Header = () => {
    const handleLogOut = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };
    return (
        <header>
            <nav>
                <ul className='flex font-bold text-white bg-indigo-900 justify-start  relative'>
                    <li className='pl-5 mr-20 py-5 font-mono'>AstroFilms</li>
                    <li className='w-32  text-center'>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                // console.log(`Home:${isActive}`)
                                isActive
                                    ? 'text-indigo-100 bg-gray-700 block  py-5 '
                                    : 'text-indigo-500 block  py-5'
                            }>
                            Home
                        </NavLink>
                    </li>
                    <li className='w-32  text-center'>
                        <NavLink
                            to='/list'
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-indigo-100 bg-gray-700 block  py-5'
                                    : 'text-indigo-500 block  py-5'
                            }>
                            List
                        </NavLink>
                    </li>
                    <li className='w-32  text-center'>
                        <NavLink
                            to='/contact'
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-indigo-100 bg-gray-700 block  py-5'
                                    : 'text-indigo-500 block  py-5'
                            }>
                            Contact
                        </NavLink>
                    </li>
                    <li className='w-32 text-center py-5 block absolute right-0 hover:text-indigo-300'>
                        <button onClick={handleLogOut}>Log out</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};