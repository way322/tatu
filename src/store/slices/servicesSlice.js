import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    services: [
        {
            id: 1,
            title: 'Эскизная татуировка',
            description: 'Создание уникального эскиза и его нанесение',
            price: 'от 5000 руб.',
            duration: '2-4 часа',
            details: 'Индивидуальный подход к созданию эскиза, консультация по размещению и размеру татуировки.'
        },
        {
            id: 2,
            title: 'Перекрытие старых тату',
            description: 'Перекрытие или коррекция старых татуировок',
            price: 'от 8000 руб.',
            duration: '3-6 часов',
            details: 'Профессиональная работа с существующими татуировками, подбор оптимального решения.'
        },
        {
            id: 3,
            title: 'Минимализм',
            description: 'Небольшие и стильные татуировки',
            price: 'от 3000 руб.',
            duration: '1-2 часа',
            details: 'Идеально для первого тату или добавления к существующей коллекции.'
        },
        {
            id: 4,
            title: 'Консультация',
            description: 'Профессиональная консультация перед тату',
            price: 'бесплатно',
            duration: '30 мин',
            details: 'Обсуждение идеи, подбор стиля, консультация по уходу и всем вопросам.'
        }
    ],
    selectedService: null
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setSelectedService: (state, action) => {
            state.selectedService = action.payload;
        },
        clearSelectedService: (state) => {
            state.selectedService = null;
        }
    }
});

export const { setSelectedService, clearSelectedService } = servicesSlice.actions;
export default servicesSlice.reducer;