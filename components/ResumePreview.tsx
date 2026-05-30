import { Text, View } from '@/components/Themed';
import { useTheme } from '@/constants/useThemes';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

const RESUME_KEY = 'resume_url';

export default function ResumePreview() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState('');

  const { colors } = useTheme();

  useEffect(() => {
    AsyncStorage.getItem(RESUME_KEY).then((val) => {
      if (val) setResumeUrl(val);
    });
  }, []);

  const saveUrl = async () => {
    await AsyncStorage.setItem(RESUME_KEY, input);
    setResumeUrl(input);
    setEditing(false);
  };

  const openResume = async () => {
    if (resumeUrl) await WebBrowser.openBrowserAsync(resumeUrl);
  };

  if (editing || !resumeUrl) {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, { borderColor: colors.border }]}
          placeholder="Paste resume URL (Google Drive, Dropbox...)"
          value={input}
          onChangeText={setInput}
          autoCapitalize="none"
        />
        <Pressable style={[styles.saveButton, {backgroundColor: colors.primary}]} onPress={saveUrl}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={[styles.resumeCard, { borderColor: colors.border }]} onPress={openResume}>
        <Ionicons name="document-text-outline" size={48} />
        <Text style={styles.label}>View Resume</Text>
      </Pressable>
      <Pressable onPress={() => { setInput(resumeUrl); setEditing(true); }}>
        <Text style={[styles.replaceText, {color: colors.primary}]}>Replace</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  saveButton: {
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  resumeCard: {
    alignItems: 'center',
    padding: 24,
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  replaceText: {
    fontSize: 14,
  },
});