import React, { useEffect, useState } from 'react';
import useGetStudyGroupDetail from '../queries/useGetStudyGroupDetail';
import useGetProfileById from '@/features/home/queries/useGetProfileById';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { Info } from 'lucide-react';

const useStudentDetail = () => {
    const [locationId, setLocationId] = useState('');

    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetProfileById(Number(id));
    const { data: studyGroupDetail, isLoading: isLoadingStudyGroupDetail } = useGetStudyGroupDetail(
        data?.primaryStudyGroupId || 0
    );

    useEffect(() => {
        if (studyGroupDetail?.schedules) {
            setLocationId(studyGroupDetail?.schedules[0].locationId.toString() || '');
        }
    }, [studyGroupDetail]);

    useEffect(() => {
        if (!!data?.id) {
            if (!data.levelId && !data.self_schedule_payload) {
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
        }
    }, [data]);

    return {
        data,
        locationId,
        isLoading,
        isLoadingStudyGroupDetail,
        studyGroupDetail,
        setLocationId,
    };
};

export default useStudentDetail;
