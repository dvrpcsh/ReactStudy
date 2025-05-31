// src/app/store.js

/** 
 * 여기서 store는 앱 전체 상태를 보관하는 중앙 저장소입니다.
configureStore로 생성하며, counterReducer를 연결해줍니다.
*/
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
