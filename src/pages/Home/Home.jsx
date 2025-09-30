import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Tatu Studio</h1>
          <p>Профессиональный тату-салон в Москве</p>
          <p>Превращаем ваши идеи в искусство на коже</p>
          <Link to="/appointment" className={styles.ctaButton}>
            Записаться на сеанс
          </Link>
        </div>
        <div className={styles.heroImage}>
          <img src="/images/glav.png" alt="Главное изображение тату-салона"/>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h3>Безопасность</h3>
          <p>Стерильные условия и одноразовые инструменты</p>
        </div>
        <div className={styles.feature}>
          <h3>Качество</h3>
          <p>Профессиональные мастера с многолетним опытом</p>
        </div>
        <div className={styles.feature}>
          <h3>Индивидуальный подход</h3>
          <p>Создаем уникальные эскизы для каждого клиента</p>
        </div>
      </section>

      <section className={styles.previewGallery}>
        <h2>Наши работы</h2>
        <div className={styles.galleryPreview}>
          <div className={styles.previewItem}>
            <img src="/images/rabota1.png" alt="Пример работы 1"/>
          </div>
          <div className={styles.previewItem}>
            <img src="/images/rabota2.png" alt="Пример работы 2"/>
          </div>
          <div className={styles.previewItem}>
            <img src="/images/rabota3.png" alt="Пример работы 3"/>
          </div>
        </div>
        <Link to="/gallery" className={styles.viewMore}>
          Смотреть все работы
        </Link>
      </section>
    </div>
  );
};

export default Home;