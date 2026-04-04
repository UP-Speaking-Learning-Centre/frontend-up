import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function StudentEditConfirmationDialog({
    isOpen,
    setIsOpen,
    oldData,
    newData,
    onConfirm,
    onCancel
}: any) {
    if (!oldData || !newData) return null;

    // render differences simply by dumping the keys that mismatch
    const keys = Object.keys(newData);

    return (
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
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Field Name</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Old Value</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">New Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {keys.map((key) => {
                                const oldVal = (oldData as any)[key];
                                const newVal = (newData as any)[key];
                                if (oldVal === newVal) return null;
                                return (
                                    <tr key={key}>
                                        <td className="px-4 py-2 font-medium capitalize text-gray-900">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </td>
                                        <td className="px-4 py-2 text-red-600 line-through">
                                            {String(oldVal || '-')}
                                        </td>
                                        <td className="px-4 py-2 text-green-600 font-semibold">
                                            {String(newVal || '-')}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onCancel}>
                        Batal
                    </Button>
                    <Button onClick={onConfirm} className="bg-primary">
                        Simpan Perubahan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
