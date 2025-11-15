import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { HEADER_NAVIGATION } from '@/constants/navigation';
import { AVAILABLE_PROGRAMS } from '@/constants/programs';

export default function Footer() {
    return (
        <footer className="bg-[#254116] text-white">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex flex-col space-y-8 md:w-1/2">
                    <div>
                        <div className="flex items-center gap-4">
                            <Image src={'/logo-black.png'} width="80" height="80" alt="Logo UP" />
                            <div className="w-1 h-16 bg-white rounded-xl"></div>
                            <Image
                                src={'/cambridge-logo-white.png'}
                                width="200"
                                height="60"
                                alt="Logo Cambridge"
                            />
                        </div>
                        <p className="text-lg mt-4 font-semibold">Up Your Words, Up Your World.</p>
                        {/* <p className="text-sm mt-1 w-8/12">
                            Bersama UP!, setiap langkah kecil jadi bekal besar buat masa depan yang
                            lebih percaya diri.
                        </p> */}
                    </div>

                    <div>
                        <h3 className="text-base font-semibold leading-6 text-primary">
                            Contact Us
                        </h3>
                        <ul className="mt-2 space-y-2">
                            <li className="flex items-center">
                                <Mail className="h-4 w-4 mr-2" />
                                <span className="text-sm">upspeakinglearningcentre@gmail.com</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                <span className="text-sm">+62 813-1670-1747</span>
                            </li>
                            <li className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm w-8/12">
                                    Cabang Kuningan 1, Jl. Aruji Kartawinata Dalam No.19 , Kuningan,
                                    Kec. Kuningan, Kabupaten Kuningan, Jawa Barat
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 md:mt-0 md:w-1/2">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-base font-semibold leading-6 text-primary">Menu</h3>
                            <ul className="mt-2 space-y-2">
                                {HEADER_NAVIGATION.map(item => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm leading-6 text-gray-300 hover:text-white"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold leading-6 text-primary">
                                Pilih Programs
                            </h3>
                            <ul className="mt-2 space-y-2">
                                {AVAILABLE_PROGRAMS.map(program => (
                                    <li key={program.id}>
                                        <Link
                                            href={program.href}
                                            className="text-sm leading-6 text-gray-300 hover:text-white"
                                        >
                                            {program.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl border-t border-white/10 px-6 py-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    <Link href="#" className="text-gray-300 hover:text-white">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Facebook</span>
                    </Link>
                    <Link href="#" className="text-gray-300 hover:text-white">
                        <Phone className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                    </Link>
                </div>
                <div className="mt-8 md:order-1 md:mt-0">
                    <p className="text-center text-xs leading-5 text-gray-300">
                        &copy; {new Date().getFullYear()} UP Speaking Learning Centre. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
