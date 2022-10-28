import { TailwindProvider } from "tailwind-rn/dist";
import utilities from './tailwind.json'
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from "./src/navigator/RootNavigator";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </NativeBaseProvider >
    </TailwindProvider>
  );
}