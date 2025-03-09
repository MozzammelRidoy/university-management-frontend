import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academicManagement_Api";
import { TAcademicSemester } from "../../../types/academicManagement.types";
import { useState } from "react";
import { TQueryParams } from "../../../types";

export type TTableData = Pick<TAcademicSemester, "name">;
const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const { data: facultiesData, isFetching } = useGetAllFacultiesQuery(params);

  const tableData = facultiesData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "x",
      dataIndex: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
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

export default AcademicFaculty;
