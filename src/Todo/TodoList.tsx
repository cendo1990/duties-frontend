import BasicList, { ColumnsType, DeleteButton, EditButton } from "../Common/Components/BasicList";

class TodoList extends BasicList
{
  columns: ColumnsType<any> = [
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
          <EditButton id={id} type={this.props.resourceType}>Edit</EditButton>
          <DeleteButton 
            id={id} 
            type={this.props.resourceType}
            dataProvider={this.dataProvider}
            openNotification={this.props.openNotification}
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
    },
  ];
}

export default TodoList;
