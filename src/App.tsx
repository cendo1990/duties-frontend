import { ConfigProvider, Layout } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Common/Navbar";
import TodoList from "./Todo/TodoList";
import TodoCreate from "./Todo/TodoCreate";
import { Content } from "antd/es/layout/layout";
import Dashboard from "./Common/Dashboard";

const { Sider } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={
        {
          components: {
            Menu: {
              colorPrimary: "#000000",
              itemSelectedBg: "#cccccc",
              algorithm: true,
            }
          }
        }
      }>
        <Layout>
          <Sider><Navbar /></Sider>
          <Content style={{padding: "20px"}}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="todo">
                <Route index={true} path="list" element={<TodoList />} />
                <Route path="create" element={<TodoCreate />} />
              </Route>
            </Routes>
          </Content>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
