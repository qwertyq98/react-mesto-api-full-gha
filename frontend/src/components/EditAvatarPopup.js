import React from "react";
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const {formValue, setFormValue, handleChange} = useForm({
    avatar: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: formValue.avatar,
    });
  } 

  React.useEffect(() => {
    if(isOpen) {
      setFormValue({
        avatar: ''
      });
    }
  }, [isOpen, setFormValue]); 
  

  return (
    <PopupWithForm
      name='avatar'
      type='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      >
        <input 
          name="avatar" 
          type="url" 
          id="avatar-input" 
          className="popup__input popup__input_type_url" 
          placeholder='Ссылка на картинку' 
          required 
          value={formValue.avatar}
          onChange={handleChange}
        />
        <span className="popup__error avatar-input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;