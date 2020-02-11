import React from 'react'
import { Container, Header, Title, Content, Body } from 'native-base'
import {connect} from 'react-redux'
import {View, Text} from 'react-native';
import AddToDoButton from '../components/addTodoButton'
import NewToDo from '../components/newTodo'
import { addTodo, deleteTodo, updateTodo } from '../store/reducers/todoReducer'

class ToDoAll extends React.Component {

  constructor(props) {
    super(props);

    // vueでいうところのdataみたいな物
    this.state = {
      newTodo: false,
    }
  }

  saveToDoData = (todoData) => {
    this.addNewToDo(show = false)
    // mapDispatchToPropsのaddTodoを呼び出す
    this.props.addTodo(todoData)
  }

  // emitのような物がトリガーになったときに実行される
  // showがtrueになると新しいTODOリストが1件現れる
  addNewToDo = (show) => {
    this.setState({
      newTodo: show
    })
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

    return (
      <Container>
        <Header>
          <Body>
            <Title>{ screen }</Title>
          </Body>
        </Header>
        <Content>
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
