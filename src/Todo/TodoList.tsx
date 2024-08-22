import { Component, ReactNode } from "react";
import { DataProvider } from "../DataProvider/dataProvider";
import { Button, GetProp, Popconfirm, Table } from "antd";
import { TableProps } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router";

interface DataType {
  id: number,
  name: string
}

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

interface StateParams {
  data: DataType[];
  loading: boolean;
  tableParams: TableParams;
}

const EditButton = (props:any)=>{
  const navigate = useNavigate();
  const { id, ...rest } = props;


  const onClickButton = (id:number)=>
  {
    navigate(`/todos/edit/${id}`)
  }

  return (
    <Button onClick={()=>{onClickButton(id)}} {...rest} />
  )
}

class DeleteButton extends Component<any, {open: boolean}>{
  dataProvider: DataProvider;
  openNotification: Function;
  id:number;
  rest:any;
  onSuccess: Function;

  constructor(props:any)
  {
    super(props);
    const { id, dataProvider, openNotification, onSuccess, ...rest } = props;
    this.dataProvider = dataProvider;
    this.openNotification = openNotification;
    this.onSuccess = onSuccess;
    this.id = id;
    this.rest = rest;
    this.state = {
      open: false
    }
    console.log("DeleteButton", this.id);
  }

  onClickConfirm = (id:number)=>
  {
    this.dataProvider.deleteOne("todos", id).then(()=>{
      this.openNotification({message: "Delete Completed"});
      if( this.onSuccess )
      {
        this.onSuccess();
      }
    }).catch((error:any)=>{
      this.openNotification({message: "Delete Failed"}, "error");
    })
  }

  onClickButton = ()=>
  {
    this.setState({
      open: true
    })
  }

  render() {
    return (
      <Popconfirm title="Confirm Delete" open={this.state.open} onConfirm={()=>{this.onClickConfirm(this.id)}}>
          <Button onClick={()=>{this.onClickButton()}} {...this.rest} />
      </Popconfirm>
      
    )
  }
}

class TodoList extends Component<{openNotification: Function}, StateParams>
{
  dataProvider:DataProvider;
  openNotification: Function;
  

  constructor(props:any)
  {
    super(props);
    this.dataProvider = new DataProvider();
    this.openNotification = props.openNotification;
    // console.trace("TodoList constructor");
    this.state = {
      data: [],
      loading: false,
      tableParams: {
        pagination: {
          current: 1,
          pageSize: 5,
        }
      }
    };
  }

  columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '20%',
    },
    {
      title: 'Operation',
      dataIndex: 'id',
      render: (id) => (
        <>
          <EditButton id={id}>Edit</EditButton>
          <DeleteButton 
            id={id} 
            dataProvider={this.dataProvider}
            openNotification={this.openNotification}
            onSuccess={this.onSuccess}
          >
            Delete
          </DeleteButton>
        </>
      ),
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '60%',
    }
  ];

  componentDidMount(){
    console.log("TodoList componentDidMount");
    this.fetchData();
  }

  onSuccess = ()=>
  {
    if( this.state?.tableParams?.pagination )
    {
      const pagination = this.state?.tableParams?.pagination;
      if( pagination?.current && pagination?.pageSize )
      {
        this.fetchData((pagination.current - 1) * pagination.pageSize, pagination.pageSize);
      }
    }
  }

  fetchData = (offset: number = 0, limit: number = 5)=>{
    this.setState({loading: true})    
    this.dataProvider.get("todos", offset, limit).then((response)=>{
      console.log("DataProvider get", response);
      if( response.status >= 200 && response.status < 400 && !response?.data?.code )
      {
        this.setState({
          data: response?.data?.data,
          loading: false,
          tableParams: {
            pagination: {
              ...this.state.tableParams.pagination,
              total: parseInt(response?.data?.total),
            }
          }
        });
      }
      else
      {
        
      }
    });
  }

  handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    console.log("handleTableChange", pagination, this.state);
    this.setState({
      tableParams : {
        pagination,
        filters,
        sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
        sortField: Array.isArray(sorter) ? undefined : sorter.field,
      }
    }, ()=>{
      console.log("handleTableChange 2", pagination, this.state);
    });
    if( pagination?.current && pagination?.pageSize )
    {
      this.fetchData((pagination.current - 1) * pagination.pageSize, pagination.pageSize);
    }
    

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== this.state.tableParams.pagination?.pageSize) {
      this.setState({data:[]})
    }
  };

  render() {
    return (
      <Table
        columns={this.columns}
        rowKey={(record) => record.id}
        dataSource={this.state.data}
        pagination={this.state.tableParams.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default TodoList;
