import React from 'react';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';
import api from '@/lib/api';
import { ResponseGrade } from '@/types/placement-test';
import { API_AVAIL_SCHEDULE, API_GRADE } from '../constants/config';
import { useQuery } from '@tanstack/react-query';
import useGetProgram from './use-get-program';
import useGetGroup from './use-get-group';

const useGetGrade = () => {
    const program = useDisplayedPlacementTestStore(s => s.test?.program);
    const group = useDisplayedPlacementTestStore(s => s.test?.group);
    const { data: dataProgram } = useGetProgram();
    const { data: dataGroup } = useGetGroup();
    const { assignedLevel } = useDisplayedPlacementTestStore();

    const get = async () => {
        const res = await api.get<ResponseGrade[]>(
            API_GRADE.expand({
                programId: dataProgram?.find(program_ => program_.name === program)?.id ?? '',
                groupId: dataGroup?.find(group_ => group_.name === group)?.id ?? '',
                levelId: assignedLevel,
            })
        );
        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [API_GRADE, dataProgram, dataGroup, assignedLevel],
        queryFn: get,
    });

    return { data, isLoading };
};

export default useGetGrade;
