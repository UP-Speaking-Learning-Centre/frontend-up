import { ROUTES } from '@/constants/routes';
import useGetProfileById from '@/features/home/queries/useGetProfileById';
import { getRegistrationType } from '@/utils/student.helper';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useGetStudyGroupDetail from '../queries/useGetStudyGroupDetail';

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
        if (!data?.id) return;
        if (getRegistrationType(data) === 'Placement Test Registration') {
            toast(
                <p>
                    Anda belum melakukan penilaian placement test untuk murid ini.
                    {data.latestResult?.placementTestId && (
                        <Link
                            className="text-primary font-bold inline ml-1"
                            href={ROUTES.adminPlacementTestsId.expand({
                                id: data?.latestResult?.placementTestId || 0,
                            })}
                        >
                            Lanjut ke Placement Test
                        </Link>
                    )}
                </p>,
                { position: 'top-center', icon: <Info /> }
            );
        }
        setLocationId(data.self_schedule_payload?.items[0].locationId.toString() || '');
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
