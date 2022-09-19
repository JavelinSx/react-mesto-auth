import {useEffect, useState, useContext, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
    const userContext = useContext(CurrentUserContext)
    const [avatar, setAvatar] = useState(userContext.avatar)
    const avatarRef = useRef()
    
    useEffect(() => {
        setAvatar('')
    },[])

    function handleChangeLink(e){
        setAvatar(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    return(
        <PopupWithForm  typePopup="update-avatar" 
                        titlePopup="Обновить аватар" 
                        isOpen={isOpen} 
                        onClose={onClose} 
                        onSubmit={handleSubmit}
                        buttonText="Обновить">

            <input  type="url" 
                    ref={avatarRef}
                    onChange={handleChangeLink}
                    value={avatar}
                    className="popup__input" 
                    name="useravatar" 
                    placeholder="Ссылка на картинку аватара" 
                    required>
            </input>

        </PopupWithForm>
    )

}

export default EditAvatarPopup