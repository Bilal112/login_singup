import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Dimensions, Animated, ScrollView, Keyboard, Image, TouchableOpacity } from 'react-native';
import { Button, Input, Item, Form, Label, Icon, Header, Container, Content, Spinner, Radio, CheckBox, Switch } from 'native-base'
import { connect } from 'react-redux'
import Middleware from "../../store/middleware/auth"
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Action from '../../store/actions/action';
const window = Dimensions.get("window")
import * as firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
//getting state from store
function mapStateToProps(state) {
    return {
        // user: state.auth.user,
        // error: state.auth.error
    }
}
//getting reducers
function mapDispatchToProps(dispatch) {
    return {
        signin: (state) => {
            dispatch(Middleware.Login(state))
        },

    
    }
}
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            slide: new Animated.Value(100),
            focused: false,
            load: false,
            sp: false,
            client: true,
            on: true,
        }
        this.scroll = null,
            this.pass = null,
            this.auth = null

    }
    //signing in function
    submit() {
        if (this.state.email && this.state.password) {
            this.setState({ load: true, on: false }) //loader shown
            this.props.signin(this.state)
        }
        else {
            alert("Fill all fields")
        }
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow); //adding show keyboard event
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide); //adding hide keyboard event
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();//removing show keyboard event
        this.keyboardDidHideListener.remove();//removing hide keyboard event
        this.auth();

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== null) {

            // this.props.history.push("/home")  //going to home
            Actions.home({ pro: "home" })
        }
        else {
            // nextProps.clean()//error
            this.setState({ load: false }, () => {
            }) //loader hide
        }
    }

    componentDidMount() {
        // this.setState({
        //     load: true
        // })

        if (this.props.pro) {
            Animated.spring(                  // Animate over time
                this.state.slide,            // The animated value to drive
                {
                    toValue: 1,                   // Animate to opacity: 1 (opaque)
                }
            ).start();
        }
        // if (this.props.location.search) {
        //     this.setState({ email: this.props.location.search.toString().slice(1) })
        // }


        // checking user
        this.auth = firebase.auth().onAuthStateChanged((user) => {
            if (user) {

            }
            else {
                this.setState({
                    load: false
                })
            }
        })

    }
    _keyboardDidShow = () => {
        this.setState({ focused: true })
    }
    _keyboardDidHide = () => {
        this.scroll.scrollTo({ x: 0, y: 0 })
        this.setState({ focused: false })
    }

    render() {

        return (
            <ScrollView
                ref={(ref) => { this.scroll = ref }}
                scrollEnabled={this.state.focused} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive"  >
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={false}
                    keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
                    <LinearGradient colors={['#ff9944', '#fc6076']} style={{}} locations={[0, 0.9]} >
                        < Animated.View style={this.props.pro ? {
                            height: window.height, justifyContent: "center", transform: [
                                {
                                    translateX: this.state.slide
                                }
                            ]
                        } : { height: window.height, justifyContent: "center" }}   >
                            {/* <Text style={{ fontSize: window.height / 15, alignSelf: "center", paddingBottom: window.height / 15, color: "white", fontFamily: "OpenSans-SemiBold" }} > BookMe </Text> */}
                            <View style={{ backgroundColor: "white", height: window.height / 1.5, width: window.width / 1.3, justifyContent: "center", alignSelf: "center", borderRadius: 10, paddingBottom: window.height / 27, elevation: 2 }} >
                                <Text style={{ fontSize: window.height / 25, paddingHorizontal: window.width / 17, marginBottom: (window.height / 20) - 35, color: "black", fontFamily: "OpenSans-SemiBold" }} >Login</Text>
                                <View style={{ width: "80%", alignSelf: "center", height: "70%" }}  >
                                    <Item floatingLabel style={{}}  >
                                        <Label style={{ paddingTop: window.height / 150, }}  ><Text style={{ fontSize: window.height / 50, fontFamily: "OpenSans-Light" }} > Username</Text></Label>
                                        <Input style={{}} value={this.state.email} onChangeText={(val) => { this.setState({ email: val }) }} keyboardType="email-address" autoCapitalize="none" returnKeyType="next" onSubmitEditing={() => {
                                            this.pass._root.focus()
                                        }} enablesReturnKeyAutomatically={true} blurOnSubmit={false} />
                                    </Item>
                                    <Text>{'\n'}</Text>
                                    <Item floatingLabel >
                                        <Label style={{ paddingTop: window.height / 150 }} ><Text style={{ fontSize: window.height / 50, fontFamily: "OpenSans-Light" }} >Password</Text></Label>
                                        <Input secureTextEntry={true} onChangeText={(val) => { this.setState({ password: val }) }} autoCapitalize='none' getRef={(c) => this.pass = c} onSubmitEditing={this.submit.bind(this)} onFocus={() => { this.scroll.scrollTo({ x: 0, y: 25 }) }} />
                                    </Item>
                                    <Text>{'\n'}</Text>
                                    <Text style={{ alignSelf: "center", fontSize: window.height / 50, color: "black", marginTop: window.height / 50, fontFamily: "OpenSans-Regular" }} > Forgot Password? </Text>

                                    <Text>{'\n'}</Text>

                                    {this.state.load ? <Spinner color="#355df1" /> : <Button rounded style={{ alignSelf: "center", width: window.width / 2.2, justifyContent: "center", marginTop: window.height / 45, height: window.height / 16, backgroundColor: "#355df1" }} onPress={this.submit.bind(this)} ><Text style={{ alignSelf: "center", fontSize: window.height / 40, color: "white", fontFamily: "OpenSans-SemiBold" }} >Login</Text></Button>
                                    }
                                </View>
                            </View>
                            <View style={{ width: window.width / 1.5, backgroundColor: "rgba(255,255,255,0.8)", alignSelf: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, height: window.height / 25, justifyContent: "center" }}  >
                                <Text style={{ alignSelf: "center", fontFamily: "OpenSans-Light", fontSize: window.height / 50 }} >
                                    Don't have an account? <Text style={{ color: "black", textDecorationLine: "underline", fontFamily: "OpenSans-Regular" }} onPress={() => { Actions.signup() }} > Sign Up</Text>
                                </Text>
                            </View>
                        </Animated.View>
                    </LinearGradient>
                </KeyboardAwareScrollView>
            </ScrollView>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)