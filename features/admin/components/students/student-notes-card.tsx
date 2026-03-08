import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface StudentNotesCardProps {
    notes: string;
    setNotes: (notes: string) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    handleSave: () => void;
}

export default function StudentNotesCard({
    notes,
    setNotes,
    isEdit,
    setIsEdit,
    handleSave,
}: StudentNotesCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="bg-secondary text-white p-4">
                <h2 className="text-lg font-semibold">Catatan Siswa</h2>
            </div>
            <div className="p-6">
                <div className="grid items-start">
                    {!isEdit ? (
                        <>
                            <p className="text-gray-900 font-medium mb-4">{notes}</p>
                            <Button
                                onClick={() => setIsEdit(true)}
                                className="px-6 w-fit ml-auto"
                                size="sm"
                            >
                                {notes ? 'Edit Catatan' : 'Tambah Catatan'}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Textarea
                                className="mb-4"
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                            />
                            <div className="space-x-3 ml-auto">
                                <Button
                                    onClick={() => setIsEdit(false)}
                                    className="px-6 w-fit"
                                    size="sm"
                                    variant={'outline'}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} className="px-6 w-fit" size="sm">
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
}
