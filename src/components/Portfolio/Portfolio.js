import "./Portfolio.css";
import arrow from "../../images/arrow.svg"

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li>
          <a href="https://plugopanka.github.io/how-to-learn/" target="_blank" className="portfolio__link">
            <p className="portfolio__text">Статичный сайт</p>
            <img src={arrow} alt="Иконка перехода по ссылке." className="portfolio__arrow" />
          </a>
        </li>
        <li>
          <a
            href="https://plugopanka.github.io/russian-travel/"
            target="_blank"
            className="portfolio__link"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <img src={arrow} alt="Иконка перехода по ссылке." className="portfolio__arrow" />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Plugopanka/react-mesto-api-full-gha"
            target="_blank"
            className="portfolio__link"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <img src={arrow} alt="Иконка перехода по ссылке." className="portfolio__arrow" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
