import logo from "../images/logo.svg";
import { Link, Route, Switch } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <Switch>
        <Route path="/signin">
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
        </Route>
        <Route path="/signup">
          <Link className="header__link" to="/signin">
            Войти
          </Link>
        </Route>
        <Route path="/">
          <div className="header__container">
            <p className="header__email">{props.onEmail}</p>
            <Link
              className="header__link"
              to="/signin"
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
