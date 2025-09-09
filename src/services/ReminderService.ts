import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { Reminder, CreateReminderData, UpdateReminderData } from '../types/Reminder';

const STORAGE_KEY = '@reminder_app_reminders';

export class ReminderService {
  private static async getReminders(): Promise<Reminder[]> {
    try {
      const remindersJson = await AsyncStorage.getItem(STORAGE_KEY);
      return remindersJson ? JSON.parse(remindersJson) : [];
    } catch (error) {
      console.error('Error loading reminders:', error);
      return [];
    }
  }

  private static async saveReminders(reminders: Reminder[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    } catch (error) {
      console.error('Error saving reminders:', error);
      throw error;
    }
  }

  static async getAllReminders(): Promise<Reminder[]> {
    return await this.getReminders();
  }

  static async createReminder(data: CreateReminderData): Promise<Reminder> {
    const reminders = await this.getReminders();
    
    const newReminder: Reminder = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    reminders.push(newReminder);
    await this.saveReminders(reminders);
    
    return newReminder;
  }

  static async updateReminder(id: string, data: UpdateReminderData): Promise<Reminder | null> {
    const reminders = await this.getReminders();
    const index = reminders.findIndex(reminder => reminder.id === id);
    
    if (index === -1) {
      return null;
    }

    const updatedReminder: Reminder = {
      ...reminders[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    reminders[index] = updatedReminder;
    await this.saveReminders(reminders);
    
    return updatedReminder;
  }

  static async deleteReminder(id: string): Promise<boolean> {
    const reminders = await this.getReminders();
    const filteredReminders = reminders.filter(reminder => reminder.id !== id);
    
    if (filteredReminders.length === reminders.length) {
      return false; // Reminder not found
    }

    await this.saveReminders(filteredReminders);
    return true;
  }

  static async toggleReminderCompletion(id: string): Promise<Reminder | null> {
    const reminders = await this.getReminders();
    const reminder = reminders.find(r => r.id === id);
    
    if (!reminder) {
      return null;
    }

    return await this.updateReminder(id, { isCompleted: !reminder.isCompleted });
  }
}