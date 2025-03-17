import {
  TAdminData,
  TFacultyData,
  TQueryParams,
  TResponseRedux,
  TStudentData,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // for Student
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // params.append(args[0].name, args[0].value);
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudentData[]>) => {
        return { data: response?.data, meta: response?.meta };
      },
    }),
    getSingleStudent: builder.query({
      query: (studentId) => {
        return {
          url: `/students/${studentId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TStudentData>) => {
        return { data: response?.data };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    updateStudentDetails: builder.mutation({
      query: ({ studentId, formData }) => ({
        url: `/students/${studentId}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    // for Admin
    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // params.append(args[0].name, args[0].value);
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admins",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdminData[]>) => {
        return { data: response?.data, meta: response?.meta };
      },
    }),
    getSingleAdmin: builder.query({
      query: (adminId) => {
        return {
          url: `/admins/${adminId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAdminData>) => {
        return { data: response?.data };
      },
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
    updateAdminDetails: builder.mutation({
      query: ({ adminId, formData }) => ({
        url: `/admins/${adminId}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    // for Faculty
    getAllFacultiesUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // params.append(args[0].name, args[0].value);
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TFacultyData[]>) => {
        return { data: response?.data, meta: response?.meta };
      },
    }),
    getSingleFacultyUser: builder.query({
      query: (facultyId) => {
        return {
          url: `/faculties/${facultyId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TFacultyData>) => {
        return { data: response?.data };
      },
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),

    updateFacultyDetails: builder.mutation({
      query: ({ facultyId, formData }) => ({
        url: `/faculties/${facultyId}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useUpdateStudentDetailsMutation,
  useGetAllAdminsQuery,
  useGetSingleAdminQuery,
  useAddAdminMutation,
  useUpdateAdminDetailsMutation,
  useGetAllFacultiesUserQuery,
  useGetSingleFacultyUserQuery,
  useAddFacultyMutation,
  useUpdateFacultyDetailsMutation,
  useChangePasswordMutation,
} = userManagementApi;
