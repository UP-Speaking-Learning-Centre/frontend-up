import { ShieldCheck, BookOpen, Users, Award } from 'lucide-react';
import SectionTitle from '@/components/section-title';

const features = [
    {
        name: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        icon: Users,
    },
    {
        name: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        icon: BookOpen,
    },
    {
        name: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        icon: Award,
    },
    {
        name: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        icon: ShieldCheck,
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
                        description="Dalam dunia yang terus bergerak, kami percaya bahwa rasa percaya diri adalah
                        bekal penting. Kami ingin jadi teman perjalananmu menghadapi tantangan
                        dengan tenang dan yakin."
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
