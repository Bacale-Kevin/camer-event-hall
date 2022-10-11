import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import categoryReducer from "./features/categories/categorySlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof combinedReducer>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const reduxWrapper = createWrapper<AppStore>(makeStore);
