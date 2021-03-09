import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { authState } from 'rxfire/auth';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import FirebaseContext from '../../context/firebase';
import * as ROUTES from '../../constants/routes';
import { doesUserExists } from '../../services/firebase';
import Spinner from '../../components/Spinner';

const Login: React.FC = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const isInvalid = password === '' || email === '';

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const subscription = doesUserExists(username).subscribe(
      async (doesUser) => {
        try {
          setError('');
          if (!doesUser) {
            const auth = firebase?.auth();
            const firestore = firebase?.firestore();
            // auth flow
            const creationResult = await auth?.createUserWithEmailAndPassword(
              email,
              password
            );
            console.log(creationResult);
            await creationResult?.user?.updateProfile({
              displayName: username,
            });
            // firestore flow
            await firestore?.collection('users').add({
              userId: creationResult?.user?.uid,
              username: username.toLowerCase(),
              fullName,
              email: email.toLowerCase(),
              following: [],
              dateCreated: Date.now(),
            });

            history.push(ROUTES.DASHBOARD);
          } else {
            throw new Error('That username already exists');
          }
          setLoading(false);
          subscription.unsubscribe();
        } catch (error) {
          setFullName('');
          setEmail('');
          setUsername('');
          setPassword('');
          setLoading(false);
          setError(error.message);
        }
      }
    );
  };

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
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
              onSubmit={handleSignUp}
              style={{ height: 250, width: 280 }}
              method='POST'>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <input
                    aria-label='Enter your username'
                    type='text'
                    placeholder='Username'
                    value={username}
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target }) => setUsername(target.value)}
                  />
                  <input
                    aria-label='Enter your full name'
                    type='text'
                    placeholder='Full name'
                    value={fullName}
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target }) => setFullName(target.value)}
                  />
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
                    className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                      isInvalid && 'opacity-50'
                    }`}>
                    Sign up
                  </button>
                </>
              )}
            </form>
          </div>
        </motion.div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary'>
          <motion.div exit={{ opacity: 0 }}>
            <p className='text-sm'>
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
