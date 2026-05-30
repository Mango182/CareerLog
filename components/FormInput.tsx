import React, { forwardRef } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';

import { View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const FormInput = forwardRef<TextInput, TextInputProps>(
  ({ style, multiline, ...textInputProps }, ref) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const isDark = colorScheme === 'dark';

  const inputBorder = isDark ? '#334155' : '#d1d5db';
  const placeholderColor = isDark ? '#94a3b8' : '#6b7280';

    return (
      <View style={styles.formGroup}>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            multiline && styles.multilineInput,
            {
              borderColor: inputBorder,
              color: theme.text,
            },
            style,
          ]}
          placeholderTextColor={placeholderColor}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          {...textInputProps}
        />
      </View>
    );
  }
);

export default FormInput;

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    height: 140,
  },
});