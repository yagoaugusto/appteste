export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReminderData {
  title: string;
  description: string;
  date: string;
  time: string;
}

export interface UpdateReminderData extends Partial<CreateReminderData> {
  isCompleted?: boolean;
}