import React from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@/constants/useThemes';
import { Dropdown } from 'react-native-element-dropdown';

type DropdownOption<T extends string> = {
  label: string;
  value: T;
};

type CustomDropdownProps<T extends string> = {
  value: T;
  options: DropdownOption<T>[];
  placeholder?: string;
  onChange: (value: T) => void;
  style?: any;
};

export default function CustomDropdown<T extends string> ({
    style,
    value,
    options,
    placeholder = 'Select an option',
    onChange,
}: CustomDropdownProps<T>) {
    const { colors } = useTheme();
    return (
      <Dropdown
        style={[
          styles.dropdown, 
          { backgroundColor: colors.card, borderColor: colors.border },
          style
        ]}
        containerStyle={{ backgroundColor: colors.card }}
        itemContainerStyle={{ backgroundColor: colors.card }}
        itemTextStyle={{ color: colors.text }}
        placeholderStyle={[
          styles.placeholderStyle,
          { 
            backgroundColor: colors.card,
            color: colors.text
          },
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          { color: colors.text },
        ]}
        inputSearchStyle={[
          styles.inputSearchStyle,
          { 
            color: colors.text,
            backgroundColor: colors.card
          },
        ]}
        activeColor={ colors.background }
        data={options}
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          onChange(item.value);
        }}
      />
    );
  };

const styles = StyleSheet.create({
  container: {
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});