import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation()


  const logOut = () => {
    navigate('/login');
    localStorage.removeItem('user');
  };



  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              {location.pathname === '/' && <Link to={'/dashboard'}>dashboard</Link>}
              {location.pathname !== '/' && <span>{user.email}</span>}

              <button onClick={logOut}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )

};

export default Header;


