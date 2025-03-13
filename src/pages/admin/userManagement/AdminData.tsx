import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TQueryParams } from "../../../types";
import { useGetAllAdminsQuery } from "../../../redux/features/admin/userManagement_Api";

export type TTableData = { name: string; designation: string };

const AdminData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const { data: adminData, isFetching } = useGetAllAdminsQuery([
    { name: "limit", value: 3 },
    { name: "page", value: page },
    { name: "sort", value: "createdAt" },
    ...params,
  ]);

  const tableData = adminData?.data?.map(
    ({ _id, name, designation, email, contactNo }) => ({
      key: _id,
      name: `${name.firstName} ${name?.middleName} ${name.lastName}`,
      designation,
      email,
      contactNo,
    })
  );
  const metaData = adminData?.meta;
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },

    {
      title: "Designation",
      key: "designation",
      dataIndex: "designation",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/admin-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/admin-data-update/${item.key}`}>
              <Button>Update</Button>
            </Link>

            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  return (
    <>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />

      <Pagination
        style={{ marginTop: "10px" }}
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.totalData}
      />
    </>
  );
};

export default AdminData;
