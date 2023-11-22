import { Pressable, VStack } from "native-base";
import React from "react";
import { Keyboard, StyleProp, ViewProps, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps extends ViewProps {
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const Screen: React.FC<ScreenProps> = ({ children, ...rest }) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <Pressable onPress={Keyboard.dismiss} flex={1}>
      <VStack
        style={{ paddingTop: top, paddingBottom: bottom }}
        bgColor={"coolGray.200"}
        flex={1}
        {...rest}
      >
        {children}
      </VStack>
    </Pressable>
  );
};
