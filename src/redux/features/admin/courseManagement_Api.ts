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
    }),
  }),
});

export const {
  useAddRegisteredSemestersMutation,
  useGetAllRegisteredSemestersQuery,
} = courseManagementApi;
