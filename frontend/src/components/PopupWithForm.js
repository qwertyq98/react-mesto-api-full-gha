import React from 'react'; 
import Popup from './Popup';

function PopupWithForm({isOpen, name, onClose, type, title, children, buttonText, onSubmit}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <div className= "popup__container">
        <form className={`popup__form popup__form_name_${name}`} name={type} onSubmit={onSubmit}>
          <h2 className="popup__text">{title}</h2>
          {children}
          <button className="popup__button popup__button_save" type="submit">{buttonText}</button>
        </form>
        <button
          className='popup__button popup__button_close'
          type='button'
          onClick={onClose}
        />
      </div>
    </Popup>
  )
}

export default PopupWithForm;