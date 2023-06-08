import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Counter from '../features/couter';
import HomeScreen from '../features/home';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Counter' component={Counter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
