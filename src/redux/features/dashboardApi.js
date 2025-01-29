import baseApi from "../app/baseApi";

export const DashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStatistics: builder.query({
      query: () => ({
        url: "/dashboard/get-total-statistics",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),
    getTotalEarning: builder.query({
      query: ({ year }) => ({
        url: `/dashboard/get-earning-chart-data?year=${year}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useGetAllStatisticsQuery, useGetTotalEarningQuery } =
  DashboardApi;
