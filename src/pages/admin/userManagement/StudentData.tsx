import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParams, TStudentData } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement_Api";

export type TTableData = Pick<TStudentData, "name" | "id">;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  // [
  //   { name: "year", value: "2025" },
  // ]
  const { data: studentData, isFetching } = useGetAllStudentsQuery(params);

  const tableData = studentData?.data?.map(({ _id, name, id }) => ({
    key: _id,
    name: `${name.firstName} ${name?.middleName} ${name.lastName}`,
    id,
  }));
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },

    {
      title: "Roll Number",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Action",
      key: "x",
      dataIndex: "x",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
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
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default StudentData;
