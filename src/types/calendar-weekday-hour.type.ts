export type CalendarWeekdayHourType = {
    id: number;
    start_time: string;
    finish_time: string;
    week_day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
    period_order: number;
}