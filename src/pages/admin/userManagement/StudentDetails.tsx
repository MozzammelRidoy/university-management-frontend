import { Card, Descriptions, Avatar, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement_Api";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data, isFetching, error } = useGetSingleStudentQuery(studentId);

  const student = data?.data;

  if (isFetching) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center" }}>
        Failed to load student details.
      </p>
    );
  }

  return (
    <Card
      title="Student Details"
      style={{ width: "100%", margin: "10px auto" }}
    >
      {/* <Avatar
        size={150}
        src={student?.profileImage}
        style={{ display: "block", margin: "0 auto 20px" }}
      /> */}

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Avatar size={180} src={student?.profileImage} />
        <h2 style={{ marginTop: "10px" }}>
          {student?.name?.firstName} {student?.name?.middleName}{" "}
          {student?.name?.lastName}
        </h2>
        <p style={{ fontSize: "16px", color: "gray" }}>
          {student?.academicFaculty?.name}
        </p>
      </div>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">
          {student?.name?.firstName} {student?.name?.middleName}{" "}
          {student?.name?.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Student ID">{student?.id}</Descriptions.Item>
        <Descriptions.Item label="Email">{student?.email}</Descriptions.Item>
        <Descriptions.Item label="Gender">{student?.gender}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {student?.dateOfBirth}
        </Descriptions.Item>
        <Descriptions.Item label="Contact No">
          {student?.contactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Blood Group">
          {student?.bloodGroup}
        </Descriptions.Item>
        <Descriptions.Item label="Present Address">
          {student?.presentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Permanent Address">
          {student?.permanentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Guardian">
          Father: {student?.guardian?.fatherName} (
          {student?.guardian?.fatherOccupation}) -{" "}
          {student?.guardian?.fatherContactNo} <br />
          Mother: {student?.guardian?.motherName} (
          {student?.guardian?.motherOccupation}) -{" "}
          {student?.guardian?.motherContactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Local Guardian">
          {student?.localGuardian?.name} ({student?.localGuardian?.occupation})
          - {student?.localGuardian?.contactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Department">
          {student?.academicDepartment?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Faculty">
          {student?.academicFaculty?.name}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default StudentDetails;

// import { Card, Descriptions, Avatar, Spin, Row, Col } from "antd";
// import { useParams } from "react-router-dom";
// import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement_Api";

// const StudentDetails = () => {
//   const { studentId } = useParams();
//   const { data, isFetching, error } = useGetSingleStudentQuery(studentId);

//   const student = data?.data;

//   if (isFetching) {
//     return (
//       <div style={{ textAlign: "center", padding: "40px" }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <p style={{ color: "red", textAlign: "center", fontSize: "18px" }}>
//         Failed to load student details.
//       </p>
//     );
//   }

//   return (
// <div>
//   <Row justify="center">
//     <Col span={24}>
//       <Card
//         title="Student Profile"
//         style={{
//           width: "100%",
//           borderRadius: "10px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <Avatar size={120} src={student?.profileImage} />
//           <h2 style={{ marginTop: "10px" }}>
//             {student?.name?.firstName} {student?.name?.middleName}{" "}
//             {student?.name?.lastName}
//           </h2>
//           <p style={{ fontSize: "16px", color: "gray" }}>
//             {student?.academicFaculty?.name}
//           </p>
//         </div>

//         <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }}>
//           <Descriptions.Item label="Student ID">
//             {student?.id}
//           </Descriptions.Item>
//           <Descriptions.Item label="Email">
//             {student?.email}
//           </Descriptions.Item>
//           <Descriptions.Item label="Gender">
//             {student?.gender}
//           </Descriptions.Item>
//           <Descriptions.Item label="Date of Birth">
//             {student?.dateOfBirth}
//           </Descriptions.Item>
//           <Descriptions.Item label="Contact No">
//             {student?.contactNo}
//           </Descriptions.Item>
//           <Descriptions.Item label="Blood Group">
//             {student?.bloodGroup}
//           </Descriptions.Item>
//           <Descriptions.Item label="Present Address">
//             {student?.presentAddress}
//           </Descriptions.Item>
//           <Descriptions.Item label="Permanent Address">
//             {student?.permanentAddress}
//           </Descriptions.Item>
//           <Descriptions.Item label="Guardian">
//             Father: {student?.guardian?.fatherName} (
//             {student?.guardian?.fatherOccupation}) -{" "}
//             {student?.guardian?.fatherContactNo} <br />
//             Mother: {student?.guardian?.motherName} (
//             {student?.guardian?.motherOccupation}) -{" "}
//             {student?.guardian?.motherContactNo}
//           </Descriptions.Item>
//           <Descriptions.Item label="Local Guardian">
//             {student?.localGuardian?.name} (
//             {student?.localGuardian?.occupation}) -{" "}
//             {student?.localGuardian?.contactNo}
//           </Descriptions.Item>
//           <Descriptions.Item label="Department">
//             {student?.academicDepartment?.name}
//           </Descriptions.Item>
//           <Descriptions.Item label="Faculty">
//             {student?.academicFaculty?.name}
//           </Descriptions.Item>
//         </Descriptions>
//       </Card>
//     </Col>
//   </Row>
// </div>
//   );
// };

// export default StudentDetails;
