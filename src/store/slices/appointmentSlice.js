import { createSlice } from '@reduxjs/toolkit';
import { loadAppointmentState } from '../../utils/appointmentStorage';

const persistedState = loadAppointmentState();

const isPastAppointmentDate = (dateTime) => {
    if (!dateTime) return false;

    const [datePart, timePart] = dateTime.split(' ');

    if (!datePart || !timePart) return false;

    const slotDate = new Date(`${datePart}T${timePart}:00`);

    if (Number.isNaN(slotDate.getTime())) return false;

    return slotDate.getTime() <= Date.now();
};

const initialState = {
    appointments: persistedState.appointments,
    currentAppointment: {
        clientName: '',
        date: '',
        master: '',
        service: '',
        phone: '',
        tattooIdea: '',
        tattooSize: '',
        bodyPlacement: ''
    },
    lastAppointment: persistedState.lastAppointment,
    bookingError: null,
    masters: [
        { id: 1, name: 'Алексей', specialization: 'Реализм', experience: '5 лет' },
        { id: 2, name: 'Мария', specialization: 'Минимализм', experience: '3 года' },
        { id: 3, name: 'Дмитрий', specialization: 'Традишнл', experience: '7 лет' },
        { id: 4, name: 'Ольга', specialization: 'Акварель', experience: '4 года' }
    ]
};

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setAppointmentData: (state, action) => {
            state.currentAppointment = { ...state.currentAppointment, ...action.payload };
        },

        addAppointment: (state) => {
            const currentPhone = String(state.currentAppointment.phone || '').replace(/\D/g, '');

            if (isPastAppointmentDate(state.currentAppointment.date)) {
                state.bookingError = 'Нельзя записаться на прошедшее время';
                return;
            }

            const isBusyByMaster = state.appointments.some(
                (item) =>
                    item.master === state.currentAppointment.master &&
                    item.date === state.currentAppointment.date &&
                    item.status === 'pending'
            );

            if (isBusyByMaster) {
                state.bookingError = 'На это время выбранный мастер уже занят';
                return;
            }

            const hasActivePhoneAppointment = state.appointments.some((item) => {
                const savedPhone = String(item.phone || '').replace(/\D/g, '');

                return savedPhone === currentPhone && item.status === 'pending';
            });

            if (hasActivePhoneAppointment) {
                state.bookingError = 'Этот номер уже имеет активную запись';
                return;
            }

            const newAppointment = {
                ...state.currentAppointment,
                id: Date.now(),
                status: 'pending',
                createdAt: new Date().toISOString(),
                completedAt: null,
                canceledAt: null
            };

            state.appointments.unshift(newAppointment);
            state.lastAppointment = newAppointment;
            state.bookingError = null;
            state.currentAppointment = {
                clientName: '',
                date: '',
                master: '',
                service: '',
                phone: '',
                tattooIdea: '',
                tattooSize: '',
                bodyPlacement: ''
            };
        },

        updateAppointmentStatus: (state, action) => {
            const { id, status } = action.payload;
            const appointment = state.appointments.find(item => item.id === id);

            if (appointment) {
                appointment.status = status;
                appointment.completedAt = status === 'completed'
                    ? new Date().toISOString()
                    : null;
                appointment.canceledAt = status === 'cancelled'
                    ? new Date().toISOString()
                    : null;
            }

            if (state.lastAppointment?.id === id) {
                state.lastAppointment.status = status;
                state.lastAppointment.completedAt = status === 'completed'
                    ? new Date().toISOString()
                    : null;
                state.lastAppointment.canceledAt = status === 'cancelled'
                    ? new Date().toISOString()
                    : null;
            }
        },

        deleteAppointment: (state, action) => {
            const id = action.payload;
            state.appointments = state.appointments.filter(item => item.id !== id);

            if (state.lastAppointment?.id === id) {
                state.lastAppointment = null;
            }
        },

        deleteCompletedAppointments: (state) => {
            const completedIds = new Set(
                state.appointments
                    .filter(item => item.status === 'completed')
                    .map(item => item.id)
            );

            state.appointments = state.appointments.filter(
                item => item.status !== 'completed'
            );

            if (state.lastAppointment && completedIds.has(state.lastAppointment.id)) {
                state.lastAppointment = null;
            }
        },

        deleteArchivedAppointments: (state) => {
            // Удаляем все записи со статусом completed или cancelled
            state.appointments = state.appointments.filter(
                item => item.status !== 'completed' && item.status !== 'cancelled'
            );
            // Если lastAppointment был архивным — обнуляем
            if (state.lastAppointment && 
                (state.lastAppointment.status === 'completed' || state.lastAppointment.status === 'cancelled')) {
                state.lastAppointment = null;
            }
        },

        clearBookingError: (state) => {
            state.bookingError = null;
        },

        setService: (state, action) => {
            state.currentAppointment.service = action.payload;
        },

        clearCurrentAppointment: (state) => {
            state.currentAppointment = {
                clientName: '',
                date: '',
                master: '',
                service: '',
                phone: '',
                tattooIdea: '',
                tattooSize: '',
                bodyPlacement: ''
            };
        },

        clearLastAppointment: (state) => {
            state.lastAppointment = null;
        }
    }
});

export const {
    setAppointmentData,
    addAppointment,
    clearCurrentAppointment,
    setService,
    clearLastAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    deleteCompletedAppointments,
    deleteArchivedAppointments,
    clearBookingError
} = appointmentSlice.actions;

export default appointmentSlice.reducer;