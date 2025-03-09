import { z } from "zod";

export const academicSemesterValidationZodSchema = z.object({
  name: z.string({ required_error: "Please select a Name" }),
  year: z.string({ required_error: "Please select a Year" }),
  startMonth: z.string({ required_error: "Please select a Start Month" }),
  endMonth: z.string({ required_error: "Please select a End Month" }),
});

export const academicFaculyValidationZodSchema = z.object({
  name: z.string({ required_error: "Name is required!" }),
});

export const academicDepartmentValidationZodSchema = z.object({
  name: z.string({ required_error: "Name is required!" }),
  academicFaculty: z.string({
    required_error: "Please select a Academic Faculty",
  }),
});
