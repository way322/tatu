import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearLastAppointment } from '../../store/slices/appointmentSlice';
import './AppointmentSuccess.css';

const AppointmentSuccess = () => {
    const { lastAppointment } = useSelector(state => state.appointment);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(clearLastAppointment());
            navigate('/');
        }, 20000);

        return () => clearTimeout(timer);
    }, [dispatch, navigate]);

    const handleGoHome = () => {
        dispatch(clearLastAppointment());
        navigate('/');
    };

    if (!lastAppointment) {
        return (
            <div className="appointment-success">
                <div className="success-icon">?</div>
                <h2>Информация о записи не найдена</h2>
                <p className="success-message">
                    К сожалению, не удалось найти данные о вашей записи.
                </p>
                <div className="success-actions">
                    <button onClick={handleGoHome} className="home-button">
                        На главную
                    </button>
                </div>
            </div>
        );
    }

    const formatPhone = (phone) => {
        if (!phone) return '';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `+7 (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 9)}-${cleaned.substring(9, 11)}`;
        }
        return phone;
    };

    return (
        <div className="appointment-success">
            <div className="success-icon">✓</div>
            <h2>Запись успешно создана!</h2>
            <div className="appointment-details">
                <h3>Детали вашей записи:</h3>
                <p><strong>Услуга:</strong> {lastAppointment.service || 'Не указана'}</p>
                <p><strong>Мастер:</strong> {lastAppointment.master || 'Не указан'}</p>
                <p><strong>Дата и время:</strong> {lastAppointment.date || 'Не указано'}</p>
                <p><strong>Телефон:</strong> {formatPhone(lastAppointment.phone)}</p>
            </div>
            <p className="success-message">
                Мы свяжемся с вами в ближайшее время для подтверждения записи.
                <br />
                <span className="redirect-timer">
                    Автоматическое перенаправление на главную страницу через 20 секунд...
                </span>
            </p>
            <div className="success-actions">
                <button onClick={handleGoHome} className="home-button">
                    На главную
                </button>
            </div>
        </div>
    );
};

export default AppointmentSuccess;