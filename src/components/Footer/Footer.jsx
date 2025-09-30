import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Tatu Studio</h3>
          <p>Профессиональный тату-салон с 2015 года</p>
        </div>
        <div className="footer-section">
          <h4>Контакты</h4>
          <p>+7 (999) 123-45-67</p>
          <p>Москва, ул. Татуировочная, 15</p>
        </div>
        <div className="footer-section">
          <h4>Часы работы</h4>
          <p>Пн-Пт: 10:00 - 22:00</p>
          <p>Сб-Вс: 11:00 - 20:00</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;