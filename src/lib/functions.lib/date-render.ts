import dayjs, {Dayjs} from "dayjs";
import {persian} from "../index";

export function date_render(date: string): string {
    return persian(dayjs(date, 'YYYY-MM-DD').format('YYYY/MM/DD'));
}