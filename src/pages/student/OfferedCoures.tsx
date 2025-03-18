import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/student_Course_Management_Api";

const OfferedCoures = () => {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
  const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });
    return acc;
  }, {});
  return (
    <div>
      <h2>Student Offered Coures</h2>
    </div>
  );
};

export default OfferedCoures;
