import testimonials from '@/data/testimonials.json';

export default function TestimonialsSection() {
    return (
        <div className="bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">
                        Testimonials
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Hear From Our Students
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Don't just take our word for it. See what our graduates have to say
                        about their experience with UP SLC.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {testimonials.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
                        >
                            <div className="flex flex-col flex-1 gap-2">
                                <p className="text-left w-full text-5xl">&ldquo;</p>
                                <blockquote
                                    className="text-gray-700 leading-relaxed italic"
                                    dangerouslySetInnerHTML={{ __html: testimonial.review }}
                                />
                                <p className="text-right w-full text-5xl">&rdquo;</p>
                            </div>
                            <div className="mt-6 flex items-center gap-x-4">
                                <div>
                                    <div className="font-medium text-xl text-gray-900">
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
        </div>
    );
}
