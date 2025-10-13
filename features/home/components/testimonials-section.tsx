import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '@/components/section-title';
import { ROUTES } from '@/constants/routes';
import testimonials from '@/data/testimonials.json';

export default function TestimonialsSection() {
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionTitle
                        title="Testimonials"
                        subtitle="Hear From Our Students"
                        description="Cerita nyata dari siswa kami yang udah ngerasain gimana UP! bantu mereka lebih percaya diri dan jago English."
                    />
                </div>
                <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials
                            .filter(item => item.displayInHome)
                            .map((testimonial, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl flex flex-col bg-gray-50 p-6 leading-6 shadow-sm border-2 border-gray-200"
                                >
                                    <div className="flex flex-col flex-1 gap-2">
                                        <p className="text-left w-full text-5xl">&ldquo;</p>
                                        <blockquote
                                            className="text-gray-700 italic"
                                            dangerouslySetInnerHTML={{ __html: testimonial.review }}
                                        />
                                        <p className="text-right w-full text-5xl">&rdquo;</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-x-4">
                                        <div>
                                            <div className="font-medium underline text-xl text-gray-900">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-gray-400 text-sm">
                                                {testimonial.program}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="mt-16 flex justify-center">
                    <Link href={ROUTES.faqTestimonials}>
                        <Button variant="secondary">More Stories</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
