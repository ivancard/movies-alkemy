import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';

export const Resultados = () => {
    const [params, setParams] = useSearchParams();
    const keyword = params.get('keyword') || '';

    const [moviesResults, setMoviesResults] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=947fa4d43bdff4b57af3e6e587d7ede8&language=en-US&query=${keyword}&page=1&include_adult=false`;
        axios
            .get(endPoint)
            .then((res) => {
                const moviesSearched = res.data.results;
                if (moviesSearched.length === 0) {
                    swAlert(<h2>No se encontraron resultados</h2>);
                }
                setMoviesResults(moviesSearched);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [keyword]);

    return (
        <>
            <div className='bg-gray-700 text-white px-10 pt-5 h-full'>
                <h2 className='text-3xl'>
                    <b>Resultados</b>
                </h2>
                <p>
                    Buscaste: <em>{keyword}</em>
                </p>
                {moviesResults.length === 0 && (
                    <h3 className='text-2xl pt-10 pl-10'>No hay resultados</h3>
                )}
            </div>
            <div className='columns-5 p-10 bg-gray-700 '>
                {moviesResults.map(
                    ({ id, title, overview, vote_average, poster_path }) => (
                        <div
                            key={id}
                            className='bg-slate-200 text-center h-auto mb-10 overflow-hidden rounded-md'>
                            <img
                                className='w-100'
                                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                            />
                            <h2 className='text-xl font-bold'>{title}</h2>
                            <p className='px-2'>
                                {overview.substring(0, 120)}...
                            </p>
                            <small>
                                <b>{vote_average}</b>
                            </small>
                            <Link
                                to={`/detail?movieId=${id}`}
                                className='block outline outline-gray-700 font-bold rounded-full m-5 mx-10 py-0 hover:outline-indigo-900 hover:bg-indigo-900 hover:text-indigo-300'>
                                View detail
                            </Link>
                        </div>
                    )
                )}
            </div>
        </>
    );
};
