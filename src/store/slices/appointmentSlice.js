import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appointments: [],
    currentAppointment: {
        date: '',
        master: '',
        service: '',
        phone: ''
    },
    lastAppointment: null, 
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
            const newAppointment = {
                ...state.currentAppointment,
                id: Date.now(),
                createdAt: new Date().toISOString()
            };
            state.appointments.push(newAppointment);
            state.lastAppointment = newAppointment; 
            state.currentAppointment = {
                date: '',
                master: '',
                service: '',
                phone: ''
            };
        },
        setService: (state, action) => {
            state.currentAppointment.service = action.payload;
        },
        clearCurrentAppointment: (state) => {
            state.currentAppointment = {
                date: '',
                master: '',
                service: '',
                phone: ''
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
    clearLastAppointment
} = appointmentSlice.actions;
export default appointmentSlice.reducer;