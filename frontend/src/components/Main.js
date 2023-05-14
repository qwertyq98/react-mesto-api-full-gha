import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onClickAvatar, onClickProfile, onClickPlace, onCardClick, onCardLike, onCardDelete, cards}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__avatar-wrapper">
          <img src={currentUser.avatar} className="profile__avatar" alt="Аватар" />
          <button className="profile__button" onClick={onClickAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__content">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__button-edit" type="button" onClick={onClickProfile} />
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
          <button className="profile__button-add" type="button" onClick={onClickPlace} />
      </section>
      <section className="elements content__elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;
