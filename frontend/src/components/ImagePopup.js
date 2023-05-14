import React from 'react'; 
import Popup from './Popup';

function ImagePopup({ card, onClose }) {
  return (
    <Popup isOpen={card} name='open' onClose={onClose} >
      <div className="popup__card-container">
        <div className="popup__card">
          <img className="popup__image" src={card?.link} alt={card?.name} />
          <p className="popup__title">{card?.name}</p>
        </div>
      </div>
    </Popup>
  )
}

export default ImagePopup;