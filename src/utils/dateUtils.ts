export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
};

export const formatDateTime = (dateString: string, timeString: string): string => {
  return `${formatDate(dateString)} às ${formatTime(timeString)}`;
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getCurrentTime = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const isDateInPast = (dateString: string, timeString: string): boolean => {
  const reminderDateTime = new Date(`${dateString}T${timeString}`);
  const now = new Date();
  return reminderDateTime < now;
};