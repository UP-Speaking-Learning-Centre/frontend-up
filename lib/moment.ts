import { days, dayNames } from '@/constants/schedule';

export function renderDayToIndonesian(abbr: string): string {
    const index = days.indexOf(abbr);
    return dayNames[index];
}
