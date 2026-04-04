import { useState } from 'react';

export function useEditConfirmation<T>() {
    const [isOpen, setIsOpen] = useState(false);
    const [oldData, setOldData] = useState<T | null>(null);
    const [newData, setNewData] = useState<T | null>(null);
    const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(null);
    const [onCancelAction, setOnCancelAction] = useState<(() => void) | null>(null);

    const openConfirmation = (oldVal: T, newVal: T, onConfirm: () => void, onCancel?: () => void) => {
        setOldData(oldVal);
        setNewData(newVal);
        setOnConfirmAction(() => onConfirm);
        if (onCancel) setOnCancelAction(() => onCancel);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        if (onConfirmAction) {
            onConfirmAction();
        }
        setIsOpen(false);
    };

    const handleCancel = () => {
        if (onCancelAction) {
            onCancelAction();
        }
        setOnCancelAction(null); // clean up
        setIsOpen(false);
    };

    return {
        isOpen,
        setIsOpen,
        oldData,
        newData,
        openConfirmation,
        handleConfirm,
        handleCancel,
    };
}
