import { Layout, Menu, MenuProps } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

import Sider from "antd/es/layout/Sider";

const items: MenuProps["items"] = [
  {
    key: 1,
    label: "Dashboard",
  },
  {
    key: 2,
    label: "Profile",
  },
  {
    key: 3,
    label: "User Management",
    children: [
      {
        key: 31,
        label: "Create Admin",
      },
      {
        key: 32,
        label: "Create Faculty",
      },
      {
        key: 33,
        label: "Create Student",
      },
    ],
  },
];

const MainLayout = () => {
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div>
          <h1
            style={{
              color: "white",
              height: "4rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            PH Uni
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <h2>The main containt should be here.</h2>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
