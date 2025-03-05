// const adminPaths2 = [
//   {
//     name: "Dashboard",
//     path: "dashboard",
//     element: "<AdminDashboard />",
//   },
//   {
//     name: "User Management",
//     children: [
//       {
//         name: "Create Admin",
//         path: "create-admin",
//         element: "<CreateAdmin />",
//       },
//       {
//         name: "Create Faculty",
//         path: "create-faculty",
//         element: "<CreateFaculty />",
//       },
//       {
//         name: "Create Student",
//         path: "create-student",
//         element: "<CreateStudent />",
//       },
//     ],
//   },
//   {
//     name: "Course Management",
//     children: [
//       {
//         name: "Offered Coures",
//         path: "offered-course",
//         element: "<CreateAdmin />",
//       },
//     ],
//   },
// ];

// const newArray = adminPaths2.reduce((acc, item) => {
//   if (item.path && item.name) {
//     acc.push({
//       key: item.name,
//       label: "NavLink",
//     });
//   }

//   if (item.children) {
//     acc.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child) => ({
//         key: child.name,
//         label: "Navlink",
//       })),
//     });
//   }

//   return acc;
// }, []);

// const newArray = adminPaths2.reduce((acc, item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }

//   return acc;
// }, []);

// console.log(JSON.stringify(newArray));
// const newArray = adminPaths2.reduce((acc, item) => {
//   acc.push(item);

//   return acc;
// }, []);

// console.log(newArray);

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

// serializeable object.
// const obj = {
//   name: "any",
//   role: "admin",
//   age: 20,
// };

// non-serializeable object.
const obj = {
  name: "any",
  role: "admin",
  age: 20,
  greet: () => {
    return "hello world";
  },
};

console.log(JSON.stringify(obj));
