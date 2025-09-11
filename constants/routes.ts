import { parseTemplate } from 'url-template';

export const ROUTES = {
    home: '/',
    about: '/about',
    programs: '/programs',
    faqTestimonials: '/faq-testimonials',
    login: '/login',
    chooseProgram: '/select-program',
    placementTest: '/placement-test',
    register: '/register',

    // Dashboard
    dashboard: '/dashboard',
    dashboardListStudents: '/dashboard/list-students',
    dashboardStudents: '/dashboard/students',
    dashboardStudentsId: parseTemplate('/dashboard/students/{id}'),
    adminStudents: '/admin/students',
    adminStudentsId: parseTemplate('/admin/students/{id}'),
    adminPlacementTests: '/admin/placement-tests',
    adminPlacementTestsId: parseTemplate('/admin/placement-tests/{id}'),
} as const;
