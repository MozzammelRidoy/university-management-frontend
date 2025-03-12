import React from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Button, Col, Divider, Form, Input, Row, Spin } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Local Imports
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";

import { updateStudentDetailsZodSchema } from "../../../validationSchema/userManagement_validationZodSchema";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import {
  useGetSingleStudentQuery,
  useUpdateStudentDetailsMutation,
} from "../../../redux/features/admin/userManagement_Api";
import {
  useGetAllDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement_Api";
import { toast } from "sonner";

const StudentUpdate: React.FC = () => {
  const { studentId } = useParams();

  const { data: studentDetails, isLoading: studentLoading } =
    useGetSingleStudentQuery(studentId);

  const [updateStudentDetails, { data: studentupdateData }] =
    useUpdateStudentDetailsMutation();

  // Fetch All Semesters (Skip until student is loaded)
  const { data: semesterData, isLoading: semesterLoading } =
    useGetAllSemestersQuery(undefined);

  // Fetch All Departments (Skip until semesters are loaded)
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery(undefined, { skip: semesterLoading });

  // Map Semesters and Departments to <Select> options
  const semestersOptions = semesterData?.data?.map((item: any) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = departmentData?.data?.map((item: any) => ({
    value: item._id,
    label: item.name,
  }));

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (stuData) => {
    if (!studentId) {
      console.error("No student ID provided");
      return;
    }

    const payload = {
      student: stuData,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    if (stuData.image) {
      formData.append("file", stuData.image);
    }

    // Pass studentId along with formData to RTK query
    updateStudentDetails({ studentId, formData });
    if (studentupdateData?.success) {
      toast.success(
        studentupdateData?.message || "Student details updated success",
        {
          duration: 1000,
        }
      );
    } else {
      toast.error(
        studentupdateData?.message || "Student details updating failed!",
        {
          duration: 1000,
        }
      );
    }
  };

  // Loading state
  if (studentLoading) {
    return <Spin size="large" />;
  }

  // Define default form values
  const defaultValues = {
    name: {
      firstName: studentDetails?.data?.name?.firstName || "",
      middleName: studentDetails?.data?.name?.middleName || "",
      lastName: studentDetails?.data?.name?.lastName || "",
    },
    gender: studentDetails?.data?.gender || "",
    // Use dayjs to safely handle DatePicker values
    dateOfBirth: studentDetails?.data?.dateOfBirth
      ? dayjs(studentDetails?.data?.dateOfBirth)
      : null,
    email: studentDetails?.data?.email || "",
    contactNo: studentDetails?.data?.contactNo || "",
    emergencyContactNo: studentDetails?.data?.emergencyContactNo || "",
    bloodGroup: studentDetails?.data?.bloodGroup || "",
    presentAddress: studentDetails?.data?.presentAddress || "",
    permanentAddress: studentDetails?.data?.permanentAddress || "",
    guardian: {
      fatherName: studentDetails?.data?.guardian?.fatherName || "",
      fatherOccupation: studentDetails?.data?.guardian?.fatherOccupation || "",
      fatherContactNo: studentDetails?.data?.guardian?.fatherContactNo || "",
      motherName: studentDetails?.data?.guardian?.motherName || "",
      motherOccupation: studentDetails?.data?.guardian?.motherOccupation || "",
      motherContactNo: studentDetails?.data?.guardian?.motherContactNo || "",
    },
    localGuardian: {
      name: studentDetails?.data?.localGuardian?.name || "",
      occupation: studentDetails?.data?.localGuardian?.occupation || "",
      contactNo: studentDetails?.data?.localGuardian?.contactNo || "",
      address: studentDetails?.data?.localGuardian?.address || "",
    },
    addmissionSemester: studentDetails?.data?.addmissionSemester?._id || "",
    academicDepartment: studentDetails?.data?.academicDepartment?._id || "",
    image: "",
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(updateStudentDetailsZodSchema)}
          defaultValues={defaultValues}
        >
          {/* Personal Information */}
          <Divider>Personal Info</Divider>
          <Row gutter={16}>
            <Col xs={24} md={12} lg={8}>
              <PHInput name="name.firstName" label="First Name" type="text" />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput name="name.middleName" label="Middle Name" type="text" />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput name="name.lastName" label="Last Name" type="text" />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect name="gender" options={genderOptions} label="Gender" />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                name="bloodGroup"
                options={bloodGroupOptions}
                label="Blood Group"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                  <Form.Item label="Profile Image">
                    <Input
                      type="file"
                      value={value}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...rest}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          {/* Contact Info */}
          <Divider>Contact Info</Divider>
          <Row gutter={16}>
            <Col xs={24} md={12} lg={8}>
              <PHInput name="email" type="text" label="Email" />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput name="contactNo" type="text" label="Contact No." />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="emergencyContactNo"
                type="text"
                label="Emergency Contact No."
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="presentAddress"
                type="text"
                label="Present Address"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="permanentAddress"
                type="text"
                label="Permanent Address"
              />
            </Col>
          </Row>

          {/* Guardian Info */}
          <Divider>Guardian Info</Divider>
          <Row gutter={16}>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="guardian.fatherName"
                type="text"
                label="Father Name"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="guardian.fatherOccupation"
                type="text"
                label="Father Occupation"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="guardian.fatherContactNo"
                type="text"
                label="Father Contact No."
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="guardian.motherName"
                type="text"
                label="Mother Name"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="guardian.motherOccupation"
                type="text"
                label="Mother Occupation"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="guardian.motherContactNo"
                type="text"
                label="Mother Contact No."
              />
            </Col>
          </Row>

          {/* Local Guardian Info */}
          <Divider>Local Guardian Info</Divider>
          <Row gutter={16}>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="localGuardian.name"
                type="text"
                label="Local Guardian Name"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="localGuardian.occupation"
                type="text"
                label="Occupation"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="localGuardian.contactNo"
                type="text"
                label="Contact No."
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                name="localGuardian.address"
                type="text"
                label="Address"
              />
            </Col>
          </Row>

          {/* Academic Info */}
          <Divider>Academic Info</Divider>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <PHSelect
                disabled={semesterLoading}
                name="addmissionSemester"
                options={semestersOptions}
                label="Admission Semester"
              />
            </Col>
            <Col xs={24} md={12}>
              <PHSelect
                disabled={departmentLoading}
                name="academicDepartment"
                options={departmentOptions}
                label="Academic Department"
              />
            </Col>
          </Row>

          <Divider />
          <Button type="primary" htmlType="submit">
            Update Student
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default StudentUpdate;
