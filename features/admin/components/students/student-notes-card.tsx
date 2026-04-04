import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface NoteItem {
    notes: string;
    role: string;
    name: string;
    timestamp: string;
}

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
    const sortedNotes = [...notesList].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const newest3 = sortedNotes.slice(0, 3);

    return (
        <>
        <Card className="overflow-hidden mb-6">
            <div className="bg-secondary text-white p-4">
                <h2 className="text-lg font-semibold">Catatan Siswa</h2>
            </div>
            <div className="p-6">
                <div className="grid items-start">
                    {sortedNotes.length > 0 ? (
                        <div className="space-y-4 mb-4">
                            {newest3.map((note, idx) => (
                                <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded text-sm space-y-1">
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                        <span className="font-semibold">{note.name} ({note.role})</span>
                                        <span>{new Date(note.timestamp).toLocaleString('id-ID')}</span>
                                    </div>
                                    <p className="text-gray-800">{note.notes}</p>
                                </div>
                            ))}
                            {sortedNotes.length > 3 && (
                                <Button variant="link" size="sm" className="px-0" onClick={() => setIsAllNotesOpen(true)}>
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
                        <DialogTitle>Semua Catatan Siswa</DialogTitle>
                        <DialogDescription>Daftar seluruh catatan yang ada pada siswa ini, diurutkan dari yang terbaru</DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
                        {sortedNotes.map((note, idx) => (
                            <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded text-sm space-y-2">
                                <div className="flex justify-between items-center text-xs text-gray-500 border-b pb-2 mb-2">
                                    <span className="font-semibold text-gray-700">{note.name} ({note.role})</span>
                                    <span>{new Date(note.timestamp).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span>
                                </div>
                                <p className="text-gray-800 whitespace-pre-wrap">{note.notes}</p>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        )}
        </>
    );
}
