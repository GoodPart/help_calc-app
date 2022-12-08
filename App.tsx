import {StatusBar} from 'expo-status-bar'
import * as MediaLibrary from 'expo-media-library';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, TextInput, ScrollView, SafeAreaView, Button} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
        onPress={()=> navigation.navigate('Details',{
          itemId : 86,
          otherParam : 'anything you want here'
        })}
       />
    </View>
  );
};

function DetailsScreen({ route, navigation }:any) {
  const {itemId, otherParam} = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details', {
          itemId : Math.floor(Math.random() * 100)
        })}
      />

      <Button 
        title='Go to Home'
        onPress={()=> navigation.navigate('Home')}
      />
      <Button 
        title='Go back'
        onPress={()=> navigation.goBack()}
      />
       <Button 
        title='Go back to first screen in stack'
        onPress={()=> navigation.popToTop()}
      />
    </View>
  );
};
function ProfileScreen({ navigation }:any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/icon.png')}
    />
  );
}


const Stack = createNativeStackNavigator();

export default function App() {

  const [number, setNumber] = useState(0);
  const [isChecked, setChecked] = useState(false);

  const memberGroup = ["Tom", "Rick", "Jhon", "Danny", "Xia"];
  
  const checks = () => {
    setChecked(!isChecked)
  }
  const increase = ()=> {
    setNumber(number+1)
  };
  const decrease = ()=> {
    setNumber(number-1)
  };

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{
            title:'My home',
            headerStyle : {
              backgroundColor : "orange"
            },
            headerTintColor: '#fff',
            headerTitle : (props)=> <LogoTitle {...props}/>
            }} />
          <Stack.Screen name="Details" component={DetailsScreen} />

        </Stack.Navigator>
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