import Image from 'next/image';
import Link from 'next/link';
import { ButtonOutline } from '@/components/ui/button-outline';
import SectionTitle from '@/components/section-title';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';

const programs = [
    {
        id: 1,
        name: 'School Program',
        description:
            'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
        imageUrl: '/school-program.svg',
        href: ROUTES.programs,
    },
    {
        id: 2,
        name: 'Regular / Adults Program',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
        imageUrl: '/school-program.svg',
        href: ROUTES.programs,
    },
];

export default function ProgramsSection() {
    return (
        <div className="bg-gray-100 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionTitle
                        title="Our Programs"
                        subtitle="Jalan menuju masa depan impianmu"
                        description="Kami hadir untuk membantumu melangkah lebih dekat ke masa depan yang kamu impikan, dengan percaya diri."
                    />
                </div>
                <div className="mx-auto mt-16 max-w-2xl flex flex-col justify-center gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:flex-row">
                    {programs.map(program => (
                        <div
                            key={program.id}
                            className="relative flex flex-col lg:flex-row justify-between overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full lg:w-1/3"
                        >
                            <div className="flex flex-1 flex-col p-8">
                                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2]">
                                    <Image
                                        src={program.imageUrl || '/placeholder.svg'}
                                        alt={program.name}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <div className="mt-6 flex flex-1 flex-col">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                                            {program.name}
                                        </h3>
                                        <p className="mt-4 text-base leading-7 text-gray-600">
                                            {program.description}
                                        </p>
                                    </div>
                                    <div className="mt-6">
                                        <Link href={program.href}>
                                            <ButtonOutline className="w-full">
                                                Learn More
                                            </ButtonOutline>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link href={ROUTES.programs}>
                        <Button className="bg-[#CE6439] hover:bg-[#CE6439]/90">
                            View All Programs
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
