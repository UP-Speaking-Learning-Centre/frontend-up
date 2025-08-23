import { ROUTES } from './routes';

export const HEADER_NAVIGATION = [
    {
        name: 'Home',
        href: ROUTES.home,
    },
    {
        name: 'About Us',
        href: ROUTES.about,
    },
    {
        name: 'Programs',
        href: ROUTES.programs,
    },
    {
        name: 'FAQ & Testimonials',
        href: ROUTES.faqTestimonials,
    },
    {
        name: 'Pilih Program',
        href: ROUTES.chooseProgram,
    },
] as const;
