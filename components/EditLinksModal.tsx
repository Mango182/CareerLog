import { Text } from '@/components/Themed';
import { Modal, Pressable, StyleSheet, TextInput } from 'react-native';
import Toast from 'react-native-toast-message';

type Links = {
  linkedin: string;
  github: string;
  email: string;
};

type Props = {
  visible: boolean;
  links: Links;
  onClose: () => void;
  onSave: () => void;
  onChange: (links: Links) => void;
};

export default function EditLinksModal({ visible, links, onClose, onSave, onChange }: Props) {
  const saveAndClose = () => {
    onSave();
    onClose();

    Toast.show({
      type: 'success',
      text1: 'Links Updated',
      text2: 'Your profile links have been updated.',
      position: 'bottom',
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal}>
          <Text style={styles.title}>Edit Links</Text>

          {/* LinkedIn Input */}
          <TextInput
            style={styles.input}
            placeholder="LinkedIn URL"
            value={links.linkedin}
            onChangeText={(val) => onChange({ ...links, linkedin: val })}
            autoCapitalize="none"
          />

          {/* GitHub Input */}
          <TextInput
            style={styles.input}
            placeholder="GitHub URL"
            value={links.github}
            onChangeText={(val) => onChange({ ...links, github: val })}
            autoCapitalize="none"
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={links.email}
            onChangeText={(val) => onChange({ ...links, email: val })}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Save Button */}
          <Pressable style={styles.saveButton} onPress={saveAndClose}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>

          {/* Cancel Button */}
          <Pressable onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 14,
  },
});