import { useNavigate } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';
export const Buscador = () => {
    const navigate = useNavigate();
    const handlerSubmit = (e) => {
        e.preventDefault();
        const keyword = e.currentTarget.searched.value.trim();

        if (keyword.length === 0) {
            swAlert(<h2>Debes ingresar una pelicula para buscar</h2>);
            return;
        } else if (keyword.length < 4) {
            swAlert(
                <h2>
                    La pelicula ingresada debe contener almenos 4 caracteres
                </h2>
            );
            return;
        } else {
            e.currentTarget.searched.value = '';
            navigate(`/results?keyword=${keyword}`);
        }
        console.log(keyword);
    };
    return (
        <form className='py-4 ml-10 flex items-center' onSubmit={handlerSubmit}>
            <input
                className='w-40 p-1 rounded-l-md text-gray-800'
                name='searched'
                placeholder='Ingrese pelicula'
            />
            <button className='text-xs px-2 bg-indigo-400 py-2 rounded-r-md'>
                BUSCAR
            </button>
        </form>
    );
};
