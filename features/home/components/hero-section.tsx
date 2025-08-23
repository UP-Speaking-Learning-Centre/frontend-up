import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ButtonOutline } from '@/components/ui/button-outline';

export default function HeroSection() {
    return (
        <div className="relative isolate overflow-hidden">
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-[#254116]/90 to-[#254116]/70"
                    style={{
                        backgroundImage: `url(/bg-image/hero.svg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 w-full h-full bg-red-50"></div>
            </div>
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 relative z-10">
                <div className="mx-auto max-w-2xl">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            LOREM IPSUM DOLOR SIT AMET
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/programs">
                                <Button className="bg-[#CE6439] hover:bg-[#CE6439]/90 text-white px-8 py-6">
                                    Explore Programs
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
