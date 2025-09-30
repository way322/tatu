import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAppointmentData, addAppointment, clearLastAppointment } from '../../store/slices/appointmentSlice';
import AppointmentSuccess from '../../components/AppointmentSuccess/AppointmentSuccess';
import './Appointment.css';

import alexeyPhoto from '../../assets/images/masters/alexey.png';
import mariaPhoto from '../../assets/images/masters/maria.png';
import dmitryPhoto from '../../assets/images/masters/dmitry.png';
import olgaPhoto from '../../assets/images/masters/olga.png';

const Appointment = () => {
    const { currentAppointment, masters } = useSelector(state => state.appointment);
    const servicesList = useSelector(state => state.services.services);
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const getMasterPhoto = (masterName) => {
        switch (masterName) {
            case 'Алексей':
                return alexeyPhoto;
            case 'Мария':
                return mariaPhoto;
            case 'Дмитрий':
                return dmitryPhoto;
            case 'Ольга':
                return olgaPhoto;
            default:
                return alexeyPhoto;
        }
    };

    const handleInputChange = (field, value) => {
        dispatch(setAppointmentData({ [field]: value }));
    };

    const handlePhoneChange = (value) => {
        const cleaned = value.replace(/\D/g, '');
        let formatted = cleaned;

        if (cleaned.length > 0) {
            formatted = '+7 (' + cleaned.substring(1, 4);
            if (cleaned.length > 4) formatted += ') ' + cleaned.substring(4, 7);
            if (cleaned.length > 7) formatted += '-' + cleaned.substring(7, 9);
            if (cleaned.length > 9) formatted += '-' + cleaned.substring(9, 11);
        }

        setPhone(formatted);
        handleInputChange('phone', cleaned);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', currentAppointment);
        console.log('Phone length:', currentAppointment.phone.length);

        if (currentAppointment.date &&
            currentAppointment.master &&
            currentAppointment.service &&
            currentAppointment.phone.length === 11) {

            console.log('All conditions met, creating appointment...');
            dispatch(addAppointment());
            setIsSuccess(true);
        } else {
            console.log('Validation failed:', {
                date: !!currentAppointment.date,
                master: !!currentAppointment.master,
                service: !!currentAppointment.service,
                phoneLength: currentAppointment.phone.length
            });
            alert('Пожалуйста, заполните все поля корректно. Проверьте телефон (должно быть 11 цифр)');
        }
    };

    useEffect(() => {
        dispatch(clearLastAppointment());
    }, [dispatch]);

    useEffect(() => {
        console.log('Current appointment updated:', currentAppointment);
    }, [currentAppointment]);

    const isFormValid = () => {
        const isValid = currentAppointment.date &&
            currentAppointment.master &&
            currentAppointment.service &&
            currentAppointment.phone.length === 11;

        console.log('Validation check:', {
            date: currentAppointment.date,
            master: currentAppointment.master,
            service: currentAppointment.service,
            phone: currentAppointment.phone,
            phoneLength: currentAppointment.phone.length,
            isValid
        });

        return isValid;
    };

    if (isSuccess) {
        return <AppointmentSuccess />;
    }

    return (
        <div className="appointment">
            <h1>Записаться на сеанс</h1>

            <div className="appointment-steps">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Выбор услуги</div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Выбор мастера</div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Дата и время</div>
                <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Контакты</div>
            </div>

            <form onSubmit={handleSubmit} className="appointment-form">
                {step === 1 && (
                    <div className="form-step">
                        <h2>Выберите услугу</h2>
                        <div className="services-grid">
                            {servicesList.map(service => (
                                <div
                                    key={service.id}
                                    className={`service-option ${currentAppointment.service === service.title ? 'selected' : ''}`}
                                    onClick={() => {
                                        handleInputChange('service', service.title);
                                        setStep(2);
                                    }}
                                >
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <span className="price">{service.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step">
                        <h2>Выберите мастера</h2>
                        <div className="masters-grid">
                            {masters.map(master => (
                                <div
                                    key={master.id}
                                    className={`master-option ${currentAppointment.master === master.name ? 'selected' : ''}`}
                                    onClick={() => {
                                        handleInputChange('master', master.name);
                                        setStep(3);
                                    }}
                                >
                                    <div className="master-photo">
                                        <img
                                            src={getMasterPhoto(master.name)}
                                            alt={`Мастер ${master.name}`}
                                            className="master-photo-img"
                                        />
                                    </div>
                                    <h3>{master.name}</h3>
                                    <p>Стиль: {master.specialization}</p>
                                    <p>Опыт: {master.experience}</p>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => setStep(1)} className="back-button">
                            Назад
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step">
                        <h2>Выберите дату и время</h2>
                        <div className="date-selection">
                            <label>
                                Дата:
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        handleInputChange('date', '');
                                    }}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </label>
                            <div className="time-slots">
                                <h4>Доступное время:</h4>
                                <div className="slots-grid">
                                    {['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(time => (
                                        <div
                                            key={time}
                                            className={`time-slot ${currentAppointment.date === `${selectedDate} ${time}` ? 'selected' : ''}`}
                                            onClick={() => {
                                                if (selectedDate) {
                                                    handleInputChange('date', `${selectedDate} ${time}`);
                                                } else {
                                                    alert('Пожалуйста, сначала выберите дату');
                                                }
                                            }}
                                        >
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {currentAppointment.date && (
                                <div className="selected-time-info">
                                    <p>Выбрано: {currentAppointment.date}</p>
                                </div>
                            )}
                        </div>
                        <div className="step-buttons">
                            <button type="button" onClick={() => setStep(2)} className="back-button">
                                Назад
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (currentAppointment.date) {
                                        setStep(4);
                                    } else {
                                        alert('Пожалуйста, выберите дату и время');
                                    }
                                }}
                                className="next-button"
                            >
                                Далее
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="form-step">
                        <h2>Ваши контактные данные</h2>
                        <div className="contact-form">
                            <label>
                                Номер телефона:
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => handlePhoneChange(e.target.value)}
                                    placeholder="+7 (999) 123-45-67"
                                    required
                                />
                            </label>
                            <p className="phone-note">
                                Мы свяжемся с вами по этому номеру для подтверждения записи
                            </p>
                        </div>
                        <div className="appointment-summary">
                            <h3>Ваша запись:</h3>
                            <p><strong>Услуга:</strong> {currentAppointment.service}</p>
                            <p><strong>Мастер:</strong> {currentAppointment.master}</p>
                            <p><strong>Дата:</strong> {currentAppointment.date}</p>
                            <p><strong>Телефон:</strong> {phone}</p>
                        </div>
                        <div className="step-buttons">
                            <button type="button" onClick={() => setStep(3)} className="back-button">
                                Назад
                            </button>
                            <button
                                type="submit"
                                className={`submit-button ${!isFormValid() ? 'disabled' : ''}`}
                                disabled={!isFormValid()}
                            >
                                Подтвердить запись
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Appointment;