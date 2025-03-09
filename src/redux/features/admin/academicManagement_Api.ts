import { TQueryParams, TResponseRedux } from "../../../types";
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types/academicManagement.types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // acadmic semesters
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // params.append(args[0].name, args[0].value);
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
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

    // academic faculties.
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // params.append(args[0].name, args[0].value);
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return { data: response?.data, meta: response?.meta };
      },
    }),

    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),

    // academic departments
    getAllDepartments: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // params.append(args[0].name, args[0].value);
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-departments",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return { data: response?.data, meta: response?.meta };
      },
    }),

    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemestersMutation,
  useGetAllFacultiesQuery,
  useAddAcademicFacultyMutation,
  useGetAllDepartmentsQuery,
  useAddAcademicDepartmentMutation,
} = academicManagementApi;
