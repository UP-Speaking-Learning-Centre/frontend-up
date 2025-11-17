'use client';

import Overlay from '@/components/layout/overlay';
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
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadImage from '@/components/upload-image';
import { inter } from '@/constants/fonts';
import useCreateLocation from '@/features/admin/hooks/useCreateLocation';
import useDeleteLocation from '@/features/admin/queries/useDeleteLocation';
import useGetLocation from '@/features/admin/queries/useGetLocation';
import { useLocationManagementStore } from '@/features/admin/stores/location';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { AlertCircle, Edit, LucideArrowUpRightFromSquare, Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

const page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorModalDelete, setErrorModalDelete] = useState(false);
    const [errorDeleteMessage, setErrorDeleteMessage] = useState('');

    const { isLoading } = useGetLocation();
    const {
        handleSubmit,
        register,
        formState,
        value,
        handleUpload,
        setId,
        handleResetModal,
        isEdit,
        isLoadingSubmit,
    } = useCreateLocation(setIsModalOpen);
    const { mutateAsync } = useDeleteLocation();
    const { errors } = formState;

    const onDeleteLocation = (id: number) => {
        mutateAsync(id, {
            onError: () => {
                setErrorModalDelete(true);
            },
            onSuccess: () => {
                toast.success('Lokasi berhasil dihapus', {
                    position: 'top-center',
                    className: 'bg-green-200 border-green-300',
                });
            },
        });
    };

    const location = useLocationManagementStore(s => s.location);

    if (isLoading) return <Overlay />;

    return (
        <DashboardContentLayout pageTitle="Location Management">
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-end mb-8">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Lokasi/Cabang
                        </Button>
                    </div>

                    {/* Location Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {location.length ? (
                            location.map(location => (
                                <Card
                                    key={location.id}
                                    className="bg-white p-4 rounded-lg flex-col gap-4 flex shadow-sm border border-gray-200 overflow-hidden"
                                >
                                    {/* Card Header */}
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">
                                            {location.name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                onClick={() => {
                                                    setId(location.id);
                                                    setIsModalOpen(true);
                                                }}
                                                variant={'outline'}
                                                className="p-2 size-10 rounded"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        className="p-2 size-10 rounded"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className={inter.className}>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Anda akan menghapus lokasi{' '}
                                                            <span className="text-primary">
                                                                {location.name}
                                                            </span>
                                                            .
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Data yang dihapus tidak dapat
                                                            dikembalikan.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                onDeleteLocation(location.id)
                                                            }
                                                        >
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>

                                    {/* Profile Image */}

                                    <div className="relative w-full aspect-[320/240] bg-neutral-100 border border-neutral-200 rounded-lg overflow-hidden">
                                        <ImageWithFallback
                                            src={location.img as string}
                                            fallbackSrc="/location.svg"
                                            alt={location.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="flex flex-col gap-4 flex-1">
                                        {/* Available Locations */}
                                        <div className="mb-3 flex-1">
                                            <p className="font-semibold text-gray-900 text-sm">
                                                Alamat:
                                            </p>
                                            <p className="text-gray-700 text-sm">
                                                {location.address || '-'}
                                            </p>
                                        </div>
                                        {location.googleMapsLink && (
                                            <Link
                                                target="_blank"
                                                href={location.googleMapsLink || '#'}
                                                className={clsx(
                                                    'flex text-sm items-center space-x-2 text-[#2563EB]'
                                                )}
                                            >
                                                <LucideArrowUpRightFromSquare width={16} />
                                                <p>Buka di Google Maps</p>
                                            </Link>
                                        )}
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center col-span-3 text-primary">
                                No location found ...
                            </p>
                        )}
                    </div>
                </div>

                {/* Alert */}
                <Dialog open={errorModalDelete} onOpenChange={setErrorModalDelete}>
                    <DialogContent hideCloseButton>
                        <DialogTitle className="text-lg sr-only">Lokasi gagal dihapus</DialogTitle>
                        <DialogDescription asChild className="text-base text-center mt-3">
                            <div className="flex items-center flex-col justify-center gap-2">
                                <AlertCircle className="size-12 text-red-500" />
                                Terjadi kesalahan saat menghapus lokasi. Terdapat teacher yang
                                terhubung dengan lokasi ini.
                            </div>
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 pb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {isEdit ? 'Edit' : 'Tambah'} Lokasi
                                </h2>
                                <button
                                    onClick={handleResetModal}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">
                                {/* Nama Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Nama Cabang
                                    </label>
                                    <Input
                                        type="text"
                                        className={cn(
                                            'w-full border border-gray-300 rounded-md px-3 py-2',
                                            errors.name && 'border-red-500'
                                        )}
                                        {...register('name')}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.name.message?.toString()}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Alamat
                                    </label>
                                    <Textarea
                                        className={cn(
                                            'w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px] resize-none',
                                            errors.address && 'border-red-500'
                                        )}
                                        {...register('address')}
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.address.message?.toString()}
                                        </p>
                                    )}
                                </div>

                                {/* Foto Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Foto
                                    </label>
                                    <UploadImage
                                        handleUpload={handleUpload}
                                        value={value.imgLink}
                                        label="Upload Foto"
                                        width={374}
                                        height={280}
                                    />
                                    {errors.img && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.img.message?.toString()}
                                        </p>
                                    )}
                                </div>

                                {/* Deskripsi Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Link Google Maps
                                    </label>
                                    <Input
                                        type="text"
                                        className={cn(
                                            'w-full border border-gray-300 rounded-md px-3 py-2',
                                            errors.googleMapsLink && 'border-red-500'
                                        )}
                                        {...register('googleMapsLink')}
                                    />
                                    {errors.googleMapsLink && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.googleMapsLink.message?.toString()}
                                        </p>
                                    )}
                                </div>

                                {/* Edit Button */}
                                <div className="flex justify-end pt-4">
                                    <Button
                                        className="text-white px-8 py-2 rounded-lg"
                                        disabled={isLoadingSubmit}
                                    >
                                        {isLoadingSubmit ? 'Loading...' : isEdit ? 'Edit' : 'Add'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardContentLayout>
    );
};

export default page;
