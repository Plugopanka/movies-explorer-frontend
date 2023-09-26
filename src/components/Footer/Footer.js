import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__text footer__text_color_pale">&copy;2023</p>
        <ul className="footer__list">
          <li>
            <a
              className="footer__link footer__text"
              href="https://practicum.yandex.ru/"
              target="_blank"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link footer__text"
              href="https://github.com/"
              target="_blank"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
