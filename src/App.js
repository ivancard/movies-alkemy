import { useEffect, useState } from 'react';

import { Listado } from './components/Listado';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Detail } from './components/Detail';
import { Resultados } from './components/Resultados';
import { Favoritos } from './components/Favoritos';

function App() {
    const [favourites, setFavourites] = useState([]);
    useEffect(() => {
        const favInLocal = localStorage.getItem('favs');
        if (favInLocal !== null) {
            setFavourites(JSON.parse(favInLocal));
        } else {
            setFavourites([]);
        }
    }, []);

    const favMovies = localStorage.getItem('favs');

    let tempMoviesInFavs;

    if (favMovies === null) {
        tempMoviesInFavs = [];
    } else {
        tempMoviesInFavs = JSON.parse(favMovies);
    }

    const toogleFavourite = (e) => {
        const btn = e.currentTarget;
        const parent = btn.parentElement;
        const imgUrl = parent.querySelector('img').getAttribute('src');
        const title = parent.querySelector('h2').innerText;
        const overview = parent.querySelector('p').innerText;
        const id = btn.dataset.movieId;

        const movieData = {
            id,
            imgUrl,
            title,
            overview,
        };

        btn.classList.contains('favouriteTrue')
            ? btn.classList.remove('favouriteTrue')
            : btn.classList.add('favouriteTrue');

        let movieIsInArray = tempMoviesInFavs.find(
            (movie) => movie.id === movieData.id
        );
        if (!movieIsInArray) {
            tempMoviesInFavs.push(movieData);
            localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
            setFavourites(tempMoviesInFavs);
        } else {
            let moviesLeft = tempMoviesInFavs.filter(
                (oneMovie) => oneMovie.id !== movieData.id
            );
            localStorage.setItem('favs', JSON.stringify(moviesLeft));
            setFavourites(moviesLeft);
        }
    };
    return (
        <div className='flex flex-col justify-between h-screen'>
            <Header />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route
                    path='/list'
                    element={<Listado toogleFavourite={toogleFavourite} />}
                />
                <Route path='/detail' element={<Detail />} />
                <Route
                    path='/results'
                    element={<Resultados toogleFavourite={toogleFavourite} />}
                />
                <Route
                    path='/favourites'
                    element={
                        <Favoritos
                            toogleFavourite={toogleFavourite}
                            favourites={favourites}
                        />
                    }
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
