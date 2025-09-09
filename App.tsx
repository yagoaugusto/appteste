/**
 * Reminder App - React Native
 * Aplicativo de Agenda de Lembretes
 *
 * @format
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Reminder, CreateReminderData } from './src/types/Reminder';
import { ReminderService } from './src/services/ReminderService';
import ReminderItem from './src/components/ReminderItem';
import ReminderForm from './src/components/ReminderForm';
import DemoData from './src/components/DemoData';

const EmptyComponent = React.memo(() => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyTitle}>📝 Nenhum lembrete ainda</Text>
    <Text style={styles.emptySubtitle}>
      Toque no botão + para adicionar seu primeiro lembrete
    </Text>
  </View>
));

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [, setLoading] = useState(true);

  const loadReminders = useCallback(async () => {
    try {
      const loadedReminders = await ReminderService.getAllReminders();
      // Sort by date and time
      const sortedReminders = loadedReminders.sort((a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeA.getTime() - dateTimeB.getTime();
      });
      setReminders(sortedReminders);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os lembretes.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadReminders();
  }, [loadReminders]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadReminders();
  };

  const handleSaveReminder = async (data: CreateReminderData) => {
    try {
      if (editingReminder) {
        await ReminderService.updateReminder(editingReminder.id, data);
      } else {
        await ReminderService.createReminder(data);
      }
      
      setShowForm(false);
      setEditingReminder(null);
      loadReminders();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o lembrete.');
    }
  };

  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setShowForm(true);
  };

  const handleDeleteReminder = async (id: string) => {
    try {
      await ReminderService.deleteReminder(id);
      loadReminders();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o lembrete.');
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      await ReminderService.toggleReminderCompletion(id);
      loadReminders();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o lembrete.');
    }
  };

  const handleAddReminder = () => {
    setEditingReminder(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingReminder(null);
  };

  const pendingReminders = reminders.filter(r => !r.isCompleted);
  const completedReminders = reminders.filter(r => r.isCompleted);

  const renderReminder = ({ item }: { item: Reminder }) => (
    <ReminderItem
      reminder={item}
      onToggleComplete={handleToggleComplete}
      onEdit={handleEditReminder}
      onDelete={handleDeleteReminder}
    />
  );

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <DemoData />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Lembretes</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reminders}
        renderItem={renderReminder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          reminders.length === 0 && styles.emptyListContent,
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={EmptyComponent}
        ListHeaderComponent={
          reminders.length > 0 ? (
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{pendingReminders.length}</Text>
                <Text style={styles.statLabel}>Pendentes</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{completedReminders.length}</Text>
                <Text style={styles.statLabel}>Concluídos</Text>
              </View>
            </View>
          ) : null
        }
      />

      <ReminderForm
        visible={showForm}
        reminder={editingReminder}
        onSave={handleSaveReminder}
        onCancel={handleCloseForm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContent: {
    paddingVertical: 16,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});

export default App;
