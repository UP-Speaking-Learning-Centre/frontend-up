import { ROUTES } from './routes';

export const AVAILABLE_PROGRAMS = [
    {
        id: 1,
        name: 'School Program',
        description:
            'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
        imageUrl: '/school-program.svg',
        href: ROUTES.programs,
    },
    {
        id: 2,
        name: 'Regular / Adults Program',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
        imageUrl: '/school-program.svg',
        href: ROUTES.programs,
    },
];

export const MAX_STUDENT = {
    ['Exclusive']: 1,
    ['Private']: 2,
    ['Semi Private']: 10,
};
