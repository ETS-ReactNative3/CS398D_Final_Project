import * as React from "react";
import {Image, ImageBackground, Text, TextInput, TouchableHighlight, View} from "react-native";

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  state = {
    username: '',
    password: '',
    displayName: ''
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('./../res/login_background.jpg')}
        >
          <Image
            style={{width: 128, height: 128}}
            source={require('./../res/speech-bubble.png')}
          />
          <Text style={styles.title}>Sign Up</Text>
          <TextInput style={styles.loginInput}
                     onChangeText={(username) => this.setState({username})}
                     placeholder='Email'
          />
          <TextInput style={styles.loginInput}
                     onChangeText={(password) => this.setState({password})}
                     placeholder='Password'
                     secureTextEntry={true}
          />
          <TextInput style={styles.loginInput}
                     onChangeText={(displayName) => this.setState({displayName})}
                     placeholder='Display Name'
          />
          <View style={styles.row}>
            <TouchableHighlight
              onPress={()=>{global.firebase.auth().createUserWithEmailAndPassword(this.state.username.toLowerCase(),this.state.password)
                .then((res)=>{
                  //console.log(res);
                  //After creating the user, update that user profile with the display name provided in Sign Up
                  let avatar = global.firebase.authHelper.avatarPlaceholders[Math.floor(Math.random() * global.firebase.authHelper.avatarPlaceholders.length)]
                  global.firebase.auth().currentUser.updateProfile({displayName:this.state.displayName, photoURL:avatar})
                    .then(()=>{
                      global.firebase.authService.updatePublicProfile()
                        .then(()=>{
                          this.props.navigation.navigate('App');
                        })
                        .catch(error=>{
                          console.log(error);
                        });
                      //Wait until user account is updated, then navigate to chatroom listing page.
                    });
                })
                .catch(error=>{
                  console.log(error);
                });
              }}
            >
              <View style={styles.button}><Text style={styles.buttonText}>Signup</Text></View>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
