import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(name, description);
  }
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      text="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        className="popup__text popup__text_type_name"
        minLength="2"
        maxLength="40"
        type="text"
        name="human"
        value={name || ""}
        id="human-card"
        onChange={handleNameChange}
      />
      <span id="human-card-error" className="error"></span>
      <input
        required
        className="popup__text popup__text_type_job"
        minLength="2"
        maxLength="200"
        type="text"
        value={description || ""}
        name="job"
        id="job-card"
        onChange={handleDescriptionChange}
      />
      <span id="job-card-error" className="error"></span>
    </PopupWithForm>
  );
}
