import SignPage from "../SignPage/SignPage";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/formValidation";
import { NAME_REGEX } from "../../utils/constants";

function Register({ handleRegister }) {
  const { values, handleChange, errors, isValid, resetForm } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    resetForm();
    // console.log(errors);
  }, [resetForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(values);
    // console.log(errors);
    handleRegister(values);
  };

  return (
    <SignPage
      buttonText={"Зарегистрироваться"}
      title={"Добро пожаловать!"}
      onSubmit={handleSubmit}
      onChange={handleChange}
      formValue={values}
      formError={errors}
      isValid={isValid}
      inputChildren={
        <label className="sign__label">
          <span className="sign__text">Имя</span>
          <input
            name="name"
            className={`sign__input`}
            id="sign-name"
            placeholder="Имя"
            value={values.name || ""}
            type="text"
            onChange={handleChange}
            required
            minLength="2"
            maxLength="40"
            pattern={NAME_REGEX}
          />
          <span className="sign__input-error name-error">{errors.name}</span>
        </label>
      }
      linkChildren={
        <span className="sign__link-text">
          Уже зарегистрированы?&nbsp;
          <Link to="/signin" className="sign__link">
            Войти
          </Link>
        </span>
      }
    />
  );
}

export default Register;
