

export default class Api{
    constructor(baseUrl, headers){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

     _request({url, options}){
        return fetch(url, options).then(this._parseResponse)

    }

    _parseResponse(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);

    }

    getInitialCards(){
       return this._request({
            url: `${this._baseUrl}/cards`,
            options: {
                method: "GET",
                headers: this._headers
            }        
        })
    }
    
    addCard(name, link){
        return this._request({
            url: `${this._baseUrl}/cards`,
            options: {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            }
        })
    }

    deleteCard(cardId){
        return this._request({
            url: `${this._baseUrl}/cards/${cardId}`,
            options: {
                method: "DELETE",
                headers: this._headers
            }
        })
    }

    changeLikeCardStatus(cardId, isLiked){
       return isLiked ? this._setLikeCard(cardId) : this._removeLikeCard(cardId)
    }
    
    _setLikeCard(cardId){
        return this._request({
            url: `${this._baseUrl}/cards/${cardId}/likes`,
            options: {
                method: "PUT",
                headers: this._headers
            }
        })
    }

    _removeLikeCard(cardId){
        return this._request({
            url: `${this._baseUrl}/cards/${cardId}/likes`,
            options: {
                method: "DELETE",
                headers: this._headers
            }
        })
    }

    getUserInfo(){
       return this._request({
            url: `${this._baseUrl}/users/me`,
            options: {
                method: "GET",
                headers: this._headers
            }     
        })
    }

    editUserInfo({name, about}){
        return this._request({
            url: `${this._baseUrl}/users/me`,
            options: {
                method: "GET",
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            }     
        })
    }

    editAvatar(avatar){
        return this._request({
            url: `${this._baseUrl}/users/me/avatar`,
            options: {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatar
                })
            }     
        })
    }
    
}
export const api = new Api(
    "https://mesto.nomoreparties.co/v1/cohort-46",
    {
        "Content-Type": "application/json",
        "authorization": "a53b037e-2380-4a96-99e7-f57cd5d08416"
    }
);