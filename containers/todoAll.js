import React from 'react'
import { Container, Header, Title, Content, Body } from 'native-base'
import {connect} from 'react-redux'
import {View, Text} from 'react-native';
import AddToDoButton from '../components/addTodoButton'

class ToDoAll extends React.Component {

  constructor(props) {
    super(props);

    // vueでいうところのdataみたいな物
    this.state = {
      newTodo: false,
    }
  }

  // emitのような物がトリガーになったときに実行される
  addNewToDo = (show) => {
    console.log('show');
    console.log(show);
  }

  render() {
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
          <Text>text</Text>
        </Content>
        <AddToDoButton onAddNewToDo = { this.addNewToDo }  />
      </Container>
    )
  }
}

export default connect(
)(ToDoAll)
