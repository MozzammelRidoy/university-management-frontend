import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferedCoures from "../pages/faculty/OfferedCoures";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Courses",
    path: "offered-coures",
    element: <OfferedCoures />,
  },
];
