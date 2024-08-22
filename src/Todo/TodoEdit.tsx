import { Component, FC } from "react";
import { DataProvider } from "../DataProvider/dataProvider";
import { Button, Form, Input, message } from "antd";

interface DataType {
  id?: number,
  name?: string
}

interface StateParams {
  data: FieldData[];
  id: number;
  loading: boolean;
  hasTouched: boolean;
}

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  onSubmit: (fields: FieldData[]) => void;
  fields: FieldData[];
  openNotification: Function;
  dataProvider: DataProvider
  state: StateParams;
}

const CustomizedForm: FC<CustomizedFormProps> = ({ onChange, onSubmit, fields, openNotification, dataProvider, state }) => {
  const [form] = Form.useForm();

  const updateData = (data:any)=>{
    dataProvider.updateOne("todos", data).then(()=>{
      onSubmit(data);
    }).catch((error:any)=>{
      console.log("updateData error", error, form.getFieldsValue());
      openNotification({message: "Update Failed"}, "error");
    })
  }
  
  const onClick = ()=>{
    form.validateFields().then((data:any)=>{
      console.log("onClick validateFields", data, form.getFieldsValue());
      updateData(form.getFieldsValue());
    }).catch((error:any)=>{
      console.log("onClick validateFields error", error, form.getFieldsValue());
      openNotification({message: "Validation Failed"}, "error");
    });
    
  }
  return (
    <Form
      form={form}
      name={`edit-form-todos`}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
    >
      <Form.Item
        name="id"
        label="ID"
        hidden={true}
      ></Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Name is required!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={onClick} disabled={!state.hasTouched}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

class TodoEdit extends Component<{openNotification: Function}, StateParams>{
  dataProvider:DataProvider;
  openNotification: Function;

  constructor(props:any){
    super(props);
    this.dataProvider = new DataProvider();
    this.openNotification = props.openNotification;
    this.state = {
      data : [{name:"id"}, {name:"name"}],
      id: this.getSelectedID(window.location),
      loading: false,
      hasTouched: false
    }
  }

  getSelectedID = (newLocation:any)=>{

    const pathNames = newLocation && newLocation.pathname ? newLocation.pathname : "";
    let rootPathArray = pathNames.split('/');
    let tempID = rootPathArray.pop();
    console.log("getSelectedID", tempID);
    return tempID;
  }

  convertDataObjToFieldData(data:any)
  {
    let fieldData:FieldData[] = [];
    if( data )
    {
      Object.keys(data).forEach((key)=>{
        fieldData.push({name: key, value: data[key]});
      });
    }
    return fieldData;
  }

  fetchData = ()=>{
    this.setState({loading: true})    
    this.dataProvider.getOne("todos", this.state.id).then((response)=>{
      console.log("DataProvider get", response);
      if( response.status >= 200 && response.status < 400 && !response?.data?.code && response?.data?.data )
      {
        let resData = response?.data?.data;
        let fieldData:FieldData[] = this.convertDataObjToFieldData(resData);
        this.setState({
          data: fieldData,
          loading: false,
        });
      }
      else
      {
        console.log(response.status);
        this.openNotification("top", "500", "error");
      }
    }).catch((error)=>{
      console.log(error);
      this.openNotification({message: `Error status: ${error.response.status}`}, "error");
    });
  }

  componentDidMount(){
    console.log("TodoEdit componentDidMount");
    this.fetchData();
  }

  render() {
    return (
      <CustomizedForm
        fields={this.state.data}
        onChange={(newFields) => {
          this.setState({hasTouched: true});
        }}
        onSubmit={(data:any)=>{
          this.openNotification({message: "Update completed"});
          let fieldData:FieldData[] = this.convertDataObjToFieldData(data);
          this.setState({data:fieldData, hasTouched: false});
        }}
        openNotification={this.openNotification}
        dataProvider={this.dataProvider}
        state={this.state}
      />
    );
  }
}

export default TodoEdit;
