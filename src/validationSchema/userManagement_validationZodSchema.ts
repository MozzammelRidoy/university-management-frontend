import { z } from "zod";

export const createStudentZodSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().min(1, "Middle name is required"),
    lastName: z.string().min(1, "Last name is required"),
  }),

  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender must be 'male', 'female' or 'other'" }),
  }),

  dateOfBirth: z.any({ required_error: "Date of Birth is required" }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
    errorMap: () => ({ message: "Invalid blood group" }),
  }),
  image: z.any(),

  email: z.string().email("Invalid email format"),
  contactNo: z.string().min(10, "Contact number must be at least 10 digits"),
  emergencyContactNo: z
    .string()
    .min(10, "Emergency contact number must be at least 10 digits"),

  presentAddress: z.string().min(5, "Present address is required"),
  permanentAddress: z.string().min(5, "Permanent address is required"),

  guardian: z.object({
    fatherName: z.string().min(1, "Father's name is required"),
    fatherOccupation: z.string().min(1, "Father's occupation is required"),
    fatherContactNo: z
      .string()
      .min(10, "Father's contact number must be at least 10 digits"),
    motherName: z.string().min(1, "Mother's name is required"),
    motherOccupation: z.string().min(1, "Mother's occupation is required"),
    motherContactNo: z
      .string()
      .min(10, "Mother's contact number must be at least 10 digits"),
  }),

  localGuardian: z.object({
    name: z.string().min(1, "Local guardian's name is required"),
    occupation: z.string().min(1, "Local guardian's occupation is required"),
    contactNo: z
      .string()
      .min(10, "Local guardian's contact number must be at least 10 digits"),
    address: z.string().min(5, "Local guardian's address is required"),
  }),

  addmissionSemester: z
    .string({ required_error: "Admission Semester is required" })
    .min(1, "Admission semester is required"),
  academicDepartment: z
    .string({ required_error: "Academic Department is required" })
    .min(1, "Academic department is required"),
});
export const updateStudentDetailsZodSchema = z.object({
  name: z
    .object({
      firstName: z.string().min(1, "First name is required").optional(),
      middleName: z.string().min(1, "Middle name is required").optional(),
      lastName: z.string().min(1, "Last name is required").optional(),
    })
    .optional(),

  gender: z
    .enum(["male", "female", "other"], {
      errorMap: () => ({
        message: "Gender must be 'male', 'female' or 'other'",
      }),
    })
    .optional(),

  dateOfBirth: z
    .any({ required_error: "Date of Birth is required" })
    .optional(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
      errorMap: () => ({ message: "Invalid blood group" }),
    })
    .optional(),
  image: z.any().optional(),

  email: z.string().email("Invalid email format").optional(),
  contactNo: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .optional(),
  emergencyContactNo: z
    .string()
    .min(10, "Emergency contact number must be at least 10 digits")
    .optional(),

  presentAddress: z.string().min(5, "Present address is required").optional(),
  permanentAddress: z
    .string()
    .min(5, "Permanent address is required")
    .optional(),

  guardian: z
    .object({
      fatherName: z.string().min(1, "Father's name is required").optional(),
      fatherOccupation: z
        .string()
        .min(1, "Father's occupation is required")
        .optional(),
      fatherContactNo: z
        .string()
        .min(10, "Father's contact number must be at least 10 digits")
        .optional(),
      motherName: z.string().min(1, "Mother's name is required").optional(),
      motherOccupation: z
        .string()
        .min(1, "Mother's occupation is required")
        .optional(),
      motherContactNo: z
        .string()
        .min(10, "Mother's contact number must be at least 10 digits")
        .optional(),
    })
    .optional(),

  localGuardian: z
    .object({
      name: z.string().min(1, "Local guardian's name is required").optional(),
      occupation: z
        .string()
        .min(1, "Local guardian's occupation is required")
        .optional(),
      contactNo: z
        .string()
        .min(10, "Local guardian's contact number must be at least 10 digits")
        .optional(),
      address: z
        .string()
        .min(1, "Local guardian's address is required")
        .optional(),
    })
    .optional(),

  addmissionSemester: z
    .string({ required_error: "Admission Semester is required" })
    .min(1, "Admission semester is required")
    .optional(),
  academicDepartment: z
    .string({ required_error: "Academic Department is required" })
    .min(1, "Academic department is required")
    .optional(),
});

export const createAdminZodSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().min(1, "Middle name is required"),
    lastName: z.string().min(1, "Last name is required"),
  }),

  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender must be 'male', 'female' or 'other'" }),
  }),

  dateOfBirth: z.any({ required_error: "Date of Birth is required" }),
  bloogGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
    errorMap: () => ({ message: "Invalid blood group" }),
  }),
  image: z.any(),

  email: z.string().email("Invalid email format"),
  contactNo: z.string().min(10, "Contact number must be at least 10 digits"),
  emergencyContactNo: z
    .string()
    .min(10, "Emergency contact number must be at least 10 digits"),

  presentAddress: z.string().min(5, "Present address is required"),
  permanentAddress: z.string().min(5, "Permanent address is required"),
  designation: z.string().min(1, "Admin designation is required"),
});

export const createFacultyZodSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().min(1, "Middle name is required"),
    lastName: z.string().min(1, "Last name is required"),
  }),

  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender must be 'male', 'female' or 'other'" }),
  }),

  dateOfBirth: z.any({ required_error: "Date of Birth is required" }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
    errorMap: () => ({ message: "Invalid blood group" }),
  }),
  image: z.any(),

  email: z.string().email("Invalid email format"),
  contactNo: z.string().min(10, "Contact number must be at least 10 digits"),
  emergencyContactNo: z
    .string()
    .min(10, "Emergency contact number must be at least 10 digits"),

  presentAddress: z.string().min(5, "Present address is required"),
  permanentAddress: z.string().min(5, "Permanent address is required"),
  degisnation: z.string().min(1, "Admin designation is required"),
  academicDepartment: z
    .string({ required_error: "Academic Department is required" })
    .min(1, "Academic department is required"),
});
