import logo from "../image/logo.svg";

import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
function Header({ loggedIn, email, logOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <button className="logo">
        <img src={logo} alt="Лого" className="logo__img"></img>
      </button>

      {location.pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}

      {loggedIn && (
        <nav className="header__nav">
          <span className="header__email">{email}</span>
          <button className="header__link" onClick={() => logOut()}>
            Выйти
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
