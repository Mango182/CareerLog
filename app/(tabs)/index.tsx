import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
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

        {/* Main container */}
        <View style={styles.container}>
          {/* Title and Subtitle */}
          <Text style={styles.title} >Career Log</Text>
          <Text style={styles.subtitle}>Job Application Dashboard</Text>
            
          {/* Stats Cards Container */}
          <View style={styles.statsContainer}>
            {/* Applications Card */}
            <View style={styles.card} lightColor="#ebe8e8" darkColor="#1e293b">
                <Text style={styles.cardNumber}>{totalApplications}</Text>
                <Text style={styles.cardLabel}>Applications</Text>
                <Text style={styles.cardSubtitle}>
                  Track every job, internship, and follow-up in one place.
                </Text>
              </View>

            {/* Add Application Button */}
            <Pressable onPress={() => router.push('/add_application')}>
              <View style={styles.addButton} lightColor="#2563eb" darkColor="#3b82f6">
                <Text style={styles.addButtonText}>Add Application</Text>
              </View>
            </Pressable>
                
            {/* Interviews Card */}
            <View style={styles.card} lightColor="#ebe8e8" darkColor="#1e293b">
              <Text style={styles.cardNumber}>{totalInterviews}</Text>
              <Text style={styles.cardLabel}>Interviews</Text>
            </View>

            {/* Follow-ups Card */}
            <View style={styles.card} lightColor="#ebe8e8" darkColor="#1e293b">
              <Text style={styles.cardNumber}>{totalFollowUps}</Text>
              <Text style={styles.cardLabel}>Follow-ups</Text>
            </View>
          </View>

          {/* Recent Activity section (and card) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.emptyCard} lightColor="#ffffff" darkColor="#1e293b">
              <Text style={styles.emptyText}>
                No recent activity yet. Once you start adding applications, updates
                will appear here.
              </Text>
            </View>
          </View>

          {/* Recent Applications section */}
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
                <Text style={styles.cardSubtitle}>{application.status}</Text>
              </View>
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
  },
  container: {
    flex: 1,
    padding: 20,
  },
  // Styling for the Title
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },

  // Styling for the Add Application Button
  addButton: {
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Styling for the Stats Cards
  card: {
    padding: 20,
    borderRadius: 12,
  },
  emptyCard: {
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
  cardSubtitle: {
    paddingTop: 8,
    fontStyle: 'italic',
    fontSize: 14,
  },

  statsContainer: {
    width: '100%',
    gap: 16,
  },

  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },

  // Styling for Recent Applications
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
    marginBottom: 8,
  },
});
