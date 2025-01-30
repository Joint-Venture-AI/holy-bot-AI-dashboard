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

    getSinglePackage: builder.query({
      query: (id) => ({
        url: `/package/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Package"],
    }),
    updatePackage: builder.mutation({
      query: ({ id, value }) => {
        const token = localStorage.getItem("accessToken");

        return {
          url: `/package/update/${id}`,
          method: "PATCH",
          body: value,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Package"],
    }),
  }),
});

export const {
  useGetAllPackagesQuery,
  useCreatePackageMutation,
  useGetSinglePackageQuery,
  useUpdatePackageMutation,
} = PackageApi;
