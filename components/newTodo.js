import React from 'react'
import {Body, Icon, CheckBox, ListItem, Input, Button} from 'native-base'

export default class NewToDo extends React.Component {

  constructor(props) {
    super(props)
    const title = ''
    const completed = false
    const createdAt = ''

    this.state = {
      title,
      completed,
      createdAt,
    }
  }

  setStateUtil = (property, value) => {
    this.setState({
      [property]: value,
    })
  }

  render() {
    const {completed, title} = this.state;
    const {onPress, onCancel} = this.props;
    // const todoText = 'What needs to be done?';
    const todoText = 'やらなければいけないことを追加';

    return (
      <ListItem>
        <CheckBox
          checked={completed}
          onPress={() => this.setStateUtil('completed', !completed)}
        />
        <Body>
          <Input placeholder={todoText}
                 onChangeText={(txt) => this.setStateUtil('title', txt)}
                 onSubmitEditing={() => onPress(this.state)}
          />
        </Body>
        <Button
          transparent
          onPress={() => onCancel(show = false)}
        >
          <Icon name={'md-trash'}/>
        </Button>
      </ListItem>
    )
  }
}
