import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ScrollView, Dimensions, Image, Animated, BackHandler, TouchableHighlight, FlatList } from 'react-native';
import { Picker, Icon, Header, Left, Body, Right, Button, Drawer, Container, Content, Item, Input, Label, } from 'native-base'
import SideMenu from '../../components/sideMenu'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';

import Middleware from '../../store/middleware/auth';


const window = Dimensions.get("window")
function mapStateToProps(state) {
    return {
  
    }
}
//getting reducers
function mapDispatchToProps(dispatch) {
    return {
     
    }
}


class Home extends Component {
    constructor() {
        super()
        this.state = {
            slide: new Animated.Value(100),
            slideb: new Animated.Value(-100),
            open: false,
            user: { name: "" },
            isVisible: false,
         

        }
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.user) {
            this.setState({
                user: nextprops.user
            })
        }
    
        
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

        if (this.props.pro === "home") {
            Animated.spring(                  // Animate over time
                this.state.slide,            // The animated value to drive
                {
                    toValue: 0,                   // Animate to opacity: 1 (opaque)
                    bounciness: 0,     // Make it take a while
                }
            ).start();
        }
        else if (this.props.pro === "any") {
            Animated.spring(                  // Animate over time
                this.state.slideb,            // The animated value to drive
                {
                    toValue: 0,                   // Animate to opacity: 1 (opaque)
                    bounciness: 0   // Make it take a while
                }
            ).start();
        }
      
    }

    dates = (i) => {
     
    }

    onBackPress = () => {
        if (this.state.open) {
            this.closeDrawer()
        }
        return true
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    logout = () => {
    }
 
    


    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideMenu close={this.closeDrawer} log={this.logout} user={this.state.user} loga={this.log} updatep={this.update} />}
                type="displace"

                openDrawerOffset={-1}
                panCloseMask={50}
                captureGestures={true}
                onClose={() => { this.closeDrawer(), this.setState({ open: false }) }}
                onOpen={() => { this.setState({ open: true }) }}

                panOpenMask={20}
            >

                    < Animated.View style={this.props.pro === "home" ? {
                        flex: 1, flex: 1, backgroundColor: "white", transform: [
                            {
                                translateX: this.state.slide
                            }
                        ]
                    } : this.props.pro ? {
                        flex: 1, flex: 1, backgroundColor: "white", transform: [
                            {
                                translateX: this.state.slideb
                            }
                        ]
                    } : { flex: 1, backgroundColor: "white" }} >
                        <Header noShadow={true} style={{ backgroundColor: "white", height: window.height / 13 }} androidStatusBarColor="black" iosBarStyle="dark-content"  >
                            <Left style={{}} >
                                <Button transparent activeOpacity={1} onPress={() => { this.openDrawer() }} style={{ height: window.height / 22, width: window.width / 9, alignSelf: Platform.OS ? null : "center" }} ><Image source={require("../../icons/Menu.png")} style={{ width: "100%", height: "100%" }} resizeMode="contain" /></Button>
                            </Left>
                            {Platform.OS == "ios" ? null :
                                <Left>
                                </Left>

                            }
                            <Body style={{ flex: 1, alignItems: "center" }} >
                                < Text style={{ fontSize: window.fontScale * 25, color: "black", fontFamily: "OpenSans-Regular" }} >Home</Text>
                            </Body>
                            <Right>
                            </Right>

                        </Header>
                     
                    </ Animated.View>
            </Drawer>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)