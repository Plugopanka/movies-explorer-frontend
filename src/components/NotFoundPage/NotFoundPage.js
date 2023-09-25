import './NotFoundPage.css';
import { useNavigate } from "react-router-dom";

function NotFoundPage() {

  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1, {replace: true});
  }

  return (
    <main className="not-found-page">
      <div className="not-found-page__container">
        <p className="not-found-page__error">404</p>
        <p className="not-found-page__text">Страница не найдена</p>
      </div>
      <button className="not-found-page__button" type="button" onClick={handleGoBack}>
        Назад
      </button>
    </main>
  )
};

export default NotFoundPage;