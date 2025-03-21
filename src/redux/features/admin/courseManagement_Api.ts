import {
  TQueryParams,
  TRegisterdSemester,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // acadmic semesters
    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // params.append(args[0].name, args[0].value);
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<TRegisterdSemester[]>) => {
        return { data: response?.data, meta: response?.meta };
      },
    }),

    addRegisteredSemesters: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    updateRegisteredSemesters: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),

    // for courses.
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // params.append(args[0].name, args[0].value);
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<any>) => {
        return { data: response?.data, meta: response?.meta };
      },
    }),

    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    addFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["courses"],
    }),

    getCourseFaculties: builder.query({
      query: (id) => {
        return {
          url: `/courses/${id}/get-faculties`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return { data: response?.data, meta: response?.meta };
      },
    }),
    addOfferCourse: builder.mutation({
      query: (data) => ({
        url: `/offered-courses/create-offered-course`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
  }),
});

export const {
  useAddRegisteredSemestersMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemestersMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useAddFacultiesMutation,
  useGetCourseFacultiesQuery,
  useAddOfferCourseMutation,
} = courseManagementApi;
