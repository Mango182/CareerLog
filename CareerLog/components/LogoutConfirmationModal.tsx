import {View, Text} from '@/components/Themed'
import { useTheme } from '@/constants/useThemes';
import { Modal, Pressable, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutConfirmationModal({ visible, onConfirm, onCancel }: Props) {
  const confirmAndClose = () => {
    onConfirm();
    Toast.show({
      type: 'success',
      text1: 'Logout Successful',
      text2: 'You have been logged out.',
      position: 'bottom',
    })
    onCancel();
  };
  const { colors } = useTheme();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={[styles.modal, {backgroundColor: colors.modal}]}>
          {/* Title */}
          <Text style={[styles.title, {color: colors.text}]}>Confirm Logout</Text>

            {/* Message */}
          <Text style={[styles.message, {color: colors.text}]}>Are you sure you want to log out?</Text>
          <Pressable style={[styles.confirmButton, {backgroundColor: colors.danger}]} onPress={confirmAndClose}>
              <Text style={[styles.buttonText, {color: colors.text}]}>Yes, Logout</Text>
          </Pressable>
          <Pressable style={[styles.cancelButton, {backgroundColor: colors.modal}]} onPress={onCancel}>
              <Text style={[styles.buttonText, {color: colors.text}]}>No, Cancel</Text>
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

  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  confirmButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  cancelButton: {
    padding: 12,
    borderRadius: 8,
  },

  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});