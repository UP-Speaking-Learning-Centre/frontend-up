import { Sparkles, Zap, Users2, HeartHandshake, GraduationCap, Brain, Video, Home, CalendarCheck, UsersRound, Clapperboard, Lightbulb, BookOpenText, CalendarClock } from 'lucide-react';
import SectionTitle from '@/components/section-title';

const features = [
    {
        name: 'Fun Learning',
        description:
            'Belajar dengan metode interaktif & seru, bikin anak betah dan gak merasa tertekan.',
        icon: Sparkles,
    },
    {
        name: 'Confidence First',
        description:
            'Kami bukan hanya ngajarin bahasa, tapi juga latihan percaya diri biar anak pede ngomong English di dunia nyata.',
        icon: Zap,
    },
    {
        name: 'Small Group Class',
        description: 'Kelas kecil (5–8 siswa) bikin tutor lebih fokus dan anak lebih mudah aktif.',
        icon: Users2,
    },
    {
        name: 'Supportive Community',
        description:
            'Lingkungan positif dan komunitas yang saling mendukung, bikin anak semangat berkembang setiap hari.',
        icon: HeartHandshake,
    },
    {
        name: 'Cambridge Curriculum',
        description:
            'Materi belajar pakai kurikulum Cambridge sejak 2023, standar internasional yang terbukti efektif.',
        icon: GraduationCap,
    },
    {
        name: 'CEFR Leveling',
        description:
            'Level pembelajaran dari Pre-A1 sampai C1 (advanced) biar sesuai dengan standar dunia.',
        icon: BookOpenText,
    },
    {
        name: 'HOTS Method',
        description:
            'Higher Order Thinking Skills jadi standar, bikin siswa gak cuma hafal teori, tapi bisa mikir kritis & aplikatif.',
        icon: Lightbulb,
    },
    {
        name: 'Shooting Examination',
        description:
            'Ujian unik berbasis shooting video — boost confidence siswa & bukti nyata kemampuan speaking mereka.',
        icon: Clapperboard,
    },
    {
        name: 'Modern Class',
        description:
            'Fasilitas kelas kekinian: Smart TV 43", Air Conditioner, Brainstorming Board.',
        icon: Home,
    },
    {
        name: 'UP+ Program',
        description:
            'Kelas tambahan buat diskusi, latihan, atau persiapan khusus sesuai kebutuhan siswa.',
        icon: CalendarCheck,
    },
    {
        name: 'Changed Class',
        description:
            'Sistem fleksibel: siswa bisa reschedule kalau ada halangan, jadi tetap konsisten belajar.',
        icon: CalendarClock,
    },
    {
        name: 'UP Club',
        description:
            'Komunitas seru: mulai dari UPWatchClub, ReadingUpClub, MakeUpClub, CookingUpClub, SocioUp, dll. Bikin belajar jadi lebih hidup & menyenangkan.',
        icon: UsersRound
    },
];

export default function WhyUsSection() {
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

                <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
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
                </div>
            </div>
        </div>
    );
}
