import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearLastAppointment } from '../../store/slices/appointmentSlice';
import './AppointmentSuccess.css';

const AppointmentSuccess = () => {
    const { lastAppointment } = useSelector(state => state.appointment);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                <p><strong>Имя:</strong> {lastAppointment.clientName || 'Не указано'}</p>
                <p><strong>Услуга:</strong> {lastAppointment.service || 'Не указана'}</p>
                <p><strong>Мастер:</strong> {lastAppointment.master || 'Не указан'}</p>
                <p><strong>Дата и время:</strong> {lastAppointment.date || 'Не указано'}</p>
                <p><strong>Телефон:</strong> {formatPhone(lastAppointment.phone)}</p>
                <p><strong>Идея тату:</strong> {lastAppointment.tattooIdea || 'Не указана'}</p>
                <p><strong>Размер:</strong> {lastAppointment.tattooSize || 'Не указан'}</p>
                <p><strong>Место нанесения:</strong> {lastAppointment.bodyPlacement || 'Не указано'}</p>
            </div>

            <p className="success-message">
                Мы свяжемся с вами в ближайшее время для подтверждения записи.
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