import { StudyGroup } from '@/types/study-group';

// import dummy from '@/data/study-group-detail.json';
import { useQuery } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';
import { sleep } from '@/lib/mock';
// import { sleep } from '@/lib/mock';

const fetchAvailableStudyGroupQuery = async ({
    locationId,
    groupId,
    programId,
    levelId,
    packageId,
}: {
    locationId: string | number;
    groupId: string | number;
    programId: string | number;
    levelId: string | number;
    packageId: string | number;
}): Promise<StudyGroup[]> => {
    await sleep(1000);
    const res: any = await api.get(
        ENDPOINTS.fetchAvailableStudyGroup.expand({
            locationId,
            groupId,
            programId,
            levelId,
            packageId,
        })
    );

    const rawData = Array.isArray(res.data) ? res.data : res.data?.data || [];
    return rawData.map((item: any): StudyGroup => {
        return {
            studyGroupId: item.studyGroupId ?? item.id,
            studyGroupName: item.studyGroupName ?? item.name,
            teacherTeamMemberId: item.teacherTeamMemberId,
            teacherTeamMemberName: item.teacherTeamMemberName ?? item.teacherName,
            teacherTeamMemberPhoto: item.teacherTeamMemberPhoto ?? null,
            teacherAlias: item.teacherAlias ?? '',
            locationId: item.locationId,
            locationName: item.locationName ?? '',
            programId: item.programId,
            groupId: item.groupId,
            levelId: item.levelId,
            gradeId: item.gradeId,
            schedule1: item.schedule1 ?? {
                id: item.schedule1Id ?? item.id,
                scheduleId: item.schedule1Id ?? item.id,
                dayOfWeek: item.schedule1DayOfWeek ?? item.dayOfWeek,
                startTime: item.schedule1StartTime ?? item.startTime,
                endTime: item.schedule1EndTime ?? item.endTime,
                durationMinutes: item.schedule1DurationMinutes ?? item.durationMinutes ?? 90,
                location: item.locationName ?? '',
                locationId: item.locationId,
                teacherMemberName: item.teacherName ?? item.teacherTeamMemberName ?? '',
                teacherAlias: item.teacherAlias ?? '',
                isPriority: item.isPriority ?? false,
                program: '',
                group: '',
                level: '',
                grade: '',
            },
            schedule2: item.schedule2 ?? (item.schedule2DayOfWeek ? {
                id: item.schedule2Id ?? item.id,
                scheduleId: item.schedule2Id ?? item.id,
                dayOfWeek: item.schedule2DayOfWeek,
                startTime: item.schedule2StartTime ?? item.startTime,
                endTime: item.schedule2EndTime ?? item.endTime,
                durationMinutes: item.schedule2DurationMinutes ?? item.durationMinutes ?? 90,
                location: item.locationName ?? '',
                locationId: item.locationId,
                teacherMemberName: item.teacherName ?? item.teacherTeamMemberName ?? '',
                teacherAlias: item.teacherAlias ?? '',
                isPriority: item.isPriority ?? false,
                program: '',
                group: '',
                level: '',
                grade: '',
            } : null as any),
        };
    });
};

const useFetchAvailableStudyGroupQuery = () => {
    const formValue = useProgramSelectionStore(s => s.formValue);
    const { locationId, groupId, programId, levelId, packageId } = formValue;
    return useQuery({
        queryKey: ['available-study-group', locationId, groupId, programId, levelId, packageId],
        queryFn: () =>
            fetchAvailableStudyGroupQuery({ locationId, groupId, programId, levelId, packageId }),
        enabled: !!locationId && !!groupId && !!programId && !!levelId && !!packageId,
    });
};

export default useFetchAvailableStudyGroupQuery;
