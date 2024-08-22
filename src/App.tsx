import { ConfigProvider, Layout, notification } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Common/Navbar";
import TodoList from "./Todo/TodoList";
import TodoCreate from "./Todo/TodoCreate";
import { Content } from "antd/es/layout/layout";
import Dashboard from "./Common/Dashboard";
import TodoEdit from "./Todo/TodoEdit";
import { ArgsProps, NotificationPlacement } from "antd/es/notification/interface";
import merge from "lodash.merge";

const { Sider } = Layout;

const App = () => {
  const [api, contextHolder] = notification.useNotification();

  const defaultArgsProps: ArgsProps = {
    placement: "bottom",
    message: "",
    showProgress: true,
    pauseOnHover: true,
  }

  const openNotification = (args:ArgsProps, type:string = "info") => {
    args = merge({}, defaultArgsProps, args);
    switch(type)
    {
      default:
      case "info":
        api.info(args);
        break;
      case "error":
        api.error(args);
        break;
    }
    
  };

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
          <Content style={{
              padding: "20px",
              minHeight: "100vh"
            }}>
            {contextHolder}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="todos">
                <Route index={true} path="list" element={<TodoList openNotification={openNotification} />} />
                <Route path="create" element={<TodoCreate openNotification={openNotification} />} />
                <Route path="edit/:id" element={<TodoEdit openNotification={openNotification} />} />
              </Route>
            </Routes>
          </Content>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
