import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './tab';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  );
};

export default RootNavigator;