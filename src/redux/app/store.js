import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/userSlice";
import { PolicyApi } from "../features/PolicySlice";
import { authApi } from "../features/authSlice";
import { DashboardApi } from "../features/dashboardApi";
import { TransactionApi } from "../features/transactionApi";
import { SettingApi } from "../features/settingApi";
import { PackageApi } from "../features/packageApi";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [PolicyApi.reducerPath]: PolicyApi.reducer,
    [DashboardApi.reducerPath]: DashboardApi.reducer,
    [TransactionApi.reducerPath]: TransactionApi.reducer,
    [SettingApi.reducerPath]: SettingApi.reducer,
    [PackageApi.reducerPath]: PackageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      PolicyApi.middleware,
      authApi.middleware,
      DashboardApi.middleware,
      TransactionApi.middleware,
      SettingApi.middleware,
      PackageApi.middleware
    ),
});

export default store;
