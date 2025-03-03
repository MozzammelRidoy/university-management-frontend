const adminPaths2 = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: "<AdminDashboard />",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: "<CreateAdmin />",
      },
      {
        name: "Create Faculty",
        path: "/admin/create-faculty",
        element: "<CreateFaculty />",
      },
      {
        name: "Create Student",
        path: "/admin/create-student",
        element: "<CreateStudent />",
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Offered Coures",
        path: "/admin/offered-course",
        element: "<CreateAdmin />",
      },
    ],
  },
];

const newArray = adminPaths2.reduce((acc, item) => {
  acc.push(item);

  return acc;
}, []);

console.log(newArray);

// const arr = [1, 2, 3, 4, 5];

// const result = arr.reduce((acc, item) => {
//   console.log(acc);
//   return acc + item;
// }, 0);

// const result = arr.reduce((acc, item) => {
//   acc.push(acc + item);
//   return acc;
// }, []);

// console.log(result);
