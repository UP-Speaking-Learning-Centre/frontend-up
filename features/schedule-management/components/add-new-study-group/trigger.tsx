import { Plus } from 'lucide-react';
import React, { useState } from 'react';

import AddNewStudyGroup from './form';
import { Button } from '@/components/ui/button';

const AddNewStudyGroupTrigger = ({ closeDetailPopup }: { closeDetailPopup?: () => void }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                className="max-md:w-full"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <Plus /> Tambah Kelompok Belajar
            </Button>
            {open && (
                <AddNewStudyGroup
                    open={open}
                    setOpen={() => {
                        setOpen(false);
                        closeDetailPopup?.();
                    }}
                />
            )}
        </>
    );
};

export default AddNewStudyGroupTrigger;
