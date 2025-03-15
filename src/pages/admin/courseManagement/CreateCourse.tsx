import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement_Api";
import { TError } from "../../../types";

const CreateCourse = () => {
  const { data: coursesData } = useGetAllCoursesQuery([
    { name: "limit", value: 100 },
    { name: "sort", value: "-createdAt" },
  ]);
  const [createCourse] = useAddCourseMutation();

  const preRequisiteCoursesOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data.perpreRequisiteCourses
        ? data.preRequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    try {
      const res = await createCourse(courseData).unwrap();
      toast.success(res.message, { id: toastId, duration: 1000 });
    } catch (err) {
      const errorMessage =
        (err as TError)?.data?.message || "Something went wrong!";
      toast.error(errorMessage, { id: toastId, duration: 1000 });
    }
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
