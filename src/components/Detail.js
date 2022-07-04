import { useState, useEffect } from 'react';
import { useLocation, useSearchParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';

export const Detail = () => {
    const [movie, setmovie] = useState({});
    const [genres, setGenres] = useState([]);

    let token = sessionStorage.getItem('token');
    const location = useLocation();

    const [params, setParams] = useSearchParams();

    const movieId = params.get('movieId') || '';

    // Call to the api to get the movies and save them in the state
    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=947fa4d43bdff4b57af3e6e587d7ede8&language=en-US`;
        axios
            .get(endPoint)
            .then((res) => {
                setmovie(res.data);
                setGenres(res.data.genres);
            })
            .catch((err) => {
                swAlert(<h2>Hubo errores para acceder a la informacion</h2>);
            });
    }, []);

    return (
        <>
            {/* If there isnt token, this will redirect to te login page  */}

            {!token ? (
                <Navigate to='/' replace state={{ from: location }} />
            ) : (
                movie && (
                    <div className='bg-gray-700 h-full'>
                        <div className='flex items-center flex-col'>
                            <h2 className=' text-center font-bold text-indigo-100 my-10 mb-15 text-4xl'>
                                Details
                            </h2>
                            <div className='overflow-hidden  flex m-2 bg-slate-200 w-2/5 h-96 rounded-md'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                />
                                <div className=' flex flex-col p-5 w-full'>
                                    <h2 className='font-bold text-2xl'>
                                        {movie.title}
                                    </h2>
                                    <p>
                                        {genres.map(({ id, name }, index) => (
                                            <span
                                                key={id}
                                                className={
                                                    index === 0
                                                        ? 'font-bold text-sm mx-2 ml-0'
                                                        : 'font-normal text-xs mx-1'
                                                }>
                                                {name}
                                            </span>
                                        ))}
                                    </p>
                                    <p className='mt-5'>{movie.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
};
