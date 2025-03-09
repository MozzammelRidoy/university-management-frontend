import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academicManagement_Api";

const AcademicFaculty = () => {
  const { data } = useGetAllFacultiesQuery(undefined);
  console.log(data);
  return <div></div>;
};

export default AcademicFaculty;
