import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { STATUS_OPTION } from '@/features/admin/constants/config';
import { PlacementTestStatus } from '@/types/placement-test';
import { FileText, Save } from 'lucide-react';
import { toast } from 'sonner';
import useDetailPlacementTest from '../hooks/use-detail-placement-test';
import useSaveNotes from '../queries/use-save-notes';
import useSavePlacementTest from '../queries/use-save-placement-test';
import useUpdateStatus from '../queries/use-update-status';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';
import AssignLevel from './assign-level';

const StatusManagement = () => {
    const { status, setState } = useDetailPlacementTest();
    const { mutateAsync } = useUpdateStatus();
    const { mutateAsync: patchPlacementTest } = useSavePlacementTest();
    const { assignedGrade, assignedLevel, assignedSchedule, assignedLocation, noteForStudent } =
        useDisplayedPlacementTestStore();
    const { mutateAsync: patchNotes } = useSaveNotes();

    const handleSave = async () => {
        if (status !== 'graded' && status !== 'doneInterview') {
            const res = await mutateAsync({ status });
            toast.info(res.status, { position: 'top-center' });
            return;
        }

        const [resStatus, resNote, resSave] = await Promise.all([
            mutateAsync({ status }),
            patchNotes({ notes: noteForStudent }),
            patchPlacementTest({
                gradeId: +assignedGrade,
                levelId: +assignedLevel,
                locationId: +assignedLocation,
                scheduleIds: [+assignedSchedule],
            }),
        ]);

        toast.info(resStatus.status, { position: 'top-center' });
        toast.info(resNote.message, { position: 'top-center' });
        toast.info(resSave.message, { position: 'top-center' });
    };

    const handleChangeStatus = (value: PlacementTestStatus) => {
        setState({ status: value as PlacementTestStatus });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Status Management
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label>Status</Label>
                    <Select value={status} onValueChange={handleChangeStatus}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(STATUS_OPTION).map(([key, value]) => (
                                <SelectItem value={value}>{key.split('_').join(' ')}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {(status === STATUS_OPTION.DONE_INTERVIEW || status === STATUS_OPTION.GRADED) && (
                    <AssignLevel />
                )}

                <Button onClick={handleSave} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                </Button>
            </CardContent>
        </Card>
    );
};

export default StatusManagement;
