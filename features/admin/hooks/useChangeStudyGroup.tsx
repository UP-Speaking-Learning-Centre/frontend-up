import { useState } from 'react';
import useGetGradeAdmin from '../queries/useGetGradeAdmin';
import useGetStudyGroup from '../queries/useGetStudyGroup';

const useChangeStudyGroup = () => {
    const { data, isLoading } = useGetGradeAdmin();
    const { data: studyGroups, isLoading: isLoadingStudyGroup } = useGetStudyGroup();
    const [isOpen, setIsOpen] = useState(false);

    return {
        isLoading: isLoading || isLoadingStudyGroup,
        isOpen,
        setIsOpen,
        grades: data,
        studyGroups,
    };
};

export default useChangeStudyGroup;
