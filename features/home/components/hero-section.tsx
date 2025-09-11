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
                <div className="absolute inset-0 w-full h-full bg-black/70"></div>
            </div>
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 relative z-10">
                <div className="mx-auto">
                    <div className="text-center">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-[4rem] font-bold font-bebasNeue tracking-wider text-white sm:text-6xl">
                                Up Your <span className="text-[#CE6439]">Words</span>, Up Your{' '}
                                <span className="text-[#CE6439]">World!</span>
                            </h1>
                            <div className="text-2xl mt-2 font-semibold font-bebasNeue tracking-wide text-white">
                                Mulai langkah kecil, buka peluang besar lewat{' '}
                                <span className="text-[#CE6439]">bahasa Inggris</span>
                            </div>
                        </div>
                        <p className="mt-12 text-lg max-w-2xl mx-auto leading-8 text-gray-300">
                            Di UP! anak gak cuma belajar bahasa, tapi juga naik level percaya diri.
                            Dengan metode seru dan lingkungan supportive, English jadi bagian dari
                            keseharian mereka.
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
