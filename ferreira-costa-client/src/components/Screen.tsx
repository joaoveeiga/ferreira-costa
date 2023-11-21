import { VStack } from "native-base";
import React from "react";
import { StyleProp, ViewProps, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps extends ViewProps {
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const Screen: React.FC<ScreenProps> = ({ children, ...rest }) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <VStack
      style={{ paddingTop: top, paddingBottom: bottom }}
      bgColor={"coolGray.200"}
      flex={1}
      px={8}
      {...rest}
    >
      {children}
    </VStack>
  );
};
