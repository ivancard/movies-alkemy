import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const Listado = () => {
    const [movie, setMovie] = useState([]); // movies saved

    let token = localStorage.getItem('token');
    const location = useLocation();

    // Call to the api to get the movies and save them in the state
    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=947fa4d43bdff4b57af3e6e587d7ede8&language=en-US&page=1`;
        axios.get(endPoint).then((res) => {
            setMovie(res.data.results);
        });
    }, []);

    return (
        <>
            {/* If there isnt token, this will redirect to te login page  */}
            {!token ? (
                <Navigate to='/' replace state={{ from: location }} />
            ) : (
                <div className='columns-4 p-10 bg-gray-700'>
                    {movie.map(
                        ({
                            id,
                            title,
                            overview,
                            vote_average,
                            poster_path,
                        }) => (
                            <div
                                key={id}
                                className='bg-slate-200 text-center h-auto mt-10 overflow-hidden rounded-md'>
                                <img
                                    className='w-100'
                                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                                />
                                <h2 className='text-xl font-bold'>{title}</h2>
                                <p className='px-2'>
                                    {overview.substring(0, 120)}...
                                </p>
                                <small>{vote_average}</small>
                            </div>
                        )
                    )}
                </div>
            )}
        </>
    );
};
