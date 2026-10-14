import { ROUTES } from '@/constants/routes';
import useGetProfileById from '@/features/home/queries/useGetProfileById';
import { getRegistrationType } from '@/utils/student.helper';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useGetStudyGroupDetail from '../queries/useGetStudyGroupDetail';
import { ResponseUserDetail } from '@/features/auth/constants/interface';
import moment from 'moment';

const useStudentDetail = (forcedMockType?: 'active' | 'non_user' | 'lapsed') => {
    const [locationId, setLocationId] = useState('');

    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetProfileById(Number(id), forcedMockType);
    const { data: studyGroupDetail, isLoading: isLoadingStudyGroupDetail } = useGetStudyGroupDetail(
        data?.primaryStudyGroupId || 0
    );

    useEffect(() => {
        if (studyGroupDetail?.schedules) {
            setLocationId(studyGroupDetail?.schedules[0].locationId.toString() || '');
        }
    }, [studyGroupDetail]);

    useEffect(() => {
        if (!data?.id) return;
        if (getRegistrationType(data) === 'Placement Test Registration') {
            toast(
                <p>
                    Anda belum melakukan penilaian placement test untuk murid ini.
                    <br />
                    <br />
                    {data.latestResult?.placementTestId && (
                        <Link
                            className="text-primary font-bold inline"
                            href={ROUTES.adminPlacementTestsId.expand({
                                id: data?.latestResult?.placementTestId || 0,
                            })}
                        >
                            Lanjut ke Placement Test
                        </Link>
                    )}
                </p>,
                {
                    position: 'top-center',
                    duration: 5000,
                    className: 'bg-red-50',
                    icon: <Info />,
                }
            );
        }
        setLocationId(data.self_schedule_payload?.items[0].locationId.toString() || '');
    }, [data]);

    console.log(data);
    console.log({
        ...data,
        marketing: {
            ...data?.marketing,
            lastUpdate: moment(data?.marketing?.lastUpdate).utcOffset(7).toDate(),
        },
    });
    return {
        data: data ? {
            ...data,
            marketing: {
                ...data.marketing,
                lastUpdate: data.marketing?.lastUpdate ? moment(data.marketing.lastUpdate).utcOffset(+7).toISOString() : undefined,
            },
        } as ResponseUserDetail : undefined,
        locationId,
        isLoading,
        isLoadingStudyGroupDetail,
        studyGroupDetail,
        setLocationId,
    };
};

export default useStudentDetail;
