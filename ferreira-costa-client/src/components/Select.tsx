import {
  Select as NativeBaseSelect,
  ISelectProps,
  FormControl,
} from "native-base";
import React from "react";
type SelectProps = ISelectProps & {
  errorMessage?: string;
};
export const Select = ({ errorMessage, children, ...rest }: SelectProps) => {
  return (
    <FormControl mb={4}>
      <NativeBaseSelect
        bgColor="white"
        fontSize="sm"
        borderColor={"coolGray.400"}
        h={12}
        {...rest}
      >
        {children}
      </NativeBaseSelect>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};
