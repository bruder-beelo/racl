import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BookScreen } from '../screens/BookScreen';
import { ReservationsScreen } from '../screens/ReservationsScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { MainTabParamList } from './types';
import { theme } from '../theme/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: theme.colors.accent,
          borderTopWidth: 0,
          bottom: 45,
          left: 12,
          right: 12,
          height: 55,
          borderRadius: 28,
          paddingBottom: 6,
          paddingTop: 6,
          shadowColor: theme.colors.accent,
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 20,
        },
        tabBarActiveTintColor: theme.colors.textPrimary,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.3,
        },
      }}
    >
      <Tab.Screen
        name="Book"
        component={BookScreen}
        options={{
          tabBarLabel: 'Book',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'car' : 'car-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reservations"
        component={ReservationsScreen}
        options={{
          tabBarLabel: 'My Reservations',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
