import { days, dayNames } from '@/constants/schedule';

export function renderDayToIndonesian(abbr: string): string {
    const index = days.indexOf(abbr);
    return dayNames[index];
}

export function renderDateToIndonesian(date: string): string {
    const m = moment(date);
    if (!m.isValid()) return date;
    return m.locale('id').format('DD MMMM YYYY'); // contoh: "01 Januari 2025"
}
