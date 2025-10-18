import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { PLACEMENT_TEST_FILTER_OPTIONS } from '@/constants/placement-test';
import { ROUTES } from '@/constants/routes';
import { STATUS_OPTION } from '@/features/admin/constants/config';
import { FileText, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useDetailPlacementTest from '../hooks/use-detail-placement-test';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';
import AssignLevel from './assign-level';

const StatusManagement = () => {
    const { status, handleSubmit, formState, register, setValue, reset, handleSave } =
        useDetailPlacementTest();
    const { errors } = formState;
    const isGraded = useDisplayedPlacementTestStore(s => s.isGraded);
    const student = useDisplayedPlacementTestStore(s => s.student);
    const router = useRouter();

    const getNextOption = () => {
        const index = PLACEMENT_TEST_FILTER_OPTIONS.findIndex(opt => opt.value === status);
        return PLACEMENT_TEST_FILTER_OPTIONS[index + 1]?.name;
    };
    const getNextOptionValue = () => {
        const index = PLACEMENT_TEST_FILTER_OPTIONS.findIndex(opt => opt.value === status);
        return PLACEMENT_TEST_FILTER_OPTIONS[index + 1]?.value;
    };

    return (
        <Card className="p-6">
            <CardContent className="space-y-4 p-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <p className="mb-1 text-sm">Status saat ini</p>
                        <div className="flex gap-8 text-md items-center w-full justify-between relative">
                            <p className="text-primary font-bold z-10 bg-white pr-4">
                                {
                                    PLACEMENT_TEST_FILTER_OPTIONS.find(opt => opt.value === status)
                                        ?.name
                                }
                            </p>
                            {!isGraded && (
                                <>
                                    <div className="border-t-2 border-primary w-full absolute"></div>
                                    <p className="text-gray-300 font-semibold text-end z-10 bg-white pl-4">
                                        {getNextOption()}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {(status === STATUS_OPTION.DONE_INTERVIEW ||
                        status === STATUS_OPTION.GRADED) && (
                        <AssignLevel
                            errors={errors}
                            register={register}
                            setValue={setValue}
                            reset={reset}
                        />
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
                    ) : status === 'done_interview' ? (
                        <Button className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    ) : (
                        <div className="flex justify-end">
                            <Button onClick={() => handleSave(getNextOptionValue())} type="button">
                                Tanda sebagai "{getNextOption()}"
                            </Button>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

export default StatusManagement;
