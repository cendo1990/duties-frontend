import { DashboardOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { ConfigProvider, Menu, MenuProps } from "antd";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const items: MenuItem[] = [
    { key: "/", icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: "/todo/list", icon: <UnorderedListOutlined />, label: 'List' },
  ];

  const onClick: MenuProps['onClick'] = (data:MenuItem) => {
    // console.log('click ', data);
    if( data?.key )
    {
      navigate(data.key.toString());
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={[pathname]}
      mode="inline"
      items={items}
    />
  )

}

const Dashboard = ()=>{
  return (
    <div>Dashboard</div>
  );
}

const ToDoList = ()=>{
  return (
    <div>List</div>
  );
}

const ToDoCreate = ()=>{
  return (
    <div>Create</div>
  );
}

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
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="todo">
              <Route index={true} path="list" element={<ToDoList />} />
              <Route path="create" element={<ToDoCreate />} />
            </Route>
          </Routes>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
