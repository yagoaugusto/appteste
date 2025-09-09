import { useEffect } from 'react';
import { ReminderService } from '../services/ReminderService';

const DemoData = () => {
  useEffect(() => {
    const addDemoData = async () => {
      // Check if demo data already exists
      const existing = await ReminderService.getAllReminders();
      if (existing.length > 0) {
        return; // Demo data already exists
      }

      // Add some demo reminders
      await ReminderService.createReminder({
        title: 'Reunião de equipe',
        description: 'Discutir os próximos projetos da empresa',
        date: '2024-12-10',
        time: '09:00',
      });

      await ReminderService.createReminder({
        title: 'Consulta médica',
        description: 'Consulta de rotina com cardiologista',
        date: '2024-12-11',
        time: '14:30',
      });

      await ReminderService.createReminder({
        title: 'Comprar mantimentos',
        description: 'Ir ao supermercado e comprar itens da lista',
        date: '2024-12-12',
        time: '10:00',
      });

      await ReminderService.createReminder({
        title: 'Aniversário da Maria',
        description: 'Lembrar de parabenizar a Maria pelo aniversário',
        date: '2024-12-15',
        time: '08:00',
      });

      // Mark one as completed
      const reminders = await ReminderService.getAllReminders();
      if (reminders.length > 0) {
        await ReminderService.toggleReminderCompletion(reminders[2].id);
      }
    };

    addDemoData();
  }, []);

  return null;
};

export default DemoData;