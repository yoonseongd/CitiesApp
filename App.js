import React, { Component } from "react";
import { Platform, StyleSheet, View, Text } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import Tabs from "./src";

const key = "state";

const initialState = [
  {
    city: "Paris",
    country: "France",
    id: 0,
    location: []
  },
  {
    city: "Busan",
    country: "Korea",
    id: 1,
    location: []
  }
];

export default class App extends Component {
  state = {
    cities: []
  };

  async componentDidMount() {
    console.log("compound did mount");
    try {
      let cities = await AsyncStorage.getItem(key);
      if (cities) {
        cities = JSON.parse(cities);
        this.setState({ cities });
      }
    } catch (e) {
      console.log("error from AsyncStorage: ", e);
    }
  }

  addCity = city => {
    const cities = this.state.cities;
    cities.push(city);
    this.setState({ cities });
    AsyncStorage.setItem(key, JSON.stringify(cities))
      .then(() => console.log("storage updated!"))
      .catch(e => console.log("e: ", e));
  };

  addLocation = (location, city) => {
    const index = this.state.cities.findIndex(item => {
      return item.id === city.id;
    });
    const chosenCity = this.state.cities[index];
    chosenCity.locations.push(location);
    const cities = [
      ...this.state.cities.slice(0, index),
      chosenCity,
      ...this.state.cities.slice(index + 1)
    ];

    this.setState(
      {
        cities
      },
      () => {
        AsyncStorage.setItem(key, JSON.stringify(cities))
          .then(() => console.log("storage updated!"))
          .catch(() => console.log("e: ", e));
      }
    );
  };

  render() {
    return (
      <Tabs
        screenProps={{
          cities: this.state.cities,
          addCity: this.addCity,
          addLocation: this.addLocation
        }}
      />
    );
  }
}
//dsaf
//react native 공식문서 네비게이터 만드는 방법

// import * as React from "react";
// import { Button, View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// function HomeScreen({ navigaion }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate("Details")}
//       />
//     </View>
//   );
// }

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screen</Text>
//       <Button
//         title="Go to Details...again"
//         onPress={() => navigation.navigate("Details")}
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
//       <Button title="Go back" onPress={() => navigation.navigate.goBack()} />
//       <Button
//         title="Go back to first screen in stack"
//         onPress={() => navigation.popToTop()}
//       />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// export default class App extends React.Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name="Details" component={DetailsScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }
