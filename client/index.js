import React from 'react';
import { render } from 'react-dom';
import './fake-hmr';
import ls from 'local-storage'
function TodoItem(props) {
    return (
        <div className="todo-item">
            <input 
            maxlength='100'
                className='cb'
                type="checkbox" 
                checked={props.item.completed} 
                style={{'height':'3vh','max-width':'auto','background-color':'rgb(255,0,0)'
                  
                }}
                onChange={() => props.handleChange(props.item.id)}
            />
     {props.item.completed? <p className='Completed' style={{'color':'rgba(255,0,0,0.5)'}}>{props.item.text}</p>
        :<p className='undone'>{props.item.text}</p>}
        <button style={{'margin-left':'auto','float':'right','border':'none','background-color':'transparent','color':'rgba(255,0,0,0.5)'}}onClick={()=>{props.handleClick(props.item.id)}}>Remove</button></div>
    )
}


class App extends React.Component {
    constructor() {
        super()
        this.state ={
          isLoading:true,
          todos:[{
        id: 'Take out the trash',
        text: "Take out the trash",
        completed: true
    }]
    
  ,
    input:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.clicked=this.clicked.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.handlelocal=this.handlelocal.bind(this)
    }
  handlelocal(){
    //const local = this.state.todos;
    //this.localStorage.setItem('list', local);
    //alert(this.localStorage.getItem('list'))
  }
    handleChange(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                        localStorage.setItem('lists', JSON.stringify(this.state.todos))
                }
                return todo
            })
            return {
                todos: updatedTodos
            }
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot){
    
      if(prevState.todos.length !== this.state.todos.length){
        localStorage.setItem('lists', JSON.stringify(this.state.todos));
       // if(prevState.todos)
        //alert(JSON.stringify(localStorage.getItem('lists')))
      }

      
    }
    componentDidMount() {
   // alert('mounted')
   
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 3000)
    
    
    {localStorage.getItem('lists')?this.setState(() => {return ({todos:JSON.parse(localStorage.getItem('lists'))}) }):''}//alert('first time')}
  }
  clicked() {
      //alert('Less than 100')
      
      for(let i = 0;i<this.state.todos.length;i++){
       if(JSON.parse(localStorage.getItem('lists'))[i].id==this.state.input)alert('Repeated Tasks Not Allowed')
      }
      if(this.state.input.length<=100&&this.state.input!=''){
      let obj = {id:this.state.input,text:this.state.input,completed:false}
    this.setState({ todos: [...this.state.todos, obj],input:''})

      }
      if(this.state.input.length==0)alert('Please enter some text')
      else{
        let obj={id:this.state.input.substring(0, 100) ,text:this.state.input.substring(0,100),completed:false}
        this.setState({ todos: [...this.state.todos, obj],input:''})
        //lert('Task should have less than 100 characters or More than 0 characters')
        
      }
  }
    
  
handleClick(itemId) {
    this.setState({
      todos: this.state.todos.filter(person=>  person.text !== itemId)})
    }
    render() {
    
        const todoItems = this.state.todos.map(item =>{return(<TodoItem key={item.id} item={item} handleChange={this.handleChange} handleClick={this.handleClick}/>)})
        
        return (
          this.state.isLoading?<div className='load'><div className="wrap"><div className="dot dot-1"></div><div className="dot dot-2"></div><div className="dot dot-3"></div><div className="dot dot-4"></div><div className="dot dot-5"></div></div></div>:
            <div className="todo-list">
            <h1 style={{'font-weight':'450','font-family':'Roboto,Sans Serif'}}>You have to complete {this.state.todos.length} Tasks</h1>
                {todoItems}
                <div style={{'display':'flex','justify-content':'center','width':'100%','align-items':'center'}}>
                <input 
                
                value = {this.state.input}
                placeholder='Type your task here!'
                type='text' 
                className='inpu'
                style={{'color':'rgba(0,255,0,0.5)','margin-top':'3vh','width':'60%' ,'height':'5vh','border':'none','text-align':'center'  }}
                onChange={event => {
        this.setState(
            
            {input: event.target.value}
            
        )
    }} 
  
                />
                <button style={{'width':'auto','height':'6vh','margin-top':'3vh','background-color':'transparent','border':'none','color':'rgba(0,255,0,0.5)'}}
                onClick={this.clicked}>Add New </button>
            </div>
            </div>
        )    
    }
}

render(<App />, document.getElementById("app"))
