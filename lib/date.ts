import { DAY } from '@/constants/program-selections';
import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

export const getDayOfWeek = (day: string) => {
    const normalized = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();

    const key = normalized.toUpperCase();
    const idx = DAY.findIndex(item => item === key) + 1;
    if (idx === undefined) return 'Invalid date';

    return moment().day(idx).format('dddd');
};
