import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomDropdown from '@/components/CustomDropdown';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { APPLICATION_STATUSES } from '@/types/JobApplication';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export default function AddApplicationScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const isDark = colorScheme === 'dark';

  const inputBorder = isDark ? '#334155' : '#d1d5db';
  const placeholderColor = isDark ? '#94a3b8' : '#6b7280';
  
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  function handleSave() {
    console.log('Saving application:', {
      company,
      position,
      location,
      status,
      notes,
    });

    if (!company || !position || !status) {
      Toast.show({
        type: 'error',
        text1: 'Please fill in all fields.',
        position: 'bottom',
      });
      return;
    }
    Toast.show({
      type: 'success',
      text1: 'Application saved successfully!',  
      position: 'bottom',
    });
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          <ScrollView  contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <Text style={styles.title}>Add Application</Text>
          <Text style={styles.subtitle}>
            Save a Job Application to Your Career Log
          </Text>

          {/* Company */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Company</Text>
            <TextInput
              style={[styles.input, 
                {
                  borderColor: inputBorder,
                  color: theme.text,
                }
              ]}
              placeholder="Enter company name"
              value={company}
              onChangeText={setCompany}
            />
          </View>

          {/* Position */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Position</Text>
            <TextInput
              style={[styles.input, 
                {
                  borderColor: inputBorder,
                  color: theme.text,
                }
              ]}
              placeholder="Enter job title"
              value={position}
              onChangeText={setPosition}
            />
          </View>

          {/* Location */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={[styles.input, 
                {
                  borderColor: inputBorder, 
                  color: theme.text,
                }
              ]}
              placeholder="Enter job location"
              value={location}
              onChangeText={setLocation}
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
            <TextInput
              style={[styles.input, 
                {
                  borderColor: inputBorder,
                  color: theme.text,
                }
              ]}
              placeholder="Enter any notes"
              value={notes}
              onChangeText={setNotes}
              multiline
            />
          </View>

          {/* Save Button */}
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Application</Text>
          </Pressable>
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
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  // Save button styles
  saveButton: {
    backgroundColor: '#007AFF',
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