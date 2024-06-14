import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/reducers";

const store = configureStore({
    reducer: rootReducer,
});
const initialState = {
    id: '',
    username: '',
    email: '',
    // Otros campos de usuario que puedas tener
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          ...action.payload,
        };
      case 'CLEAR_USER':
        return initialState;
      default:
        return state;
    }
  };
export default store;