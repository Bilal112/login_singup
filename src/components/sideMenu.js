import React, { Component } from 'react';
import { asyncStorage, Platform, StyleSheet, Text, View, TextInput, Dimensions, Animated, Image, TouchableHighlight, BackHandler, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Icon, Header, Left, Body, Right, Button, List, Switch, ListItem, Picker, Item, Input, Label, CheckBox, Radio, Spinner } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';
import Middleware from '../store/middleware/auth'
import { connect } from 'react-redux';
import Action from '../store/actions/action';
import * as firebase from 'firebase';

const window = Dimensions.get("window")
function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}
// array to render
const data = [
  {
    heading: "General Knowledge",
    body: "General Knowledge has been defined in deifferential psychology as 'culturally valued knowledge' "
  },
  {
    heading: "Mixed Questions",
    body: "Test description of that category"
  },
  {
    heading: "Photo Question",
    body: "Sample Description of that Category ",

  },
  {
    heading: "Programming",
    body: "Computer programming (often shortend to)"
  },
  {
    heading: "General Knowledge",
    body: "General Knowledge has been defined in deifferential psychology as 'culturally valued knowledge' "
  },
]
class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slide: new Animated.Value(-100),

    }

    this.inputs = {}

  }
  focusNextField = (id) => {
    // this.inputs[id]._root.focus();
    this.inputs[id]._root.focus()
  }
  componentWillReceiveProps(nextProps) {


  }


  //   openImage=()=>{
  //     var options = {
  //       title: 'Select Avatar',
  //       customButtons: [
  //         {name: 'fb', title: 'Choose Photo from Facebook'},
  //       ],
  //       storageOptions: {
  //         skipBackup: true,
  //         path: 'images'
  //       }
  //     };

  //     ImagePicker.showImagePicker(options, (response) => {
  //       console.log('Response = ', response);

  //       if (response.didCancel) {
  //         console.log('User cancelled image picker');
  //       }
  //       else if (response.error) {
  //         console.log('ImagePicker Error: ', response.error);
  //       }
  //       else if (response.customButton) {
  //         console.log('User tapped custom button: ', response.customButton);
  //       }
  //       else {
  //         // let source = { uri: response.uri };
  //         this.setState({photo: response.uri})
  //         this.props.updatePhotos(response,this.props.type)
  // console.log(response)
  //         // You can also display the image using data:
  //         // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };


  //       }
  //     });
  //   }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    Animated.spring(                  // Animate over time
      this.state.slide,            // The animated value to drive
      {
        toValue: 0,                   // Animate to opacity: 1 (opaque)
        bounciness: 0   // Make it take a while
      }
    ).start();

  }
  onBackPress = () => {
    // this.props.history.push(({
    //   pathname: '/home',
    //   state: "home"
    // }))     //going to home
    return true
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  async logout() {
    firebase.auth().signOut();
    await AsyncStorage.removeItem('user');
  }

  render() {
    return (
      < Animated.View style={{
        flex: 1, transform: [
          {
            translateX: this.state.slide
          }
        ]
      }} >

        <LinearGradient colors={['#ff9944', '#fc6076']} style={{ flex: 1 }} locations={[0, 0.9]} >
          <View style={{ width: window.width, flexDirection: "row", flex: 1, }} >
            <View style={{ minWidth: window.width / 1.4, flex: 1, }} >
              <View style={{ minWidth: window.width / 1.4, marginTop: window.height / 16 }} >
                <View style={{ flexDirection: "row", justifyContent: "center", }} >
                  <View style={{ flex: 1, height: window.width / 8, maxWidth: window.width / 8, justifyContent: "center", alignSelf: "center" }} >
                    {/* <TouchableWithoutFeedback onPress={this.openImage} ><Image source={{uri:this.state.photo}} style={{ height: "100%", width: "100%", borderRadius: (window.width / 8) / 2 }} /></TouchableWithoutFeedback></View>
                  <View style={{ justifyContent: "center", paddingLeft: window.width / 17 }} >
                  
            
                    <Text style={{ fontSize: window.fontScale * 23, color: "white", fontFamily: "OpenSans-SemiBold" }} >{this.props.user&&this.props.user.displayName}</Text> */}
                  </View>
                </View>
              </View>
              <View style={{ justifyContent: "flex-start", marginLeft: (window.width / 32) - 32, width: window.width / 1.4 }} >
                <List style={{ width: window.width / 1.332, marginTop: window.height / 20 }} >
                  <ListItem button style={{ borderBottomWidth: 0, width: "100%" }} >
                    <TouchableHighlight style={{ width: "100%", height: window.height / 26, justifyContent: "center", paddingLeft: window.width / 7 }} underlayColor="rgba(255,255,255,0.5)" onPress={() => { this.setState({ isVisible: true, update: true }) }} >
                      <Text style={{ color: "white", fontSize: window.fontScale * 17, fontFamily: "OpenSans-SemiBold" }} >Account</Text>
                    </TouchableHighlight>
                  </ListItem>
                  <ListItem button style={{ borderBottomWidth: 0, width: "100%" }} >
                    <TouchableHighlight style={{ width: "100%", height: window.height / 26, justifyContent: "center", paddingLeft: window.width / 7 }} underlayColor="rgba(255,255,255,0.5)" onPress={() => { this.props.type == 'sp' ? this.props.updatep() : null }} >
                      <Text style={{ color: "white", fontSize: window.fontScale * 17, fontFamily: "OpenSans-SemiBold" }}>Services</Text>
                    </TouchableHighlight>
                  </ListItem>
                  <ListItem button style={{ borderBottomWidth: 0, width: "100%" }} >
                    <TouchableHighlight style={{ width: "100%", height: window.height / 26, justifyContent: "center", paddingLeft: window.width / 7 }} underlayColor="rgba(255,255,255,0.5)" //onPress={() => {this.props.type =='client'&&this.props.history.push('/bookings') }}
                    >
                      <Text style={{ color: "white", fontSize: window.fontScale * 17, fontFamily: "OpenSans-SemiBold" }}>Calendar</Text>
                    </TouchableHighlight>
                  </ListItem>
                  <ListItem button style={{ borderBottomWidth: 0, width: "100%" }} >
                    <TouchableHighlight style={{ width: "100%", height: window.height / 26, justifyContent: "center", paddingLeft: window.width / 7 }} underlayColor="rgba(255,255,255,0.5)" onPress={() => { }} >
                      <Text style={{ color: "white", fontSize: window.fontScale * 17, fontFamily: "OpenSans-SemiBold" }}>Settings</Text>
                    </TouchableHighlight>
                  </ListItem>
                  <ListItem button style={{ borderBottomWidth: 0, width: "100%" }} >
                    <TouchableHighlight style={{ width: "100%", height: window.height / 26, justifyContent: "center", paddingLeft: window.width / 7 }} underlayColor="rgba(255,255,255,0.5)" onPress={() => { this.logout() }} >
                      <Text style={{ color: "white", fontSize: window.fontScale * 17, fontFamily: "OpenSans-SemiBold" }}>Log Out</Text>
                    </TouchableHighlight>
                  </ListItem>
                </List>
              </View>
            </View>
            <View style={{ minWidth: window.width / 1.7, height: window.h, flexDirection: "row", justifyContent: "flex-end", flex: 1, alignItems: "center" }} >
              <View style={{ backgroundColor: "white", minWidth: window.width / 4, height: window.height / 1.3, zIndex: 40, marginRight: "-46%", borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} >
                <Button transparent activeOpacity={1} onPress={() => { this.props.close() }} style={{ marginTop: "25%", height: window.height / 20, width: window.width / 10, alignSelf: "center" }} ><Image source={require("../icons/Menu.png")} style={{ width: "100%", height: "100%" }} resizeMode="contain" /></Button>
                <View style={{ height: Platform.OS == "ios" ? "70%" : "78%", paddingLeft: "25%", }} >
                  {data.map((val, ind) => {
                    return (
                      <View style={{ height: "40%", borderTopLeftRadius: 15, borderBottomLeftRadius: 15, marginTop: "20%", backgroundColor: "white", elevation: 2 }} key={ind} >
                        {/* <Service heading={val.heading} body={val.body} key={ind} dates={this.dates} side={true} /> */}
                      </View>
                    )
                  })}
                </View>
              </View>
              <View style={{ backgroundColor: "white", opacity: 0.5, minWidth: window.width / 5, height: window.height / 1.4, marginRight: "-38%", borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} ></View>
              <View style={{ backgroundColor: "white", minWidth: window.width / 2, opacity: 0.3, height: window.height / 1.5, marginRight: "15%", borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} ></View>
            </View>
          </View>
        </LinearGradient>
      </ Animated.View>
    )
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)