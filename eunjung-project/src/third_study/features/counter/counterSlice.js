// src/features/counter/counterSlice.js

/** 
 * 여기서 increment, decrement는 각각 다음과 같은 액션 객체를 생성
*/

/** 
 *  위 코드에서 reducers 항목이 바로 리듀서입니다.
액션에 따라 새로운 상태를 반환하는 순수 함수 역할을 합니다.
*/
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
