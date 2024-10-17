import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../features/studentsSlice';

const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});

export default store;
