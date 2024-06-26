import { Stack } from "@/navigations/Stack";
import { store } from "@/store/redux";
import theme from "@/theme/config";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Omise from "omise-react-native";
import { GlobalConfigs } from "@/configs/global";

Omise.config(
  GlobalConfigs.omise_pub_key,
  GlobalConfigs.omise_secret_key,
  "2017-11-12"
);

const Main = () => {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={styles.container}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Main />
          <StatusBar style="auto" />
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
