import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import { createFacultyZodSchema } from "../../../validationSchema/userManagement_validationZodSchema";
import { useGetAllDepartmentsQuery } from "../../../redux/features/admin/academicManagement_Api";

const facultyDefaultValues = {
  degisnation: "Professor",
  name: {
    firstName: "Tafuk",
    middleName: "A.",
    lastName: "Doe",
  },
  gender: "male",

  bloodGroup: "O+",
  email: "faculty3@example.com",
  contactNo: "+1234567890",
  emergencyContactNo: "+0987654321",
  presentAddress: "123 University Road, Cityville, State",
  permanentAddress: "456 Hometown Lane, Townsville, State",
  academicDepartment: "678b83d8b665320bc45e7471",
};
const CreateFaculty = () => {
  const [addFaculty, { data, error }] = useAddAdminMutation();
  const { data: academicDepData, isLoading: departmentIsLoading } =
    useGetAllDepartmentsQuery(undefined);
  const departmentOptions = academicDepData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  console.log(data, error);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyData = {
      password: "faculty123",
      faculty: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.image);

    addFaculty(formData);
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createFacultyZodSchema)}
          defaultValues={facultyDefaultValues}
        >
          {/* Admin Personal Information  */}
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="name.firstName" type="text" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="name.middleName" type="text" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="name.lastName" type="text" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect name="gender" options={genderOptions} label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="bloodGroup"
                options={bloodGroupOptions}
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      {...field}
                      value={value?.fileName}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            {/* Admin Contact Information  */}
            <Divider>Contact Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="email" type="text" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="contactNo" type="text" label="Contact No." />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="emergencyContactNo"
                type="text"
                label="Emergency Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="presentAddress"
                type="text"
                label="Pressent Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="permanentAddress"
                type="text"
                label="Permanent Addess"
              />
            </Col>
            <Divider>Designation</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="designation" type="text" label="Designation" />
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <PHSelect
                name="academicDepartment"
                options={departmentOptions}
                disabled={departmentIsLoading}
                label="Academic Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
