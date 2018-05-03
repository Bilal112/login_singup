import React, { Component } from 'react';
import { Router,  Scene,} from 'react-native-router-flux';
import {View} from 'react-native';
import { Provider } from "react-redux";
import store from './store/store'
import {Login,Signup,Home} from './containers/index'

export default class Routes extends Component {


    render() {
        return (
           
            <Provider store={store}>
            <View style= {{flex:1}} >
                <Router>
                    <Scene key="root">

                        <Scene
                            initial
                            key="login"
                            component={Login}
                            hideNavBar={true}
                            
                        />
                    <Scene
                    // type="replace"
                    key="signup"
                    component={Signup}
                    hideNavBar= {true}
                    />
                     <Scene
                    // type="replace"
                    key="home"
                    component={Home}
                    hideNavBar= {true}
                    />
                  
                    </Scene>
                </Router>
                </View>
            </Provider>

        )
    }
}