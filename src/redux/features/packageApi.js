import baseApi from "../app/baseApi";

export const PackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackages: builder.query({
      query: () => ({
        url: "/package/get-all-packages",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Package"],
    }),
    createPackage: builder.mutation({
      query: (updatedData) => ({
        url: "/package/create-package",
        method: "POST",
        body: updatedData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Package"],
    }),
  }),
});

export const { useGetAllPackagesQuery, useCreatePackageMutation } = PackageApi;
