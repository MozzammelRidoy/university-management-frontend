import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import {
  useAddOfferCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement_Api";
import {
  useGetAllDepartmentsQuery,
  useGetAllFacultiesQuery,
} from "../../../redux/features/admin/academicManagement_Api";
import { useGetAllFacultiesUserQuery } from "../../../redux/features/admin/userManagement_Api";
import PHTimePicker from "../../../components/form/PHTimePicker";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import moment from "moment";
import { toast } from "sonner";

const daysOptions = [
  { value: "Sat", label: "Sat" },
  { value: "Sun", label: "Sun" },
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
];

const OfferCourse = () => {
  const [id, setId] = useState("");
  const { data: academicSemesterData } =
    useGetAllRegisteredSemestersQuery(undefined);

  const [addOfferCourse] = useAddOfferCourseMutation();

  const academicSemestersOptions = academicSemesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
  }));

  const { data: academicFacultyData } = useGetAllFacultiesQuery(undefined);
  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const { data: academicDepartmentData } = useGetAllDepartmentsQuery(undefined);
  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.name}`,
    })
  );
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const coursesOptions = courseData?.data?.map((item) => ({
    value: item._id,
    label: `${item.title}`,
  }));
  const { data: facultyData } = useGetCourseFacultiesQuery(id, {
    skip: !id,
  });
  const facultyOptions = facultyData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`,
  }));

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating...");
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: data.startTime.format("HH:mm"),
      endTime: data.endTime.format("HH:mm"),
    };
    const res = await addOfferCourse(offeredCourseData);
    if (res?.data?.success) {
      toast.success(res?.data?.message || "Created Success", {
        id: toastId,
        duration: 1000,
      });
    } else {
      toast.error(res?.error?.data?.message || "Creating failed!", {
        id: toastId,
        duration: 1000,
      });
    }
    toast.dismiss();
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name={"semesterRegistration"}
            label={"Semester Registration"}
            options={academicSemestersOptions}
          />
          <PHSelect
            name={"academicFaculty"}
            label={"Academic Faculty"}
            options={academicFacultyOptions}
          />
          <PHSelect
            name={"academicDepartment"}
            label={"Academic Department"}
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            onValueChange={setId}
            name={"course"}
            label={"Course"}
            options={coursesOptions}
          />
          <PHSelect
            name={"faculty"}
            label={"Faculty"}
            options={facultyOptions}
            disabled={!id}
          />
          <PHInput name="maxCapacity" label="Max Capacity" type="text" />
          <PHInput name="section" label="Section" type="text" />
          <PHSelect
            name={"days"}
            label={"Days"}
            mode="multiple"
            options={daysOptions}
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
