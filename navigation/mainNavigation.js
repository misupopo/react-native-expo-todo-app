import * as React from 'react';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    <Icon size={24} color="white" name={icon} />
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
                return <Text>{ activeTab }</Text>;
              }

              if (activeTab === 'ACTIVE') {
                return <Text>{ activeTab }</Text>;
              }

              if (activeTab === 'COMPLETED') {
                return <Text>{ activeTab }</Text>;
              }
            })()
          }
        </View>
        <BottomNavigation
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
}
