import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity
} from "react-native";

import CenterMessage from "..//components/CenterMessage";

import { colors } from "../theme";

class City extends React.Component {
  static navigationOptions = props => {
    const { city } = props.navigation.state.params;
    return {
      title: city.city,
      headerTitleStyle: {
        color: "white",
        fontSize: 20,
        fontWeigh: "400"
      }
    };
  };
  state = {
    name: "",
    info: ""
  };
  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  addLocation = () => {
    if (this.state.name === "" || this.state.info == "") return;
    const { city } = this.props.navigation.state.params;
    const location = {
      name: this.state.name,
      info: this.state.info
    };
    this.props.screenProps.addLocation(location, city);
    this.setState({ name: "", info: "" });
  };

  render() {
    const { city } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[!city.location.length && { flex: 1 }]}
        >
          <View
            style={[
              styles.locationContainer,
              !city.location.length && { flex: 1, fustifyContent: "center" }
            ]}
          >
            {!city.location.length && (
              <CenterMessage message="No locations for this city!" />
            )}
            {city.location.map((location, index) => (
              <View key={index} style={styles.locationContainer}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={styles.locationInfo}>{location.info}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <TextInput
          onChangeText={val => this.onChangeText("name", val)}
          placeholder="Location name"
          value={this.state.name}
          style={styles.input}
          placeholderTextColor="white"
        />
        <TextInput
          onChangeText={val => this.onChangeText("info", val)}
          placeholder="Location info"
          value={this.state.info}
          style={[styles.input, styles.input2]}
          placeholderTextColor="white"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.addLocation}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add Location</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  locationsContainer: {
    paddingBottom: 104
  },
  input: {
    height: 50,
    backgroundColor: colors.primary,
    color: "white",
    paddingHorizontal: 8,
    position: "absolute",
    width: "100%",
    bottom: 104,
    left: 0
  },
  input2: {
    bottom: 52
  },
  buttonContainer: {
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white"
  },
  locationContainer: {
    padding: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2
  },
  locationName: {
    fontSize: 20
  },
  locationInfo: {
    color: "rgba(0,0,0,.5)"
  }
});

export default City;
