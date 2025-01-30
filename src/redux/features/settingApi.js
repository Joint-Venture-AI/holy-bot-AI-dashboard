import baseApi from "../app/baseApi";

export const SettingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTerms: builder.query({
      query: () => ({
        url: "/setting/get-terms",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Settings"],
    }),

    updateTerms: builder.mutation({
      query: (updatedData) => ({
        url: "/setting/create-terms",
        method: "POST",
        body: updatedData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Settings"],
    }),

    updatePrivacy: builder.mutation({
      query: (updatedData) => ({
        url: "/setting/create-privacy",
        method: "POST",
        body: updatedData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Settings"],
    }),

    getPrivacy: builder.query({
      query: () => ({
        url: "/setting/get-privacy",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Settings"],
    }),

    updateTrust: builder.mutation({
      query: (updatedData) => ({
        url: "/setting/create-trust",
        method: "POST",
        body: updatedData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Settings"],
    }),

    getTrust: builder.query({
      query: () => ({
        url: "/setting/get-trust",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetAllTermsQuery,
  useUpdateTermsMutation,
  useUpdatePrivacyMutation,
  useGetPrivacyQuery,
  useUpdateTrustMutation,
  useGetTrustQuery,
} = SettingApi;
