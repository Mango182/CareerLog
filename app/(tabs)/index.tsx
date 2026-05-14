import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import { applications } from '@/data/applications';

export default function DashboardScreen() {
  const totalApplications = applications.length;

  const totalInterviews = applications.filter(app => app.status === 'Interview').length;

  const totalFollowUps = applications.filter(app => app.status === 'Applied').length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Career Log</Text>
          <Text style={styles.subtitle}>Job Application Dashboard</Text>
            
          <View style={styles.statsContainer}>
            <View style={styles.card} lightColor="#ebe8e8" darkColor="#1e293b">
                <Text style={styles.cardNumber}>{totalApplications}</Text>
                <Text style={styles.cardLabel}>Applications</Text>
                <Text style={styles.cardSubtitle}>
                  Track every job, internship, and follow-up in one place.
                </Text>
              </View>
          <View style={styles.addButton} lightColor="#2563eb" darkColor="#3b82f6">
            <Text style={styles.addButtonText}>Add Application</Text>
          </View>
              

            <View style={styles.card} lightColor="#ebe8e8" darkColor="#1e293b">
              <Text style={styles.cardNumber}>{totalInterviews}</Text>
              <Text style={styles.cardLabel}>Interviews</Text>
            </View>

            <View style={styles.card} lightColor="#ebe8e8" darkColor="#1e293b">
              <Text style={styles.cardNumber}>{totalFollowUps}</Text>
              <Text style={styles.cardLabel}>Follow-ups</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>

            <View style={styles.emptyCard} lightColor="#ffffff" darkColor="#1e293b">
              <Text style={styles.emptyText}>
                No recent activity yet. Once you start adding applications, updates
                will appear here.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Applications</Text>

            {applications.map((application) => (
              <View
                key={application.id}
                style={styles.applicationCard}
                lightColor="#ffffff"
                darkColor="#1e293b"
              >
                <Text style={styles.companyName}>{application.company}</Text>
                <Text style={styles.positionTitle}>{application.position}</Text>
                <Text style={styles.status}>{application.status}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  statsContainer: {
    width: '100%',
    gap: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
  },
  cardNumber: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyCard: {
    padding: 20,
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  applicationCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  positionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  cardSubtitle: {
    paddingTop: 8,
    fontStyle: 'italic',
    fontSize: 14,
  },
});
