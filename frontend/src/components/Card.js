import React from 'react'; 
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && 'element__like_active'}` 
  );
  

  function handleClick() {
    onCardClick(card); 
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <div className="element">
      {isOwn && <button className='element__trash' onClick={handleDeleteClick} type="button" />} 
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__title-wrapper">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-wrapper">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <span className="element__like_value">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;