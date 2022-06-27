import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { api } from "../utils/Api";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth";
import { useHistory } from "react-router-dom";
export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isTypeTooltipPopup, setIsTypeTooltipPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      Auth.checkToken(token).then((res) => {
        setIsLoggedIn(true);
        history.push("/");
        setEmail(res.data.email);
      });
    }
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.push("/sign-in");
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if(isLoggedIn) {
    Promise.all([api.getProfileData(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }}, [isLoggedIn]);

  function handleRegister(email, password) {
    Auth.register(email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipPopupOpen(true);
          setIsTypeTooltipPopup(true);
          history.push("/sign-in");
        }
      })
      .catch((res) => {
        console.log(res);
        setIsInfoTooltipPopupOpen(true);
        setIsTypeTooltipPopup(false);
      });
  }

  function handleLogin(email, password) {
    Auth.login(email, password).then((res) => {
      if (res) {
        localStorage.setItem("token", res.token);
        setIsLoggedIn(true);
        history.push("/");
        setEmail(email);
      }
    });
  }

  useEffect(() => {
    const closeAllPopupsEsc = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeAllPopupsEsc);
    return () => {
      document.removeEventListener("keydown", closeAllPopupsEsc);
    };
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const changeLikeCardStatus = !isLiked
      ? api.addLike(card._id)
      : api.deleteLike(card._id);
    changeLikeCardStatus
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleUpdateUser(name, about) {
    api
      .setProfileData(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddElementClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogOut={handleLogOut} onEmail={email} />
        <Switch>
          <ProtectedRoute exact path="/" isLoggedIn={isLoggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddElement={handleAddElementClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />
          </ProtectedRoute>
        </Switch>
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          text="ок"
        ></PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          isTypeTooltipPopup={isTypeTooltipPopup}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
