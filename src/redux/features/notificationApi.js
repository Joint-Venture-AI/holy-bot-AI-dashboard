import baseApi from "../app/baseApi";

export const NotificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        return {
          url: "/notification/admin",
          method: "GET",
          params,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
      },
      providesTags: ["Notification"],
      transformResponse: (response) => {
        return { data: response.data.result, meta: response.data.meta };
      },
    }),
    seeNofitication: builder.mutation({
      query: (data) => ({
        url: `/setting/create-terms`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Notification"],
    }),
    getNotification: builder.query({
      query: () => {
        return {
          url: "/notification/admin",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
      },
      providesTags: ["Notification"],
    }),

    deleteAllNotifications: builder.mutation({
      query: () => ({
        url: "/notification/delete-all",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Notification"],
    }),
    readNotification: builder.mutation({
      query: () => ({
        url: `/notification/admin`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Notification"],
    }),

    getANotification: builder.query({
      query: () => ({
        url: `/notification/admin`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetAllNotificationQuery,
  useSeeNofiticationMutation,
  useGetNotificationQuery,
  useDeleteAllNotificationsMutation,
  useReadNotificationMutation,
  useGetANotificationQuery,
} = NotificationApi;
