export const BASE_URL = 'https://auth.nomoreparties.co';

const headers = {            
    'Accept': 'application/json',
    'Content-Type': 'application/json' 
}

const _parseResponse = (res) => {
    if(res.ok){
        return res.json()
    }
    return Promise.reject(`${res.status}`)
}

const _request = ({url, options}) => {
    return fetch(url, options).then(_parseResponse)
}

export const register = (email, password) => {
    _request({
        url: `${BASE_URL}/signup`,
        options: {
            method: 'GET',
            headers: headers,
            body: JSON.stringify({password, email})
        }
    })
}

export const login = (email, password) => {
    _request({
        url: `${BASE_URL}/signin`,
        options: {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({password, email})
        }
    })
}

export const getUserContent = (token) => {
    _request({
        url: `${BASE_URL}/users/me`,
        options: {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                ...headers},
        }
    })
}