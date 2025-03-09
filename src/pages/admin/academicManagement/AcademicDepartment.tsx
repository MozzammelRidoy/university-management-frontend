import { useState } from "react";
import { useGetAllDepartmentsQuery } from "../../../redux/features/admin/academicManagement_Api";
import { TQueryParams } from "../../../types";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TAcademicDepartment } from "../../../types/academicManagement.types";

export type TTableData = Pick<TAcademicDepartment, "name"> & {
  key: string;
  academicFaculty: string;
};

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const { data: departmentData, isFetching } =
    useGetAllDepartmentsQuery(params);

  const tableData: TTableData[] | undefined = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Department Name",
      key: "name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Academic Faculty",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
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

export default AcademicDepartment;
