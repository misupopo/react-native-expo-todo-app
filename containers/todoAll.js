import React from 'react'
import {Container, Header, Title, Content, Body} from 'native-base'
import {connect} from 'react-redux'
import {View, Text} from 'react-native';

class ToDoAll extends React.Component {

  constructor(props) {
    super(props);
    // vueでいうところのdataみたいな物
    this.state = {
      newTodo: false,
    }
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
      </Container>
    )
  }
}

export default connect(
)(ToDoAll)
