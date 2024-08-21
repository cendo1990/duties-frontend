import { Component } from "react";
import { DataProvider } from "../DataProvider/dataProvider";
import { List } from "antd";

class TodoList extends Component<{}, { data: any }>
{
  dataProvider:DataProvider;



  constructor(props:any)
  {
    super(props);
    this.dataProvider = new DataProvider();
    // console.trace("TodoList constructor");
    this.state = {
      data: "",
    };
  }

  componentDidMount(){
    console.log("TodoList componentDidMount");
    this.dataProvider.get("todos").then((response)=>{
      console.log("DataProvider get", response);
      if( response.status >= 200 && response.status < 400 && !response?.data?.code )
      {
        this.setState({
          data: response?.data?.data
        });
      }
      else
      {
        
      }
    });
  }

  render() {
    return (
      <List 
        dataSource={this.state.data} 
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        renderItem={(item:any) => (
          <List.Item 
            key={item.id}
            
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            {item.name}
          </List.Item>
        )}
      />
    );
  }
}

export default TodoList;
