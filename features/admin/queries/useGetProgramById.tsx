import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Programs from '@/data/programs.json';
import ProgramDetailTree from '../components/program-detail-tree';
import { ProgramDetail, ProgramDetailTreeInterface } from '@/types/program-detail';
import { API_PROGRAM } from '@/features/placement-test-admin/constants/config';
import { API_PROGRAMS } from '../constants/config';

const useGetProgramById = () => {
    const getProgramById = () => {
        const res = Programs as ProgramDetail[];
        return res;
    };
    const { data, isLoading } = useQuery({ queryKey: [API_PROGRAMS], queryFn: getProgramById });
    
    return { data, isLoading };
};

export default useGetProgramById;
