const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
export const formatDate = (date: Date): string => {
  const weekDay = weekDays[date.getDay()];
  const month = paddingNumber(date.getMonth() + 1, '00');
  const dayOfMonth = paddingNumber(date.getDate(), '00');
  const hour = paddingNumber(date.getHours(), '00');
  const minute = paddingNumber(date.getMinutes(), '00');
  return `${month}/${dayOfMonth} (${weekDay}) ${hour}:${minute}`;
};

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
