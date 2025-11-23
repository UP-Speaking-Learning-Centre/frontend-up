'use client';

import { Button } from '@/components/ui/button';
import { ButtonOutline } from '@/components/ui/button-outline';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import useFetchGroupsQuery from '@/features/select-program/queries/use-fetch-groups';
import { GroupType } from '@/types/programs-selection';
import { BadgeCheck, BookOpen, Users, Clock, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const programs = [
    {
        id: 'school-program',
        name: 'School Program',
        longDescription:
            'Dirancang khusus untuk anak usia TK hingga SMA dan diselenggarakan secara offline sepenuhnya. Program ini menggunakan kurikulum dari Cambridge University Press, dengan sistem leveling CEFR (Pre-A1 hingga C1). Menggunakan metode 90 Minutes of Happiness, setiap kelas dikemas seru dan aplikatif untuk membangun kepercayaan diri siswa.',
        imageUrl: '/school.jpg',
        duration: '48 Meetings (6 months)',
        format: '90 Minutes/Session , Offline',
    },
    {
        id: 'regular-program',
        name: 'Regular Program',
        longDescription:
            'Diarahkan untuk remaja dan dewasa yang ingin belajar bahasa Inggris secara efektif dan terstruktur. Dengan metode 90 Minutes of Happiness, program ini membantu siswa meningkatkan fluency dan rasa percaya diri berbicara dalam konteks akademik maupun profesional.',
        imageUrl: '/regluar.jpeg',
        duration: '16 weeks',
        format: '90 Minutes/Session , Offline',
    },
];

const steps = [
    {
        id: 1,
        name: 'Isi Formulir Pendaftaran',
        description:
            'Lengkapi data diri singkat lewat form online atau langsung daftar di lokasi cabang terdekat.',
        icon: BookOpen,
    },
    {
        id: 2,
        name: 'Konsultasi & Placement Test',
        description:
            'Kalian bisa melakukan placement test secara online pada kolom placement test dibawah, untuk mengetahui level kalian',
        icon: Users,
    },
    {
        id: 3,
        name: 'Pilih Program yang Tepat',
        description:
            'Bersama admin, pilih program (School / Regular) sesuai level, jadwal, dan tujuan belajar.',
        icon: Clock,
    },
    {
        id: 4,
        name: 'Start your first step',
        description:
            'Setelah pembayaran dan konfirmasi jadwal, siswa siap memulai kelas pertama dengan semangat baru! 🎉',
        icon: CreditCard,
    },
];

export default function ProgramsPage() {
    const {
        isLoading: isLoadingGroupsSchool,
        data: groupsSchool,
        refetch: refetchGroupsSchool,
    } = useFetchGroupsQuery('1');

    const {
        isLoading: isLoadingGroupsRegular,
        data: groupsRegular,
        refetch: refetchGroupsRegular,
    } = useFetchGroupsQuery('2');

    useEffect(() => {
        refetchGroupsSchool();
        refetchGroupsRegular();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-secondary py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-5xl lg:mx-0">
                        <h1 className="text-4xl font-rubik uppercase font-semibold tracking-wide text-white sm:text-5xl">
                            Our Programs
                        </h1>
                        <p className="mt-6 text-lg leading-8 w-2/3 text-gray-300">
                            Choose your path, grow your confidence. Dari anak SD sampai dewasa,
                            program UP! bantu upgrade English & percaya diri—step by step, fun, and
                            effective.
                        </p>
                    </div>
                </div>
            </div>

            {/* Programs List */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary">
                            Explore Programs
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Find the Right Path for Your Future
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Our carefully designed programs combine theoretical knowledge with
                            practical skills to prepare you for success in your chosen field.
                        </p>
                    </div>

                    <div className="mt-16 space-y-20">
                        {programs.map((program, idx) => (
                            <div
                                key={program.id}
                                id={program.id}
                                className={`flex flex-col overflow-hidden items-center rounded-lg ${
                                    idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                                } shadow-[0px_4px_20px_0px_rgba(0,_0,_0,_0.2)]`}
                            >
                                <div className="p-4 md:p-6 w-full lg:w-1/2">
                                    <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,_0,_0,_0.2)]">
                                        <Image
                                            src={program.imageUrl || '/placeholder.svg'}
                                            alt={program.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col justify-between bg-white p-6 sm:p-10">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                            {program.name}
                                        </h3>
                                        <p className="mt-4 text-lg text-gray-500">
                                            {program.longDescription}
                                        </p>

                                        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                            <div className="flex items-center gap-x-3">
                                                <Clock className="h-5 w-5 text-primary" />
                                                <span className="text-sm font-medium text-gray-900">
                                                    {program.duration}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <Users className="h-5 w-5 text-primary" />
                                                <span className="text-sm font-medium text-gray-900">
                                                    {program.format}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-8 text-sm">Tersedia untuk:</div>
                                        {isLoadingGroupsSchool || isLoadingGroupsRegular ? (
                                            <Skeleton className="h-4 w-24" />
                                        ) : (
                                            groupsSchool &&
                                            groupsRegular && (
                                                <ul className="mt-2 space-y-2">
                                                    {[
                                                        ...(program.id === 'school-program'
                                                            ? (groupsSchool as GroupType[])
                                                            : (groupsRegular as GroupType[])),
                                                    ]?.map((group, groupIdx) => (
                                                        <li
                                                            key={groupIdx}
                                                            className="flex items-start"
                                                        >
                                                            <BadgeCheck className="h-5 w-5 flex-shrink-0 text-primary" />
                                                            <span className="ml-2 text-sm text-gray-500">
                                                                {group.name}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                        )}
                                    </div>
                                    <div className="mt-10">
                                        <Link href={ROUTES.chooseProgram}>
                                            <Button variant="default" className="w-full">
                                                Apply Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Application Process */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary">
                            How to Apply
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Simple Application Process
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Daftar di UP SLC gampang banget! Ikuti langkah-langkah berikut dan
                            mulailah perjalanan baru menuju bahasa Ingggris yang lebih percaya
                            diri.”
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-5xl">
                        <ol className="relative border-l ml-4 border-gray-200 dark:border-gray-700">
                            {steps.map(step => (
                                <li key={step.id} className="mb-10 ml-8">
                                    <span className="absolute flex items-center justify-center w-10 h-10 bg-primary rounded-full -left-5 ring-4 ring-white">
                                        <step.icon className="w-5 h-5 text-white" />
                                    </span>
                                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                        {step.name}
                                    </h3>
                                    <p className="mb-4 text-base font-normal text-gray-500">
                                        {step.description}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="mt-16 flex items-center justify-center">
                        <div className="rounded-lg bg-primary p-8 shadow-lg ring-1 ring-gray-200 lg:p-12">
                            <h3 className="text-2xl font-bold text-white">
                                Ready to Start Your Journey?
                            </h3>
                            <p className="mt-2 text-white">
                                Jangan tunggu nanti. Mulai langkah kecil hari ini untuk masa depan
                                yang lebih percaya diri. UP your words, UP your world!
                            </p>
                            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <Link href={ROUTES.chooseProgram}>
                                    <Button variant="outline">Apply Now</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
