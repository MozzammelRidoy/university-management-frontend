import { Button, MenuProps, Modal, Table, TableColumnsType } from "antd";

import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement_Api";
import { useState } from "react";
import { useGetAllFacultiesUserQuery } from "../../../redux/features/admin/userManagement_Api";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";

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

const Course = () => {
  const { data: coursesData, isFetching } = useGetAllCoursesQuery([
    { name: "limit", value: 100 },
    { name: "sort", value: "-createdAt" },
  ]);

  const tableData = coursesData?.data?.map(
    ({ _id, title, code, prefix, credits }) => ({
      key: _id,
      name: title,
      code: `${prefix}-${code}`,
      credits: credits,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Credits",
      key: "credits",
      dataIndex: "credits",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
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

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addFaculties] = useAddFacultiesMutation();

  const { data: facultiesData } = useGetAllFacultiesUserQuery([
    { name: "limit", value: 100 },
    { name: "sort", value: "-createdAt" },
  ]);

  const facultiesOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };
    addFaculties(facultyData);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            options={facultiesOptions}
            name="faculties"
            label="Faculty"
            mode="multiple"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};
export default Course;
