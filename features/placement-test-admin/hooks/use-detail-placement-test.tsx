import {
    FormStatusManagement,
    ResponseSaveNote,
    ResponseSavePlacementTest,
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

    const { handleSubmit, formState, register, setValue, reset } = useForm<FormStatusManagement>({
        resolver: zodResolver(StatusManagement),
    });

    const handleContinue: SubmitHandler<FormStatusManagement> = fields => {
        return handleSave(status, fields);
    };
    const handleError: SubmitErrorHandler<FormStatusManagement> = fields => {
        if (status !== 'graded' && status !== 'done_interview') return handleSave(status);
    };
    const handleSubmitStatus = async (status_: string) => {
        setState({
            status: status_,
        });

        try {
            const res = await mutateAsync({ status: status_ });
            toast.info(res.status, { position: 'top-center' });
            return;
        } catch (error) {
            toast.error((error as AxiosError).message, { position: 'top-center' });
            setState({ status });
        }
    };

    const handleSubmitAll = async (fields?: FormStatusManagement) => {
        setState({ status: 'graded', isGraded: true });

        if (!fields || Object.values(fields).some(field => !field)) {
            console.error(fields);
            throw new Error('Terjadi kesalahan, tolong periksa kembali masukkan anda');
        }

        let requests: (
            | Promise<ResponseUpdateStatus>
            | Promise<ResponseSaveNote>
            | Promise<ResponseSavePlacementTest>
        )[] = [
            patchPlacementTest({
                gradeId: +fields?.grade,
                levelId: +fields?.level,
                locationId: +fields?.location,
                studyGroupId: +fields?.studyGroup,
            }),
        ];

        if (noteForStudent) requests = [...requests, patchNotes({ notes: noteForStudent })];

        try {
            await Promise.all(requests)
                .then(async res => {
                    const statusRes = await mutateAsync({ status: 'graded' });

                    return [...res, statusRes];
                })
                .then(() =>
                    toast.info('Success', { position: 'top-center', className: 'bg-green-100' })
                );
        } catch (error) {
            toast.error('Error saat menyimpan data', {
                position: 'top-center',
                className: 'bg-red-100',
            });
            setState({ status, isGraded: false });
        }
    };

    const handleSave = async (status: string, fields?: FormStatusManagement) => {
        // Submit All
        return handleSubmitAll(fields);
    };

    return {
        setState,
        correctAnswers,
        currentQuestionIndex,
        totalQuestions,
        questions,
        status,
        handleSubmit: handleSubmit(handleContinue, handleError),
        formState,
        register,
        setValue,
        reset,
        handleSave,
    };
};

export default useDetailPlacementTest;
