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
    adminTeacherManagement: '/admin/teacher-management',
    adminLocationManagement: '/admin/location-management',
    adminProgramManagement: '/admin/program-management',
    adminScheduleManagement: '/admin/schedule-management',
    adminScheduleManagementId: parseTemplate('/admin/schedule-management/{id}'),
    adminProgramManagementId: parseTemplate('/admin/program-management/{id}'),
} as const;
