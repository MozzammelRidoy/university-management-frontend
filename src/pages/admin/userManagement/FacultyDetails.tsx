import { useParams } from "react-router-dom";

import { Avatar, Card, Col, Descriptions, Row, Spin } from "antd";
import { useGetSingleFacultyUserQuery } from "../../../redux/features/admin/userManagement_Api";

const FacultyDetails = () => {
  const { facultyId: facultyId } = useParams();
  const { data, isFetching, error } = useGetSingleFacultyUserQuery(facultyId);

  const faculty = data?.data;

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
        Failed to load faculy details.
      </p>
    );
  }
  return (
    <div>
      <Row justify="center">
        <Col span={24}>
          <Card
            title="Faculty Profile"
            style={{
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Avatar size={180} src={faculty?.profileImage} />
              <h2 style={{ marginTop: "10px" }}>
                {faculty?.name?.firstName} {faculty?.name?.middleName}{" "}
                {faculty?.name?.lastName}
              </h2>
              <p style={{ fontSize: "16px", color: "gray" }}>
                {faculty?.academicDepartment?.name}
              </p>
              <p style={{ fontSize: "16px", color: "gray" }}>
                {faculty?.academicFaculty?.name}
              </p>
            </div>

            <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }}>
              <Descriptions.Item label="Email">
                {faculty?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {faculty?.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {faculty?.dateOfBirth}
              </Descriptions.Item>
              <Descriptions.Item label="Contact No">
                {faculty?.contactNo}
              </Descriptions.Item>
              <Descriptions.Item label="Blood Group">
                {faculty?.bloodGroup}
              </Descriptions.Item>
              <Descriptions.Item label="Present Address">
                {faculty?.presentAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Permanent Address">
                {faculty?.permanentAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Designation">
                {faculty?.degisnation}
              </Descriptions.Item>
              <Descriptions.Item label="Academic Department">
                {faculty?.academicDepartment?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Academic Faculty">
                {faculty?.academicFaculty?.name}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FacultyDetails;
