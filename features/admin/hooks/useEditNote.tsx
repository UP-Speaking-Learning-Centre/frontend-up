import { useState } from 'react';
import { toast } from 'sonner';
import usePatchNoteByUserId from '../queries/usePatchNoteByUserId';

const useEditNote = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [notes, setNotes] = useState('');

    const { mutateAsync } = usePatchNoteByUserId();

    const handleSave = () => {
        setIsEdit(false);
        mutateAsync({ notes }).catch(err => toast.error(err?.message, { position: 'top-center' }));
    };

    return { isEdit, setIsEdit, notes, setNotes, handleSave };
};

export default useEditNote;
