import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";
import React from "react";
type InputProps = IInputProps & {
  errorMessage?: string;
};
export const Input = ({ errorMessage, isInvalid, ...rest }: InputProps) => {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl mb={4} isInvalid={invalid}>
      <NativeBaseInput
        bgColor="white"
        fontSize="sm"
        borderColor={"coolGray.400"}
        h={12}
        _focus={{
          borderColor: "darkBlue.600",
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};
