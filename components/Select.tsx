import React, { FC } from "react";
import { Select as NativeBaseSelect } from "native-base";

interface Item {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (value: any) => void;
  items: Item[];
  placeholder: string;
}

const Select: FC<SelectProps> = ({ value, onChange, items, placeholder }) => {
  return (
    <NativeBaseSelect
      shadow={2}
      selectedValue={value}
      marginY={3}
      accessibilityLabel={placeholder}
      placeholder={placeholder}
      onValueChange={onChange}
    >
      {items.map((item) => (
        <NativeBaseSelect.Item
          shadow={2}
          label={item.label}
          value={item.value}
          key={item.value}
        />
      ))}
    </NativeBaseSelect>
  );
};

export default Select;
