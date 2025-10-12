import {
    FormStatusManagement,
    ResponseSaveNote,
    ResponseUpdateStatus,
} from '@/types/placement-test-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import useSaveNotes from '../queries/use-save-notes';
import useSavePlacementTest from '../queries/use-save-placement-test';
import useUpdateStatus from '../queries/use-update-status';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';

const useDetailPlacementTest = () => {
    const questions = useDisplayedPlacementTestStore(s => s.questions);
    const status = useDisplayedPlacementTestStore(s => s.status);
    const correctAnswers = useDisplayedPlacementTestStore(s => s.correctAnswers);
    const currentQuestionIndex = useDisplayedPlacementTestStore(s => s.currentQuestionIndex);
    const gradedQuestions = useDisplayedPlacementTestStore(s => s.gradedQuestions);
    const totalQuestions = useDisplayedPlacementTestStore(s => s.totalQuestions);
    const noteForStudent = useDisplayedPlacementTestStore(s => s.noteForStudent);
    const setState = useDisplayedPlacementTestStore(s => s.setState);

    const { mutateAsync } = useUpdateStatus();
    const { mutateAsync: patchPlacementTest } = useSavePlacementTest();
    const { mutateAsync: patchNotes } = useSaveNotes();

    const StatusManagement = z.object({
        level: z.string({ required_error: 'This value is required' }),
        grade: z.string({ required_error: 'This value is required' }),
        location: z.string({ required_error: 'This value is required' }),
        mentor: z.string({ required_error: 'This value is required' }),
        studyGroup: z.string({ required_error: 'This value is required' }),
    });

    const { handleSubmit, formState, register, setValue } = useForm<FormStatusManagement>({
        resolver: zodResolver(StatusManagement),
    });

    const handleContinue: SubmitHandler<FormStatusManagement> = fields => {
        return handleSave(fields);
    };
    const handleError: SubmitErrorHandler<FormStatusManagement> = fields => {
        if (status !== 'graded' && status !== 'done_interview') return handleSave();
    };
    const handleSubmitStatus = async () => {
        try {
            const res = await mutateAsync({ status });
            toast.info(res.status, { position: 'top-center' });
            return;
        } catch (error) {
            toast.error((error as AxiosError).message, { position: 'top-center' });
        }
    };

    const handleSubmitAll = async (fields?: FormStatusManagement) => {
        if (!fields || Object.values(fields).some(field => !field)) {
            console.error(fields);
            throw new Error('Terjadi kesalahan, tolong periksa kembali masukkan anda');
        }

        let requests: (Promise<ResponseUpdateStatus> | Promise<ResponseSaveNote>)[] = [
            mutateAsync({ status }),
        ];

        if (noteForStudent) requests = [...requests, patchNotes({ notes: noteForStudent })];

        const res = await Promise.all(requests).then(async res => {
            const placementTest = await patchPlacementTest({
                gradeId: +fields?.grade,
                levelId: +fields?.level,
                locationId: +fields?.location,
                studyGroupId: +fields?.studyGroup,
            });

            return [...res, placementTest];
        });
        res.forEach(() =>
            toast.info('Success', { position: 'top-center', className: 'bg-green-100' })
        );
    };

    const handleSave = async (fields?: FormStatusManagement) => {
        // Submit status only
        if (status !== 'graded' && status !== 'done_interview') {
            return handleSubmitStatus();
        }

        // Submit All
        return handleSubmitAll(fields);
    };

    return {
        setState,
        correctAnswers,
        currentQuestionIndex,
        gradedQuestions,
        totalQuestions,
        questions,
        status,
        handleSubmit: handleSubmit(handleContinue, handleError),
        formState,
        register,
        setValue,
    };
};

export default useDetailPlacementTest;
