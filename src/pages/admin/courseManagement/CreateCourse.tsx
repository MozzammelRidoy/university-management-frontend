import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement_Api";

const CreateCourse = () => {
  const { data: coursesData } = useGetAllCoursesQuery(undefined);
  console.log(coursesData);

  const preRequisiteCoursesOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const courseData = {
      cradits: Number(data.credits),
      code: Number(data.code),
      ...data,
      preRequisiteCourses: data.preRequisiteCourses.map((item) => ({
        course: item,
        isDeleted: false,
      })),
    };
    console.log(courseData);
    // try {
    //   const res = await addRegisterSemester(semesterData).unwrap();
    //   toast.success(res.message, { id: toastId, duration: 1000 });
    // } catch (err) {
    //   const errorMessage =
    //     (err as TError)?.data?.message || "Something went wrong!";
    //   toast.error(errorMessage, { id: toastId, duration: 1000 });
    // }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput name="title" label="Title" type="text" />
          <PHInput name="prefix" label="Prefix" type="text" />
          <PHInput name="code" label="Code" type="text" />
          <PHInput name="credits" label="Credits" type="text" />
          <PHSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            label="Pre RequisiteCourses"
            name="preRequisiteCourses"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};
export default CreateCourse;
