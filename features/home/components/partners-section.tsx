import SectionTitle from '@/components/section-title';
import Image from 'next/image';

const studentData = [
    { value: '12.000++', label: 'Students yang lulus' },
    { value: '92%', label: 'Job Placement Rate' },
    { value: '150+', label: 'Industry Partners' },
    { value: '12', label: 'Campuses Nationwide' },
];

export default function PartnersSection() {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionTitle
                        subtitle="Trusted by hundreds of students"
                        description="Our track record speaks for itself. Here's what we've achieved so far."
                    />
                </div>
                <div className="mx-auto mt-16 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-1">
                    {studentData.map(partner => (
                        <div
                            key={partner.label}
                            className="col-span-1 flex justify-center bg-[#F8FAFC] py-8 rounded-sm"
                        >
                            <div className="flex flex-col items-center">
                                <p className="text-3xl font-semibold text-[#CE6439]">
                                    {partner.value}
                                </p>
                                <p className="text-sm font-semibold leading-7 text-[#4B5563]">
                                    {partner.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
