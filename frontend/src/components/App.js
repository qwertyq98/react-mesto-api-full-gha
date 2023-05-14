import React, { useEffect, useState, useLayoutEffect } from 'react'; 
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Loading from './Loading';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [successRegistered, setSuccessRegistered] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [burger, setBurger] = React.useState(false);
  const [userData, setUserData] = React.useState({
    email: ''
  });

  useLayoutEffect(() => {
    function updateWidth() {
      if (window.innerWidth > 440) {
        setBurger(false);
      }
    }

    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);


  useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (!loggedIn) {
      return;
    }
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  React.useEffect(() => {
    if (!loggedIn) {
      return;
    }
    api.getInitialCards()
      .then((cards) => {
        cards.reverse();
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function onRegistered(isSuccess) {
    if (isSuccess) {
      navigate('/signin', {replace: true});
    }
    
    setIsInfoTooltipOpen(true);
    setSuccessRegistered(isSuccess);
  }

  function handleBurger() {
    setBurger(!burger);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => c._id === card._id ? newCard : c);
        })
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(prevState=> prevState.filter(item => item !== card));
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.setUserInfoPopap(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api.changeUserAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api.addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }
  
  const tokenCheck = () => {
    setLoading(true);
    api.checkToken().then((data) => {
      setLoggedIn(true);
        setUserData({
          email: data.email
        });
        navigate("/", {replace: true});
    })
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
  }

  function handleSubmitLogin({ email, password }) {
    if (!email || !password){
      return;
    }
    api.authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        setUserData({
          email
        });
        navigate('/', {replace: true});
      })
      .catch((err) => console.log(err))
  }

  function handleSubmitRegister({ email, password }) {
    if (password && email) {
      
      api.register(password, email)
        .then(() => {
          onRegistered(true);
        }) 
        .catch(() => {
          onRegistered(false);
        });
    } 
  } 

  function signOut() {
    api.logout()
      .then(() => {
        setLoggedIn(false)
        navigate('/signin');
        setBurger(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Loading loading={loading} element={
        <div className="page">
          <Header 
            loggedIn={loggedIn}
            userData={userData}
            signOut = {signOut}
            handleBurger = {handleBurger}
            burger = {burger}
          />
          <Routes>
            <Route path="/signup" element={<Register onSubmit={handleSubmitRegister}/>} />
            <Route path="/signin" element={<Login onSubmit={handleSubmitLogin} />} />
            <Route path="/" element={
              <>
                <ProtectedRouteElement element={Main} loggedIn={loggedIn}
                  onClickProfile={handleEditProfileClick}
                  onClickAvatar={handleEditAvatarClick}
                  onClickPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
                <Footer />
              </>
              }>
            </Route>
          </Routes>
          
          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          /> 
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          /> 
          <InfoTooltip
            success={successRegistered}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />
        </div>
      }/>
    </CurrentUserContext.Provider>
  );
}

export default App;