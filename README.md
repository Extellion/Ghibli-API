# Ghibli API

For this project I used a React Native starter kit from a friend of mine (https://github.com/Grivel-l/ReactNativeStarterKit).
Thanks a lot to him.

/!\ **disclaimer : I did this application for a school project. I did it in one day, the code is pretty shitty.** /!\

## Installation

(Only tested on Android)

You will need : 
+ Android Studio
+ Java SDK 8
+ Node

Clone it and run 
```bash
$ npm install
```
. After that, plug your phone with debug mode enabled and run 
```bash
$ adb devices
```
if you see (if you don't try reboot your phone) it then run 
```bash
$ react-native run-android
``` 
After a moment it'll launch the application on your mobile. Shake your phone to access to React Native debug tools then go to `Dev Settings` and click on `Debug server host & port for device`

!!!! You have to be on the same Wi-Fi on both devices !!!! 

Then enter your local IP address and the port, on your phone, used by the server (default : 8081). 
You can enable Hot Reload by shaking your phone again and clicking on it.

The app is ready to be modified. 

Enjoy. :)
