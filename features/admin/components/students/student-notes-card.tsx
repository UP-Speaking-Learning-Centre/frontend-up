import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { NoteItem } from '@/features/auth/constants/interface';
import { NOTES_CREATED_BY } from '@/constants/student';
import moment from 'moment';

interface StudentNotesCardProps {
    notes?: string | null;
    notesList?: NoteItem[];
    setNotes: (notes: string) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    handleSave: () => void;
}

export default function StudentNotesCard({
    notes,
    notesList = [],
    setNotes,
    isEdit,
    setIsEdit,
    handleSave,
}: StudentNotesCardProps) {
    const [isAllNotesOpen, setIsAllNotesOpen] = useState(false);

    // sort newest first
    const sortedNotes = [...notesList].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const newest3 = sortedNotes.slice(0, 3);

    return (
        <>
            <Card className="overflow-hidden mb-6">
                <div className="bg-secondary text-white p-4">
                    <h2 className="text-lg font-semibold">Catatan</h2>
                </div>
                <div className="p-6">
                    <div className="grid items-start">
                        {sortedNotes.length > 0 ? (
                            <div className="space-y-4 mb-4">
                                {newest3.map((note, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3 bg-gray-50 border border-gray-100 rounded text-sm space-y-1"
                                    >
                                        <div className="flex items-start justify-between text-xs mb-4">
                                            {note.staffName === NOTES_CREATED_BY.superadmin.name &&
                                            note.createdBy === NOTES_CREATED_BY.superadmin.id ? (
                                                <p className="text-gray-500">{note.staffName}</p>
                                            ) : (
                                                <div>
                                                    <p className="text-xs font-medium">
                                                        {note.staffName}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        ({note.createdBy})
                                                    </p>
                                                </div>
                                            )}
                                            <p>
                                                {moment(note.createdAt).format(
                                                    'DD MMM YYYY, HH:mm'
                                                )}
                                            </p>
                                        </div>
                                        <p>{note.notes}</p>
                                    </div>
                                ))}
                                {sortedNotes.length > 3 && (
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="px-0"
                                        onClick={() => setIsAllNotesOpen(true)}
                                    >
                                        Lihat Semua Catatan ({sortedNotes.length})
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 mb-4 italic">Belum ada catatan.</p>
                        )}

                        {!isEdit ? (
                            <Button
                                onClick={() => setIsEdit(true)}
                                className="px-6 w-full mt-2"
                                size="sm"
                            >
                                Tambah Catatan Baru
                            </Button>
                        ) : (
                            <div className="mt-4 border-t pt-4">
                                <Textarea
                                    className="mb-4"
                                    placeholder="Tulis catatan baru di sini..."
                                    value={notes || ''}
                                    onChange={e => setNotes(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => setIsEdit(false)}
                                        className="px-6 flex-1"
                                        size="sm"
                                        variant={'outline'}
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave} className="px-6 flex-1" size="sm">
                                        Simpan Catatan
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {isAllNotesOpen && (
                <Dialog open={isAllNotesOpen} onOpenChange={setIsAllNotesOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Semua Catatan</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
                            {sortedNotes.map((note, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-gray-50 border border-gray-200 rounded text-sm space-y-2"
                                >
                                    <div className="flex justify-between items-center text-xs text-gray-500 border-b pb-2 mb-2">
                                        <span className="font-semibold text-gray-700">
                                            {note.staffName === NOTES_CREATED_BY.superadmin.name &&
                                            note.createdBy === NOTES_CREATED_BY.superadmin.id
                                                ? `${note.staffName}`
                                                : `${note.staffName} (${note.createdBy})`}
                                        </span>

                                        <span>
                                            {moment(note.createdAt).format('DD MMM YYYY, HH:mm')}
                                        </span>
                                    </div>
                                    <p className="whitespace-pre-wrap">{note.notes}</p>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
