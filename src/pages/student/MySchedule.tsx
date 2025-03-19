import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/student_Course_Management_Api";

const MySchedule = () => {
  const { data } = useGetAllEnrolledCoursesQuery(undefined);
  return (
    <div>
      {data?.data?.map((item) => {
        return (
          <div>
            <div>{item.course.title}</div>
            <div>{item.offeredCourse.section}</div>
            <div>
              {item.offeredCourse.days.map((item) => (
                <span> {item}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MySchedule;
