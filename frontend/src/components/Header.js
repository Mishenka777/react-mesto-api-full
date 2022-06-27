import logo from "../images/logo.svg";
import { Link, Route, Switch } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <Switch>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/">
          <div className="header__container">
            <p className="header__email">{props.onEmail}</p>
            <Link
              className="header__link"
              to="/sign-in"
              onClick={props.onLogOut}
            >
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}
