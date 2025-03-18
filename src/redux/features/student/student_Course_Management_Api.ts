import { TQueryParams, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const studentCourseAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // acadmic semesters
    getMyAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<any>) => {
        return { data: response?.data, meta: response?.meta };
      },
    }),

    addRegisteredSemesters: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
  }),
});

export const {} = studentCourseAPI;
