import EditLinksModal from '@/components/EditLinksModal';
import ResumePreview from '@/components/ResumePreview';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/constants/useThemes';
import { useAuth } from '@/context/AuthenticationContext';
import { db } from '@/services/firebase';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// Links type for user profile connections
type Links = {
  linkedin: string;
  github: string;
  email: string;
};


export default function Profile() {
  const { user, logout } = useAuth();
  
  // State to hold user links
  const [links, setLinks] = useState<Links>({
    linkedin: '',
    github: '',
    email: '',
  });

  const [editing, setEditing] = useState(false);


  // Load user links from Firestore
  useEffect(() => {
    if (user) {
      const load = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setLinks(userDoc.data().links ?? { linkedin: '', github: '', email: '' });
        }
      };
      load();
    }
  }, [user]);

  // function to save links to Firestore
  const saveLinks = async () => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { links }, { merge: true });
    }
  };

  // function to open links
  const openLink = (url: string) => {
    if (url) {
      Linking.openURL(url);
    }
  }

  const linkedInPressed = () => {
    if (links.linkedin) {
      openLink(links.linkedin);
    } else {
      Toast.show({
        type: 'error',
        text1: 'No LinkedIn URL',
        text2: 'Please add your LinkedIn URL in the edit links section.',
        position: 'bottom',
      });
    }
  };

  const githubPressed = () => {
    if (links.github) {
      openLink(links.github);
    } else {      
      Toast.show({
        type: 'error',
        text1: 'No Github URL',
        text2: 'Please add your Github URL in the edit links section.',
        position: 'bottom',
      });
    }
  };

  const emailPressed = () => {
    if (links.email) {
      openLink(`mailto:${links.email}`);
    } else {
      Toast.show({
        type: 'error',
        text1: 'No Email URL',
        text2: 'Please add your email in the edit links section.',
        position: 'bottom',
      });
    }
  };

  const logoutAndRedirect = () => {
    logout();
    router.replace('/login');
  };

    const { colors } = useTheme();

  return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.container}>
          <View style={styles.profile}>
            <Ionicons name="person-circle" size={100} color={colors.iconColor} />
            <Text style={styles.displayNameLabel}>{user?.email}</Text>
            <Text style={styles.emailLabel}>{user?.email}</Text>

            {/* Connection Icons */}
            <View style={styles.connectionRow}>

              {/* LinkedIn */}
              <Pressable onPress={linkedInPressed}>
                <Ionicons name="logo-linkedin" size={32} color="#0077B5" />
              </Pressable>

              {/* Github */}
              <Pressable onPress={githubPressed}>
                <Ionicons name="logo-github" size={32} color={colors.iconColor} />
              </Pressable>

              {/* Email */}
              <Pressable onPress={emailPressed}>
                <Ionicons name="mail" size={32} color={colors.iconColor} />
              </Pressable>

              {/* Edit Links */}
              <Pressable onPress={() => setEditing(true)} style={{ marginTop: 12 }}>
                <Ionicons name="pencil-outline" size={20} color={colors.iconColor} />
              </Pressable>
            </View>


            {editing && (
              <EditLinksModal
                visible={editing}
                links={links}
                onClose={() => setEditing(false)}
                onSave={saveLinks}
                onChange={setLinks}
              />
            )}

            {/* Resume Preview */}
            <View style={styles.resumePreview}>
              <ResumePreview />
            </View>
          </View>

          {/* Logout Button */}
          <View style={styles.bottom}>
            <Pressable style={styles.logoutButton} onPress={logoutAndRedirect}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </Pressable>
          </View>
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
    margin: 20,
  },
  profile: {
    alignItems: 'center',
    marginTop: 20,
  },
  displayNameLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emailLabel: {
    fontSize: 18,
    marginTop: 8,
    color: 'gray',
  },
  connectionRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  resumePreview: {
    marginTop: 32,
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  logoutButton: {
    backgroundColor: '#E53935',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
