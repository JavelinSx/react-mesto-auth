

export default class Api{
    constructor(baseUrl, headers){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _request({url, options}){
        return fetch({url, options}).then(this._parseResponse)
    }

    _parseResponse(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards(){
        this._request({
            url: `${this._baseUrl}/cards`,
            options: {
                method: 'GET',
                headers: this._headers,
            }        
        })
    }
    
    addCard(name, link){
        this._request({
            url: `${this._baseUrl}/cards`,
            options: {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            }
        })
    }

    deleteCard(cardId){
        this._request({
            url: `${this._baseUrl}/cards/${cardId}`,
            options: {
                method: 'DELETE',
                headers: this._headers
            }
        })
    }

    changeLikeCardStatus(cardId, isLiked){
       return isLiked ? this._setLikeCard(cardId) : this._removeLikeCard(cardId)
    }
    
    _setLikeCard(cardId){
        this._request({
            url: `${this._baseUrl}/cards/${cardId}/likes`,
            options: {
                method: 'PUT',
                headers: this._headers
            }
        })
    }

    _removeLikeCard(cardId){
        this._request({
            url: `${this._baseUrl}/cards/${cardId}/likes`,
            options: {
                method: 'DELETE',
                headers: this._headers
            }
        })
    }

    getUserInfo(){
        this._request({
            url: `${this._baseUrl}/users/me`,
            options: {
                method: 'GET',
                headers: this._headers
            }     
        })
    }

    editUserInfo({name, about}){
        this._request({
            url: `${this._baseUrl}/users/me`,
            options: {
                method: 'GET',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            }     
        })
    }

    editAvatar(avatar){
        this._request({
            url: `${this._baseUrl}/users/me/avatar`,
            options: {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatar
                })
            }     
        })
    }
    
}
