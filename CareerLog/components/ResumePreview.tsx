import { Text, View } from '@/components/Themed';
import { useTheme } from '@/constants/useThemes';
import { useAuth } from '@/context/AuthenticationContext';
import { db, storage } from '@/services/firebase';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';
import { deleteField, doc, getDoc, setDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, TextInput } from 'react-native';
import Pdf from 'react-native-pdf';

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

  // Handle file picking and upload the resume to Firebase Storage
  const pickFile = async () => {
    if (!user) return;
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    const picked = result.assets?.[0];
    if (result.canceled || !picked) return;

    setUploading(true);
    try {
      const bytes = new Uint8Array(await new File(picked.uri).arrayBuffer());
      const path = `resumes/${user.uid}/resume.pdf`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, bytes, { contentType: 'application/pdf' });
      const value = await getDownloadURL(storageRef);
      await saveResume({ type: 'file', value, path });
    } catch (err) {
      console.log('Resume upload failed:', err);
      const message = err instanceof Error ? err.message : String(err);
      Alert.alert('Upload Failed', message);
    } finally {
      setUploading(false);
    }
  };

  // Remove the resume reference from Firestore and delete the uploaded file if applicable
  const removeResume = () => {
    Alert.alert('Remove Resume', 'Are you sure you want to remove your resume?', [
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          if (!user) return;
          if (resume?.type === 'file') {
            await deleteObject(ref(storage, resume.path)).catch(() => {});
          }
          await setDoc(doc(db, 'users', user.uid), { resume: deleteField() }, { merge: true });
          setPdfError(null);
          setResume(null);
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const promptForSource = () => {
    Alert.alert('Add Resume', 'How would you like to add your resume?', [
      { text: 'Paste Link', onPress: () => setPastingLink(true) },
      { text: 'Choose from Files', onPress: pickFile },
      { text: 'Cancel', style: 'cancel' },
    ]);
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
          onPress={promptForSource}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color={colors.iconColor} />
          ) : (
            <Ionicons name="cloud-upload-outline" size={32} color={colors.iconColor} />
          )}
          <Text style={styles.uploadButtonText}>{uploading ? 'Uploading...' : 'Upload Resume'}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: resume.value, cache: false }}
        trustAllCerts={false}
        onLoadComplete={(pages) => {
          console.log('Resume PDF loaded, pages:', pages);
          if (pages === 0) {
            setPdfError('The linked file loaded but has no pages — it may not be a real PDF (check the share link points directly at the file).');
          }
        }}
        onError={(error) => {
          console.log('Resume PDF failed to load:', error);
          setPdfError('Could not load this PDF. Make sure the link is shared publicly ("Anyone with the link") and points directly at a PDF file.');
        }}
        style={[styles.pdf, { borderColor: colors.border }]}
      />
      {pdfError && <Text style={styles.errorText}>{pdfError}</Text>}
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
  pdf: {
    alignSelf: 'center',
    width: '95%',
    height: 400,
    borderRadius: 12,
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
