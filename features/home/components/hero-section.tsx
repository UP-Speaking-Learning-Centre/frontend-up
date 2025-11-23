import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ButtonOutline } from '@/components/ui/button-outline';

export default function HeroSection() {
    return (
        <div className="relative isolate overflow-hidden">
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-gradient-to-r filter blur-sm from-secondary/80 to-secondary/70"
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
                            <h1 className="text-[4rem] font-rubik uppercase font-semibold text-white sm:text-6xl space-y-2">
                                <p>
                                    Up Your <span className="text-primary">Words</span>,
                                </p>
                                <p>
                                    Up Your <span className="text-primary">World!</span>
                                </p>
                            </h1>
                            {/* <div className="text-2xl mt-4 font-semibold font-outfit uppercase tracking-normal text-white">
                                Mulai langkah kecil, <br />
                                buka peluang besar lewat{' '}
                                <span className="text-primary">bahasa Inggris</span>
                            </div> */}
                        </div>
                        <p className="mt-12 font-medium text-lg max-w-2xl mx-auto leading-8 text-gray-300">
                            Di UP! anak gak cuma belajar bahasa, tapi juga naik level percaya diri.
                            Dengan metode seru dan lingkungan supportive, English jadi bagian dari
                            keseharian mereka.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/programs">
                                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6">
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
