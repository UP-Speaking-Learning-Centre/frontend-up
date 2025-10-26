import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useUpdateContactedStatusMutation } from '@/features/admin/hooks/use-update-contacted-status';
import useGetProfileById from '@/features/home/queries/useGetProfileById';
import { CopyIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const DialogShowContacted = ({
    open,
    onOpenChange,
    id,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number;
}) => {
    const { mutateAsync: updateContactedStatus, isPending: isPendingUpdateContactedStatus } =
        useUpdateContactedStatusMutation();

    const { data } = useGetProfileById(id);
    const handleUpdateContactedStatus = () => {
        updateContactedStatus(id.toString(), {
            onSuccess: () => {
                toast.success('Student ditandai sebagai "Sudah dihubungi"', {
                    className: 'bg-green-200 text-green-800 border-green-300',
                    position: 'top-center',
                });
                setTimeout(() => {
                    onOpenChange(false);
                }, 1000);
            },
        });
    };

    const text = `Hello, Kak ${data?.name}\nThis is Admin from UP SLC.\n\nTerima kasih sudah tertarik belajar Bahasa Inggris dengan kami!\nKami mendapatkan informasi pendaftaran kelas kakak dari website, dengan detail:\n\nProgram: ${data?.program}\nKelas: ${data?.group}`;

    const handelCopyTemplate = async () => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Template berhasil disalin', {
                className: 'bg-green-200 text-green-800 border-green-300',
                position: 'top-center',
            });
        } catch (err) {
            console.error('Failed to copy text with newlines:', err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle className="sr-only"></DialogTitle>
                <div className="mt-2">
                    <div className="flex items-center gap-2">
                        <Label>Template WA</Label>
                        <CopyIcon
                            className="cursor-pointer size-4 text-primary"
                            onClick={handelCopyTemplate}
                        />
                    </div>
                    <div
                        className="mt-2 w-full p-2 bg-neutral-200 rounded-lg"
                        dangerouslySetInnerHTML={{
                            __html: text.replace(/\n/g, '<br />'),
                        }}
                    ></div>
                </div>

                <Button className="mt-2" onClick={handleUpdateContactedStatus}>
                    {isPendingUpdateContactedStatus ? 'Loading...' : "Tandai 'Sudah dihubungi'"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default DialogShowContacted;
