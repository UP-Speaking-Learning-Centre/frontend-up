import { Button } from '@/components/ui/button';
import Mentor from '@/features/home/components/mentors';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

export const mentors = [
    {
        name: 'Mr. Rizky, S.T., MBA',
        nameWithoutDegree: 'Mr. Rizky',
        role: 'Mama Bear (Speaking & TOEFL Mentor)',
        bio: 'Founder sekaligus mentor utama UP SLC, membimbing siswa dalam public speaking & TOEFL dengan pendekatan percaya diri dan fun.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/mr-rizky.jpg',
    },
    {
        name: 'Mr. Galang, S.Pd., M.Pd',
        nameWithoutDegree: 'Mr. Galang',
        role: 'Speaking, TOEFL & High School Mentor',
        bio: 'Berpengalaman mendampingi siswa SMA dan profesional  dalam persiapan TOEFL & speaking, dengan gaya mengajar interaktif.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/mr-galang.jpg',
    },
    {
        name: 'Mr. Rafif, S.Pd',
        nameWithoutDegree: 'Mr. Rafif',
        role: 'Speaking, TOEFL & High School Mentor',
        bio: 'Fokus mendukung siswa SMA untuk lebih pede dalam English akademik & komunikasi sehari-hari.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/mr-rafif.png',
    },
    {
        name: 'Ms. Nuraeni, S.Pd',
        nameWithoutDegree: 'Ms. Nuraeni',
        role: 'Speaking, TOEFL & High School Mentor',
        bio: 'Spesialis speaking & TOEFL, dikenal sabar & mampu membangun kepercayaan diri siswa.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/ms-nuraeni.jpg',
    },
    {
        name: 'Mr. Noval, S.Pd',
        nameWithoutDegree: 'Mr. Noval',
        role: 'Mid & High School Mentor',
        bio: 'Mendampingi siswa SMP-SMA dengan pembelajaran English yang aplikatif & engaging.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/mr-noval',
    },
    {
        name: 'Ms. Lieken',
        nameWithoutDegree: 'Ms. Lieken',
        role: 'Mid & High School Mentor',
        bio: 'Membimbing siswa dengan pendekatan kreatif agar nyaman belajar English di usia remaja.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/ms-lieken.jpg',
    },
    {
        name: 'Ms. Binti',
        nameWithoutDegree: 'Ms. Binti',
        role: 'Mid & High School Mentor',
        bio: 'Membimbing siswa dengan pendekatan kreatif agar nyaman belajar English di usia remaja.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/ms-binti.jpg',
    },
    {
        name: 'Mr. Firdan, S.Pd',
        nameWithoutDegree: 'Mr. Firdan',
        role: 'Elementary & Mid School Mentor',
        bio: 'Ahli membimbing anak-anak SD-SMP dengan metode playful & mudah dipahami.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/mr-firdan.jpg',
    },
    {
        name: 'Ms. Feby, S.Pd',
        nameWithoutDegree: 'Ms. Feby',
        role: 'Elementary School Mentor',
        bio: 'Membantu anak-anak SD belajar English dengan fun activities & friendly approach.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/ms-feby.HEIC',
    },
    {
        name: 'Ms. Puji, S.Pd',
        nameWithoutDegree: 'Ms. Puji',
        role: 'Elementary & Mid School Mentor',
        bio: 'Mendampingi siswa SD-SMP dengan kombinasi belajar grammar & conversation praktis.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/ms-puji.jpg',
    },
    {
        name: 'Ms. Denisa, S.Pd',
        nameWithoutDegree: 'Ms. Ica',
        role: 'Elementary School Mentor',
        bio: 'Spesialis anak-anak SD, bikin kelas jadi seru & bikin anak makin pede ngomong English.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/ms-ica.jpg',
    },
    {
        name: 'Ms. Sella, S.Pd',
        nameWithoutDegree: 'Ms. Sella',
        role: 'Elementary & Mid School Mentor',
        bio: 'Mendampingi siswa SD-SMP dengan kombinasi belajar grammar & conversation praktis.',
        imageUrl: 'https://media.uplearningcentre.com/foto-tutor/ms-sella.jpg',
    },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-[#254116] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-5xl lg:mx-0">
                        <h1 className="text-5xl font-oswald uppercase font-semibold tracking-wide text-white sm:text-6xl">
                            Turning Fear into Fluency, <br />
                            Building Confidence for the Future.
                        </h1>
                        <p className="mt-6 text-lg leading-8 w-2/3 text-gray-300">
                            Kami percaya bahwa setiap anak bisa naik level bukan cuma dalam grammar,
                            tapi juga dalam percaya diri untuk ngomong English.
                        </p>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7 text-[#CE6439]">
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
                                                <CheckCircle className="absolute left-1 top-1 h-5 w-5 text-[#CE6439]" />
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
                        <div className="relative">
                            <Image
                                src="/placeholder.svg?height=800&width=1200"
                                alt="About UP Education"
                                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                                width={2432}
                                height={1442}
                            />
                            <Image
                                src="/placeholder.svg?height=800&width=1200"
                                alt="About UP Education"
                                className="w-full rounded-xl shadow-xl mt-12 ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                                width={2432}
                                height={1442}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mentors Section */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-[#CE6439]">
                            Our Team
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Meet Our Expert Mentors
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Tim pengajar UP SLC terdiri dari para profesional muda yang
                            berpengalaman, passionate, dan siap membimbing siswa untuk naik level.
                            Dengan kombinasi akademik & praktik, mereka bukan hanya guru, tapi juga
                            mentor perjalanan belajar.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
                        {mentors.map(mentor => (
                            <Mentor mentor={mentor} key={mentor.name} />
                        ))}
                    </div>
                    <div className="mt-12 flex justify-center">
                        <Link href="/programs">
                            <Button className="bg-[#CE6439] hover:bg-[#CE6439]/90">
                                Explore Our Programs
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
