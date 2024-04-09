export type CalendarObjectType = {
    id: number;
    type: 'weekly_holiday' | 'holiday_exception';
    date: string;
    title: string;
}