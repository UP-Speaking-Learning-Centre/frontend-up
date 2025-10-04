import { useEffect, useState } from 'react';
import { toast } from 'sonner';
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
        mutateAsync({ notes }).catch(err => toast.error(err?.message, { position: 'top-center' }));
    };

    return { isEdit, setIsEdit, notes, setNotes, handleSave };
};

export default useEditNote;
