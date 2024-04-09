import {CalendarWeekdayHourType} from "./calendar-weekday-hour.type";
import {CalendarObjectType} from "./calendar-object.type";

export type CalendarType = {
    id: number;
    type: 'work_day' | 'calendar_day';
    title: string;
    customer?: number;
    is_default?: boolean;
    weekday_hour?: CalendarWeekdayHourType;
    objects?: CalendarObjectType;
}