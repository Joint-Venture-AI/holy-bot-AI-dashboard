import baseApi from "../app/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users

    fetchUsers: builder.query({
      query: () => ({
        url: "/user/get-all-users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["User"], // Provides 'User' tag
    }),

    // Get notifications
    notification: builder.query({
      query: () => ({
        url: "/notification",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Notification"], // Provides 'Notification' tag for notifications
    }),

    // Get login info
    loginInfo: builder.query({
      query: () => ({
        url: "/auth/login",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    // Get admin profile
    adminProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["User"],
    }),

    // Update user profile
    updateProfile: builder.mutation({
      query: (userInfo) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: userInfo,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useNotificationQuery,
  useLoginInfoQuery,
  useAdminProfileQuery,
  useUpdateProfileMutation,
} = userApi;
