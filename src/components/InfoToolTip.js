import React from 'react'
 
const InfoTooltip = ({isOpen, onClose, icon, message}) => {
  return (
    <div className={`popup popup_type_${isOpen ? 'popup_open' : ''}`}>
    <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={onClose}></button>
        <icon className="tooltip-icon" src={icon}></icon>
        <h2 className='tooltip-message'>{message}</h2>
    </div> 
</div>
  )
}
 
export default InfoTooltip