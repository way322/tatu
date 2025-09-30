import './Contacts.css';

const Contacts = () => {
    return (
        <div className="contacts">
            <h1>Контакты</h1>

            <div className="contacts-content">
                <div className="contact-info">
                    <div className="contact-item">
                        <h3>📍 Адрес</h3>
                        <p>Москва, ул. Татуировочная, 15</p>
                        <p>Метро: Тату-станция</p>
                    </div>

                    <div className="contact-item">
                        <h3>📞 Телефон</h3>
                        <p>+7 (999) 123-45-67</p>
                    </div>

                    <div className="contact-item">
                        <h3>🕒 Часы работы</h3>
                        <p>Понедельник - Пятница: 10:00 - 22:00</p>
                        <p>Суббота - Воскресенье: 11:00 - 20:00</p>
                    </div>

                    <div className="contact-item">
                        <h3>✉️ Email</h3>
                        <p>info@artink-studio.ru</p>
                    </div>
                </div>

                <div className="map-placeholder">
                    <img
                        src="/images/map.png"
                        alt="Карта проезда к тату-салону Tatu Studio в Москве"
                        className="map"
                    />
                </div>
            </div>
        </div>
    );
};

export default Contacts;