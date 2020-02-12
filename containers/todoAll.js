import React from 'react'
import { Container, Header, Title, Content, Body } from 'native-base'
import {connect} from 'react-redux'
import {View, Text} from 'react-native';
import AddToDoButton from '../components/addTodoButton'
import NewToDo from '../components/newTodo'
import { addTodo, deleteTodo, updateTodo, getTodo } from '../store/reducers/todoReducer'
import ToDoItem from '../components/todo/todoItem/todoItem'
import asyncStorageService from '../service/asyncStorageService';

class ToDoAll extends React.Component {
  constructor(props) {
    super(props);

    // vueでいうところのdataみたいな物
    this.state = {
      newTodo: false,
    }
  }

  saveToDoData = async (todoData) => {
    this.addNewToDo(show = false)
    // mapDispatchToPropsのaddTodoを呼び出す
    this.props.addTodo(todoData)

    const {
      todos
    } = this.props;

    const createTodoList = [
      todoData,
      ...todos,
    ];

    // データ永続化のためstorageに保存
    await asyncStorageService.setItem('todoData', createTodoList);
  }

  // emitのような物がトリガーになったときに実行される
  // showがtrueになると新しいTODOリストが1件現れる
  addNewToDo = (show) => {
    this.setState({
      newTodo: show
    })
  }

  screenFilterTodos = () => {
    const {screen, todos} = this.props
    if (screen == "Active") {
      return todos.filter(function (todo) {
        return !todo.completed;
      })
    } else if (screen == "Completed") {
      return todos.filter(function (todo) {
        return todo.completed;
      })
    } else {
      return todos
    }
  }

  // 初期化時に起動する
  async componentDidMount() {
    try {
      const todoData = await asyncStorageService.getItem('todoData');

      // storageの初期データをを登録する
      todoData.map((element) => {
        this.props.addTodo(element)
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    // 状態を保存するstate
    // newTodoがtrueになるとリストがTODOリストが1件現れる
    // AddToDoButtonの押下がトリガーになる
    const { newTodo } = this.state;

    const {
      todos,
      showNewTodo,
      screen,
      deleteTodo,
      updateTodo
    } = this.props;

    let listItem = []

    // vueでいうところのwatch
    // stateのtodosに変化があればここを再起的に通る
    // todosはarrayでユーザーが新しいtodoリストを作成する度に1件ずつ増える
    if(todos.length > 0){
      let scrTodos = this.screenFilterTodos(todos);

      listItem = scrTodos.map( (todo, index) =>
        <ToDoItem
          key = { index }
          todo = { todo }
          deleteTodo = { deleteTodo }
          updateTodo = { updateTodo }
        />
      )
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>{ screen }</Title>
          </Body>
        </Header>
        <Content>
          {
            // listItemのlengthが1件以上あればToDoItem要素を表示する
            listItem
          }
          {
            // 新しいToDoリストを作るためのelement
            newTodo &&
            <NewToDo
              onPress = { this.saveToDoData }
              onCancel = { this.addNewToDo }
            />
          }
        </Content>
        {
          (() => {
            // ALLページであればAddToDoButtonが現れる
            if (showNewTodo) {
              return <AddToDoButton onAddNewToDo = { this.addNewToDo }  />
            }
          })()
        }
      </Container>
    )
  }
}

// stateを読み込むためのmapState
function mapStateToProps (state) {
  return {
    todos: state.todoReducer.todos
  }
}

// reducerを登録するmapDispatch
function mapDispatchToProps (dispatch) {
  return {
    addTodo: (todoData) => dispatch(addTodo(todoData)),
    deleteTodo: (todoData) => dispatch(deleteTodo(todoData)),
    updateTodo: (todoData) => dispatch(updateTodo(todoData)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoAll)
