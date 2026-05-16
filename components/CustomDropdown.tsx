import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

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
};

export default function CustomDropdown<T extends string> ({
    value,
    options,
    placeholder = 'Select an option',
    onChange,
}: CustomDropdownProps<T>) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const isDark = colorScheme === 'dark';
    return (
      <Dropdown
        style={[
          styles.dropdown, 
          { backgroundColor: theme.background },
        ]}
        containerStyle={{ backgroundColor: theme.background }}
        itemContainerStyle={{ backgroundColor: theme.background }}
        itemTextStyle={{ color: theme.text }}
        placeholderStyle={[
          styles.placeholderStyle,
          { 
            backgroundColor: theme.background,
            color: theme.text
          },
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          { color: theme.text },
        ]}
        inputSearchStyle={[
          styles.inputSearchStyle,
          { 
            color: theme.text,
            backgroundColor: theme.background
          },
        ]}
        activeColor={ theme.background }
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
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
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