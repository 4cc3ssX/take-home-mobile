import { RootStackParamsList } from "@/navigations/Stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Platform, StyleSheet } from "react-native";
import { removeCard, useCardState } from "@/store/features/card";
import { useCallback, useLayoutEffect } from "react";
import { Card } from "@/types/card";
import { Box, CreditCard, Text } from "@/components/custom";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme/config";
import { Ionicons } from "@expo/vector-icons";
import { MenuView } from "@react-native-menu/menu";
import { useAppDispatch } from "@/hooks/redux";
import * as Burnt from "burnt";
import { createCharge } from "@/api/omise";
import random from "lodash-es/random";

type Props = NativeStackScreenProps<RootStackParamsList, "CardList">;

const CardList = ({ navigation }: Props) => {
  const theme = useTheme<Theme>();

  /* RTK */
  const { cards } = useCardState();
  const dispatch = useAppDispatch();

  /* Handlers */
  const onPressHandler = useCallback(async (card: Card) => {
    Burnt.alert({
      title: "Purchasing...",
      preset: "spinner",
      duration: Infinity,
    });

    const amount = random(100, 10000);

    try {
      const data = await createCharge({
        amount,
        currency: "thb",
        card: card.id,
      });

      Burnt.dismissAllAlerts();

      Burnt.alert({
        title: "Purchased",
        message: `You have purchased ${data.amount} THB`,
        preset: "done",
        duration: 2,
      });
    } catch (err: any) {
      Burnt.dismissAllAlerts();

      Burnt.alert({
        title: "Error",
        message: err.message,
        preset: "error",
        duration: 2,
      });
    }
  }, []);

  const onDeleteHandler = useCallback((item: Card) => {
    dispatch(removeCard(item.number));

    Burnt.toast({
      title: "Card removed",
      preset: "done",
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="add"
          size={24}
          color="black"
          onPress={() => navigation.navigate("AddCard")}
        />
      ),
    });
  }, []);

  return (
    <FlatList
      data={cards}
      ListEmptyComponent={CardListEmptyComponent}
      ItemSeparatorComponent={() => <Box height={20} />}
      renderItem={({ item }) => (
        <MenuView
          title="Actions"
          onPressAction={({ nativeEvent: { event } }) => {
            if (event === "delete") {
              onDeleteHandler(item);
            }
          }}
          actions={[
            {
              id: "delete",
              title: "Delete",
              attributes: {
                destructive: true,
              },
              image: Platform.select({
                ios: "trash",
                android: "ic_menu_delete",
              }),
            },
          ]}
        >
          <CreditCard data={item} onPress={() => onPressHandler(item)} />
        </MenuView>
      )}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      contentContainerStyle={[stylesheet.container]}
      style={{ backgroundColor: theme.colors.background }}
    />
  );
};

const CardListEmptyComponent = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  return (
    <Box flex={1} justifyContent="center" alignItems="center" gap="sm">
      <Text textAlign="center" fontSize={40}>
        💳
      </Text>
      <Text textAlign="center" fontSize={18}>
        No Cards Found
      </Text>
      <Text textAlign="center" fontSize={18}>
        We recommend adding a card for easy payment
      </Text>

      <Text
        textAlign="center"
        fontSize={18}
        variant="link"
        onPress={() => navigation.navigate("AddCard")}
      >
        Add New Card
      </Text>
    </Box>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flexGrow: 1, // flex: 1 cannot be used due to the scroll issue for FlatList
    padding: 20,
  },
});

export { CardList };
