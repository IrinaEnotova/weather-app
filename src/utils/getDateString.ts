export default function getDateString(date: Date) {
  return date.toLocaleDateString('ru-RU', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}
