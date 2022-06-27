import { useState } from "react";

export default function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function handleSumbit(evt) {
    evt.preventDefault();
    const { email, password } = state;
    if (props.onLogin && email && password) {
      props.onLogin(email, password);
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
    <section className="login">
      <form className="login__form" onSubmit={handleSumbit}>
        <h2 className="login__title">Вход</h2>
        <input
          required
          className="login__email"
          minLength="2"
          maxLength="40"
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={state.email ?? ""}
        />
        <span id="email-error" className="error"></span>
        <input
          required
          className="login__password"
          minLength="2"
          maxLength="200"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={state.password ?? ""}
        />
        <span id="password-error" className="error"></span>
        <button className="login__save" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}
