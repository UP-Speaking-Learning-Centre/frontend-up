import SectionTitle from '@/components/section-title';
import Image from 'next/image';

const studentData = [
    { value: '2400++', label: 'Students yang lulus' },
    { value: '20+', label: 'School Partner' },
];

export default function PartnersSection() {
    return (
        <div className="bg-primary py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionTitle
                        variant="white"
                        subtitle="Trusted by Hundreds of Students & Parents"
                        description="Our track record speaks for itself. Here's what we've achieved so far."
                    />
                </div>
                <div className="mx-auto mt-16 grid max-w-3xl md:grid-cols-2 grid-cols-1 gap-2">
                    {studentData.map(partner => (
                        <div
                            key={partner.label}
                            className="col-span-1 flex justify-center bg-[#F8FAFC] py-8 rounded-xl"
                        >
                            <div className="flex flex-col items-center">
                                <p className="text-3xl font-semibold text-[#CE6439]">
                                    {partner.value}
                                </p>
                                <p className="text-sm font-medium leading-7 text-[#4B5563]">
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
