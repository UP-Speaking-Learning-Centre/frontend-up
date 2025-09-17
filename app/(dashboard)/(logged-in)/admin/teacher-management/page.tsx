'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import { Calendar, Edit, Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const mentors = Array(4).fill({
        name: 'Ms. Feby',
        image: '/placeholder.svg',
        badge: 'Mama Bear',
        description: 'Experienced English teacher with 5+ years of teaching elementary students',
        location: 'UP Education Jakarta',
    });

    return (
        <DashboardContentLayout pageTitle="Teacher Management">
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-end mb-8">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Mentor
                        </Button>
                    </div>

                    {/* Mentor Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                            className="p-2 hover:bg-gray-100 rounded"
                                        >
                                            <Calendar className="w-4 h-4 text-gray-600" />
                                        </Button>
                                        <Button
                                            variant={'outline'}
                                            className="p-2 hover:bg-gray-100 rounded"
                                        >
                                            <Edit className="w-4 h-4 text-gray-600" />
                                        </Button>
                                        <Button
                                            variant={'outline'}
                                            className="p-2 hover:bg-gray-100 rounded"
                                        >
                                            <Trash2 className="w-4 h-4 text-gray-600" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Profile Image */}
                                <div className="px-4 pb-3">
                                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                                        <Image
                                            src={mentor.image || '/placeholder.svg'}
                                            alt={mentor.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Badge */}
                                <div className="px-4 pb-3">
                                    <Badge className="bg-primary hover:bg-primary/80 text-white px-3 py-1 rounded-full text-sm">
                                        {mentor.badge}
                                    </Badge>
                                </div>

                                {/* Description */}
                                <div className="px-4 pb-4">
                                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                        {mentor.description}
                                    </p>

                                    {/* Available Locations */}
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm mb-2">
                                            Available Locations:
                                        </p>
                                        <p className="text-gray-700 text-sm font-medium border rounded-full w-fit px-3">
                                            {mentor.location}
                                        </p>
                                    </div>
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
                                        Deskripsi
                                    </label>
                                    <Textarea className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px] resize-none" />
                                </div>

                                {/* Alias Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Alias
                                    </label>
                                    <Input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>

                                {/* Lokasi Mengajar Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Lokasi Mengajar
                                    </label>
                                    <RadioGroup className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="location1" />
                                            <label
                                                htmlFor="location1"
                                                className="text-sm text-gray-900"
                                            >
                                                Cabang Kuningan
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="location2" />
                                            <label
                                                htmlFor="location2"
                                                className="text-sm text-gray-900"
                                            >
                                                Cabang Kuningan
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="location3" />
                                            <label
                                                htmlFor="location3"
                                                className="text-sm text-gray-900"
                                            >
                                                Cabang Kuningan
                                            </label>
                                        </div>
                                    </RadioGroup>
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
