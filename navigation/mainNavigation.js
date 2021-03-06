import * as React from 'react';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToDoAll from '../containers/todoAll';

const tabDetail = [
  {
    key: 'ALL',
    icon: 'folder',
    label: 'ALL',
    barColor: '#388E3C',
    pressColor: 'rgba(255, 255, 255, 0.16)'
  },
  {
    key: 'ACTIVE',
    icon: 'check-square',
    label: 'ACTIVE',
    barColor: '#B71C1C',
    pressColor: 'rgba(255, 255, 255, 0.16)'
  },
  {
    key: 'COMPLETED',
    icon: 'check',
    label: 'COMPLETED',
    barColor: '#E64A19',
    pressColor: 'rgba(255, 255, 255, 0.16)'
  }
]

export default class AppContainer extends React.Component {
  tabs = tabDetail

  state = {
    activeTab: 'ALL'
  }

  renderIcon = icon => ({ isActive }) => (
    <View style={[

      ]}>
      <Icon size={20} color="white" name={icon} />
    </View>
  )

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {
            (() => {
              const activeTab = this.state.activeTab;

              if (activeTab === 'ALL') {
                return <ToDoAll showNewTodo = { true } screen = 'All' />;
              }

              if (activeTab === 'ACTIVE') {
                return <ToDoAll showNewTodo = { true } screen = 'Active' />;
              }

              if (activeTab === 'COMPLETED') {
                return <ToDoAll showNewTodo = { true } screen = 'Completed' />;
              }
            })()
          }
        </View>
        <BottomNavigation
          style={
            [
              {
                height: 90,
                paddingTop: 10
              }
            ]
          }
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
}
