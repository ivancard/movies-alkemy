import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Login = () => {
    const navigate = useNavigate();

    const handlerSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        const regexEmail =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email || !password) {
            swAlert(<h2>Email or password is empty</h2>);
            return;
        }
        if (!regexEmail.test(email)) {
            swAlert(<h2>Email is not valid</h2>);
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            swAlert(<h2>Credentials not valid</h2>);
            return;
        }

        axios
            .post('http://challenge-react.alkemy.org', {
                email,
                password,
            })
            .then((res) => {
                console.log(res);
                swAlert(<h2>Welcome</h2>);
                const tokenReceived = res.data.token;
                sessionStorage.setItem('token', tokenReceived);
                navigate('/list', { replace: true });
            });
    };
    let token = sessionStorage.getItem('token');

    return (
        <>
            {token ? (
                <Navigate to='/list' replace />
            ) : (
                <div className='flex flex-col items-center  h-full pt-24 bg-gray-800'>
                    <h2 className='text-2xl font-bold text-indigo-100 mb-5'>
                        Login form
                    </h2>
                    <form
                        onSubmit={handlerSubmit}
                        className='container w-72 flex flex-col items-center'>
                        <label>
                            <span className='text-white'>Username</span>
                            <br />
                            <input
                                type='text'
                                name='email'
                                autoComplete='off'
                                className='rounded-md form-input w-full'
                            />
                        </label>
                        <br />
                        <label>
                            <span className='text-white'>Password</span>
                            <br />
                            <input
                                type='password'
                                name='password'
                                className='rounded-md form-input w-full'
                            />
                        </label>
                        <br />
                        <button
                            type='submit'
                            className='bg-indigo-900 text-white rounded-full px-4 py-1 w-24 hover:bg-indigo-700'>
                            Enter
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};
