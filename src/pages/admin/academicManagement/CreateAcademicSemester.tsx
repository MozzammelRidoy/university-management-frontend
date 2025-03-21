import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constant/semester";
import { monthOptions } from "../../../constant/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterValidationZodSchema } from "../../../validationSchema/academicSemester_validationZodSchema";
import { useAddAcademicSemestersMutation } from "../../../redux/features/admin/academicManagement_Api";
import { toast } from "sonner";
import { TError } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemestersMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const toastId = toast.loading("Creating...");
    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = await addAcademicSemester(semesterData).unwrap();
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
          resolver={zodResolver(academicSemesterValidationZodSchema)}
        >
          <PHSelect name={"name"} label={"Name"} options={semesterOptions} />
          <PHSelect name={"year"} label={"Year"} options={yearOptions} />
          <PHSelect
            name={"startMonth"}
            label={"Start Month"}
            options={monthOptions}
          />
          <PHSelect
            name={"endMonth"}
            label={"End Month"}
            options={monthOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
