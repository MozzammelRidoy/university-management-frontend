import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement_Api";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStudentZodSchema } from "../../../validationSchema/userManagement_validationZodSchema";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement_Api";

// const studentDummyData = {
//   password: "student123",
//   student: {
//     name: {
//       firstName: "Torun",
//       middleName: "Michael",
//       lastName: "Zoe",
//     },
//     gender: "male",
//     dateOfBirth: "2000-05-15",
//     bloodGroup: "O+",

//     email: "student3@email.com",
//     contactNo: "+1234567890",
//     emergencyContactNo: "+0987654321",
//     presentAddress: "123 Main Street, City, Country",
//     permanentAddress: "456 Elm Street, City, Country",

//     guardian: {
//       fatherName: "Robert Doe",
//       fatherOccupation: "Engineer",
//       fatherContactNo: "+1234000011",
//       motherName: "Jane Doe",
//       motherOccupation: "Teacher",
//       motherContactNo: "+1234000022",
//     },
//     localGuardian: {
//       name: "Uncle Sam",
//       occupation: "Doctor",
//       contactNo: "+1234000033",
//       address: "block c panthapath dahak",
//     },
//     addmissionSemester: "678b8545e47a30c4be209a4b",
//     academicDepartment: "678b83a3b665320bc45e746e",
//   },
// };

// this is only for development.
// should be removed
const studentDefaultValues = {
  name: {
    firstName: "Torun",
    middleName: "Michael",
    lastName: "Zoe",
  },
  gender: "male",
  bloodGroup: "O+",

  email: "student3@email.com",
  contactNo: "+1234567890",
  emergencyContactNo: "+0987654321",
  presentAddress: "123 Main Street, City, Country",
  permanentAddress: "456 Elm Street, City, Country",

  guardian: {
    fatherName: "Robert Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "+1234000011",
    motherName: "Jane Doe",
    motherOccupation: "Teacher",
    motherContactNo: "+1234000022",
  },
  localGuardian: {
    name: "Uncle Sam",
    occupation: "Doctor",
    contactNo: "+1234000033",
    address: "block c panthapath dahak",
  },
  // addmissionSemester: "678b8545e47a30c4be209a4b",
  // academicDepartment: "678b83a3b665320bc45e746e",
};
const CreateStudent = () => {
  const { data: semesterData, isLoading: semesterIsLoading } =
    useGetAllSemestersQuery(undefined);

  // const { data: departmentData, isLoading: departmentIsLoading } =
  //   useGetAllDepartmentsQuery(undefined, { skip: semesterIsLoading });

  const { data: departmentData, isLoading: departmentIsLoading } =
    useGetAllDepartmentsQuery(undefined, { skip: semesterIsLoading });

  const semestersOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log(data, error);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    const studentData = {
      password: "student123",
      student: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);
    // formData.append("something", "data of something");
    // formData.append("data", JSON.stringify(data));

    //! This is for development. just for checking.
    // console.log(formData.get("something"));
    // console.log([...formData.entries()]);
    // console.log(Object.fromEntries(formData));

    addStudent(formData);
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createStudentZodSchema)}
          defaultValues={studentDefaultValues}
        >
          {/* Student Personal Information  */}
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
            {/* Student Contact Information  */}
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
            {/* Student Guardian Information  */}
            <Divider>Guardian Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherName"
                type="text"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherOccupation"
                type="text"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherContactNo"
                type="text"
                label="Father Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherName"
                type="text"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherOccupation"
                type="text"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherContactNo"
                type="text"
                label="Mother Contact No."
              />
            </Col>
            {/* Student Local Guardian Information  */}
            <Divider>Local Guardian Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="localGuardian.name" type="text" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.occupation"
                type="text"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.contactNo"
                type="text"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.address"
                type="text"
                label="Address"
              />
            </Col>
            <Divider>Academic Info.</Divider>
            <Col span={24} md={{ span: 12 }}>
              <PHSelect
                disabled={semesterIsLoading}
                name="addmissionSemester"
                options={semestersOptions}
                label="Addmission Semester"
              />
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

export default CreateStudent;
