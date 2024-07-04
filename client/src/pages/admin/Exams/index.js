import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";
import { getAllExams, deleteExamById } from "../../../apicalls/exams";

const Exams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [exams, SetExams] = React.useState([]);

  const deleteExam = async (examId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteExamById({ examId });
      dispatch(HideLoading());
      if (response?.success) {
        message.success(response?.message);
        getExamsData();
      } else {
        message.error(response?.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getExamsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      console.log(response?.data);
      dispatch(HideLoading());
      if (response?.success) {
        SetExams(response?.data);
      } else {
        message.error(response?.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteExam(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getExamsData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-end mt-2">
        <PageTitle title="Exams" />
        <button
          className="primary-outlined-btn p-1 flex items-center font-style"
          onClick={() => navigate("/admin/exams/add")}
        >
          + Add Exam
        </button>
      </div>
      <div className="divider"></div>
      <Table columns={columns} dataSource={exams} />
    </div>
  );
};

export default Exams;
