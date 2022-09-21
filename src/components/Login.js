import {useState} from 'react'
import { Link } from "react-router-dom";
const Login = (onLogin) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(email !== '' && password !== ''){
            onLogin(email, password)
        }
    }
  return (
    <div className='login'>
        <form className='login__form'>
            <h3 className='login__title'>Вход</h3>
            <ul className='login__input-container'>
                <li className='login__input-item'>
                    <input  
                        value={email}
                        onChange={handleChangeEmail}
                        type="email" 
                        className="login__input" 
                        name="login" 
                        placeholder="Email" 
                        minLength="6" 
                        maxLength="16" 
                        required>
                    </input>
                </li>
                <li className='login__input-item'>
                    <input  
                        value={password}
                        onChange={handleChangePassword}
                        type="password" 
                        className="login__input" 
                        name="password" 
                        placeholder="Пароль" 
                        minLength="8" 
                        maxLength="16" 
                        required>
                    </input>
                </li>
            </ul>
            <button onClick={handleSubmit} className="login__button" type="submit">Войти</button>
            <span className="login__link-sign-in">
                Нет аккаунта?
            <Link to="/sign-up" className="login__link">
                Создать аккаунт
            </Link>
        </span>
        </form>
    </div>
  )
}
 
export default Login