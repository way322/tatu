import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedService, clearSelectedService } from '../../store/slices/servicesSlice';
import { setAppointmentData } from '../../store/slices/appointmentSlice';
import './Services.css';

import realism1 from '../../assets/images/real.png';
import realism2 from '../../assets/images/real2.png';
import mini1 from '../../assets/images/mini2.png';
import mini2 from '../../assets/images/mini.png';
import trad1 from '../../assets/images/trad.png';
import trad2 from '../../assets/images/trad2.png';
import akva1 from '../../assets/images/akva.png';
import akva2 from '../../assets/images/akva2.png';

const Services = () => {
    const { services, selectedService } = useSelector(state => state.services);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [expandedService, setExpandedService] = useState(null);

    const serviceImages = {
        1: [realism1, realism2],
        2: [trad1, trad2],
        3: [mini1, mini2], 
        4: [akva1, akva2]
    };

    const handleServiceClick = (service, e) => {
        if (e && e.target.closest('.select-service-button')) {
            return;
        }

        if (expandedService === service.id) {
            setExpandedService(null);
            dispatch(clearSelectedService());
        } else {
            setExpandedService(service.id);
            dispatch(setSelectedService(service));
        }
    };

    const handleSelectService = (service, e) => {
        if (e) {
            e.stopPropagation();
        }
        dispatch(setAppointmentData({ service: service.title }));
        navigate('/appointment');
    };

    return (
        <div className="services">
            <h1>Наши услуги</h1>
            <div className="services-list">
                {services.map(service => (
                    <div
                        key={service.id}
                        className={`service-card ${expandedService === service.id ? 'expanded' : ''}`}
                        onClick={(e) => handleServiceClick(service, e)}
                    >
                        <div className="service-header">
                            <h3>{service.title}</h3>
                            <span className="price">{service.price}</span>
                        </div>
                        <p className="service-description">{service.description}</p>
                        <p className="service-duration">Время: {service.duration}</p>

                        {expandedService === service.id && (
                            <div className="service-details">
                                <p>{service.details}</p>
                                <div className="service-examples">
                                    <div className="example-image">
                                        <img
                                            src={serviceImages[service.id][0]}
                                            alt={`Пример работы: ${service.title}`}
                                            className="example-img"
                                        />
                                    </div>
                                    <div className="example-image">
                                        <img
                                            src={serviceImages[service.id][1]}
                                            alt={`Еще один пример: ${service.title}`}
                                            className="example-img"
                                        />
                                    </div>
                                </div>
                                <button
                                    className="select-service-button"
                                    onClick={(e) => handleSelectService(service, e)}
                                >
                                    Выбрать эту услугу
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {selectedService && (
                <div className="selected-service-info">
                    <h2>Вы выбрали: {selectedService.title}</h2>
                    <p>{selectedService.details}</p>
                </div>
            )}
        </div>
    );
};

export default Services;