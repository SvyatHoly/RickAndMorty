import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {ListingScreen} from './screens/ListingScreen'
import {DetailScreen} from './screens/DetailScreen'
import {Character} from './types/types'

const Stack = createNativeStackNavigator()

export type RootStackParamList = {
  ListingScreen: undefined
  DetailScreen: {data: Character}
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListingScreen">
        <Stack.Screen name="ListingScreen" component={ListingScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
