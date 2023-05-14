import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const {formValue, setFormValue, handleChange} = useForm({
    userName: '',
    userAbout: ''
  });

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if(isOpen) {
      setFormValue({
        userName: currentUser.name,
        userAbout: currentUser.about
      });
    }
  }, [currentUser, isOpen, setFormValue]);

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser({
      name: formValue.userName,
      about: formValue.userAbout,
    });
  }

  return (
    <PopupWithForm
      name='profile'
      type='edit'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      >
        <input 
          name="userName" 
          type="text" 
          id="userName-input" 
          minLength="2" 
          maxLength="40" 
          className="popup__input popup__input_type_name"
          placeholder='Введите имя' 
          required 
          value={formValue.userName}
          onChange={handleChange}
        />
        <span className="popup__error userName-input-error"></span>
        <input 
          name="userAbout" 
          type="text" 
          id="userAbout-input" 
          minLength="2" 
          maxLength="200" 
          className="popup__input popup__input_type_info"
          placeholder='Введите профессию' 
          required 
          value={formValue.userAbout}
          onChange={handleChange}
        />
        <span className="popup__error userAbout-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;