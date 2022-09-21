export const BASE_URL = 'https://api.nomoreparties.co';

const getResponse = (res) => {
    if(res.ok){
        return res.json()
    }
    return Promise.reject(`${res.status}`)
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/sign-in`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((res) => {
        return getResponse(res);
    })
    .catch((err) => {
        console.log(err)
    })
}
export const login = (email, password) => {
    return fetch(`${BASE_URL}/sign-up`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((res) => {
        return getResponse(res);
    })
    .catch((err) => {
        console.log(err)
    })
}
export const validityToken = (token) =>{
    return fetch(`${BASE_URL}/user/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({token})
    })
    .then((res) => {
        return getResponse(res);
    })
    .catch((err) => {
        console.log(err)
    })
}