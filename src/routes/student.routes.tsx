import MySchedule from "../pages/student/MySchedule";
import OfferedCoures from "../pages/student/OfferedCoures";
import StudentDashBoard from "../pages/student/StudentDashBoard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashBoard />,
  },
  {
    name: "Offered Courses",
    path: "offered-coures",
    element: <OfferedCoures />,
  },
  {
    name: "My Schedule",
    path: "schedule",
    element: <MySchedule />,
  },
];
