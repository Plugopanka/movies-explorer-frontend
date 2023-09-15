import "./AboutMe.css";
import photo from "../../images/portrait.jpg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title title" id="student">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__information">
          <h3 className="about-me__subtitle">Мария</h3>
          <p className="about-me__description">Фронтенд-разработчик, 24 года</p>
          <p className="about-me__text">
            Живу в Москве, закончила с отличием Российский
            химико-технологический университет им. Д.И. Менделеева. По
            специальности я дизайнер-технолог. Меня всегда увлекали точные
            науки, но к ним всегда хочется добавить немного креатива. Этим меня
            увлекла веб-разработка - много логики, отсутствие четких правил.
          </p>
          <a
            href="https://github.com/Plugopanka"
            target="_blank"
            className="about-me__link"
          >
            Github
          </a>
        </div>
        <img className="about-me__photo" src={photo} alt="Фото студентки." />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
