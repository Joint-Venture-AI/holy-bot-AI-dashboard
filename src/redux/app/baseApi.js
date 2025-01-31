import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.10.199:5002/api/v1" }),
  tagTypes: [
    "User",
    "Auth",
    "Dashboard",
    "Notification",
    "AboutUs",
    "Privacy",
    "terms",
    "Transaction",
    "Settings",
    "Package",
    "Notification",
    "Question",
  ], // Added all necessary tags
  endpoints: () => ({}), // Empty object for the base API setup
});

export default baseApi;
