import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title title" id="technologies">
          Технологии
        </h2>
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li>
            <p className="techs__item">HTML</p>
          </li>
          <li>
            <p className="techs__item">CSS</p>
          </li>
          <li>
            <p className="techs__item">JS</p>
          </li>
          <li>
            <p className="techs__item">React</p>
          </li>
          <li>
            <p className="techs__item">Git</p>
          </li>
          <li>
            <p className="techs__item">Express.js</p>
          </li>
          <li>
            <p className="techs__item">MongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
