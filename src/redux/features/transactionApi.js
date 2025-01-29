import baseApi from "../app/baseApi";

export const TransactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: () => ({
        url: "/subscription/get-subs-admin",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useGetAllTransactionsQuery } = TransactionApi;
