import "./AboutProject.css";

function AboutProject () {
  return (
<section className="about-project">
<h2 className="about-project__title title" id="project">
О проекте
</h2>

<ul className="about-project__list">
<li>
  <h3 className="about-project__item">Дипломный проект включал 5 этапов</h3>
  <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
</li>
<li>
  <h3 className="about-project__item">На выполнение диплома ушло 5 недель</h3>
  <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
</li>
</ul>

<div className="about-project__container">
  <p className="about-project__text about-project__text_color_dark about-project__text_background_green">1 неделя</p>
  <p className="about-project__text about-project__text_background_pale">4 недели</p>
  <p className="about-project__text about-project__text_color_pale">Back-end</p>
  <p className="about-project__text about-project__text_color_pale">Front-end</p>
</div>
</section>
  );
};

export default AboutProject;