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
                        <div className="flex items-center">
                            <Image src={'/logo-black.png'} width="80" height="80" alt="Logo UP" />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6">Contact Us</h3>
                        <ul className="mt-2 space-y-2">
                            <li className="flex items-center">
                                <Mail className="h-4 w-4 mr-2" />
                                <span className="text-sm">info@upslc.com</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                <span className="text-sm">+62 123 4567 890</span>
                            </li>
                            <li className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                    Jl. Siliwangi No. 123, Kuningan, Jawa Barat
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 md:mt-0 md:w-1/2">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold leading-6">Menu</h3>
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
                            <h3 className="text-sm font-semibold leading-6">Pilih Programs</h3>
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
                        &copy; {new Date().getFullYear()} UP Education. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
