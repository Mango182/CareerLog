import { Text, View } from '@/components/Themed';
import { useTheme } from '@/constants/useThemes';
import { JobApplication } from '@/types/JobApplication';
import { StyleSheet } from 'react-native';

export default function ApplicationCard({ application }: { application: JobApplication }) {
  const { colors } = useTheme();
  return (
    <View style={styles.section}>
      <View
        key={application.id}
        style={[styles.applicationCard, { backgroundColor: colors.card }]}
      >
        <View style={styles.cardHeader} lightColor="transparent" darkColor="transparent">
          <View lightColor="transparent" darkColor="transparent">
            <Text style={styles.companyName}>{application.company}</Text>
            <Text style={styles.positionTitle}>{application.position}</Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: colors.status }]} lightColor="transparent" darkColor="transparent">
            <Text style={styles.statusText}>{application.status}</Text>
          </View>
        </View>

        <View style={styles.details} lightColor="transparent" darkColor="transparent">
          {application.location && (
            <Text style={styles.detailText}>Location: {application.location}</Text>
          )}

          {application.jobType && (
            <Text style={styles.detailText}>Type: {application.jobType}</Text>
          )}

          {application.workMode && (
            <Text style={styles.detailText}>Work Mode: {application.workMode}</Text>
          )}

          {application.createdAt && (
            <Text style={styles.detailText}>Created: {application.createdAt.toDateString()}</Text>
          )}
        </View>
      </View>
    </View>
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