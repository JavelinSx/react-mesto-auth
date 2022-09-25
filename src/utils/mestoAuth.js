export const BASE_URL = 'https://auth.nomoreparties.co';

const getResponse = (res) => {
    if(res.ok){
        return res.json()
    }
    return Promise.reject(`${res.status}`)
}

export const register = (email, password) => {

    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({password, email})
    })
    .then(getResponse)

}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({password, email})
    })
    .then(getResponse)

}
export const getUserContent = (token) =>{
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(getResponse)

}