
export default class Api{
    constructor(url, authorization){
        this._baseUrl = url;
        this._authorization = authorization;
    }

    _parseResponse(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards(){
        return fetch(`${this._baseUrl}/cards`, {
            headers: {authorization: this._authorization}
        })
        .then(res => this._parseResponse(res))
    }

    addCard(name, link){
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: {authorization: this._authorization,
                    'Content-Type': 'application/json'},
            body: JSON.stringify({
                name:name,
                link:link
            })
        })
        .then(res => this._parseResponse(res))
    }

    deleteCard(cardId){
        console.log(cardId)
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {authorization: this._authorization,
                    'Content-Type': 'application/json'}
        })
        .then(res => this._parseResponse(res))
    }

    changeLikeCardStatus(cardId, isLiked){
       return isLiked ? this._setLikeCard(cardId) : this._removeLikeCard(cardId)
    }
    
    _setLikeCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
            method: 'PUT',
            headers: {authorization: this._authorization,
                    'Content-Type': 'application/json'},
        })
        .then(res => this._parseResponse(res))
    }

    _removeLikeCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
            method: "DELETE",
            headers: {authorization: this._authorization,
                    'Content-Type': 'application/json'},
        })
        .then(res => this._parseResponse(res))
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'GET',
            headers: {authorization: this._authorization},
        })
        .then(res => this._parseResponse(res))
    }

    editUserInfo({name, about}){
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => this._parseResponse(res))
    }

    editAvatar(avatar){
        return fetch(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(res => this._parseResponse(res))
    }
    
}
