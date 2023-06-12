import { Button } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export default function HomeScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={styles.container}>
      <Text>
        Home Screen
      </Text>
      <Button type="primary" onPress={() => {
        navigation.navigate('Counter');
      }}>Go To Counter Page</Button>
    </View>
  );
}
