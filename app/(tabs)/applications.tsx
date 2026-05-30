import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ApplicationCard from '@/components/ApplicationCard';
import { Text, View } from '@/components/Themed';
import { useApplications } from '@/context/ApplicationContext';
import { router } from 'expo-router';

export default function ApplicationsScreen() {
  const { applications, isLoading } = useApplications();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Applications</Text>
          <Text style={styles.subtitle}>
            Track every job, internship, and follow-up in one place.
          </Text>

          <Pressable onPress={() => router.push('/add_application')}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Application</Text>
            </View>
          </Pressable>

          <View style={styles.section}>
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  // Title and subtitle styles
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 22,
  },

  // Add button styles
  addButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    gap: 16,
  },

  //
  applicationCard: {
    padding: 16,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positionTitle: {
    fontSize: 14,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 14,
    gap: 4,
  },
  detailText: {
    fontSize: 14,
  },
});