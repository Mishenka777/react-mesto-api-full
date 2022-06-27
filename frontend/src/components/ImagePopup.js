export default function ImagePopup(props) {
  return (
    <article
      className={`popup popup_image ${props.card.name && "popup_opened"}`}
    >
      <div className="popup__container-image">
        <button
          className="popup__exit"
          type="button"
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          alt={props.card.name}
          src={props.card.link}
        />
        <p className="popup__image-title">{props.card.name}</p>
      </div>
    </article>
  );
}
