import { useParams } from "react-router-dom";

const StudentUpdate = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h2>This is Student Update Page.</h2>
    </div>
  );
};

export default StudentUpdate;
