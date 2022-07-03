import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function handleSumbit(evt) {
    evt.preventDefault();
    const { email, password } = state;
    if (props.onRegister && email && password) {
      props.onRegister(email, password);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <section className="register">
      <form className="register__form" onSubmit={handleSumbit}>
        <h2 className="register__title">Регистрация</h2>
        <input
          onChange={handleChange}
          required
          className="register__email"
          minLength="2"
          maxLength="40"
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          value={state.email ?? ""}
        />
        <span id="email-error" className="error"></span>
        <input
          onChange={handleChange}
          required
          className="register__password"
          minLength="2"
          maxLength="200"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          value={state.password ?? ""}
        />
        <span id="password-error" className="error"></span>
        <button className="register__save" type="submit">
          Зарегистрироваться
        </button>
        <Link to="/signin" className="register__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}
