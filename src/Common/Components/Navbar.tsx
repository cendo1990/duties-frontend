import { ContainerOutlined, DashboardOutlined, PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import { routesData } from "../../App";

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const getResourceRouteItems = (routeData:any)=>
  {
    if( (typeof routeData.list != "undefined" && routeData.list !== false) || (typeof routeData.create != "undefined" && routeData.create !== false) )
    {
      let children:any[] = [];
      let obj = {key: `/${routeData.resourceType}`, icon: <ContainerOutlined />, label: routeData.label, children: children};
      if( typeof routeData.list != "undefined" && routeData.list !== false )
      {
        obj.children.push({ key: `/${routeData.resourceType}/list`, icon: <UnorderedListOutlined />, label: `List ${routeData.label}` });
      }
      if( typeof routeData.create != "undefined" && routeData.create !== false )
      {
        obj.children.push({ key: `/${routeData.resourceType}/create`, icon: <PlusOutlined />, label: `Create ${routeData.label}` });
      }
      console.log("getResourceRouteItems", obj, routeData);
      return obj;
    }
    return null;
  }

  const routesItems = routesData.map((obj:any)=>{
    return getResourceRouteItems(obj);
  })

  const items: MenuItem[] = [
    { key: "/", icon: <DashboardOutlined />, label: 'Dashboard' },
    ...routesItems
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
      selectedKeys={[pathname]}
      mode="inline"
      items={items}
    />
  )

}

export default Navbar;
