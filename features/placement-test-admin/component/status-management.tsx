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
import useDetailPlacementTest from '../hooks/use-detail-placement-test';
import AssignLevel from './assign-level';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const StatusManagement = () => {
    const { status, setState, handleSubmit, formState, register, setValue } =
        useDetailPlacementTest();
    const { errors } = formState;
    const isGraded = useDisplayedPlacementTestStore(s => s.isGraded);
    const student = useDisplayedPlacementTestStore(s => s.student);
    const router = useRouter();

    const handleChangeStatus = (value: PlacementTestStatus) => {
        if (value) {
            setState({ status: value as PlacementTestStatus });
        }
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Status</Label>
                        <Select value={status} onValueChange={handleChangeStatus}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(STATUS_OPTION).map(([key, value]) => (
                                    <SelectItem value={value}>
                                        {key.split('_').join(' ')}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {(status === STATUS_OPTION.DONE_INTERVIEW || status === STATUS_OPTION.GRADED) &&
                        !isGraded && (
                            <AssignLevel errors={errors} register={register} setValue={setValue} />
                        )}

                    {isGraded ? (
                        <Button
                            onClick={() =>
                                router.replace(
                                    ROUTES.adminStudentsId.expand({ id: student?.id || '' })
                                )
                            }
                            className="w-full"
                        >
                            Lihat Detail Murid
                        </Button>
                    ) : (
                        <Button className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

export default StatusManagement;
