import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: () => ({
        url: "/academic-semester",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAcademicSemesterQuery } = academicSemesterApi;
