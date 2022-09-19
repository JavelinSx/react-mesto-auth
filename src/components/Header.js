import logo from '../image/logo.svg';

function Header(){
    return (

        <header className="header">

            <button  className="logo">
                <img src={logo} alt="Лого" className="logo__img"></img>
            </button>

        </header>
        
    )
}

export default Header;