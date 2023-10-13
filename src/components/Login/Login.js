import SignPage from "../SignPage/SignPage";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useForm from '../../hooks/formValidation';

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, resetForm } = useForm();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(values);
  }

  return (
    <SignPage
      buttonText={"Войти"}
      title={"Рады видеть!"}
      onSubmit={handleSubmit}
      onChange={handleChange}
      formValue={values}
      formError={errors}
      isValid={isValid}
      linkChildren={
        <span className="sign__link-text">
          Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className="sign__link">
            Регистрация
          </Link>
        </span>
      }
    />
  );
}

export default Login;
