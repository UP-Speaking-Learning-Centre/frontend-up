import { REGISTRATION_TYPE } from '@/constants/student';
import { ResponseUserDetail } from '@/features/auth/constants/interface';
import { getDayOfWeek } from '@/lib/date';
import { StudentRegistrationType } from '@/types/students';

export const getRegistrationType = (
    student?: ResponseUserDetail
): StudentRegistrationType | undefined => {
    if (!student) return;
    if (!student.levelId && !student.self_schedule_payload) return 'Placement Test Registration';
    if (!student.schedules.length) return 'Self-scheduling Registration';
    return 'Normal Registration';
};

export const getWhatsappTemplate = (data: ResponseUserDetail) => {
    let text = '';

    switch (getRegistrationType(data)) {
        case REGISTRATION_TYPE.normal:
            text = `Hallo, kak *${
                data?.name
            }* \nThis is Admin from UP SLC 🥰 \n\nTerima kasih sudah tertarik belajar bahasa inggris dengan kami! \nUntuk kak ${
                data?.name
            } sudah memilih kelompok dengan jadwal yang sesuai ya kak melalui website, dengan detail: \n\nProgram: *${
                data?.program
            }*\nPilihan Level: *${data?.level}*\nPilihan Group: *${data?.group}*\n${
                data?.schedules &&
                data?.schedules.length > 0 &&
                data.schedules
                    .map((schedule, index) => {
                        return `Jadwal ${index + 1}: *${getDayOfWeek(schedule.dayOfWeek || '')} ${
                            schedule.startTime
                        } - ${schedule.endTime}*\n`;
                    })
                    .join('')
            }\n\nSelanjunya untuk kak *${
                data?.name
            }* akan diadakan interview ya. Cuma ngobrol santai aja ko\n\n`;
            break;
        case REGISTRATION_TYPE.selfSchedule:
            text = `Hallo, kak *${
                data?.name
            }* \nThis is Admin from UP SLC 🥰 \nTerima kasih sudah tertarik belajar bahasa inggris dengan kami! \nUntuk kak ${
                data?.name
            } request jadwal pada \n\n${
                data?.self_schedule_payload &&
                data?.self_schedule_payload?.items.length > 0 &&
                data?.self_schedule_payload?.items
                    .map((item, index) => {
                        return `Jadwal ${index + 1}: *${getDayOfWeek(
                            item.dayOfWeek.slice(0, 3)
                        )}, ${item.startTime} - ${item.endTime}*\n`;
                    })
                    .join('')
            } \n\n`;
            break;
        case REGISTRATION_TYPE.placementTest:
            text = `Hallo, kak *${data?.name}* \nThis is Admin from UP SLC 🥰 \n\nTerima kasih sudah tertarik belajar bahasa inggris dengan kami! \nSelamat sudah mengerjakan placement testnya, untuk hasil placement kak *${data.name}* akan disampaikan lebih lanjut melalui WA ya!`;
            break;
    }

    return text;
};
