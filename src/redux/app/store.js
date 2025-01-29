import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/userSlice";
import { PolicyApi } from "../features/PolicySlice";
import { authApi } from "../features/authSlice";
import { DashboardApi } from "../features/dashboardApi";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [PolicyApi.reducerPath]: PolicyApi.reducer,
    [DashboardApi.reducerPath]: DashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      PolicyApi.middleware,
      authApi.middleware,
      DashboardApi.middleware
    ),
});

export default store;
