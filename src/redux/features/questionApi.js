import baseApi from "../app/baseApi";

export const QuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      query: ({ page, limit, email, question }) => ({
        url: `/request/get-all-admin?page=${page}&limit=${limit}&email=${email}&searchTerm=${question}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Question"],
    }),

    getSingleQuestion: builder.query({
      query: (id) => ({
        url: `/request/get/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Question"],
    }),
  }),
});

export const { useGetAllQuestionsQuery, useGetSingleQuestionQuery } =
  QuestionApi;
