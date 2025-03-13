import { useParams } from "react-router-dom";
import { useGetSingleAdminQuery } from "../../../redux/features/admin/userManagement_Api";
import { Avatar, Card, Col, Descriptions, Row, Spin } from "antd";

const AdminDetails = () => {
  const { adminId } = useParams();
  const { data, isFetching, error } = useGetSingleAdminQuery(adminId);

  const admin = data?.data;

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
        Failed to load admin details.
      </p>
    );
  }
  return (
    <div>
      <Row justify="center">
        <Col span={24}>
          <Card
            title="Admin Profile"
            style={{
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Avatar size={180} src={admin?.profileImage} />
              <h2 style={{ marginTop: "10px" }}>
                {admin?.name?.firstName} {admin?.name?.middleName}{" "}
                {admin?.name?.lastName}
              </h2>
              <p style={{ fontSize: "16px", color: "gray" }}>
                {admin?.designation}
              </p>
            </div>

            <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }}>
              <Descriptions.Item label="Email">
                {admin?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {admin?.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {admin?.dateOfBirth}
              </Descriptions.Item>
              <Descriptions.Item label="Contact No">
                {admin?.contactNo}
              </Descriptions.Item>
              <Descriptions.Item label="Blood Group">
                {admin?.bloogGroup}
              </Descriptions.Item>
              <Descriptions.Item label="Present Address">
                {admin?.presentAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Permanent Address">
                {admin?.permanentAddress}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDetails;
