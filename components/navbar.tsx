'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { HEADER_NAVIGATION } from '@/constants/navigation';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import Image from 'next/image';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] sticky top-0 z-50">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href={ROUTES.home} className="-m-1.5 p-1.5">
                        <span className="sr-only">UP Education</span>
                        <div className="flex items-center gap-3">
                            <Image src={'/logo-black.png'} width="40" height="36" alt="Logo UP" />
                            <div className="w-0.5 h-10 bg-[#CE6439] rounded-sm"></div>
                            <Image
                                src={'/logo-cambridge.png'}
                                width="180"
                                height="44"
                                alt="Logo Cambridge"
                            />
                        </div>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-12">
                    <div className="flex gap-x-4 items-center">
                        {HEADER_NAVIGATION.map(item => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    `text-sm font-semibold leading-6 whitespace-nowrap py-2 px-4`,
                                    pathname === item.href
                                        ? 'text-[#CE6439] bg-[#CE6439]/20 rounded-md'
                                        : 'text-gray-900 hover:text-[#CE6439] hover:bg-[#CE6439]/10 hover:rounded-md'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-1 justify-end">
                        <Link href={ROUTES.login}>
                            <Button className="bg-[#CE6439] hover:bg-[#CE6439]/90">Login</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
                <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">UP Education</span>
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-[#CE6439] flex items-center justify-center text-white font-bold text-lg">
                                    UP
                                </div>
                                <span className="ml-2 text-xl font-bold text-[#254116]">
                                    UP Education
                                </span>
                            </div>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {HEADER_NAVIGATION.map(item => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            `-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7`,
                                            pathname === item.href
                                                ? 'text-[#CE6439] bg-gray-50'
                                                : 'text-gray-900 hover:bg-gray-50'
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                <Link href={ROUTES.login}>
                                    <Button className="w-full bg-[#CE6439] hover:bg-[#CE6439]/90">
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
