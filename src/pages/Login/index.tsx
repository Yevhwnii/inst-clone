import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { authState } from 'rxfire/auth';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import FirebaseContext from '../../context/firebase';
import * as ROUTES from '../../constants/routes';
import Spinner from '../../components/Spinner';

const Login: React.FC = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const isInvalid = password === '' || email === '';

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    try {
      const auth = firebase?.auth();
      await auth!.signInWithEmailAndPassword(email, password);
      const subscription = authState(auth!).subscribe((_) => {
        setLoading(false);
        subscription.unsubscribe();
      });

      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmail('');
      setPassword('');
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  return (
    <div className='container  flex mx-auto max-w-screen-md items-center h-screen '>
      <div className='flex w-3/5'>
        <img
          src='/images/iphone-with-profile.jpg'
          alt='iPhone with Instagram'
        />
      </div>
      <div className='flex flex-col w-2/5'>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}>
          <div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
            <h1 className='flex justify-center w-full'>
              <img
                src='/images/logo.png'
                alt='Instagram'
                className='mt-2 w-6/12 mb-4'
              />
            </h1>
            {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}
            <form
              style={{ height: 135, maxWidth: 280 }}
              onSubmit={handleLogin}
              method='POST'>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <input
                    aria-label='Enter your email address'
                    type='text'
                    placeholder='Email address'
                    value={email}
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target }) => setEmail(target.value)}
                  />
                  <input
                    aria-label='Enter your password'
                    type='password'
                    value={password}
                    placeholder='Password'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  <button
                    disabled={isInvalid}
                    type='submit'
                    className={`bg-blue-medium text-white w-full rounded h-8 font-bold outline-none focus:outline-none ${
                      isInvalid && 'opacity-50'
                    }`}>
                    Log In
                  </button>
                </>
              )}
            </form>
          </div>
        </motion.div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary'>
          <motion.div exit={{ opacity: 0 }}>
            <p className='text-sm'>
              Don`t have an account?{' '}
              <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium'>
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
