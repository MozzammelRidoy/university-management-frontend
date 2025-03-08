import { TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // params.append(args[0].name, args[0].value);
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/academic-semester",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return { data: response?.data, meta: response?.meta };
      },
    }),
    // getAllSemesters: builder.query({
    //   query: () => ({
    //     url: "/academic-semester",
    //     method: "GET",
    //     params: { name: "Fall" },
    //   }),
    //   transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
    //     return { data: response?.data, meta: response?.meta };
    //   },
    // }),
    addAcademicSemesters: builder.mutation({
      query: (data) => ({
        url: "/academic-semester/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllSemestersQuery, useAddAcademicSemestersMutation } =
  academicManagementApi;
