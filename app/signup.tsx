import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthenticationContext';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters.')
    .required('Password is required.'),
});

export default function Signup() {
  const { signup } = useAuth();

  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const isDark = colorScheme === 'dark';

  const inputBackground = isDark ? '#1e293b' : '#f1f5f9';
  const inputBorder = isDark ? '#334155' : '#d1d5db';
  const placeholderColor = isDark ? '#94a3b8' : '#6b7280';

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(values: { email: string; password: string }) {
    try {
      setIsSubmitting(true);

      await signup(values.email, values.password);

      Toast.show({
        type: 'success',
        text1: 'Signing Up',
        text2: 'Welcome to Career Log.',
        position: 'bottom',
      });

      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);

      Toast.show({
        type: 'error',
        text1: 'Signup failed',
        // text2: 'Check your email and password.',
        position: 'bottom',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Career Log</Text>
            <Text style={styles.subtitle}>Sign up to track applications.</Text>

            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ email: '', password: '' }}
              onSubmit={submit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
                dirty,
              }) => (
                <View style={styles.form}>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: inputBackground,
                        borderColor: inputBorder,
                      },
                    ]}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={22}
                      color={theme.text}
                      style={styles.icon}
                    />

                    <TextInput
                      style={[styles.input, { color: theme.text }]}
                      placeholder="Email"
                      placeholderTextColor={placeholderColor}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  </View>

                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: inputBackground,
                        borderColor: inputBorder,
                      },
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={22}
                      color={theme.text}
                      style={styles.icon}
                    />

                    <TextInput
                      style={[styles.input, { color: theme.text }]}
                      placeholder="Password"
                      placeholderTextColor={placeholderColor}
                      secureTextEntry
                      autoCapitalize="none"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                  </View>

                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={styles.forgotPassword}>Already have an account? Log In</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      (!isValid || !dirty || isSubmitting) && styles.buttonDisabled,
                    ]}
                    onPress={() => handleSubmit()}
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    <Text style={styles.buttonText}>
                      {isSubmitting ? 'Signing up...' : 'Sign Up'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 34,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 36,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 6,
    marginBottom: 20,
    color: '#007AFF',
    fontWeight: '600',
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  signUp: {
    textAlign: 'center',
  },
  signUpLink: {
    color: '#007AFF',
    fontWeight: '700',
  },
  errorText: {
    color: '#ef4444',
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontSize: 13,
  },
});