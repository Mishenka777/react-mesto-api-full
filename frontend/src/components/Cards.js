import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "" : "element__delete_hidden"
  }`;
  const isLiked = props.card.likes.some((id) => id === currentUser._id);
  const cardLikeButtonClassName = `element__button ${
    isLiked && "element__button_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <article className="element">
      <img
        className="element__photo"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
        aria-label="удалить"
      ></button>
      <div className="element__item">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="понравилось"
          ></button>
          <span className="element__button-count">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </article>
  );
}
