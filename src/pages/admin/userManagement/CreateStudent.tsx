import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button } from "antd";

const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "Torun",
      middleName: "Michael",
      lastName: "Zoe",
    },
    gender: "male",
    dateOfBirth: "2000-05-15",
    email: "student3@email.com",
    contactNo: "+1234567890",
    emergencyContactNo: "+0987654321",
    bloodGroup: "O+",
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
    addmissionSemester: "678b8545e47a30c4be209a4b",
    academicDepartment: "678b83a3b665320bc45e746e",
  },
};

const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);

    const formData = new FormData();

    // formData.append("something", "data of something");
    formData.append("data", JSON.stringify(data));

    //! This is for development. just for checking.
    // console.log(formData.get("something"));
    // console.log([...formData.entries()]);
    console.log(Object.fromEntries(formData));
  };
  return (
    <PHForm onSubmit={onSubmit}>
      <PHInput name="name" type="text" label="Name" />
      <Button htmlType="submit">Submit</Button>
    </PHForm>
  );
};

export default CreateStudent;
