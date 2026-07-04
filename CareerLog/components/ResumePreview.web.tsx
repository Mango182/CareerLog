import { Text, View } from '@/components/Themed';
import { useTheme } from '@/constants/useThemes';
import { useAuth } from '@/context/AuthenticationContext';
import { db, storage } from '@/services/firebase';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { deleteField, doc, getDoc, setDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TextInput } from 'react-native';

// Resume can be either a pasted URL or a file we've uploaded to Firebase Storage
type ResumeSource =
  | { type: 'url'; value: string }
  | { type: 'file'; value: string; path: string };

// Convert share links to direct download links
function toDirectPdfUrl(url: string): string {
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
  }

  if (url.includes('dropbox.com')) {
    return url.replace(/([?&])dl=0/, '$1dl=1').replace(/\?raw=0/, '?raw=1');
  }

  return url;
}

export default function ResumePreview() {
  const { user } = useAuth();
  const [resume, setResume] = useState<ResumeSource | null>(null);
  const [pastingLink, setPastingLink] = useState(false);
  const [input, setInput] = useState('');
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { colors } = useTheme();

  // Load the resume reference from the user's Firestore document
  useEffect(() => {
    if (!user) {
      setResume(null);
      return;
    }
    getDoc(doc(db, 'users', user.uid)).then((snap) => {
      const data = snap.data();
      if (data?.resume) setResume(data.resume as ResumeSource);
    });
  }, [user]);

  // Save the resume source to Firestore and update state
  const saveResume = async (source: ResumeSource) => {
    if (!user) return;
    await setDoc(doc(db, 'users', user.uid), { resume: source }, { merge: true });
    setPdfError(null);
    setResume(source);
    setPastingLink(false);
  };

  // Save the pasted link as a resume source
  const saveLink = () => saveResume({ type: 'url', value: toDirectPdfUrl(input) });

  // Handle file picking and upload the resume to Firebase Storage.
  // On web, DocumentPicker gives us a native browser File directly, so we can
  // hand it straight to uploadBytes without any blob conversion.
  const pickFile = async () => {
    if (!user) return;
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    const picked = result.assets?.[0];
    if (result.canceled || !picked?.file) return;

    setUploading(true);
    try {
      const path = `resumes/${user.uid}/resume.pdf`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, picked.file);
      const value = await getDownloadURL(storageRef);
      await saveResume({ type: 'file', value, path });
    } catch (err) {
      console.log('Resume upload failed:', err);
      window.alert(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  };

  // Remove the resume reference from Firestore and delete the uploaded file if applicable.
  // react-native-web's Alert.alert is a no-op, so we use window.confirm here instead.
  const removeResume = async () => {
    if (!user || !window.confirm('Are you sure you want to remove your resume?')) return;
    if (resume?.type === 'file') {
      await deleteObject(ref(storage, resume.path)).catch(() => {});
    }
    await setDoc(doc(db, 'users', user.uid), { resume: deleteField() }, { merge: true });
    setPdfError(null);
    setResume(null);
  };

  if (pastingLink) {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, { borderColor: colors.border }]}
          placeholder="Paste resume URL (Google Drive, Dropbox...)"
          value={input}
          onChangeText={setInput}
          autoCapitalize="none"
        />
        <Pressable style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={saveLink}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
        <Pressable onPress={() => setPastingLink(false)}>
          <Text style={[styles.replaceText, { color: colors.primary }]}>Cancel</Text>
        </Pressable>
      </View>
    );
  }

  if (!resume) {
    return (
      <View style={styles.container}>
        <Pressable
          style={[styles.uploadButton, { borderColor: colors.border }]}
          onPress={pickFile}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color={colors.iconColor} />
          ) : (
            <Ionicons name="cloud-upload-outline" size={32} color={colors.iconColor} />
          )}
          <Text style={styles.uploadButtonText}>{uploading ? 'Uploading...' : 'Choose from Files'}</Text>
        </Pressable>
        <Pressable onPress={() => setPastingLink(true)}>
          <Text style={[styles.replaceText, { color: colors.primary }]}>Or paste a link instead</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <iframe
        src={resume.value}
        title="Resume preview"
        style={{
          width: 'min(700px, 90%)',
          aspectRatio: '8.5 / 11',
          borderRadius: 12,
          border: `1px solid ${colors.border}`,
        }}
        onError={() => setPdfError('Could not load this PDF. Make sure the link is shared publicly ("Anyone with the link") and points directly at a PDF file.')}
      />
      <Pressable onPress={removeResume}>
        <Text style={[styles.replaceText, { color: colors.primary }]}>Remove</Text>
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
  uploadButton: {
    alignItems: 'center',
    padding: 24,
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  replaceText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 13,
    color: '#E53935',
    textAlign: 'center',
  },
});
