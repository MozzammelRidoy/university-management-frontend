import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";
import { TError } from "../../../types";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement_Api";
import { academicFaculyValidationZodSchema } from "../../../validationSchema/academicSemester_validationZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const facultyData = {
      name: data.name,
    };

    try {
      const res = await addAcademicFaculty(facultyData).unwrap();
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
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFaculyValidationZodSchema)}
        >
          <PHInput name="name" type="text" label="name" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
