import { Box, RowItem } from "@/components/custom";
import { RootStackParamsList } from "@/navigations/Stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBox } from "@shopify/restyle";
import { Theme } from "@/theme/config";

type Props = NativeStackScreenProps<RootStackParamsList, "Home">;

const Home = ({ navigation }: Props) => {
  return (
    <Box flex={1} px="base" py="md" backgroundColor="background">
      <RowItem
        leftElement={<Ionicons name="card" size={24} color="black" />}
        onPress={() => navigation.navigate("CardList")}
      >
        Cards
      </RowItem>
    </Box>
  );
};

export default Home;
