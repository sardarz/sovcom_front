import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider';
import "../index.css"

const Layout = () => {
  const auth = useAuth();
  
  return (
    <>
      <nav>
        <ul className='flex'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="empty">Empty</Link>
          </li>
          {!auth.user ? (
            <li>
              <Link to="login">Login</Link>
            </li>
          ) : null}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout