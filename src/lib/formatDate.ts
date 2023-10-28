const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

/**
 * Dateを "MM/DD (曜日) HH:MM" の形式にフォーマットする
 * @param date
 * @returns
 */
export const formatDate = (date: Date): string => {
  const weekDay = weekDays[date.getDay()];
  const month = paddingNumber(date.getMonth() + 1, '00');
  const dayOfMonth = paddingNumber(date.getDate(), '00');
  const hour = paddingNumber(date.getHours(), '00');
  const minute = paddingNumber(date.getMinutes(), '00');
  return `${month}/${dayOfMonth} (${weekDay}) ${hour}:${minute}`;
};

/**
 * 2つのDateを "MM/DD (曜日) HH:MM〜HH:MM" の形式にフォーマットする
 * @param start
 * @param end
 * @returns
 */
export const formatDurationDate = (start: Date, end: Date): string => {
  const startWeekDay = weekDays[start.getDay()];

  const startMonth = paddingNumber(start.getMonth() + 1, '00');
  const startDayOfMonth = paddingNumber(start.getDate(), '00');
  const startHour = paddingNumber(start.getHours(), '00');
  const startMinute = paddingNumber(start.getMinutes(), '00');

  const endHour = paddingNumber(end.getHours(), '00');
  const endMinute = paddingNumber(end.getMinutes(), '00');
  return `${startMonth}/${startDayOfMonth} (${startWeekDay}) ${startHour}:${startMinute}〜${endHour}:${endMinute}`;
};

const paddingNumber = (num: number, paddingChar: string): string => {
  return `${paddingChar}${num}`.slice(-paddingChar.length);
};

export const formatDateForSafaApi = (date: Date): string => {
  const year = paddingNumber(date.getFullYear(), '0000');
  const month = paddingNumber(date.getMonth() + 1, '00');
  const dayOfMonth = paddingNumber(date.getDate(), '00');
  const hour = paddingNumber(date.getHours(), '00');
  const minute = paddingNumber(date.getMinutes(), '00');
  return `${year}-${month}-${dayOfMonth}T${hour}:${minute}`;
};
