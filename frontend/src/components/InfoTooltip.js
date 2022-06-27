import okey from "../images/okey.svg";
import cancel from "../images/cancel.svg";

export default function InfoTooltip(props) {
  const resultIcon = props.isTypeTooltipPopup ? okey : cancel;
  const resultTitle = props.isTypeTooltipPopup
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <article
      className={`popup popup__infotooltip ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container popup__container-infotooltip">
        <button
          className="popup__exit"
          type="button"
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>
        <img className="popup__image-infotooltip" src={resultIcon} alt="значок"/>
        <h2 className="popup__title">{resultTitle}</h2>
      </div>
    </article>
  );
}
