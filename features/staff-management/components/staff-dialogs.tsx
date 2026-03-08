'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { StaffForm } from './staff-form';
import { useStaffForm, StaffFormValues } from '../hooks/use-staff-form';
import { StaffMember } from '../types';
import { useStaffStore } from '../stores/staff-store';
import { ReactNode, useState } from 'react';

export const AddStaffDialog = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const { form, onSubmit } = useStaffForm({
        onSuccess: () => setOpen(false),
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tambah Staff Baru</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <StaffForm form={form} onSubmit={onSubmit} onCancel={() => setOpen(false)} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export const EditStaffDialog = ({ staff, children }: { staff: StaffMember; children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    
    const { form, onSubmit } = useStaffForm({
        defaultValues: { name: staff.name, phone: staff.phone, role: staff.role },
        staffId: staff.id,
        onSuccess: () => setOpen(false),
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Staff</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <StaffForm form={form} onSubmit={onSubmit} isEditing onCancel={() => setOpen(false)} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export const ViewStaffDialog = ({ staff, children }: { staff: StaffMember; children: ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Detail Staff</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="grid grid-cols-3 gap-2 border-b pb-2">
                        <span className="text-gray-500 text-sm">Nama</span>
                        <span className="col-span-2 font-medium">{staff.name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 border-b pb-2">
                        <span className="text-gray-500 text-sm">Phone</span>
                        <span className="col-span-2 font-medium">{staff.phone}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 border-b pb-2">
                        <span className="text-gray-500 text-sm">Jabatan</span>
                        <span className="col-span-2 font-medium">{staff.role}</span>
                    </div>
                    
                    {/* Placeholder for future extended details requested by user */}
                    <div className="pt-2">
                        <span className="text-xs text-muted-foreground italic">
                            Additional staff details will populate here...
                        </span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export const DeleteStaffDialog = ({ staffId, staffName, children }: { staffId: string; staffName: string; children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const deleteStaff = useStaffStore(s => s.deleteStaff);

    const onConfirm = () => {
        // Future API Integration Point
        console.log('--- API DELETE STAFF ---');
        console.log('ENDPOINT PARAMS:', { id: staffId });

        deleteStaff(staffId);
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Staff?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus staff <strong>{staffName}</strong>? Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className="bg-destructive hover:bg-destructive/90 text-white">
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
