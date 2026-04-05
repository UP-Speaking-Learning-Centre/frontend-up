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

export function StudentEditConfirmationDialog({
    isOpen,
    setIsOpen,
    oldData,
    newData,
    onConfirm,
    onCancel,
    isLoading,
}: any) {
    if (!oldData || !newData) return null;

    const flattenObj = (obj: any, prefix = ''): Record<string, any> => {
        return Object.keys(obj || {}).reduce((acc: any, k: string) => {
            const pre = prefix.length ? prefix + '.' : '';
            if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k]))
                Object.assign(acc, flattenObj(obj[k], pre + k));
            else acc[pre + k] = obj[k];
            return acc;
        }, {});
    };

    const flatOld = flattenObj(oldData);
    const flatNew = flattenObj(newData);

    // Get keys that changed
    const keys = Object.keys(flatNew).filter(key => flatOld[key] !== flatNew[key]);

    const isDateString = (val: any) => typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val);
    const formatValue = (val: any) => {
        if (!val) return '-';
        if (isDateString(val)) {
            const parsed = val.endsWith('Z') || val.includes('+') ? moment(val) : moment.utc(val);
            return parsed.format('DD MMM YYYY, HH:mm');
        }
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
