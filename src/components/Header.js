import logo from '../image/logo.svg';
import {Link} from 'react-router-dom'
function Header({link, text, email}){
    return (

        <header className="header">

            <button  className="logo">
                <img src={logo} alt="Лого" className="logo__img"></img>
            </button>
            <span className='header-email'>{email}</span>
            <Link to={link}>{text}</Link>

        </header>
        
    )
}

export default Header;