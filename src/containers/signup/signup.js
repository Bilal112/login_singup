import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Dimensions, BackHandler, Animated, Image, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button, Form, Item, Input, Label, Icon, Spinner, Radio, CheckBox, Switch } from 'native-base'
import { connect } from 'react-redux'
import Middleware from "../../store/middleware/auth"
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Action from '../../store/actions/action'
import { Actions } from 'react-native-router-flux'

const window = Dimensions.get("window")
//getting state from store
function mapStateToProps(state) {
    return {
        user: state.auth.user,
        signin: state.auth.isAuth,
        error: state.auth.isError,
        type: state.auth.acc
    }
}
//getting reducer 
function mapDispatchToProps(dispatch) {
    return {
        signup: (state) => {
            dispatch(Middleware.Signup(state))
        },
        // clean: () => {
        //     dispatch(Action.Signout())
        // }
    }
}
class Signup extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            confirm: "",
            name: "",
            focused: false,
            load: false,
            slide: new Animated.Value(-100),

        }
        this.scroll = null,
            this.inputs = {}
    }
    focusNextField = (id) => {
        // this.inputs[id]._root.focus();
        this.inputs[id]._root.focus()
    }
    //signup
    submit() {
        if (this.state.email && this.state.password && this.state.confirm && this.state.name) {
            if (this.state.password === this.state.confirm) {
                this.setState({ load: true })
                this.props.signup(this.state)
            }
            else {
                alert("Passwords do not match")
            }
        }
        else {
            alert("Fill all fields")
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            Actions.home({ pro: "home" })


        }
        else {
            // nextProps.clean()

            this.setState({ load: false })
        }
        if (nextProps.error) {
            this.setState({ load: false })
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        Animated.spring(                  // Animate over time
            this.state.slide,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                // Make it take a while
            }
        ).start();
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    onBackPress = () => {

        return true
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow = () => {
        this.setState({ focused: true })
    }
    _keyboardDidHide = () => {
        // alert('Keyboard Hidden');
        this.scroll.scrollTo({ x: 0, y: 0 })
        this.setState({ focused: false })
    }
    render() {
        return (
            <ScrollView ref={(ref) => { this.scroll = ref }}
                scrollEnabled={this.state.focused}
                contentContainerStyle={{ backgroundColor: "white" }}
                showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive" >
                <View style={{ justifyContent: "center", height: window.height - 22, backgroundColor: "white" }} >
                    < Animated.View style={{
                        flex: 1, transform: [
                            {
                                translateX: this.state.slide
                            }
                        ]
                    }} >
                        <View style={{ flex: 1, justifyContent: "center", }} >
                            <Form style={{
                                width: window.width / 1.1, alignSelf: "center",//marginTop:window.height/19
                            }} >
                                <Text style={{
                                    fontSize: window.height / 22, color: "black",//paddingLeft:window.width/30,
                                    fontFamily: "OpenSans-SemiBold"
                                }} >Sign Up</Text>
                                <View style={{}} >
                                    <Item floatingLabel style={{ width: window.width / 1.2, }}  >
                                        <Label style={{
                                            paddingTop: window.height / 150
                                        }}
                                        ><Text style={{ fontSize: window.height / 50, fontFamily: "OpenSans-Light" }} >Email</Text></Label>
                                        <Input style={{}} onChangeText={(val) => { this.setState({ email: val }) }} keyboardType="email-address" autoCapitalize="none"
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => {
                                                this.focusNextField('two');
                                            }}
                                            returnKeyType={"next"}
                                            getRef={input => {
                                                this.inputs['one'] = input;
                                            }}
                                        />
                                    </Item>
                                    {/* <Text>{'\n'}</Text> */}

                                    <Item floatingLabel style={{ width: window.width / 1.2, }}  >
                                        <Label style={{
                                            paddingTop: window.height / 150
                                        }}
                                        ><Text style={{ fontSize: window.height / 50, fontFamily: "OpenSans-Light" }} >Username</Text></Label>
                                        <Input style={{}} onChangeText={(val) => { this.setState({ name: val }) }} autoCapitalize="none"
                                            onSubmitEditing={() => {
                                                this.focusNextField('three');
                                            }}
                                            returnKeyType={"next"}
                                            blurOnSubmit={false}
                                            getRef={input => {
                                                this.inputs['two'] = input;
                                            }}
                                        />
                                    </Item>
                                    {/* <Text>{'\n'}</Text> */}

                                    <Item floatingLabel style={{ width: window.width / 1.2 }}  >
                                        <Label style={{
                                            paddingTop: window.height / 150
                                        }
                                        } ><Text style={{ fontSize: window.height / 50, fontFamily: "OpenSans-Light" }} >Password</Text></Label>
                                        <Input secureTextEntry={true} onChangeText={(val) => { this.setState({ password: val }) }} autoCapitalize="none"
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => {
                                                this.focusNextField('four');
                                            }}
                                            returnKeyType={"next"}
                                            getRef={input => {
                                                this.inputs['three'] = input;
                                            }}

                                        />
                                    </Item>
                                    {/* <Text>{'\n'}</Text> */}

                                    <Item floatingLabel style={{ width: window.width / 1.2 }}  >
                                        <Label style={
                                            {
                                                paddingTop: window.height / 150
                                            }} ><Text style={{ fontSize: window.height / 50, fontFamily: "OpenSans-Light" }} >Confirm Password</Text></Label>
                                        <Input secureTextEntry={true} onChangeText={(val) => { this.setState({ confirm: val }) }} autoCapitalize="none"
                                            blurOnSubmit={true}
                                            returnKeyType={"done"}
                                            getRef={input => {
                                                this.inputs['four'] = input;
                                            }}
                                            onSubmitEditing={this.submit.bind(this)}
                                        />
                                    </Item>
                                </View>
                                <Text>{'\n'}</Text>

                                {this.state.load ? <Spinner color="orange" /> : <Button block style={{ width: window.width / 1.8, alignSelf: "center", marginTop: window.height / 30, height: window.height / 15, elevation: 0, borderRadius: 8 }} onPress={
                                //    this.submit.bind(this)
                                ()=>{Actions.home({pro:"home"})}
                                } ><LinearGradient colors={['#fc6076', '#ff9944']} locations={[0, 0.9]} start={{ x: 0.46, y: 0.35 }} end={{ x: 0.5, y: 1.0 }} style={{ width: window.width / 1.8, height: window.height / 15, justifyContent: "center", borderRadius: 5 }} ><Text style={{ color: "white", fontFamily: "OpenSans-Regular", justifyContent: "center", alignSelf: "center" }} >SIGN UP</Text></LinearGradient></Button>
                                }
                            </Form>
                            <Text>{'\n'}</Text>
                            
                            <Text style={{ alignSelf: "center", fontFamily: "OpenSans-Light" }} > Already have an account? <Text style={{ textDecorationLine: "underline", color: "black", fontFamily: "OpenSans-Regular" }} onPress={() => {
                                Actions.login({ pro: "ss" })
                            }} >Login</Text> </Text>
                        </View>
                    </Animated.View>
                </View>
            </ScrollView>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)