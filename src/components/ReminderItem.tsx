import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Reminder } from '../types/Reminder';
import { formatDateTime, isDateInPast } from '../utils/dateUtils';

interface ReminderItemProps {
  reminder: Reminder;
  onToggleComplete: (id: string) => void;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
}

const ReminderItem: React.FC<ReminderItemProps> = ({
  reminder,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const isPastDue = !reminder.isCompleted && isDateInPast(reminder.date, reminder.time);

  const handleDelete = () => {
    Alert.alert(
      'Excluir Lembrete',
      'Tem certeza que deseja excluir este lembrete?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => onDelete(reminder.id) },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        reminder.isCompleted && styles.completedContainer,
        isPastDue && styles.pastDueContainer,
      ]}
      onPress={() => onEdit(reminder)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              reminder.isCompleted && styles.completedText,
            ]}
            numberOfLines={1}
          >
            {reminder.title}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[
                styles.checkButton,
                reminder.isCompleted && styles.checkedButton,
              ]}
              onPress={() => onToggleComplete(reminder.id)}
            >
              <Text style={styles.checkButtonText}>
                {reminder.isCompleted ? '✓' : '○'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {reminder.description ? (
          <Text
            style={[
              styles.description,
              reminder.isCompleted && styles.completedText,
            ]}
            numberOfLines={2}
          >
            {reminder.description}
          </Text>
        ) : null}

        <View style={styles.footer}>
          <Text
            style={[
              styles.dateTime,
              reminder.isCompleted && styles.completedText,
              isPastDue && styles.pastDueText,
            ]}
          >
            {formatDateTime(reminder.date, reminder.time)}
          </Text>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  completedContainer: {
    backgroundColor: '#F8F9FA',
    borderLeftColor: '#28A745',
  },
  pastDueContainer: {
    borderLeftColor: '#DC3545',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 12,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
  },
  pastDueText: {
    color: '#DC3545',
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkedButton: {
    backgroundColor: '#28A745',
    borderColor: '#28A745',
  },
  checkButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 16,
  },
});

export default ReminderItem;