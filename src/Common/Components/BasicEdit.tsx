import { Component, FC } from "react";
import { DataProvider } from "../../DataProvider/dataProvider";
import { Button, Form, FormItemProps, Input } from "antd";
import { ResourceRouteItemProps } from "../ResourceRoute";

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

export interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  onSubmit: (fields: FieldData[]) => void;
  onClick?: ()=>void;
  fields: FieldData[];
  openNotification: Function;
  dataProvider: DataProvider
  state: StateParams;
  type: string;
  formData: FormItemProps[];
}

export const CustomizedForm: FC<CustomizedFormProps> = ({ onChange, onSubmit, onClick, fields, openNotification, dataProvider, state, type, formData }) => {
  const [form] = Form.useForm();

  const updateData = (data:any)=>{
    dataProvider.updateOne(type, data).then((response)=>{
      if( !response?.data?.code )
      {
        onSubmit(data);
      }
      else
      {
        openNotification({message: `Update failed, error code: ${response?.data?.code}`}, "error");
      }
    }).catch((error:any)=>{
      console.log("updateData error", error, form.getFieldsValue());
      openNotification({message: `Update Failed, error status: ${error?.response?.status}`}, "error");
    })
  }
  
  const onClickSubmit = ()=>{
    form.validateFields().then((data:any)=>{
      console.log("onClick validateFields", data, form.getFieldsValue());
      updateData(form.getFieldsValue());
    }).catch((error:any)=>{
      console.log("onClick validateFields error", error, form.getFieldsValue());
      openNotification({message: "Validation failed"}, "error");
    });
    
  }
  return (
    <Form
      form={form}
      name={`edit-form-${type}`}
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
      {formData.map((obj:any)=>{
        return (
        <Form.Item
          key={obj.name}
          name={obj.name}
          label={obj.label}
          hidden={obj.hidden}
          rules={obj.rules}
        ><Input /></Form.Item>
        );
      })}
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={onClick ? onClick: onClickSubmit} disabled={!state.hasTouched}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

class BasicEdit extends Component<ResourceRouteItemProps, StateParams>{
  dataProvider:DataProvider;
  props:ResourceRouteItemProps; 

  constructor(props:ResourceRouteItemProps){
    super(props);
    this.dataProvider = new DataProvider();
    this.props = props;
    this.state = {
      data : [{name:"id"}, {name:"name"}],
      id: this.getSelectedID(window.location),
      loading: false,
      hasTouched: false
    }
  }

  formData:FormItemProps[] = [];

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
    this.dataProvider.getOne(this.props.resourceType, this.state.id).then((response)=>{
      console.log("DataProvider get", response);
      if( !response?.data?.code )
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
        this.props.openNotification("top", "500", "error");
        this.props.openNotification({message: `Show failed, error code: ${response?.data?.code}`}, "error");
      }
    }).catch((error)=>{
      console.log(error);
      this.props.openNotification({message: `Show failed, error status: ${error?.response?.status}`}, "error");
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
          this.props.openNotification({message: "Update completed"});
          let fieldData:FieldData[] = this.convertDataObjToFieldData(data);
          this.setState({data:fieldData, hasTouched: false});
        }}
        onClick={this.props.onSubmit}
        openNotification={this.props.openNotification}
        dataProvider={this.dataProvider}
        state={this.state}
        type={this.props.resourceType}
        formData={this.formData}
      />
    );
  }
}

export default BasicEdit;
