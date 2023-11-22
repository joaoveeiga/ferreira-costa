import React from "react";
import {
  Text as NativeBaseText,
  ITextProps as NativeBaseTextProps,
} from "native-base";

type TextProps = NativeBaseTextProps & {
  color?: string
}

export const Text: React.FC<TextProps> = ({
  color = "darkBlue.800",
  ...props
}: Readonly<TextProps>) => {

  return <NativeBaseText color={color} {...props} />;
};
