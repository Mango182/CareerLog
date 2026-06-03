import { useApplications } from '@/context/ApplicationContext'
import { JobApplication } from '@/types/JobApplication'
import { Text, View } from '@/components/Themed'
import Toast from 'react-native-toast-message';
import FormInput from './FormInput';
import { useState, useRef } from 'react';
import { useTheme } from '@/constants/useThemes';
import { Pressable, StyleSheet } from 'react-native';
import CustomDropdown from '@/components/CustomDropdown';
import {TextInput} from 'react-native';
import { APPLICATION_STATUSES } from '@/types/JobApplication';
import { Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


type Props = {
  visible: boolean;
  Application: JobApplication,
  onClose: () => void;
  onSave: () => void;
};

export default function EditApplicationModal({ visible, Application, onClose, onSave }: Props) {

  const saveAndClose = () => {
    onSave();
    onClose();

    Toast.show({
      type: 'success',
      text1: 'Application Updated',
      text2: 'Your job application has been updated.',
      position: 'bottom',
    })
  };

  const { applications } = useApplications();
  const { colors } = useTheme();

  const [company, setCompany] = useState(Application.company);
  const [position, setPosition] = useState(Application.position);
  const [location, setLocation] = useState(Application.location);
  const [status, setStatus] = useState(Application.status);
  const [notes, setNotes] = useState(Application.notes);

  const positionInputRef = useRef<TextInput>(null);
  const locationInputRef = useRef<TextInput>(null);
  const notesInputRef = useRef<TextInput>(null);
  
  return (
    <Modal
      style={{backgroundColor: colors.background}}
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.modal, {backgroundColor: colors.background}]}>
          {/* Title */}
          <Text style={[styles.title, {color: colors.text}]}>Edit Application</Text>
            
            <KeyboardAwareScrollView
              enableResetScrollToCoords={false}
              style={styles.keyboardScrollView}
              // contentContainerStyle={styles.scrollContent}
              enableOnAndroid={true}
              enableAutomaticScroll={true}
              keyboardShouldPersistTaps="handled"
            >
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
                style={[styles.dropdown, { backgroundColor: colors.card, color: colors.text }]}
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
            </KeyboardAwareScrollView>

            {/* Save Button */}
            <Pressable style={[styles.saveButton, {backgroundColor: colors.primary}]} onPress={saveAndClose}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Modal Overlay styles
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    maxHeight: '85%',
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },

  // Modal Title styles
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  // ScrollView styles
  keyboardScrollView: {
    flexShrink: 1,
  },

  // Form styles
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  formGroup: {
    marginBottom: 8,
  },
  dropdown: {
    marginBottom: 8,
  },

  // Save button styles
  saveButton: {
    padding: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});