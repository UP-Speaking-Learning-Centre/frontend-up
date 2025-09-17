'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import {
    Calendar,
    Edit,
    Plus,
    Trash2,
    X,
    Link as LinkLucide,
    Link2,
    LucideArrowUpRightFromSquare,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const mentors = Array(3).fill({
        name: 'Cabang Kuningan',
        image: '/placeholder.svg',
        address: 'Jln. wqeqwe',
    });

    return (
        <DashboardContentLayout pageTitle="Location Management">
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-end mb-8">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Location
                        </Button>
                    </div>

                    {/* Mentor Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mentors.map((mentor, index) => (
                            <Card
                                key={index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between p-4 pb-2">
                                    <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant={'outline'}
                                            className="p-3 hover:bg-gray-100 rounded"
                                        >
                                            <Edit className="w-4 h-4 text-gray-600" />
                                        </Button>
                                        <Button
                                            variant={'outline'}
                                            className="p-3 hover:bg-gray-100 rounded"
                                        >
                                            <Trash2 className="w-4 h-4 text-gray-600" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Profile Image */}
                                <div className="px-4 pb-3">
                                    <div className="relative w-full aspect-[19/10] rounded-lg overflow-hidden">
                                        <Image
                                            src={mentor.image || '/placeholder.svg'}
                                            alt={mentor.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="px-4 pb-4">
                                    {/* Available Locations */}
                                    <div className="mb-3">
                                        <p className="font-semibold text-gray-900 text-sm">
                                            Address:
                                        </p>
                                        <p className="text-gray-700 text-sm">{mentor.address}</p>
                                    </div>
                                    <Link
                                        href={'#'}
                                        className="flex text-sm items-center space-x-2 text-[#2563EB]"
                                    >
                                        <LucideArrowUpRightFromSquare width={16} />
                                        <p>View on Google Maps</p>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 pb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {isEdit && 'Edit '}Detail Ms. Feby
                                </h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="px-6 pb-6 space-y-6">
                                {/* Nama Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Nama
                                    </label>
                                    <Input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Alamat
                                    </label>
                                    <Textarea className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px] resize-none" />
                                </div>

                                {/* Foto Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Foto
                                    </label>
                                    <Input
                                        type="file"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>

                                {/* Deskripsi Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Link Google Maps
                                    </label>
                                    <Input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>

                                {/* Edit Button */}
                                <div className="flex justify-end pt-4">
                                    <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-lg">
                                        {isEdit ? 'Edit' : 'Add'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardContentLayout>
    );
};

export default page;
