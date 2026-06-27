import { Text, View } from '@/components/Themed';
import { useTheme } from '@/constants/useThemes';
import { JobApplication } from '@/types/JobApplication';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EditApplicationModal from './EditApplicationModal';
import { useApplications } from '@/context/ApplicationContext';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function ApplicationCard({ application }: { application: JobApplication }) {
  const { deleteApplication } = useApplications();
  const { colors } = useTheme();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  return (
    <View style={styles.section}>
      <View style={[styles.applicationCard, { backgroundColor: colors.card }]}>
        
        <View style={styles.cardHeader} lightColor="transparent" darkColor="transparent">
          {/* Left side */}
          <View style={styles.cardLeft} lightColor="transparent" darkColor="transparent">
            {/* Company and Positon */}
            <Text style={styles.companyName}>{application.company}</Text>
            <Text style={styles.positionTitle}>{application.position}</Text>

            {/* Jobs details */}
            <View style={styles.details} lightColor="transparent" darkColor="transparent">
              {application.location && (
                <Text style={styles.detailText}>{application.location}</Text>
              )}
              {application.jobType && (
                <Text style={styles.detailText}>{application.jobType}</Text>
              )}
              {application.workMode && (
                <Text style={styles.detailText}>{application.workMode}</Text>
              )}
              {application.createdAt && (
                <Text style={styles.detailText}>{application.createdAt.toDateString()}</Text>
              )}
            </View>
          </View>

          {/* Right side */}
          <View style={styles.cardRight} lightColor="transparent" darkColor="transparent">
            {/* Application status */}
            <View style={[styles.statusBadge, { backgroundColor: colors.status }]}>
              <Text style={styles.statusText}>{application.status}</Text>
            </View>

            {/* Edit Button */}
            <Pressable onPress={() => setEditing(true)}>
              <Ionicons name="pencil-outline" size={18} color={colors.iconColor} />
            </Pressable>

            {/* Delete Button */}
            <Pressable onPress={() => setDeleting(true)}>
              <Ionicons name="trash-outline" size={18} color={colors.danger} />
            </Pressable>
          </View>
        </View>

        {/* Edit Application Modal */}
        {editing && (
          <EditApplicationModal
            visible={editing}
            Application={application}
            onClose={() => setEditing(false)}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleting && (
          <DeleteConfirmationModal
            visible={deleting}
            onConfirm={() => deleteApplication(application.id)}
            onCancel={() => setDeleting(false)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 16,
  },

  // Card styles
  applicationCard: {
    padding: 16,
    borderRadius: 12,
  },
  // Header style
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Left side of the card 
  cardLeft: { 
    flex: 1,
    paddingRight: 12,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positionTitle: {
    fontSize: 14,
    marginTop: 4,
  },
  details: {
    marginTop: 12,
    gap: 4,
  },
  detailText: {
    fontSize: 14,
  },

  // Right side of the card
  cardRight: {
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});