import { ISelectItemProps, Select } from "native-base";
import React from "react";

type SelectItemProps = ISelectItemProps;

export const SelectItem = ({ ...rest }: SelectItemProps) => {
  const { Item: NativeBaseItem } = Select;
  return (
    <NativeBaseItem
      bgColor="white"
      fontSize="sm"
      borderColor={"coolGray.400"}
      h={12}
      {...rest}
    />
  );
};
