import { APPOINTMENTS_STORAGE_KEY } from '../constants/admin';

export const loadAppointmentState = () => {
    if (typeof window === 'undefined') {
        return {
            appointments: [],
            lastAppointment: null
        };
    }

    try {
        const savedData = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);

        if (!savedData) {
            return {
                appointments: [],
                lastAppointment: null
            };
        }

        const parsedData = JSON.parse(savedData);
        let appointments = Array.isArray(parsedData.appointments) ? parsedData.appointments : [];
        let lastAppointment = parsedData.lastAppointment || null;

        // Миграция: для отменённых записей без canceledAt проставляем дату создания или текущую
        appointments = appointments.map(app => {
            if (app.status === 'cancelled' && !app.canceledAt) {
                return { ...app, canceledAt: app.createdAt || new Date().toISOString() };
            }
            // Для завершённых записей без completedAt – тоже проставим
            if (app.status === 'completed' && !app.completedAt) {
                return { ...app, completedAt: app.createdAt || new Date().toISOString() };
            }
            return app;
        });

        // Аналогично для lastAppointment
        if (lastAppointment && lastAppointment.status === 'cancelled' && !lastAppointment.canceledAt) {
            lastAppointment = { ...lastAppointment, canceledAt: lastAppointment.createdAt || new Date().toISOString() };
        }
        if (lastAppointment && lastAppointment.status === 'completed' && !lastAppointment.completedAt) {
            lastAppointment = { ...lastAppointment, completedAt: lastAppointment.createdAt || new Date().toISOString() };
        }

        return {
            appointments,
            lastAppointment
        };
    } catch (error) {
        console.error('Ошибка загрузки записей из localStorage:', error);
        return {
            appointments: [],
            lastAppointment: null
        };
    }
};

export const saveAppointmentState = (appointmentState) => {
    if (typeof window === 'undefined') return;

    try {
        const dataToSave = {
            appointments: appointmentState.appointments,
            lastAppointment: appointmentState.lastAppointment
        };
        localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
        console.error('Ошибка сохранения записей в localStorage:', error);
    }
};