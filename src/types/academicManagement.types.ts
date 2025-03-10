export type TAcademicSemester = {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: {
    createdAt: string;
    updatedAt: string;
    __v: number;
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};
