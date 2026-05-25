import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/AuthenticationContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const { logout } = useAuth();
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
    <View style={styles.container}>
      <View style={styles.profile}>
        <Ionicons name="person-circle" size={100} color={useColorScheme() === 'dark' ? '#fff' : '#000'} />
        <Text style={styles.nameLabel}>NAME</Text>
        <Text style={styles.userName}>@USERNAME</Text>

        {/* Connection Icons */}
        <View style={styles.connectionRow}>
          <Pressable onPress={() => {console.log('LinkedIn Pressed')}}>
            <Ionicons name="logo-linkedin" size={32} color="#0077B5" />
          </Pressable>
          <Pressable onPress={() => {console.log('GitHub Pressed')}}>
            <Ionicons name="logo-github" size={32} color={useColorScheme() === 'dark' ? '#fff' : '#000'} />
          </Pressable>
          <Pressable onPress={() => {console.log('Email Pressed')}}>
            <Ionicons name="mail" size={32} color={useColorScheme() === 'dark' ? '#fff' : '#000'} />
          </Pressable>
        </View>
      </View>


      <View style={styles.bottom}>
        <Pressable style={styles.logoutButton} onPress={() => { 
          logout(); 
          console.log('User logged out');
          router.push('/login');
        }}>
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
  nameLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    marginTop: 8,
    color: 'gray',
  },
  userEmail: {
    fontSize: 16,
    marginTop: 4,
  },
  connectionRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
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
