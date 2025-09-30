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
    ProgramRecurseArray
} from '@/types/admin';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { API_PROGRAMS } from '../constants/config';

const useGetProgramById = () => {
    const { id } = useParams();
    const handleProgramMapping = (
        program: ProgramRecurseArray,
        isPackage?: boolean
    ): ProgramDetailTreeInterfaceItems[] => {
        const getTitle = (item: ProgramRecurse) => {
            return (
                (item as ProgramDetail)?.programName ??
                (item as ProgramDetailGroup)?.groupName ??
                (item as ProgramDetailLevel)?.levelName ??
                (item as ProgramDetailGrade)?.gradeNumber ??
                (item as ProgramDetailPackage)?.packageName ??
                ''
            );
        };
        const getChild = (item: ProgramRecurse) => {
            return (
                (item as ProgramDetail)?.groups ??
                (item as ProgramDetailGroup)?.levels ??
                (item as ProgramDetailLevel)?.grades ??
                (item as ProgramDetailGrade)?.packages
            );
        };
        const getChildTitle = (item: ProgramRecurse) => {
            if ((item as ProgramDetail)?.groups?.length) return 'Groups';
            if ((item as ProgramDetailGroup)?.levels?.length) return 'Levels';
            if ((item as ProgramDetailLevel)?.grades?.length) return 'Grades';
            if ((item as ProgramDetailGrade)?.packages?.length) return 'Packages';
            return '';
        };

        return program?.map(item => ({
            title: getTitle(item),
            description: 'Lorem Ipsum',
            children:
                getChild(item)?.length > 0
                    ? {
                          title: getChildTitle(item),
                          items: handleProgramMapping(getChild(item)),
                      }
                    : undefined,
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

    const { data, isLoading } = useQuery({ queryKey: [API_PROGRAMS], queryFn: getProgramById });

    return { data, isLoading };
};

export default useGetProgramById;
