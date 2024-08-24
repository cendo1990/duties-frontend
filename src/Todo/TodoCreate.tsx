import { FormItemProps } from "antd";
import BasicCreate from "../Common/Components/BasicCreate";

class TodoCreate extends BasicCreate
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

export default TodoCreate;