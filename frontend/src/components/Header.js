import React from 'react'; 
import { useLocation, Link } from 'react-router-dom';

function Header({loggedIn, userData, signOut, burger, handleBurger}) {
  const location = useLocation();
  return (
    <> { loggedIn ?
      <div className={burger ? 'header__active' : 'header__null'}>
        <div className='header__email'>{userData.email}</div>
        <Link className='header__buttom' to={'/signin'} onClick={signOut}>Выйти</Link>
      </div> : '' }
      <header className= {burger && loggedIn ? 'header header__column' : 'header'}>
        { loggedIn ? 
          <>
            { burger ?
              <> 
                <div className='header__info'>
                  <div className="header__logo" />
                  <button className='header__burger header__burger_close' type='button' onClick={handleBurger} />
                </div>
              </>:
              <>
                <div className="header__logo" />
                <div className='header__info'>
                  <div className='header__email header__email_hide'>{userData.email}</div>
                  <Link className='header__buttom header__buttom_hide' to={'/signin'} onClick={signOut}>Выйти</Link>
                  <button className='header__burger' type='button' onClick={handleBurger} />            
                </div>
              </>
            }
          </> : 
          location.pathname === '/signup' ? 
            <>
              <div className="header__logo" />
              <div className='header__info'>
                <Link className='header__buttom' to={'/signin'}>Войти</Link>
              </div>
            </> :  
            <>
              <div className="header__logo" />
              <div className='header__info'>
                <Link className='header__buttom' to={'/signup'}>Регистрация</Link>
              </div>
            </>
        } 
      </header>
    </>
    
  );
}

export default Header;
