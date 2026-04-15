import { configureStore } from '@reduxjs/toolkit';
import appointmentSlice from './slices/appointmentSlice';
import servicesSlice from './slices/servicesSlice';
import { saveAppointmentState } from '../utils/appointmentStorage';

export const store = configureStore({
    reducer: {
        appointment: appointmentSlice,
        services: servicesSlice,
    },
});

store.subscribe(() => {
    const { appointment } = store.getState();

    saveAppointmentState({
        appointments: appointment.appointments,
        lastAppointment: appointment.lastAppointment
    });
});