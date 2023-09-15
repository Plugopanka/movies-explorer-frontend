import './NotFoundPage.css';

function NotFoundPage({ goBack }) {
  return (
    <main className="not-found-page">
      <p className="not-found-page__container">
        <span className="not-found-page__error">404</span>
        <span className="not-found-page__text">Страница не найдена</span>
      </p>
      <button className="not-found-page__button" onClick={goBack}>
        Назад
      </button>
    </main>
  )
};

export default NotFoundPage;