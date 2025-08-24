import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const values = [
    {
        name: 'Student-Centered Approach',
        description:
            'We put students at the center of everything we do, creating an environment where their needs and goals are prioritized.',
    },
    {
        name: 'Excellence in Education',
        description:
            'We maintain the highest standards in our curriculum and teaching methods to ensure quality education.',
    },
    {
        name: 'Innovation',
        description:
            'We continuously evolve our programs to incorporate the latest technologies and methodologies.',
    },
    {
        name: 'Inclusivity',
        description:
            'We believe education should be accessible to all, regardless of background or prior experience.',
    },
];

const mentors = [
    {
        name: 'Dr. Aria Putra',
        role: 'Director of Education',
        bio: 'With over 15 years of experience in education management, Dr. Putra leads our curriculum development and ensures educational excellence across all programs.',
        imageUrl: '/placeholder.svg?height=300&width=300',
    },
    {
        name: 'Prof. Maya Wijaya',
        role: 'Head of Technology Programs',
        bio: 'A former software engineer with 10 years of industry experience, Prof. Wijaya brings practical insights and cutting-edge knowledge to our tech-related courses.',
        imageUrl: '/placeholder.svg?height=300&width=300',
    },
    {
        name: 'Budi Santoso, MBA',
        role: 'Business Program Director',
        bio: 'An entrepreneur who has founded three successful startups, Budi brings real-world business expertise and mentorship to aspiring business leaders.',
        imageUrl: '/placeholder.svg?height=300&width=300',
    },
    {
        name: 'Dr. Siti Rahayu',
        role: 'Academic Advisor',
        bio: 'Specialized in educational psychology, Dr. Rahayu helps design learning experiences that maximize student engagement and knowledge retention.',
        imageUrl: '/placeholder.svg?height=300&width=300',
    },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-[#254116] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            About UP Education
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Our mission is to transform lives through accessible, quality education.
                            We believe in empowering individuals to reach their full potential and
                            make a positive impact on society.
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
                                    Founded in 2010, UP Education began with a simple goal: to make
                                    quality education accessible to everyone. What started as a
                                    small tutoring center has grown into a nationwide educational
                                    institution with multiple campuses across Indonesia.
                                </p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Over the years, we've helped thousands of students achieve their
                                    academic and career goals through our innovative programs and
                                    dedicated instructors. Our commitment to excellence and student
                                    success remains at the core of everything we do.
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
                            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-[#F7F850] rounded-full blur-3xl opacity-30" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mentors Section */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-[#CE6439]">
                            Our Team
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Meet Our Expert Mentors
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Our instructors bring a wealth of knowledge and experience from academia
                            and industry, ensuring you receive the best education possible.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
                        {mentors.map(mentor => (
                            <div
                                key={mentor.name}
                                className="bg-white rounded-xl shadow-md overflow-hidden"
                            >
                                <div className="relative h-48 w-full">
                                    <Image
                                        className="object-cover"
                                        src={mentor.imageUrl || '/placeholder.svg'}
                                        alt={mentor.name}
                                        fill
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {mentor.name}
                                    </h3>
                                    <p className="text-sm font-medium text-[#CE6439]">
                                        {mentor.role}
                                    </p>
                                    <p className="mt-3 text-sm text-gray-500">{mentor.bio}</p>
                                </div>
                            </div>
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
