'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ButtonOutline } from '@/components/ui/button-outline';
import SectionTitle from '@/components/section-title';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { Fragment } from 'react';
import useFetchProgramsQuery from '@/features/select-program/queries/use-fetch-programs';

// const programs = [
//     {
//         id: 1,
//         name: 'School Program',
//         description:
//             'Dirancang khusus buat pelajar sekolah yang mau naik level English sekaligus lebih pede tampil di kelas maupun lomba.',
//         imageUrl: '/programs/school.svg',
//         href: ROUTES.programs,
//     },
//     {
//         id: 2,
//         name: 'Regular / Adults Program',
//         description:
//             'Cocok buat mahasiswa & dewasa yang pengen improve English untuk kerja, kuliah, atau sekadar biar makin lancar ngobrol sehari-hari.',
//         imageUrl: '/programs/adult.svg',
//         href: ROUTES.programs,
//     },
// ];

export default function ProgramsSection() {
    const { data: programs } = useFetchProgramsQuery();
    return (
        <div className="bg-gray-100 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionTitle
                        title="Our Programs"
                        subtitle="Jalan menuju masa depan impianmu"
                        description="UP! hadir untuk nemenin setiap langkah anak biar makin dekat ke masa depan yang mereka impikan, dengan percaya diri & skill Bahasa Inggris yang kuat."
                    />
                </div>
                <div className="mx-auto mt-16 max-w-2xl flex flex-col justify-center gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:flex-row">
                    {programs
                        ?.map(item => ({
                            ...item,
                            imageUrl:
                                item.id === 1 ? '/programs/school.svg' : '/programs/adult.svg',
                        }))
                        .map(program => (
                            <Fragment key={program.id}>
                                <div
                                    key={program.id}
                                    className="relative flex flex-col lg:flex-row justify-between overflow-hidden rounded-lg w-full lg:w-1/3"
                                >
                                    <div className="absolute top-60 left-10 w-2.5 h-10 bg-white border-2 border-primary"></div>
                                    <div className="absolute top-60 right-10 w-2.5 h-10 bg-white border-2 border-primary"></div>
                                    <div className="flex flex-1 gap-4 relative z-10 flex-col">
                                        <div className="relative h-64 border-2 border-primary overflow-hidden rounded-lg">
                                            <Image
                                                src={program.imageUrl || '/placeholder.svg'}
                                                alt={program.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col p-4 bg-white border-2 border-primary rounded-lg">
                                            <div className="flex flex-1 flex-col">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                                                        {program.name}
                                                    </h3>
                                                    <p className="text-sm leading-6 text-gray-600">
                                                        {program.description}
                                                    </p>
                                                </div>
                                                <div className="mt-6">
                                                    <Link href={ROUTES.programs}>
                                                        <ButtonOutline className="w-full">
                                                            Learn More
                                                        </ButtonOutline>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                </div>
                <div className="mt-12 text-center">
                    <Link href={ROUTES.programs}>
                        <Button className="bg-[#CE6439] hover:bg-[#CE6439]/90">
                            Explores More
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
