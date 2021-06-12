import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import covideReducer from '../features/covid/covidSlice';

export const store = configureStore({
  reducer: {
    covid: covideReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
