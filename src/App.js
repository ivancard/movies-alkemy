import { Listado } from './components/Listado';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Contact } from './components/Contact';

function App() {
    return (
        <div className='flex flex-col justify-between h-screen'>
            <Header />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/list' element={<Listado />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
