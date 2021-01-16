import Reactotron, { asyncStorage } from 'reactotron-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

Reactotron
    .setAsyncStorageHandler(AsyncStorage)
    .configure({
        name: "React Native App",
        host: '192.168.0.105'
    })
    .useReactNative()
    .use(asyncStorage())
// .connect()
console.tron = Reactotron.log

if (__DEV__) { Reactotron.connect() };