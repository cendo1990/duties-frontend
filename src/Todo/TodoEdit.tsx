import { FormItemProps } from "antd";
import BasicEdit from "../Common/Components/BasicEdit";

class TodoEdit extends BasicEdit
{
  formData:FormItemProps[] = [
    {
      name:"name",
      label:"Name",
      rules:[
        { required: true, message: "Name is required!" }, 
        { max: 20, message: "Name should be less than 20 characters" }
      ]
    }
  ];
}

export default TodoEdit;