import { useState } from 'react';
import useGetStudyGroup from '../queries/useGetStudyGroup';
import usePostReassignStudyGroup from '../queries/usePostReassignStudyGroup';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';

const useChangeStudyGroup = (locationId: number, prevStudyGroupId: number) => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudyGroup, setSelectedStudyGroup] = useState('');

    const { id } = useParams();
    const { data: studyGroups, isLoading: isLoadingStudyGroup } = useGetStudyGroup(locationId);
    const { postUnassign, postAssign } = usePostReassignStudyGroup(Number(selectedStudyGroup));

    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: [ENDPOINTS.fetchAdminStudentById.expand({ id: id as string })],
        });
        setIsOpen(false);
        setSelectedStudyGroup('');
    };

    const handleChangeStudyGroup = () => {
        const payload = {
            // markFullScheduleId: 1,
            studentIds: +(id as string),
            studyGroupId: +selectedStudyGroup,
        };

        if (!selectedStudyGroup) throw new Error('Please select new Study Group');
        if (!prevStudyGroupId) return postAssign(payload).then(handleSuccess);
        postUnassign({ hard: true, studentIds: [+(id || 0)], prevStudyGroupId }).then(() =>
            postAssign(payload).then(handleSuccess)
        );
    };

    return {
        isLoading: isLoadingStudyGroup,
        isOpen,
        setIsOpen,
        studyGroups: studyGroups,
        setSelectedStudyGroup,
        selectedStudyGroup,
        handleChangeStudyGroup,
    };
};

export default useChangeStudyGroup;
