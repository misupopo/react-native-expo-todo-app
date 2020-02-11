import React from 'react'
import { Container, Header, Title, Content, Body } from 'native-base'
import {connect} from 'react-redux'
import {View, Text} from 'react-native';
import AddToDoButton from '../components/addTodoButton'
import NewToDo from '../components/newTodo'

class ToDoAll extends React.Component {

  constructor(props) {
    super(props);

    // vueでいうところのdataみたいな物
    this.state = {
      newTodo: false,
    }
  }

  saveToDoData = (todo) => {
    this.addNewToDo(show = false)
    // this.props.addTodo(todo)
  }

  // emitのような物がトリガーになったときに実行される
  addNewToDo = (show) => {
    this.setState({
      newTodo: show
    })
  }

  render() {
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
            newTodo &&
            <NewToDo
              onPress = { this.saveToDoData }
              onCancel = { this.addNewToDo }
            />
          }
        </Content>
        {
          (() => {
            if (showNewTodo) {
              return <AddToDoButton onAddNewToDo = { this.addNewToDo }  />
            }
          })()
        }
      </Container>
    )
  }
}

export default connect(
)(ToDoAll)
