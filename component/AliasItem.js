import React, { Component } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
  UIManager,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: [],
    };

    this.animatedValue = new Animated.Value(0);

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.item.id !== this.props.item.id) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.props.afterAnimationComplete();
    });
  }

  removeItem = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      let inputData = this.state.inputData;
      inputData.pop();
      this.setState({ inputData });
      this.props.removeItem(this.props.item.id);
    });
  };

  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray,
      });
    } else {
      dataArray.push({ name: text, id: index });
      this.setState({
        inputData: dataArray,
      });
    }
    this.saveItem("Alias", this.state.inputData);
  };

  saveItem = async (item, selectedValue) => {
    try {
      await AsyncStorage.setItem(item, JSON.stringify(selectedValue));
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  };

  render() {
    const translateAnimation = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-width, 0, width],
    });

    const opacityAnimation = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    });

    return (
      <Animated.View
        style={[
          styles.viewHolder,
          {
            transform: [{ translateX: translateAnimation }],
            opacity: opacityAnimation,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            marginRight: 20,
            marginTop: 7,
            marginBottom: 5,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.dateView2}>
            <TextInput
              style={[styles.inputText, { left: 5, width: 300 }]}
              placeholder="Nama Alias..."
              placeholderTextColor="#777"
              keyboardType="default"
              onChangeText={(text) => this.addValues(text, this.props.item.id)}
            />
          </View>
          <View style={styles.dateView2}>
            <View
              style={{
                marginTop: 11,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={this.removeItem}>
                <Icon
                  style={{ left: 15 }}
                  name="remove-circle-outline"
                  color={"#EE4A4A"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  viewHolder: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  inputText: {
    alignSelf: "center",
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    width: "96%",
    height: 45,
    color: "#000",
    borderWidth: 1.5,
    borderColor: "#cdcdcd",
    borderRadius: 10,
  },
});
