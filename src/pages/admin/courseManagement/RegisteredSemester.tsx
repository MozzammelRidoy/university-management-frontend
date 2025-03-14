import {
  Button,
  Dropdown,
  MenuProps,
  Table,
  TableColumnsType,
  Tag,
} from "antd";

import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemestersMutation,
} from "../../../redux/features/admin/courseManagement_Api";
import moment from "moment";
import { useState } from "react";

export type TTableData = any;

const items: MenuProps["items"] = [
  {
    key: "UPCOMING",
    label: "Upcoming",
  },
  {
    key: "ONGOING",
    label: "Ongoing",
  },
  {
    key: "ENDED",
    label: "Ended",
  },
];

const RegisteredSemester = () => {
  // const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [semesterId, setSemesterId] = useState("");
  const [updateSemesterStatus] = useUpdateRegisteredSemestersMutation();

  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemestersQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, startDate, academicSemester, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const handleStatusUpdate = async (data) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    const res = await updateSemesterStatus(updateData);
    console.log(res);
  };
  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div>
            <Dropdown menu={menuProps} trigger={["click"]}>
              <Button onClick={() => setSemesterId(item.key)}>Update</Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParams[] = [];

  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );
  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: "year", value: item })
  //     );
  //     setParams(queryParams);
  //   }
  // };

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemester;
