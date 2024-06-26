import { AddCard, CardList } from "@/screens/Card";
import Home from "@/screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamsList = {
  Home: undefined;
  CardList: undefined;
  AddCard: undefined;
};

const RNStack = createNativeStackNavigator<RootStackParamsList>();

export function Stack() {
  return (
    <RNStack.Navigator initialRouteName="Home">
      <RNStack.Screen name="Home" component={Home} />
      <RNStack.Group>
        <RNStack.Screen
          name="CardList"
          component={CardList}
          options={{ title: "Cards" }}
        />
        <RNStack.Screen
          name="AddCard"
          component={AddCard}
          options={{ title: "" }}
        />
      </RNStack.Group>
    </RNStack.Navigator>
  );
}
