import { useState } from 'react';
import useGetStudyGroup from '../queries/useGetStudyGroup';
import usePostReassignStudyGroup from '../queries/usePostReassignStudyGroup';
import { useParams } from 'next/navigation';

const useChangeStudyGroup = (locationId: number, prevStudyGroupId: number) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudyGroup, setSelectedStudyGroup] = useState('');

    const { id } = useParams();
    const { data: studyGroups, isLoading: isLoadingStudyGroup } = useGetStudyGroup(locationId);
    const { postUnassign, postAssign } = usePostReassignStudyGroup(Number(selectedStudyGroup));

    const handleChangeStudyGroup = () => {
        if (!selectedStudyGroup) throw new Error('Please select new Study Group');
        postUnassign({ hard: true, studentIds: [+(id || 0)], prevStudyGroupId }).then(() =>
            postAssign({ studentIds: [+(id || 0)] })
        );
    };

    return {
        isLoading: isLoadingStudyGroup,
        isOpen,
        setIsOpen,
        studyGroups,
        setSelectedStudyGroup,
        selectedStudyGroup,
        handleChangeStudyGroup,
    };
};

export default useChangeStudyGroup;
