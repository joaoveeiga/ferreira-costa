import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  Pressable,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";

type InputProps = IInputProps & {
  errorMessage?: string;
  password?: boolean;
};

export const Input = ({
  errorMessage,
  isInvalid,
  isDisabled,
  password = false,
  ...rest
}: InputProps) => {
  const invalid = !!errorMessage || isInvalid;
  const [show, setShow] = useState(false);
  if (password) {
    return (
      <FormControl mb={4} isInvalid={invalid}>
        <NativeBaseInput
          isInvalid={invalid}
          bgColor="white"
          type={show ? "text" : "password"}
          
          rightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
              color="coolGray.400"
              />
            </Pressable>
          }
          fontSize="sm"
          borderColor={"coolGray.400"}
          h={12}
          _focus={{
            borderColor: "darkBlue.800",
          }}
          {...rest}
        />
        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      </FormControl>
    );
  }
  return (
    <FormControl mb={4} isInvalid={invalid}>
      <NativeBaseInput
        isInvalid={invalid}
        bgColor="white"
        fontSize="sm"
        borderColor={"coolGray.400"}
        h={12}
        _focus={{
          borderColor: "darkBlue.800",
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};
