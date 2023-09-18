import './NotFoundPage.css';

function NotFoundPage({ goBack }) {
  return (
    <main className="not-found-page">
      <div className="not-found-page__container">
        <p className="not-found-page__error">404</p>
        <p className="not-found-page__text">Страница не найдена</p>
      </div>
      <button className="not-found-page__button" onClick={goBack}>
        Назад
      </button>
    </main>
  )
};

export default NotFoundPage;