import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParams } from "../../../types";
import { useGetAllFacultiesUserQuery } from "../../../redux/features/admin/userManagement_Api";
import { Link } from "react-router-dom";

export type TTableData = { name: string; degisnation: string };

const FacultyData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const { data: facultyData, isFetching } = useGetAllFacultiesUserQuery([
    { name: "limit", value: 3 },
    { name: "page", value: page },
    { name: "sort", value: "createdAt" },
    ...params,
  ]);

  const tableData = facultyData?.data?.map(
    ({ _id, name, degisnation, email, contactNo }) => ({
      key: _id,
      name: `${name.firstName} ${name?.middleName} ${name.lastName}`,
      degisnation,
      email,
      contactNo,
    })
  );
  const metaData = facultyData?.meta;
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },

    {
      title: "Designation",
      key: "degisnation",
      dataIndex: "degisnation",
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
            <Link to={`/faculty/faculty-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/faculty/faculty-data-update/${item.key}`}>
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

export default FacultyData;
