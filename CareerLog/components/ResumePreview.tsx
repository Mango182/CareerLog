import { Text, View } from '@/components/Themed';
import { useTheme } from '@/constants/useThemes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import Pdf from 'react-native-pdf';

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
      <Pdf
        source={{ uri: resumeUrl, cache: true }}
        onError={(error) => console.log(error)}
        style={[styles.pdf, { borderColor: colors.border }]}
      />
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
  pdf: {
    width: '100%',
    height: 400,
    borderWidth: 1,
    borderRadius: 12,
  },
  replaceText: {
    fontSize: 14,
  },
});