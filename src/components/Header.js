import { NavLink } from 'react-router-dom';
import { Buscador } from './Buscador';

export const Header = (props) => {
    const handleLogOut = () => {
        sessionStorage.removeItem('token');
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
                            to='/favourites'
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-indigo-100 bg-gray-700 block  py-5'
                                    : 'text-indigo-500 block  py-5'
                            }>
                            Favoritos{' '}
                            <span className='bg-gray-300 px-1 text-gray-700 rounded-md ml-1'>
                                {props.favourites.length}
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <Buscador />
                    </li>
                    <li className='w-32 text-center py-5 block absolute right-0 hover:text-indigo-300'>
                        <button onClick={handleLogOut}>Log out</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
