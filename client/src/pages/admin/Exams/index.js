import React from "react";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

const Exams = () => {
  const navigate=useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center mt-2">
        <PageTitle title="Exams" />
        <button className="primary-outlined-btn p-1 flex items-center font-style"
          onClick={()=> navigate('/admin/exams/add')}
        >
          <i className="ri-add-line">Add Exam</i>
        </button>
      </div>
    </div>
  );
};

export default Exams;
