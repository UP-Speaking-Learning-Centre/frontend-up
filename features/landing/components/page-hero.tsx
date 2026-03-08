import React from 'react';

interface PageHeroProps {
    title: React.ReactNode;
    description: React.ReactNode;
}

export default function PageHero({ title, description }: PageHeroProps) {
    return (
        <div className="relative isolate overflow-hidden bg-secondary py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-5xl lg:mx-0">
                    <h1 className="text-4xl font-rubik uppercase font-semibold tracking-wide text-white sm:text-5xl">
                        {title}
                    </h1>
                    <p className="mt-6 text-lg leading-8 w-2/3 text-gray-300">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
