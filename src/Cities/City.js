import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from "react-native";

import CenterMessage from "..//components/CenterMessage";

import { colors } from "../theme";

class City extends React.Component {
  static navigationOptions = (props) => {
    const { city } = props.navigation.state.params;
    return {
      title: city.city,
      headerTitleStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
      },
    };
  };
  state = {
    name: "",
    info: "",
  };
  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  addLocation = () => {
    if (this.state.name === "" || this.state.info == "") return;
    const { city } = this.props.navigation.state.params;
    const location = {
      name: this.state.name,
      info: this.state.info,
    };
    this.props.screenProps.addLocation(location, city);
    this.setState({ name: "", info: "" });
  };

  render() {
    const { city } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={styles.scrollViewStyle}
            contentContainerStyle={[!city.locations.length && { flex: 1 }]}
          >
            <View
              style={[
                { padding: 10, flex: 1 },
                !city.locations.length && styles.locationContainer,
                !city.locations.length && { justifyContent: "center" },
              ]}
            >
              {!city.locations.length && (
                <CenterMessage message="No locations for this city!" />
              )}
              {city.locations.map((location, index) => (
                <View key={index} style={styles.locationContainer}>
                  <Text style={styles.locationName}>{location.name}</Text>
                  <Text style={styles.locationInfo}>{location.info}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View>
          <TextInput
            onChangeText={(val) => this.onChangeText("name", val)}
            placeholder="Location name"
            value={this.state.name}
            style={styles.input}
            placeholderTextColor="white"
          />
          <TextInput
            onChangeText={(val) => this.onChangeText("info", val)}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewStyle: { width: "100%", position: "absolute", height: 400 },

  locationsContainer: {
    paddingBottom: 104,
  },
  input: {
    height: 50,
    backgroundColor: colors.primary,
    color: "white",
    paddingHorizontal: 8,
    position: "absolute",
    width: "100%",
    bottom: 104,
    left: 0,
  },
  input2: {
    bottom: 52,
  },
  buttonContainer: {
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  locationContainer: {
    padding: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  locationName: {
    fontSize: 20,
  },
  locationInfo: {
    color: "rgba(0,0,0,.5)",
  },
});

export default City;

//수정사항
// -(1. 문제 : android의 scroll view가 모바일 화면 전체를 갖는다.
// 물론 location name, info, add location 텍스트인풋과 버튼은 스크롤 뷰 위에서 보여 가려지진 않지만
// 스크롤뷰의 맨 밑에있는 2,3개의 아이템이 텍스트인풋과 버튼 뒤에 가려져서 보이지 않는다.
// 스크롤뷰와 텍스트인풋 두 사이가 곂치게 않게하려고한다. )

//  2. 해결방법
// <ScrollView
// contentContainerStyle={[!city.locations.length && { flex: 1 }]}
// >
//   이 부분에서

//   --style={styles.scrollViewStyle}을 ScrollView에 넣어서 수정하엿다. 즉
//   <ScrollView
//       style={styles.scrollViewStyle}
//       contentContainerStyle={[!city.locations.length && { flex: 1 }]}
//     >
//       가 되었음.
//       물론 스타일은  position: "absolute", height: 400 주었다.

//   --onst styles = StyleSheet.create({
//   scrollViewStyle: { width: "100%", position: "absolute", height: 400 }
//   })

//만약 두개의 텍스트 인풋을  position: "absolute" 이녀석의 포지션을 상댓값으로하면
// 텍스트 인풋을 눌러서 키보드 창이 밑에서 시작되어 화면에 올라왔을때 add location을 가려버리게 된다.
