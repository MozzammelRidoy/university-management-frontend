import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TError } from "../../../types";
import {
  useAddAcademicDepartmentMutation,
  useGetAllFacultiesQuery,
} from "../../../redux/features/admin/academicManagement_Api";
import PHSelect from "../../../components/form/PHSelect";
import { academicDepartmentValidationZodSchema } from "../../../validationSchema/academicSemester_validationZodSchema";

const CreateAcademicDepartment = () => {
  const { data: academicFacultyData } = useGetAllFacultiesQuery(undefined);

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const res = await addAcademicDepartment(departmentData).unwrap();
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
          resolver={zodResolver(academicDepartmentValidationZodSchema)}
        >
          <PHInput name="name" type="text" label="Name" />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions!}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
