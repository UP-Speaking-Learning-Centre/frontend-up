import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getDayOfWeek } from '@/lib/date';
import { Schedule } from '@/types/study-group';
import { Calendar, Clock, Info } from 'lucide-react';
import React from 'react';

interface Props {
    selfSchedule: Schedule[];
    setIsOpen: (val: boolean) => void;
}
const StudentSelfScheduleAlert = ({ selfSchedule, setIsOpen }: Props) => {
    return (
        <Card className="overflow-hidden bg-[#CE64391A]">
            <div className="bg-secondary text-white p-4">
                <h2 className="text-lg font-semibold">Jadwal Pilihan Sendiri</h2>
            </div>
            <div className='px-6 py-4'>
                {selfSchedule.map((schedule, index) => (
                    <div key={index} className='mb-4'>
                        <div className="space-y-3">
                            <p className="text-sm text-gray-600 mb-2">Jadwal Pilihan {index + 1}</p>
                            <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm text-gray-600">Hari</span>
                                </div>
                                <span className="font-semibold text-gray-900">
                                    {getDayOfWeek(schedule.dayOfWeek.slice(0, 3))}
                                </span>
                            </div>

                            <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm text-gray-600">Waktu</span>
                                </div>
                                <span className="font-semibold text-gray-900">
                                    {schedule.startTime.substring(0, 5)} -{' '}
                                    {schedule.endTime.substring(0, 5)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                <Button onClick={() => setIsOpen(true)} className="w-full" size="lg">
                    Assign ke Kelompok
                </Button>
            </div>
        </Card>
    );
};

export default StudentSelfScheduleAlert;
