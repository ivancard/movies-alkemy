import { Link, Navigate, useLocation } from 'react-router-dom';
export const Favoritos = (props) => {
    // const [favourites, setfavourites] = useState([]);

    let token = sessionStorage.getItem('token');

    const location = useLocation();

    // useEffect(() => {
    //     const favInLocal = localStorage.getItem('favs');
    //     if (favInLocal !== null) {
    //         setfavourites(JSON.parse(favInLocal));
    //     } else {
    //         setfavourites([]);
    //     }
    // }, []);

    return (
        <>
            {!token ? (
                <Navigate to='/' replace state={{ from: location }} />
            ) : (
                <>
                    <div className='bg-gray-700 text-white px-10 pt-5 h-full'>
                        <h2 className='text-3xl'>Favoritos</h2>
                    </div>
                    <div className='columns-4 p-10 bg-gray-700 '>
                        {props.favourites.map((movie) => (
                            <div
                                key={movie.id}
                                className='movie-container bg-slate-200 text-center h-auto mb-10 overflow-hidden rounded-md'>
                                <svg
                                    onClick={props.toogleFavourite}
                                    data-movie-id={movie.id}
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='currentColor'
                                    className='favourite bi bi-heart-fill'
                                    viewBox='0 0 16 16'>
                                    <path
                                        fillRule='evenodd'
                                        d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
                                    />
                                </svg>
                                <img
                                    className='w-100'
                                    src={`https://image.tmdb.org/t/p/w500/${movie.imgUrl}`}
                                />
                                <h2 className='text-xl font-bold'>
                                    {movie.title}
                                </h2>
                                <p className='px-2'>
                                    {movie.overview.substring(0, 120)}...
                                </p>
                                <Link
                                    to={`/detail?movieId=${movie.id}`}
                                    className='block outline outline-gray-700 font-bold rounded-full m-5 mx-10 py-0 hover:outline-indigo-900 hover:bg-indigo-900 hover:text-indigo-300'>
                                    View detail
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};
