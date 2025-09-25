import moment from 'moment';

// opsional: set default output ke Indonesia
moment.locale('id');

/**
 * Mengubah singkatan hari EN (MON, TUE, ...) menjadi nama hari Indonesia penuh (Senin, Selasa, ...)
 * @param abbr - singkatan hari EN, contoh: "MON", "Tue", "fri"
 * @returns "Senin", "Selasa", dst. Jika input tak valid, dikembalikan apa adanya.
 */
export function renderDayToIndonesian(abbr: string): string {
    // parse sebagai EN agar "MON" dikenali, strict = true
    const m = moment(abbr, 'ddd', 'en', true);
    if (!m.isValid()) return abbr;
    return m.locale('id').format('dddd'); // contoh: "Senin"
}

export function renderDateToIndonesian(date: string): string {
    const m = moment(date);
    if (!m.isValid()) return date;
    return m.locale('id').format('DD MMMM YYYY'); // contoh: "01 Januari 2025"
}
