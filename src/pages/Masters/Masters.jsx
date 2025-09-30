import { useSelector } from 'react-redux';
import './Masters.css';

import alexeyPhoto from '../../assets/images/masters/alexey.png';
import mariaPhoto from '../../assets/images/masters/maria.png';
import dmitryPhoto from '../../assets/images/masters/dmitry.png';
import olgaPhoto from '../../assets/images/masters/olga.png';

import alexeyWork1 from '../../assets/images/portfolio/alexey1.png';
import alexeyWork2 from '../../assets/images/portfolio/alexey2.png';

import mariaWork1 from '../../assets/images/portfolio/maria1.png';
import mariaWork2 from '../../assets/images/portfolio/maria2.png';

import dmitryWork1 from '../../assets/images/portfolio/dmitry1.png';
import dmitryWork2 from '../../assets/images/portfolio/dmitry2.png';

import olgaWork1 from '../../assets/images/portfolio/olga1.png';
import olgaWork2 from '../../assets/images/portfolio/olga2.png';

const Masters = () => {
    const { masters } = useSelector(state => state.appointment);

    const mastersWithPhotos = masters.map(master => {
        let photo, portfolio;

        switch (master.name) {
            case 'Алексей':
                photo = alexeyPhoto;
                portfolio = [alexeyWork1, alexeyWork2];
                break;
            case 'Мария':
                photo = mariaPhoto;
                portfolio = [mariaWork1, mariaWork2];
                break;
            case 'Дмитрий':
                photo = dmitryPhoto;
                portfolio = [dmitryWork1, dmitryWork2];
                break;
            case 'Ольга':
                photo = olgaPhoto;
                portfolio = [olgaWork1, olgaWork2];
                break;
            default:
                photo = alexeyPhoto;
                portfolio = [alexeyWork1, alexeyWork2];
        }

        return {
            ...master,
            photo,
            portfolio
        };
    });

    return (
        <div className="masters">
            <h1>Наши мастера</h1>
            <div className="masters-grid">
                {mastersWithPhotos.map(master => (
                    <div key={master.id} className="master-card">
                        <div className="master-photo">
                            <img
                                src={master.photo}
                                alt={`Мастер ${master.name}`}
                                className="master-photo-img"
                            />
                        </div>
                        <div className="master-info">
                            <h2>{master.name}</h2>
                            <p className="specialization">{master.specialization}</p>
                            <p className="experience">Опыт работы: {master.experience}</p>
                            <div className="master-portfolio">
                                <h4>Примеры работ:</h4>
                                <div className="portfolio-grid">
                                    {master.portfolio.map((work, index) => (
                                        <div key={index} className="portfolio-item">
                                            <img
                                                src={work}
                                                alt={`Работа мастера ${master.name} ${index + 1}`}
                                                className="portfolio-image"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Masters;