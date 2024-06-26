import { Box, Button, CreditCardInput, Input, Text } from "@/components/custom";
import {
  MasterCardSecureCode,
  OmiseGray,
  VerifiedByVisa,
} from "@/components/icons";
import { AddCardFormData, addCardSchema } from "@/helpers/validations";
import { RootStackParamsList } from "@/navigations/Stack";
import { Theme } from "@/theme/config";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { addCard, useCardState } from "@/store/features/card";
import * as Burnt from "burnt";
import { formatExpiryDate } from "@/utils";
import Omise from "omise-react-native";

type Props = NativeStackScreenProps<RootStackParamsList, "AddCard">;

const AddCard = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();

  /* RTK */
  const { cards } = useCardState();
  const dispatch = useAppDispatch();

  /* Form */
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AddCardFormData>({
    defaultValues: {
      name: "",
      number: "",
      expiry: "",
      cvv: "",
    },
    mode: "onChange",
    resolver: zodResolver(addCardSchema),
  });

  /* Handlers */
  const onSubmit = useCallback(async (values: AddCardFormData) => {
    if (cards.some((card) => card.number === values.number)) {
      Burnt.toast({
        title: "Card already exists",
        preset: "error",
      });
      return;
    }

    const [month, year] = values.expiry.split("/");

    Burnt.toast({
      title: "Card added successfully",
      preset: "done",
    });

    const data = await Omise.createToken({
      card: {
        name: values.name,
        city: "Bangkok",
        postal_code: 10320,
        number: values.number,
        expiration_month: Number(month),
        expiration_year: Number(year),
        security_code: Number(values.cvv),
      },
    });

    dispatch(addCard({ id: data.id, ...values }));

    navigation.goBack();
  }, []);

  return (
    <Box
      position="relative"
      flex={1}
      backgroundColor="background"
      px="base"
      py="md"
      gap="base"
    >
      <Box gap="sm">
        <Text variant="label">ATM/Debit/Credit card number</Text>
        <Controller
          name="number"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CreditCardInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.number && (
          <Text variant="label" color="error">
            {errors.number.message}
          </Text>
        )}
      </Box>
      <Box gap="sm">
        <Text variant="label">Name on Card</Text>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Ty Lee"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && (
          <Text variant="label" color="error">
            {errors.name.message}
          </Text>
        )}
      </Box>
      <Box flexDirection="row" alignItems="flex-start" gap="md">
        <Box flex={1} gap="sm">
          <Text variant="label">Expire Date</Text>
          <Controller
            name="expiry"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="MM/YY"
                onBlur={onBlur}
                onChangeText={onChange}
                value={formatExpiryDate(value)}
              />
            )}
          />
          {errors.expiry && (
            <Text variant="label" color="error">
              {errors.expiry.message}
            </Text>
          )}
        </Box>
        <Box flex={1} gap="sm">
          <Text variant="label">CVV</Text>
          <Controller
            name="cvv"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input maxLength={3} onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
          />
          {errors.cvv && (
            <Text variant="label" color="error">
              {errors.cvv.message}
            </Text>
          )}
        </Box>
      </Box>
      <Box
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="center"
        gap="md"
      >
        <VerifiedByVisa />
        <MasterCardSecureCode />
        <OmiseGray />
      </Box>
      <Box
        position="absolute"
        left={insets.left}
        right={insets.right}
        bottom={insets.bottom + 15}
        px="base"
      >
        <Button
          variant="buttonPrimary"
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          Add Card
        </Button>
      </Box>
    </Box>
  );
};

export { AddCard };
