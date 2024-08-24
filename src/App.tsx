import { ConfigProvider, Layout, notification } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Common/Components/Navbar";
import { Content } from "antd/es/layout/layout";
import Dashboard from "./Common/Components/Dashboard";
import { ArgsProps } from "antd/es/notification/interface";
import merge from "lodash.merge";
import TodoList from "./Todo/TodoList";
import TodoEdit from "./Todo/TodoEdit";
import TodoCreate from "./Todo/TodoCreate";
import BasicList from "./Common/Components/BasicList";
import BasicCreate from "./Common/Components/BasicCreate";
import BasicEdit from "./Common/Components/BasicEdit";
import React from "react";

const { Sider } = Layout;

export const routesData:any[] = [
  {
    resourceType: "todos", 
    label: "Todo", 
    list: TodoList,
    create: TodoCreate,
    edit: TodoEdit,
  }
];

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
              {
                routesData.map((obj)=>{
                  let listElement = typeof obj?.list === "undefined" || obj?.list === false ? undefined : typeof obj?.list == "function" ? obj?.list : BasicList;
                  let createElement = typeof obj?.create === "undefined" || obj?.create === false ? undefined : typeof obj?.create == "function" ? obj?.create : BasicCreate;
                  let editElement = typeof obj?.edit === "undefined" || obj?.edit === false ? undefined : typeof obj?.edit == "function" ? obj?.edit : BasicEdit;
                  console.log("App map", obj.resourceType, listElement, createElement, editElement);
                  if( listElement || createElement || editElement )
                  {
                    return (
                      <Route key={obj.resourceType} path={obj.resourceType}>
                        { listElement ? <Route index={true} path="list" element={React.createElement(listElement, {resourceType: obj.resourceType, openNotification: openNotification})} /> : undefined }
                        { createElement ? <Route index={!listElement ? true : false} path="create" element={React.createElement(createElement, {resourceType: obj.resourceType, openNotification: openNotification})} /> : undefined }
                        { editElement ? <Route path="edit/:id" element={React.createElement(editElement, {resourceType: obj.resourceType, openNotification: openNotification})} /> : undefined }
                      </Route>
                    );
                  }
                })
              }
            </Routes>
          </Content>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
