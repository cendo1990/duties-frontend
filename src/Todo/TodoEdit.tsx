import { FormItemProps } from "antd";
import BasicEdit from "../Common/Components/BasicEdit";

class TodoEdit extends BasicEdit
{
  formData:FormItemProps[] = [
    {
      name:"name",
      label:"Name",
      rules:[{ required: true, message: 'Name is required!' }]
    }
  ];
}

export default TodoEdit;