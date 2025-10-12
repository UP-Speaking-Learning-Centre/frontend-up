import api from '@/lib/api';
import {
    ProgramDetail,
    ProgramDetailGrade,
    ProgramDetailGroup,
    ProgramDetailLevel,
    ProgramDetailPackage,
    ProgramDetailTreeInterface,
    ProgramDetailTreeInterfaceItems,
    ProgramRecurse,
    ProgramRecurseArray,
} from '@/types/admin';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { API_PROGRAMS } from '../constants/config';
import useAuthStore from '@/features/auth/stores/authStore';

const useGetProgramById = () => {
    const { id } = useParams();
    const token = useAuthStore(s => s.token);
    const handleProgramMapping = (
        program: ProgramRecurseArray
    ): ProgramDetailTreeInterfaceItems[] => {
        const getTitle = (item: ProgramRecurse) => {
            return (
                (item as ProgramDetail)?.programName ??
                (item as ProgramDetailGroup)?.groupName ??
                (item as ProgramDetailLevel)?.levelName ??
                (item as ProgramDetailGrade)?.gradeNumber ??
                ''
            );
        };
        const getChild = (item: ProgramRecurse) => {
            return (
                (item as ProgramDetail)?.groups ??
                (item as ProgramDetailGroup)?.levels ??
                (item as ProgramDetailLevel)?.grades ??
                []
            );
        };
        const getId = (item: ProgramRecurse) => {
            return (
                (item as ProgramDetail)?.programId ??
                (item as ProgramDetailGroup)?.groupId ??
                (item as ProgramDetailLevel)?.levelId ??
                (item as ProgramDetailGrade)?.gradeId ??
                ''
            );
        };
        const getChildTitle = (item: ProgramRecurse) => {
            if ((item as ProgramDetail)?.groups?.length) return 'Groups';
            if ((item as ProgramDetailGroup)?.levels?.length) return 'Levels';
            if ((item as ProgramDetailLevel)?.grades?.length) return 'Grades';
            return '';
        };

        const getDetailTitle = (item: ProgramRecurse) => {
            if ((item as ProgramDetail)?.groups?.length) return 'Program';
            if ((item as ProgramDetailGroup)?.levels?.length) return 'Group';
            if ((item as ProgramDetailLevel)?.grades?.length) return 'Level';
            if ((item as ProgramDetailGrade)?.gradeNumber) return 'Grade';
            return '';
        };

        return program?.map(item => ({
            id: getId(item),
            title: getTitle(item),
            detailTitle: getDetailTitle(item),
            children:
                getChild(item)?.length > 0
                    ? {
                          title: getChildTitle(item),
                          detailTitle: getDetailTitle(item),
                          items: handleProgramMapping(getChild(item)),
                      }
                    : undefined,
            ...(item as ProgramDetail),
        }));
    };

    const getProgramById = async () => {
        const response = await api.get<ProgramDetail[]>(API_PROGRAMS);
        const data = response.data;

        const res = {
            title: 'Programs',
            items: handleProgramMapping(
                data.filter(program => program.programId.toString() === id)
            ),
        } as ProgramDetailTreeInterface;

        return res;
    };

    const { data, isLoading } = useQuery({
        queryKey: [API_PROGRAMS],
        queryFn: getProgramById,
        enabled: !!token,
    });

    return { data, isLoading };
};

export default useGetProgramById;
