import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import { semesterStatusOptions } from "../../../constant/semester";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement_Api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemestersMutation } from "../../../redux/features/admin/courseManagement_Api";
import { TError } from "../../../types";

const SemesterRegistration = () => {
  const [addRegisterSemester] = useAddRegisteredSemestersMutation();

  const { data: academicSemesters } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemestersOptions = academicSemesters?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    console.log(semesterData);
    try {
      const res = await addRegisterSemester(semesterData).unwrap();
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
          <PHSelect
            name={"academicSemester"}
            label={"Academic Semester"}
            options={academicSemestersOptions}
          />
          <PHSelect
            name={"status"}
            label={"Semester Status"}
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput name="minCredit" label="Min Credit" type="text" />
          <PHInput name="maxCredit" label="Max Credit" type="text" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};
export default SemesterRegistration;
