import { configureStore } from '@reduxjs/toolkit';
import appointmentSlice from './slices/appointmentSlice';
import servicesSlice from './slices/servicesSlice';

export const store = configureStore({
    reducer: {
        appointment: appointmentSlice,
        services: servicesSlice,
    },
});