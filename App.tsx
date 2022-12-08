import {StatusBar} from 'expo-status-bar'
import * as MediaLibrary from 'expo-media-library';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, TextInput, ScrollView, SafeAreaView, Button} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SafeAreaProvider  } from 'react-native-safe-area-context';
import {Camera} from 'expo-camera'
import Axios from 'axios';

// import * as SMS from 'expo-sms';

function HomeScreen({ navigation }:any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button 
        title='Go to Details'
        onPress={()=> navigation.navigate('Details')}
       />
    </View>
  );
};

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();


export default function App() {

  return (
      <NavigationContainer>
        {/* <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{
            title:'My home',
            headerStyle : {
              backgroundColor : "orange"
            },
            headerTintColor: '#fff',
            headerTitle : (props)=> <LogoTitle {...props}/>
            }} />
          <Stack.Screen name="Details" component={DetailsScreen} />

        </Stack.Navigator> */}
        
        <Tab.Navigator screenOptions={{headerShown : false}}>
          <Tab.Screen
            name='Home' component={HomeStackScreen}
          />
          <Tab.Screen
            name='Settings' component={SettingsStackScreen}
          />
        </Tab.Navigator>

      </NavigationContainer>
    // <View style={{flex:1, alignItems: 'center',justifyContent: 'center'}}>
    //   <TouchableOpacity onPress={checks} style={isChecked ? {backgroundColor:"red", padding: 10} : {backgroundColor:"green", padding : 10}}>
    //     <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} /><Text>aasd</Text>
    //   </TouchableOpacity>
   
      
    //   <Text>{number}</Text>
    //   <View style={{display:'flex', flexDirection: "row",justifyContent : 'space-between', width: 100}}>
    //     <TouchableOpacity
    //       onPress={increase}
    //       style={{backgroundColor:"red", padding: 10}}
    //     >
    //       <Text>
    //         +
    //       </Text>
    //     </TouchableOpacity>
        
    //     <TouchableOpacity
    //       onPress={decrease}
    //       style={{backgroundColor:"green", padding: 10}}

    //     >
    //       <Text>
    //         -
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    display : 'none',
    margin: 8,
  },
});


/* ---------------- camera -------------- */
// let camera: Camera

// export default function App() {
//   const [startCamera, setStartCamera] = React.useState(false)
//   const [previewVisible, setPreviewVisible] = React.useState(false)
//   const [capturedImage, setCapturedImage] = React.useState<any>(null)
//   const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
//   const [flashMode, setFlashMode] = React.useState('off')

//   const [value, setValue] = React.useState('')


//   const sendMessage = async()=> {
//     const data = Axios.post("https://hooks.slack.com/services/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", {
//     text : value
//     })
//   }

//   const __startCamera = async () => {
//     const {status} = await Camera.requestCameraPermissionsAsync()
//     console.log(status)
//     if (status === 'granted') {
//       setStartCamera(true)
//     } else {
//       Alert.alert('Access denied')
//     }
//   };

//   const __takePicture = async () => {
//     const photo: any = await camera.takePictureAsync()
//     console.log(photo)
//     setPreviewVisible(true)
//     //setStartCamera(false)
//     setCapturedImage(photo)
//   };
  
//   const __savePhoto = () => {
//     MediaLibrary.saveToLibraryAsync(capturedImage.uri)
//   }
//   const __done = () => {
//     setStartCamera(false);
//   }
//   const __retakePicture = () => {
//     setCapturedImage(null)
//     setPreviewVisible(false)
//     __startCamera()
//   }
//   const __handleFlashMode = () => {
//     if (flashMode === 'on') {
//       setFlashMode('off')
//     } else if (flashMode === 'off') {
//       setFlashMode('on')
//     } else {
//       setFlashMode('auto')
//     }
//   }
//   const __switchCamera = () => {
//     if (cameraType === 'back') {
//       setCameraType('front')
//     } else {
//       setCameraType('back')
//     }
//   }
//   return (
//     <View style={styles.container}>
//       {startCamera ? (
//         <View
//           style={{
//             flex: 1,
//             width: '100%'
//           }}
//         >
//           {previewVisible && capturedImage ? (
//             <CameraPreview photo={capturedImage} savePhoto={__savePhoto} done={__done} retakePicture={__retakePicture} />
//           ) : (
//             <Camera
//               type={cameraType}
//               flashMode={flashMode}
//               style={{flex: 1}}
//               ref={(r) => {
//                 camera = r
//               }}
//             >
//               <View
//                 style={{
//                   flex: 1,
//                   width: '100%',
//                   backgroundColor: 'transparent',
//                   flexDirection: 'row'
//                 }}
//               >
//                 <View
//                   style={{
//                     position: 'absolute',
//                     left: '5%',
//                     top: '10%',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between'
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={__handleFlashMode}
//                     style={{
//                       backgroundColor: flashMode === 'off' ? '#000' : '#fff',
//                       borderRadius: '50%',
//                       height: 25,
//                       width: 25
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontSize: 20
//                       }}
//                     >
//                       ⚡️
//                     </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={__switchCamera}
//                     style={{
//                       marginTop: 20,
//                       borderRadius: '50%',
//                       height: 25,
//                       width: 25
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontSize: 20
//                       }}
//                     >
//                       {cameraType === 'front' ? '🤳' : '📷'}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: 0,
//                     flexDirection: 'row',
//                     flex: 1,
//                     width: '100%',
//                     padding: 20,
//                     justifyContent: 'space-between'
//                   }}
//                 >
//                   <View
//                     style={{
//                       alignSelf: 'center',
//                       flex: 1,
//                       alignItems: 'center'
//                     }}
//                   >
//                     <TouchableOpacity
//                       onPress={__takePicture}
//                       style={{
//                         width: 70,
//                         height: 70,
//                         bottom: 0,
//                         borderRadius: 50,
//                         backgroundColor: '#fff'
//                       }}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </Camera>
//           )}
//         </View>
//       ) : (
//         <View
//           style={{
//             flex: 1,
//             width : '100%',
//             backgroundColor: 'coral',
//             // justifyContent: 'center',
//             // alignItems: 'center'
//           }}
//         >
//           <TouchableOpacity
//             onPress={__startCamera}
//             style={{
//               width: 130,
//               borderRadius: 4,
//               backgroundColor: 'transparent',
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: 40
//             }}
//           >
//             <Text
//               style={{
//                 color: '#fff',
//                 fontWeight: 'bold',
//                 textAlign: 'center'
//               }}
//             >
//               Take picture
//             </Text>
//           </TouchableOpacity>

//           <TextInput
//           onChangeText={setValue}
//             value={value}
//             placeholder="insert Number"
//             keyboardType="numeric"
//             />


//           <TouchableOpacity
//             onPress={sendMessage}
//             style={{
//               marginTop : 10,
//               width: 130,
//               borderRadius: 4,
//               backgroundColor: '#14274e',
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: 40
//             }}
//           >
//             <Text
//               style={{
//                 color: '#fff',
//                 fontWeight: 'bold',
//                 textAlign: 'center'
//               }}
//             >
//               send message
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <StatusBar style="auto" />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width : '100%',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })

// const CameraPreview = ({photo, retakePicture, savePhoto, done}: any) => {
//   console.log('sdsfds', photo)
//   return (
//     <View
//       style={{
//         backgroundColor: 'transparent',
//         flex: 1,
//         width: '100%',
//         height: '100%'
//       }}
//     >
//       <ImageBackground
//         source={{uri: photo && photo.uri}}
//         style={{
//           flex: 1
//         }}
//       >
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'column',
//             padding: 15,
//             justifyContent: 'flex-end'
//           }}
//         >
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between'
//             }}
//           >
//             <TouchableOpacity
//               onPress={retakePicture}
//               style={{
//                 width: 130,
//                 height: 40,

//                 alignItems: 'center',
//                 borderRadius: 4
//               }}
//             >
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: 20
//                 }}
//               >
//                 Re-take
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//             onPress={done}
//               style={{
//                 width: 130,
//                 height: 40,

//                 alignItems: 'center',
//                 borderRadius: 4
//               }}
//             >
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: 20
//                 }}
//               >
//                 done
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={savePhoto}
//               style={{
//                 width: 130,
//                 height: 40,

//                 alignItems: 'center',
//                 borderRadius: 4
//               }}
//             >
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: 20
//                 }}
//               >
//                 save photo
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   )
// }