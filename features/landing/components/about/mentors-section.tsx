'use client';

import { Button } from '@/components/ui/button';
import Mentor from '@/features/home/components/mentors';
import { useGetAllTeacher } from '@/features/home/queries/get-all-teacher';
import Link from 'next/link';

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

export default function MentorsSection() {
    const { data } = useGetAllTeacher();

    return (
        <div className="bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">Our Team</h2>
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
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
                    {data?.map(mentor => (
                        <Mentor mentor={mentor} key={mentor.id} />
                    ))}
                </div>
                <div className="mt-12 flex justify-center">
                    <Link href="/programs">
                        <Button className="bg-primary hover:bg-primary/90">
                            Explore Our Programs
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
