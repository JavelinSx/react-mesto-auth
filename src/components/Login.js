import React from 'react'
 
const Login = props => {
  return (
    <div className='login'>
        <form className='login__form'>
            <h3 className='login__title'>Вход</h3>
            <ul className='login__input-container'>
                <li className='login__input-item'>
                    <input  
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
            <button className="login__button" type="submit">Войти</button>
        </form>
    </div>
  )
}
 
export default Login