import { FormItemProps } from "antd";
import BasicCreate from "../Common/Components/BasicCreate";

class TodoCreate extends BasicCreate
{
  formData:FormItemProps[] = [
    {
      name:"name",
      label:"Name",
      rules:[{ required: true, message: 'Name is required!' }]
    }
  ];
}

export default TodoCreate;