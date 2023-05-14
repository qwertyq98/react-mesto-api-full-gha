import React from 'react';
import okImage from '../images/ok.svg';
import noOkImage from '../images/no ok.svg';

function InfoTooltip({ success, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ''}`}>
      <div className="popup__container">
        <div className='popup__content'>
          { success ? <img src={okImage} className='popup__img' alt = 'Успешно'/> : 
          <img src={noOkImage} className='popup__img' alt = 'Не успешно'/> }
          { success ? <h2 className='popup__auth-text'>Вы успешно зарегистрировались!</h2>: <h2 className='popup__auth-text'>Что-то пошло не так!
Попробуйте ещё раз.</h2>}
        </div>
        <button className="popup__button popup__button_close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;