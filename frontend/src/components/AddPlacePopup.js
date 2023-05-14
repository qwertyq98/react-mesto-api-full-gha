import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handleNamePlaceChange(e) {
    setPlaceName(e.target.value);
  }
  
  function handleLinkPlaceChange(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
 
    onAddPlace({
      name: placeName,
      link: placeLink
    });
  } 

  React.useEffect(() => {
    if(isOpen) {
      setPlaceName('');
      setPlaceLink('');
    }
  }, [isOpen])

  return (
    <PopupWithForm
      name='card'
      type='add'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading? 'Создание...' : 'Создать'}
      onSubmit={handleSubmit}
      >
        <input 
          name="name" 
          type="text" 
          id="name-input" 
          minLength="2" 
          maxLength="30" 
          className="popup__input popup__input_type_name"
          placeholder='Название' 
          required
          onChange={handleNamePlaceChange}
          value={placeName}
        />
        <span className="popup__error name-input-error"></span>
        <input 
          name="link" 
          type="url" 
          id="link-input" 
          className="popup__input popup__input_type_url" 
          placeholder='Ссылка на картинку' 
          required 
          onChange={handleLinkPlaceChange}
          value={placeLink}
        />
        <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;