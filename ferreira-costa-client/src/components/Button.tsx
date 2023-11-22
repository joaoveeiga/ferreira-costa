import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";
import React from "react";

type ButtonProps = IButtonProps & {
  label: string;
  labelColor?: string;
  pressedBgColor?: string
};
export const Button = ({ label, labelColor = "white", pressedBgColor = "darkBlue.900", ...rest }: ButtonProps) => {
  return (
    <NativeBaseButton
      w={"full"}
      h={12}
      bg="darkBlue.800"
      _pressed={{
        bgColor: pressedBgColor,
      }}
      {...rest}
    >
      <Text color={labelColor} fontSize={"md"}>
        {label}
      </Text>
    </NativeBaseButton>
  );
};
