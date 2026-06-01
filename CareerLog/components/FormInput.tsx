import React, { forwardRef } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
import { useTheme } from '@/constants/useThemes';

import { View } from '@/components/Themed';

const FormInput = forwardRef<TextInput, TextInputProps>(
  ({ style, multiline, ...textInputProps }, ref) => {
    const { colors } = useTheme();


    return (
      <View style={styles.formGroup}>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            multiline && styles.multilineInput,
            {
              borderColor: colors.border,
              color: colors.text,
            },
            style,
          ]}
          placeholderTextColor={colors.placeholder}
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