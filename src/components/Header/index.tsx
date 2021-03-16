import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth';
import * as ROUTES from '../../constants/routes';
import FirebaseContext from '../../context/firebase';
import HomeIcon from './homeIcon';
import LogoutIcon from './logoutIcon';

const Header: React.FC = () => {
  const { firebase } = useContext(FirebaseContext);
  const { authUser } = useContext(AuthContext);

  return (
    <header className='h-16 bg-white border-b border-gray-primary mb-8'>
      <div className='container mx-auto max-w-screen-lg h-full'>
        <div className='flex justify-between h-full'>
          {/* Left side */}
          <div className='text-gray-700 text-center flex items-center align-items cursor-pointer'>
            <h1 className='flex justify-center w-full'>
              <Link to={ROUTES.DASHBOARD} aria-label='Instagram logo'>
                <img
                  src='/images/logo.png'
                  alt='Instagram'
                  className='mt-2 w-6/12'
                />
              </Link>
            </h1>
          </div>
          {/* Right side */}
          <div className='text-gray-700 text-center flex items-center align-items '>
            {authUser ? (
              <>
                <Link
                  to={ROUTES.DASHBOARD}
                  className='outline-none'
                  aria-label='Dashboard'>
                  <HomeIcon />
                </Link>
                <button
                  type='button'
                  title='Sign out'
                  onClick={() => firebase?.auth().signOut()}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      firebase?.auth().signOut();
                    }
                  }}>
                  <LogoutIcon />
                </button>
                <div className='fkex items-center cursor-pointer'>
                  <Link to={`/p/${authUser.displayName}`}>
                    <img
                      className='rounded-full h-8 w-8 flex'
                      alt={`${authUser.displayName} profile avatar`}
                      src={`/images/avatars/${authUser.displayName}.jpg`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type='button'
                    className='bg-blue-medium text-white font-bold text-sm rounded w-20 h-8 outline-none focus:outline-none'>
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type='button'
                    className=' text-blue-medium font-bold text-sm rounded w-20 h-8 outline-none focus:outline-none'>
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
