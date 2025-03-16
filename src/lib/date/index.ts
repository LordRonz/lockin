export function formatCustomDate(date?: Date | null) {
  if (!date) return '';
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(
    date,
  );
  const dayNum = date.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    date,
  );
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${dayNum} ${month} ${hours}.${minutes}`;
}
