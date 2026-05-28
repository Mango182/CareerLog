import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { useState } from 'react';
import { Keyboard, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthenticationContext';

// Schema for Login Credentials
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters.')
    .required('Password is required.'),
});

export default function LoginScreen() {
  const { login, signInWithGoogle } = useAuth();

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

      // Attempt to log in with provided credentials
      await login(values.email, values.password);

      // Show success toast
      Toast.show({
        type: 'success',
        text1: 'Logged in',
        text2: 'Welcome back to Career Log.',
        position: 'bottom',
      });

      // navigate to main app screen
      router.replace('/(tabs)');
    } catch (error) {
      // Log the error for debugging and show error toast
      console.error('Login error:', error);

      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: 'Check your email and password.',
        position: 'bottom',
      });
    } finally {
      // Reset submitting state
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={Platform.OS !== 'web' ? Keyboard.dismiss : undefined}
          >
            {/* Title and subtitle for Login Screen */}
            <Text style={styles.title}>Career Log</Text>
            <Text style={styles.subtitle}>Log in to continue tracking applications.</Text>

            {/* Form for Login Credentials */}
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
                  {/* Email Input */}
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

                  {/* Password Input */}
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

                  <TouchableOpacity 
                    onPress={() => signInWithGoogle()} 
                    style={[styles.button, { backgroundColor: '#db4437' }]}
                  >
                    <Ionicons name="logo-google" size={22} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>Sign in with Google</Text>
                  </TouchableOpacity>

                  {/* Forgot Password Link */}
                  <TouchableOpacity onPress={() => router.push('/signup')}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </TouchableOpacity>

                  {/* Login */}
                  <TouchableOpacity
                    style={[
                      styles.button,
                      (!isValid || !dirty || isSubmitting) && styles.buttonDisabled,
                    ]}
                    onPress={() => handleSubmit()}
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    <Text style={styles.buttonText}>
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Text>
                  </TouchableOpacity>

                  {/* Sign Up Link */}
                  <TouchableOpacity onPress={() => router.push('/signup')}>
                    <Text style={styles.signUp}>
                      Don't have an account?{' '}
                      <Text style={styles.signUpLink}>Sign Up</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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