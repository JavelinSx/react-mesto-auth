import {useEffect, useState} from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';

import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import {CurrentUserContext} from '../contexts/CurrentUserContext'
import { api } from '../utils/utils';


function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setIsSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({name:'empty', about:'empty', avatar:'empty'})
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getInitialCards()
    .then(cards => setCards(cards))
    .catch(e => {
      console.log(e)
    })
  }, [])

  useEffect(() => {
      api.getUserInfo()
      .then((user) => {
        setCurrentUser(user)
      })
      .catch(e => {
        console.log(e)
      })
  },[])

  function handleCardLike(card){
    const isLiked = card.likes.some(like => like._id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch(e => {
      console.log(e)
    })
  }

  function handleCardDelete(card){
    api.deleteCard(card._id)
    setCards((cards) => cards.filter((c) => c._id !== card._id))
    .catch(e => {
      console.log(e)
    })
  }

  const handleAddPlace = ({name, link}) => {
    api.addCard(name,link)
    .then(newCard => {
      setCards([newCard, ...cards])
    })
    .catch(e => {
      console.log(e)
    })
    closeAllPopups()
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  
  const handleCardClick = (card) => {
    setIsImagePopupOpen(true)
    setIsSelectedCard(card)
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsImagePopupOpen(false)
  }

  const handleUpdateUser = (name, about) => {
    api.editUserInfo(name, about)
    .then(userUpdate => setCurrentUser(userUpdate))
    .catch(e => {
      console.log(e)
    })
    closeAllPopups()
  }
  
  const handleUpdateAvatar = ({avatar}) => {
      api.editAvatar(avatar)
      .then(userUpdate => setCurrentUser({
        name:currentUser.name,
        about:currentUser.about,
        avatar:userUpdate.avatar}))
      .catch(e => {
        console.log(e)
      })
      closeAllPopups()
  }


  return (

    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header />

        <Main  onAddPlace={handleAddPlaceClick} 
               onEditAvatar={handleEditAvatarClick} 
               onEditProfile={handleEditProfileClick} 
               cards={cards}
               onCardClick={handleCardClick}
               onCardLike={handleCardLike}
               onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} 
                          onClose={closeAllPopups} 
                          onUpdateUser={handleUpdateUser} 
        />

        <EditAvatarPopup  isOpen={isEditAvatarPopupOpen} 
                          onClose={closeAllPopups} 
                          onUpdateAvatar={handleUpdateAvatar} 
        />

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlace} 
        />

        <PopupWithForm typePopup="confirmation" 
                      titlePopup="Вы уверены?"  
                      onClose={closeAllPopups} 
                      buttonText="Да"
        />
        
        <ImagePopup card={selectedCard} 
                    onClose={closeAllPopups} 
                    isOpened={isImagePopupOpen}
        />
      </CurrentUserContext.Provider> 

    </div>

  );
}

export default App;
