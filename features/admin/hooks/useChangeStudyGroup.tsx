import ENDPOINTS from '@/constants/endpoints';
import { MAX_STUDENT } from '@/constants/programs';
import { ResponseUserDetail } from '@/features/auth/constants/interface';
import { getNextSchedules } from '@/lib/trial-class';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetAssignedStudyGroup } from '../queries/useGetAssignedStudyGroup';
import useGetStudyGroup from '../queries/useGetStudyGroup';
import useGetStudyGroupDetail from '../queries/useGetStudyGroupDetail';
import usePostReassignStudyGroup from '../queries/usePostReassignStudyGroup';

const useChangeStudyGroup = (
    locationId: number,
    prevStudyGroupId: number,
    data: ResponseUserDetail | undefined
) => {
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudyGroup, setSelectedStudyGroup] = useState('');
    const [isFull, setIsFull] = useState(false);

    const { id } = useParams();
    const { data: studyGroups, isLoading: isLoadingStudyGroup } = useGetStudyGroup(locationId);
    const { postUnassign, postAssign } = usePostReassignStudyGroup(Number(selectedStudyGroup));
    const { data: studyGroupDetailBySelect, isLoading: isLoadingStudyGroupDetailBySelect } =
        useGetStudyGroupDetail(+selectedStudyGroup || 0);
    const { data: studyGroupAssigned, isLoading } = useGetAssignedStudyGroup(+selectedStudyGroup);

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

    useEffect(() => {
        setIsFull(false);
        const studyGroupPackage = studyGroupDetailBySelect?.package;
        const maxStudent = MAX_STUDENT[studyGroupPackage?.name as keyof typeof MAX_STUDENT];
        if ((studyGroupAssigned?.students?.length || 0) >= maxStudent) {
            setIsFull(true);
        }
    }, [studyGroupDetailBySelect, studyGroupAssigned]);

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
        isFull,
    };
};

export default useChangeStudyGroup;
