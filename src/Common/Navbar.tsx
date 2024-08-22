import { ContainerOutlined, DashboardOutlined, PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const items: MenuItem[] = [
    { key: "/", icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: "/todos", icon: <ContainerOutlined />, label: 'Todo', children: [
      { key: "/todos/list", icon: <UnorderedListOutlined />, label: 'List' },
      { key: "/todos/create", icon: <PlusOutlined />, label: 'Create' }
    ] },
    
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
      // style={{ width: 256 }}
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={["/todos"]}
      mode="inline"
      items={items}
    />
  )

}

export default Navbar;
