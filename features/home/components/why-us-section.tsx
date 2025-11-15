'use client';

import {
    Sparkles,
    Zap,
    Users2,
    HeartHandshake,
    GraduationCap,
    Brain,
    Video,
    Home,
    CalendarCheck,
    UsersRound,
    Clapperboard,
    Lightbulb,
    BookOpenText,
    CalendarClock,
} from 'lucide-react';
import SectionTitle from '@/components/section-title';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import WhyUsComponent from './why-us-component';

export type Feature = {
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
};

const features = [
    {
        name: 'Fun Learning',
        description:
            'Belajar dengan metode <span class="text-primary">interaktif & seru</span>, bikin anak betah dan gak merasa tertekan.',
        icon: Sparkles,
    },
    // {
    //     name: 'Confidence First',
    //     description:
    //         'Kami bukan hanya ngajarin bahasa, tapi juga latihan percaya diri biar anak pede ngomong English di dunia nyata.',
    //     icon: Zap,
    // },
    // {
    //     name: 'Small Group Class',
    //     description: 'Kelas kecil (5–8 siswa) bikin tutor lebih fokus dan anak lebih mudah aktif.',
    //     icon: Users2,
    // },
    // {
    //     name: 'Supportive Community',
    //     description:
    //         'Lingkungan positif dan komunitas yang saling mendukung, bikin anak semangat berkembang setiap hari.',
    //     icon: HeartHandshake,
    // },
    {
        name: 'Cambridge Curriculum',
        description:
            'Materi belajar pakai <span class="text-primary">kurikulum Cambridge sejak 2023</span>, standar internasional yang terbukti efektif.',
        icon: GraduationCap,
    },
    {
        name: 'CEFR Leveling',
        description:
            'Level pembelajaran dari <span class="text-primary">Pre-A1 sampai C1 (advanced)</span> biar sesuai dengan standar dunia.',
        icon: BookOpenText,
    },
    {
        name: 'HOTS Method',
        description:
            'Higher Order Thinking Skills jadi standar, bikin siswa gak cuma hafal teori, tapi bisa <span class="text-primary">mikir kritis & aplikatif</span>.',
        icon: Lightbulb,
    },
    {
        name: 'Shooting Examination',
        description:
            '<span class="text-primary">Ujian unik berbasis shooting video</span> — boost confidence siswa & bukti nyata kemampuan speaking mereka.',
        icon: Clapperboard,
    },
    // {
    //     name: 'Modern Class',
    //     description:
    //         'Fasilitas kelas kekinian: Smart TV 43", Air Conditioner, Brainstorming Board.',
    //     icon: Home,
    // },
    // {
    //     name: 'UP+ Program',
    //     description:
    //         'Kelas tambahan buat diskusi, latihan, atau persiapan khusus sesuai kebutuhan siswa.',
    //     icon: CalendarCheck,
    // },
    // {
    //     name: 'Changed Class',
    //     description:
    //         'Sistem fleksibel: siswa bisa reschedule kalau ada halangan, jadi tetap konsisten belajar.',
    //     icon: CalendarClock,
    // },
    {
        name: 'UP Club',
        description:
            'Komunitas seru: mulai dari <span class="text-primary">UPWatchClub, ReadingUpClub, MakeUpClub, CookingUpClub, SocioUp, dll.</span> Bikin belajar jadi lebih hidup & menyenangkan.',
        icon: UsersRound,
    },
];

export default function WhyUsSection() {
    const [activeFeature, setActiveFeature] = useState('Cambridge Curriculum');

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveFeature(features[Math.floor(Math.random() * features.length)].name);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="py-24 sm:py-32 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <SectionTitle
                        title="Why Choose UP"
                        subtitle="Karena setiap langkah butuh kepercayaan diri"
                        description="Di dunia yang terus bergerak, kami percaya bahwa rasa percaya diri adalah bekal penting. UP! hadir jadi teman perjalanan anak menghadapi tantangan dengan tenang dan yakin."
                    />
                </div>

                <div className="flex flex-col gap-4 max-w-4xl justify-center mx-auto mt-24">
                    <WhyUsComponent
                        features={[features[0], features[1]]}
                        maxWidthOpen="7"
                        initialActiveFeature={0}
                    />
                    <WhyUsComponent
                        features={[features[2], features[3]]}
                        maxWidthOpen="8"
                        initialActiveFeature={1}
                    />
                    <WhyUsComponent
                        features={[features[4], features[5]]}
                        maxWidthOpen="7"
                        initialActiveFeature={0}
                    />
                </div>
                {/* <div className="mx-auto max-lg:hidden mt-24 space-y-10">
                    <div className="max-lg:hidden mx-auto grid grid-cols-3 gap-4 max-w-4xl">
                        {features.slice(0, 3).map((feature, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setActiveFeature(feature.name);
                                }}
                                className={cn(
                                    'relative col-span-1 flex items-center gap-4 cursor-pointer rounded-md border border-gray-200 p-4',
                                    activeFeature === feature.name &&
                                        'bg-primary translate-y-[-10px]',
                                    'hover:translate-y-[-10px] transition-all ease-in-out duration-500'
                                )}
                            >
                                <div
                                    className={cn(
                                        'flex shrink-0 h-10 w-10 items-center justify-center rounded-lg bg-[#254116]',
                                        activeFeature === feature.name && 'bg-white'
                                    )}
                                >
                                    <feature.icon
                                        className={cn(
                                            'h-6 w-6 text-white',
                                            activeFeature === feature.name && 'text-[#254116]'
                                        )}
                                        aria-hidden="true"
                                    />
                                </div>
                                <dt
                                    className={cn(
                                        'text-base flex font-semibold leading-7 text-gray-900',
                                        activeFeature === feature.name && 'text-white'
                                    )}
                                >
                                    {feature.name}
                                </dt>
                            </div>
                        ))}
                    </div>

                    <div
                        className={cn(
                            'max-w-4xl border-[#254116] border-2 rounded-md mx-auto p-6 flex flex-col items-center justify-center text-center font-semibold'
                        )}
                    >
                        <div className="text-2xl">
                            {features.find(feature => feature.name === activeFeature)?.description}
                        </div>
                    </div>

                    <div className="max-lg:hidden mx-auto grid grid-cols-3 gap-4 max-w-4xl">
                        {features.slice(3, 6).map((feature, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setActiveFeature(feature.name);
                                }}
                                className={cn(
                                    'relative col-span-1 flex items-center gap-4 cursor-pointer rounded-md border border-gray-200 p-4',
                                    activeFeature === feature.name &&
                                        'bg-primary translate-y-[-10px]',
                                    'hover:translate-y-[-10px] transition-all ease-in-out duration-500'
                                )}
                            >
                                <div
                                    className={cn(
                                        'flex shrink-0 h-10 w-10 items-center justify-center rounded-lg ',
                                        activeFeature === feature.name ? 'bg-white' : 'bg-[#254116]'
                                    )}
                                >
                                    <feature.icon
                                        className={cn(
                                            'h-6 w-6 ',
                                            activeFeature === feature.name
                                                ? 'text-[#254116]'
                                                : 'text-white'
                                        )}
                                        aria-hidden="true"
                                    />
                                </div>
                                <dt
                                    className={cn(
                                        'text-base flex font-semibold leading-7 text-gray-900',
                                        activeFeature === feature.name && 'text-white'
                                    )}
                                >
                                    {feature.name}
                                </dt>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mx-auto mt-16 sm:mt-20 lg:hidden">
                    <dl className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                        {features.map((feature, index) => (
                            <div key={index} className="relative flex items-start gap-4">
                                <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-lg bg-[#254116]">
                                    <feature.icon
                                        className="h-6 w-6 text-white"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div>
                                    <dt className="text-base flex font-semibold leading-7 text-gray-900">
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">
                                        {feature.description}
                                    </dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </div> */}

                <div className="mt-16 flex justify-center">
                    <Link href={ROUTES.about}>
                        <Button variant="default">More 'Why Us'</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
