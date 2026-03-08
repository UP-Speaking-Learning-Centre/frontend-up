import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { BookOpen, Users, Clock, CreditCard } from 'lucide-react';
import Link from 'next/link';

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

export default function ApplicationProcessSection() {
    return (
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
    );
}
