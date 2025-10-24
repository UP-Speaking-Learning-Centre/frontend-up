import { errorToast } from '@/lib/toast';
import { useEffect, useState } from 'react';
import usePatchNoteByUserId from '../queries/usePatchNoteByUserId';

const useEditNote = (notes_?: string | null) => {
    const [isEdit, setIsEdit] = useState(false);
    const [notes, setNotes] = useState<string>('');

    useEffect(() => {
        setNotes(notes_ || '');
    }, [notes_]);

    const { mutateAsync } = usePatchNoteByUserId();

    const handleSave = () => {
        setIsEdit(false);
        mutateAsync({ notes }).catch(err => errorToast(err?.message));
    };

    return { isEdit, setIsEdit, notes, setNotes, handleSave };
};

export default useEditNote;
