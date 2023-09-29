import React, { FC } from "react";
import { CheckIcon } from "native-base";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RenderHTML from "react-native-render-html";

interface Item {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (value: any) => void;
  items: Item[];
}

const RadioGroup: FC<SelectProps> = ({ value, onChange, items }) => {
  return (
    <View>
      {items.map((item) => {
        const isChecked = value === item.value;
        return (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              onChange(item.value);
            }}
          >
            <View
              style={
                isChecked
                  ? { ...styles.checkbox, ...styles.selectedCheckbox }
                  : styles.checkbox
              }
            >
              {isChecked && <CheckIcon size="5" color="#10B981" />}
            </View>

            <RenderHTML
              source={{
                html: item.label,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioGroup;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "#bec3c9",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCheckbox: {
    borderColor: "#10B981",
  },
});
