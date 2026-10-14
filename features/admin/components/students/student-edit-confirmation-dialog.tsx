import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Overlay from '@/components/layout/overlay';
import moment from 'moment';

interface StudentEditConfirmationDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    oldData: Record<string, unknown> | null;
    newData: Record<string, unknown> | null;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading: boolean;
}

export function StudentEditConfirmationDialog({
    isOpen,
    setIsOpen,
    oldData,
    newData,
    onConfirm,
    onCancel,
    isLoading,
}: StudentEditConfirmationDialogProps) {
    if (!oldData || !newData) return null;

    const flattenObj = (obj: Record<string, unknown>, prefix = ''): Record<string, unknown> => {
        return Object.keys(obj || {}).reduce((acc: Record<string, unknown>, k: string) => {
            const pre = prefix.length ? prefix + '.' : '';
            const value = obj[k];
            if (typeof value === 'object' && value !== null && !Array.isArray(value))
                Object.assign(acc, flattenObj(value as Record<string, unknown>, pre + k));
            else acc[pre + k] = value;
            return acc;
        }, {});
    };

    const flatOld = flattenObj(oldData);
    const flatNew = flattenObj(newData);

    // Get keys that changed
    const keys = Object.keys(flatNew).filter(key => flatOld[key] !== flatNew[key]);

    const isDateString = (val: unknown) => typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val);
    const formatValue = (val: unknown) => {
        if (val === null || val === undefined || val === '') return '-';
        if (typeof val === 'boolean') return val ? 'Ya' : 'Tidak';
        if (isDateString(val)) {
            const strVal = val as string;
            const parsed = strVal.endsWith('Z') || strVal.includes('+') ? moment(strVal) : moment.utc(strVal);
            return parsed.format('DD MMM YYYY, HH:mm');
        }
        if (Array.isArray(val)) return val.join(', ');
        return String(val);
    };

    return (
        <>
            {isLoading && <Overlay opacity={60} show />}

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Perubahan</DialogTitle>
                        <DialogDescription>
                            Berikut adalah perubahan yang akan disimpan:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4 max-h-[60vh] overflow-y-auto border rounded-md">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Field Name
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Old Value
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        New Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {keys.map(key => {
                                    const oldVal = flatOld[key];
                                    const newVal = flatNew[key];
                                    if (oldVal === newVal) return null;

                                    const fieldName = key.split('.').pop() || key;

                                    return (
                                        <tr key={key}>
                                            <td className="px-4 py-2 font-medium capitalize text-gray-900">
                                                {fieldName.replace(/([A-Z])/g, ' $1').trim()}
                                            </td>
                                            <td className="px-4 py-2 text-red-600 line-through">
                                                {formatValue(oldVal)}
                                            </td>
                                            <td className="px-4 py-2 text-green-600 font-semibold">
                                                {formatValue(newVal)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
                            Batal
                        </Button>
                        {!!keys.length && (
                            <Button onClick={onConfirm} className="bg-primary" disabled={isLoading}>
                                Simpan Perubahan
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
