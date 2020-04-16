import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import DeliveryDetails from '~/pages/DeliveryDetails';
import CreateProblem from '~/pages/CreateProblem';
import VisualizeProblem from '~/pages/VisualizeProblem';
import ConfirmPhoto from '~/pages/ConfirmPhoto';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({ SignIn }),
        App: createBottomTabNavigator(
          {
            Delivery: {
              screen: createStackNavigator(
                {
                  Dashboard,
                  DeliveryDetails,
                  CreateProblem,
                  VisualizeProblem,
                  ConfirmPhoto,
                },
                {
                  defaultNavigationOptions: {
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Entregas',
                tabBarIcon: <Icon name="menu" size={20} color="#7159c1" />,
              },
            },
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7159c1',
              style: {
                padding: 5,
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
