import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

const values = [
    {
        name: 'Cambridge Curriculum',
        description:
            'Sejak 2023 kami pakai kurikulum Cambridge, lengkap dengan aplikasi, presentasi, dan materi global standar internasional.',
    },
    {
        name: 'CEFR Leveling',
        description:
            'Level pembelajaran dari Pre-A1 sampai C1 (advanced) biar sesuai dengan standar dunia.',
    },
    {
        name: 'HOTS Method',
        description:
            'Higher Order Thinking Skills jadi standar, bikin siswa gak cuma hafal teori, tapi bisa mikir kritis & aplikatif.',
    },
    {
        name: 'Shooting Examination',
        description:
            'Ujian unik berbasis shooting video — boost confidence siswa & bukti nyata kemampuan speaking mereka.',
    },
    {
        name: 'Modern Class',
        description:
            'Fasilitas kelas kekinian: Smart TV 43", Air Conditioner, Brainstorming Board.',
    },
    {
        name: 'UP+ Program',
        description:
            'Kelas tambahan buat diskusi, latihan, atau persiapan khusus sesuai kebutuhan siswa.',
    },
    {
        name: 'Changed Class',
        description:
            'Sistem fleksibel: siswa bisa reschedule kalau ada halangan, jadi tetap konsisten belajar.',
    },
    {
        name: 'UP Club',
        description:
            'Komunitas seru: mulai dari UPWatchClub, ReadingUpClub, MakeUpClub, CookingUpClub, SocioUp, dll. Bikin belajar jadi lebih hidup & menyenangkan.',
    },
];

export default function OurStorySection() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <div className="lg:pr-8 lg:pt-4 lg:col-span-3">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-primary">
                                Our Story
                            </h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                A Legacy of Excellence
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                UP Speaking Learning Centre (UP SLC) lahir di 2021 di Kabupaten
                                Kuningan, Indonesia. Dalam waktu singkat, kami tumbuh jadi
                                komunitas lebih dari{' '}
                                <span className="font-bold text-primary">500 siswa aktif</span>{' '}
                                dengan <span className="font-bold text-primary">3 cabang</span>{' '}
                                dan{' '}
                                <span className="font-bold text-primary">
                                    26 tim pengajar & staff yang berdedikasi
                                </span>
                                .
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                UP SLC bukan cuma kursus bahasa, tapi sebuah movement. Misi kami
                                sederhana: connect and communicate. Kami percaya setiap orang
                                punya suara & cerita yang layak dibagikan ke dunia — dan tugas
                                kami adalah memberi tools, support, dan environment untuk unlock
                                potensi itu. Up your words, up your world!
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {values.map(value => (
                                    <div key={value.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <CheckCircle className="absolute left-1 top-1 h-5 w-5 text-primary" />
                                            {value.name}
                                        </dt>{' '}
                                        <dd className="inline">{value.description}</dd>
                                    </div>
                                ))}
                            </dl>
                            <p className="mt-6 text-lg leading-8 text-gray-600 italic">
                                “At UP SLC, everyone belongs. No matter your background, we grow
                                together with confidence, with English, with heart.”
                            </p>
                        </div>
                    </div>
                    <div className="relative lg:col-span-2 space-y-4">
                        <div className="relative rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-400/10 w-full sm:mx-auto sm:w-8/12 lg:w-full aspect-[928/632]">
                            <Image
                                src="/bg-image/about-2.jpeg"
                                alt="About UP Education"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-400/10 w-full sm:mx-auto sm:w-8/12 lg:w-full aspect-[928/632]">
                            <Image
                                src="/bg-image/about-3.jpeg"
                                alt="About UP Education"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-400/10 w-full sm:mx-auto sm:w-8/12 lg:w-full aspect-[3/4]">
                            <Image
                                src="/bg-image/about.jpeg"
                                alt="About UP Education"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
