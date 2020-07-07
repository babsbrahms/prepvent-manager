import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Dashboard from './screen/Dashboard';
import Crowd from './screen/Crowd';
import Task from './screen/Task';
import Organizer from './screen/Organizer';
import Communication from './screen/Communication';

import Home from './screen/Home';
import Notification from './screen/Notification';
import Wallet from './screen/Wallet';
import Account from './screen/Account';
import Create from './screen/Create';
import Settings from './screen/Settings';

const Main = createBottomTabNavigator({
    Task: {
        screen: Task,
        navigationOptions: {
            tabBarIcon: ({ focused }) => <Ionicons name="ios-list-box" color={focused? '#2DF19C': '#FFFFFF'} size={30} />
        }
    },
    Crowd: {
        screen: Crowd,
        navigationOptions: {
            tabBarIcon: ({ focused }) => <Ionicons name="ios-people" color={focused? '#2DF19C': '#FFFFFF'} size={30} />
        }
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            tabBarIcon: ({ focused }) => <Ionicons name="ios-speedometer" color={focused? '#2DF19C': '#FFFFFF'} size={30} />
        }
    },
    Organizer: {
        screen: Organizer,
        navigationOptions: {
            tabBarIcon: ({ focused }) => <Ionicons name="ios-clipboard" color={focused? '#2DF19C': '#FFFFFF'} size={30} />
        }
    },
    Communication: {
        screen: Communication,
        navigationOptions: {
            tabBarIcon: ({ focused }) => <Ionicons name="ios-mail" color={focused? '#2DF19C': '#FFFFFF'} size={30} />
        }
    }
}, 
{
    initialRouteName: 'Dashboard',
    order: ['Task', 'Crowd', 'Dashboard', 'Organizer', 'Communication'],
    tabBarOptions: {
        activeTintColor: "#FFFFFF",
        activeBackgroundColor: '#0E0C20',
        inactiveBackgroundColor: '#0E0C20',
        inactiveTintColor: '#FFFFFF',
        // labelStyle: {
        //     fontSize: 16,
        // },
        showLabel: false,
        showIcon: true
    },
});

const AppNavigator = createStackNavigator(
    {
      Home: Home,
      Account: Account,
      Wallet: Wallet,
      Create: Create,
      Main: Main,
      Settings: Settings,
      Notification: Notification
    },
    {
      initialRouteName: 'Home',
      mode: "modal",
      headerMode: "none"
    }
);


export default createAppContainer(AppNavigator);