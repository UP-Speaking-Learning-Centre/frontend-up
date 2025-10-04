import { useState } from 'react';
import useGetLocation from '../queries/useGetLocation';
import useGetStudyGroup from '../queries/useGetStudyGroup';

const useChangeStudyGroup = (locationName: string) => {
    const { data, isLoading } = useGetLocation();
    const { data: studyGroups, isLoading: isLoadingStudyGroup } = useGetStudyGroup(
        data?.find(loc => loc.name?.toLocaleLowerCase() === locationName?.toLocaleLowerCase())
            ?.id || 0
    );
    const [isOpen, setIsOpen] = useState(false);

    return {
        isLoading: isLoadingStudyGroup || isLoading,
        isOpen,
        setIsOpen,
        studyGroups,
    };
};

export default useChangeStudyGroup;
