import { Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomDropdown from '@/components/CustomDropdown';
import FormInput from '@/components/FormInput';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/constants/useThemes';
import { useApplications } from '@/context/ApplicationContext';
import { APPLICATION_STATUSES, ApplicationStatus } from '@/types/JobApplication';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

export default function AddApplicationScreen() {
  // Get addApplication function from the ApplicationContext
  const { addApplication } = useApplications();
  
  // State for form fields
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('Saved');
  const [notes, setNotes] = useState('');

  // Refs for form inputs to manage focus and keyboard behavior
  const positionInputRef = useRef<TextInput>(null);
  const locationInputRef = useRef<TextInput>(null);
  const notesInputRef = useRef<TextInput>(null);

  async function handleSave() {
    console.log('Saving application:', {
      company,
      position,
      location,
      status,
      notes
    });

    // If required fields are empty, show error toast
    if (!company.trim() || !position.trim() || !status.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Please fill in all required fields.',
        position: 'bottom',
      });
      return;
    }

    try {
      // Save application to Firestore
      await addApplication({
        company: company,
        position: position,
        location: location,
        status: status,
        notes: notes
      });

      // Show success toast
      Toast.show({
        type: 'success',
        text1: 'Application saved successfully!',  
        position: 'bottom',
      });

      // Clear form after saving
      clearForm();

      router.replace('/(tabs)');
    } catch (error) {
      // Log error and show error toast
      console.error('Error saving application:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to save application. Please try again.',
        position: 'bottom',
      });
    }
  }

  const {colors} = useTheme();

  // Clears the form fields after successful save
  function clearForm() {
    setCompany('');
    setPosition('');
    setLocation('');
    setStatus('Saved');
    setNotes('');
  }

  return (
    <SafeAreaView style={[styles.safeArea]} edges={['top', 'left', 'right']}>
      <KeyboardAwareScrollView 
        style={styles.keyboardScrollView}
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <Text style={styles.title}>Add Application</Text>
        <Text style={styles.subtitle}>
          Save a Job Application to Your Career Log
        </Text>

        {/* Company */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Company</Text>
          <FormInput
            style={{backgroundColor: colors.card, color: colors.text}}
            placeholder="Enter company name"
            value={company}
            onChangeText={setCompany}
            returnKeyType="next"
            onSubmitEditing={() => positionInputRef.current?.focus()}
          />
        </View>

        {/* Position */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Position</Text>
          <FormInput
            style={{backgroundColor: colors.card, color: colors.text}}
            ref={positionInputRef}
            placeholder="Enter job title"
            value={position}
            onChangeText={setPosition}
            returnKeyType="next"
            onSubmitEditing={() => locationInputRef.current?.focus()}
          />
        </View>

        {/* Location */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Location</Text>
          <FormInput
            style={{backgroundColor: colors.card, color: colors.text}}
            ref={locationInputRef}
            placeholder="Enter job location"
            value={location}
            onChangeText={setLocation}
            returnKeyType="next"
            onSubmitEditing={() => notesInputRef.current?.focus()}
          />
        </View>

        {/* Status */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Status</Text>
          <CustomDropdown
            value={status}
            onChange={setStatus}
            options={APPLICATION_STATUSES.map((statusOption) => ({
              label: statusOption,
              value: statusOption,
            }))}
          />
        </View>

        {/* Notes */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Notes</Text>
          <FormInput
            style={{backgroundColor: colors.card, color: colors.text}}
            ref={notesInputRef}
            placeholder="Enter any notes"
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>

        {/* Save Button */}
        <Pressable style={[styles.saveButton, {backgroundColor: colors.primary}]} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Application</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  keyboardScrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },

  // Header styles
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  // Form styles
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  // Save button styles
  saveButton: {
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});