import { useState } from 'react';
import useGetStudyGroup from '../queries/useGetStudyGroup';
import usePostReassignStudyGroup from '../queries/usePostReassignStudyGroup';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';
import { ResponseUserDetail } from '@/features/auth/constants/interface';
import useGetStudyGroupDetail from '../queries/useGetStudyGroupDetail';
import { getNextSchedules } from '@/lib/trial-class';

const useChangeStudyGroup = (
    locationId: number,
    prevStudyGroupId: number,
    data: ResponseUserDetail | undefined
) => {
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudyGroup, setSelectedStudyGroup] = useState('');

    const { id } = useParams();
    const { data: studyGroups, isLoading: isLoadingStudyGroup } = useGetStudyGroup(locationId);
    const { postUnassign, postAssign } = usePostReassignStudyGroup(Number(selectedStudyGroup));
    const { data: studyGroupDetailBySelect, isLoading: isLoadingStudyGroupDetailBySelect } =
        useGetStudyGroupDetail(+selectedStudyGroup || 0);

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

    const filteredStudyGroup =
        studyGroups?.filter(
            sg =>
                sg.programId === data?.programId &&
                sg.groupId === data.groupId &&
                data.packages.some(package_ => package_.packageId === sg.packageId) &&
                sg.levelId === data.levelId &&
                sg.locationId === locationId
        ) || [];

    const trialClassDates = getNextSchedules(
        data?.trialClassAt ? data?.schedules : studyGroupDetailBySelect?.schedules || []
    );

    return {
        isLoading: isLoadingStudyGroup,
        isOpen,
        setIsOpen,
        studyGroups,
        setSelectedStudyGroup,
        selectedStudyGroup,
        handleChangeStudyGroup,
        filteredStudyGroup,
        trialClassDates,
    };
};

export default useChangeStudyGroup;
