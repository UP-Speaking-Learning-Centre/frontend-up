import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { FIXTURES } from '@/fixtures';
import { mockDb } from './db';

export function setupMockAdapter(api: AxiosInstance) {
    const mock = new MockAdapter(api, { delayResponse: 300 });

    // ==========================================
    // 1. AUTH & PROFILE
    // ==========================================
    mock.onPost('/auth/check-phone').reply(config => {
        return [200, {
            status: 'success',
            code: 200,
            data: { isRegistered: true, isActivated: true },
            message: 'Phone verified',
        }];
    });

    mock.onPost('/auth/request-otp').reply(config => {
        return [200, {
            status: 'success',
            code: 200,
            data: { message: 'OTP sent', otpForTesting: '123456' },
            message: 'OTP sent successfully',
        }];
    });

    mock.onPost('/auth/login').reply(config => {
        return [200, {
            status: 'success',
            code: 200,
            data: {
                accessToken: 'mock-access-token-' + Date.now(),
                role: 'admin',
                user: { id: 1, name: 'Admin UP', role: 'admin', email: 'admin@upspeaking.com' },
            },
            message: 'Login success',
        }];
    });

    mock.onPost('/auth/activate-account').reply(config => {
        return [200, {
            status: 'success',
            code: 200,
            data: 'mock-activated-token',
            message: 'Account activated',
        }];
    });

    mock.onGet('/profile').reply(config => {
        const defaultStudents = [
            {
                id: 1,
                name: 'Siswa Dengan Jadwal 2',
                phoneNumber: '081288889999',
                instagram: 'siswa2',
                status: 'active',
                isContacted: true,
                preferredProgramId: 1,
                preferredProgramName: 'School Program',
                programId: 1,
                program: 'School Program',
                groupId: 4,
                group: 'Senior High School',
                levelId: 10,
                level: 'Rookie',
                gradeId: 35,
                gradeLabel: 'Grade 1',
                studyGroupIds: [59],
                primaryStudyGroupId: 59,
                packages: [{ packageId: 1, packageName: 'Semi Private' }],
                latestResult: {
                    status: 'success',
                    placementTestId: 1,
                    score: 85,
                    determinedLevelId: 10,
                    determinedLevelName: 'Rookie',
                    group: 'Senior High School',
                    groupId: 4,
                    program: 'School Program',
                    programId: 1,
                },
                schedules: [
                    {
                        studyGroupId: 59,
                        studyGroupName: 'Firdan',
                        packageId: 1,
                        packageName: 'Semi Private',
                        dayOfWeek: 'FRI',
                        startTime: '09:30:00',
                        endTime: '11:00:00',
                        location: 'Kuningan 1 (Stadion)',
                        teacherMemberName: 'Mr. Firdan',
                        teacherAlias: 'Baby Bear',
                    },
                    {
                        studyGroupId: 59,
                        studyGroupName: 'Firdan',
                        packageId: 1,
                        packageName: 'Semi Private',
                        dayOfWeek: 'SAT',
                        startTime: '21:00:00',
                        endTime: '22:00:00',
                        location: 'Kuningan 1 (Stadion)',
                        teacherMemberName: 'Mr. Firdan',
                        teacherAlias: 'Baby Bear',
                    },
                ],
            },
            {
                id: 2,
                name: 'Radit 21.22',
                phoneNumber: '081211112210122',
                instagram: 'radit2122',
                status: 'active',
                isContacted: true,
                preferredProgramId: 1,
                preferredProgramName: 'School Program',
                programId: 1,
                program: 'School Program',
                groupId: 4,
                group: 'Senior High School',
                levelId: 10,
                level: 'Rookie',
                gradeId: 35,
                gradeLabel: 'Grade 1',
                studyGroupIds: [59],
                primaryStudyGroupId: 59,
                packages: [{ packageId: 1, packageName: 'Semi Private' }],
                latestResult: {
                    status: 'pending',
                    placementTestId: 2,
                    score: null,
                    determinedLevelId: null,
                    determinedLevelName: null,
                    group: 'Senior High School',
                    groupId: 4,
                    program: 'School Program',
                    programId: 1,
                },
                schedules: [],
            },
        ];

        return [200, {
            status: 'success',
            code: 200,
            data: {
                id: 1,
                name: 'Admin UP',
                email: 'admin@upspeaking.com',
                role: 'admin',
                phoneNumber: '08123456789',
                instagram: 'upspeaking',
                students: defaultStudents,
            },
            message: 'Success',
        }];
    });

    mock.onGet(/\/profile\/students\/.+/).reply(config => {
        const urlParts = config.url?.split('/') || [];
        const studentId = Number(urlParts[urlParts.length - 1]);
        const defaultStudent = {
            id: studentId || 1,
            name: studentId === 2 ? 'Radit 21.22' : 'Siswa Dengan Jadwal 2',
            phoneNumber: '+6281288889999',
            instagram: 'siswa2',
            status: 'active',
            isContacted: true,
            preferredProgramId: 1,
            preferredProgramName: 'School Program',
            programId: 1,
            program: 'School Program',
            groupId: 4,
            group: 'Senior High School',
            levelId: 10,
            level: 'Rookie',
            gradeId: 35,
            gradeLabel: 'Grade 1',
            studyGroupIds: [59],
            primaryStudyGroupId: 59,
            packages: [{ packageId: 1, packageName: 'Semi Private' }],
            latestResult: studentId === 2 ? {
                status: 'pending',
                placementTestId: 2,
                score: null,
                determinedLevelId: null,
                determinedLevelName: null,
                group: 'Senior High School',
                groupId: 4,
                program: 'School Program',
                programId: 1,
            } : {
                status: 'success',
                placementTestId: 1,
                score: 85,
                determinedLevelId: 10,
                determinedLevelName: 'Rookie',
                group: 'Senior High School',
                groupId: 4,
                program: 'School Program',
                programId: 1,
            },
            schedules: [
                {
                    studyGroupId: 59,
                    studyGroupName: 'Firdan',
                    packageId: 1,
                    packageName: 'Semi Private',
                    dayOfWeek: 'FRI',
                    startTime: '09:30:00',
                    endTime: '11:00:00',
                    location: 'Kuningan 1 (Stadion)',
                    teacherMemberName: 'Mr. Firdan',
                    teacherAlias: 'Baby Bear',
                },
                {
                    studyGroupId: 59,
                    studyGroupName: 'Firdan',
                    packageId: 1,
                    packageName: 'Semi Private',
                    dayOfWeek: 'SAT',
                    startTime: '21:00:00',
                    endTime: '22:00:00',
                    location: 'Kuningan 1 (Stadion)',
                    teacherMemberName: 'Mr. Firdan',
                    teacherAlias: 'Baby Bear',
                },
            ],
        };

        return [200, {
            status: 'success',
            code: 200,
            data: defaultStudent,
            message: 'Success',
        }];
    });

    // ==========================================
    // 2. MASTER DATA / CATALOG (PROGRAMS, LOCATIONS, ETC)
    // ==========================================
    mock.onGet('/programs').reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('programs'),
            message: 'Success',
        }];
    });

    mock.onGet(/\/programs\/\d+\/groups/).reply(config => {
        const urlParts = config.url?.split('/') || [];
        const programId = urlParts[2];
        const allGroups = mockDb.getCollection('groups');
        const filtered = programId ? allGroups.filter(g => String(g.program_id) === String(programId)) : allGroups;
        return [200, {
            status: 'success',
            code: 200,
            data: filtered.length > 0 ? filtered : allGroups,
            message: 'Success',
        }];
    });

    mock.onGet(/\/programs\/\d+\/groups\/\d+\/levels/).reply(config => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('levels'),
            message: 'Success',
        }];
    });

    mock.onGet(/\/programs\/\d+\/groups\/\d+\/levels\/\d+\/grades/).reply(config => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('grades'),
            message: 'Success',
        }];
    });

    mock.onGet('/packages').reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('packages'),
            message: 'Success',
        }];
    });

    mock.onGet('/locations').reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('locations'),
            message: 'Success',
        }];
    });

    mock.onGet('/admin/locations').reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('locations'),
            message: 'Success',
        }];
    });

    mock.onPatch(/\/admin\/locations\/\d+/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        const body = config.data ? JSON.parse(config.data) : {};
        const updated = mockDb.update('locations', id, body);
        return [200, {
            status: 'success',
            code: 200,
            data: updated,
            message: 'Location updated',
        }];
    });

    mock.onDelete(/\/admin\/locations\/\d+/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        mockDb.delete('locations', id);
        return [200, {
            status: 'success',
            code: 200,
            deleted: true,
            data: { id: Number(id), deleted: true },
            message: 'Location deleted',
        }];
    });

    mock.onGet(/\/locations\/\d+\/available-schedules/).reply(() => {
        return [200, FIXTURES.fetchAvailableSchedule || { status: 'success', code: 200, data: [] }];
    });

    mock.onGet(/\/locations\/\d+\/study-groups.*/).reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('studyGroups'),
            message: 'Success',
        }];
    });

    mock.onGet('/prices').reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('prices'),
            message: 'Success',
        }];
    });

    mock.onPatch('/admin/program-packages/by-program-package').reply(config => {
        const body = config.data ? JSON.parse(config.data) : {};
        return [200, {
            status: 'success',
            code: 200,
            data: body,
            message: 'Price updated',
        }];
    });

    // ==========================================
    // 3. REGISTRATIONS & PLACEMENT TESTS (STATEFUL POST -> GET)
    // ==========================================
    mock.onPost('/registrations').reply(config => {
        const body = config.data ? JSON.parse(config.data) : {};
        const newStudent = mockDb.insert('students', {
            ...body,
            studentName: body.childName || body.studentName || 'Student Baru',
            name: body.childName || body.name || 'Student Baru',
            email: body.email || 'student@example.com',
            phone: body.phoneNumber || '08123456789',
            isContacted: false,
        });
        return [201, {
            status: 'success',
            code: 201,
            data: newStudent,
            message: 'Registration successful',
        }];
    });

    mock.onPost('/auth/register').reply(config => {
        const body = config.data ? JSON.parse(config.data) : {};
        const newStudent = mockDb.insert('students', {
            ...body,
            studentName: body.name || 'Registered Student',
            isContacted: false,
        });
        return [201, {
            status: 'success',
            code: 201,
            data: newStudent,
            message: 'Registered successfully',
        }];
    });

    mock.onPost('/placement-tests/start-guest').reply(() => {
        return [200, FIXTURES.fetchPlacementTest || { status: 'success', code: 200, data: {} }];
    });

    mock.onPost('/placement-tests/submit-guest').reply(config => {
        return [200, {
            status: 'success',
            code: 200,
            data: { placementTestId: 1, score: 85, levelRecommendation: 'Intermediate' },
            message: 'Test submitted',
        }];
    });

    mock.onGet(/\/placement-tests\/\d+/).reply(() => {
        return [200, FIXTURES.fetchDetailPlacementTest || { status: 'success', code: 200, data: {} }];
    });

    mock.onGet(/\/admin\/placement-tests\/\d+\/status/).reply(() => {
        return [200, FIXTURES.fetchAdminDetailPlacementTestStatus || { status: 'success', code: 200, data: { status: 'completed' } }];
    });

    mock.onPatch(/\/admin\/placement-tests\/\d+\/status/).reply(config => {
        const body = config.data ? JSON.parse(config.data) : {};
        return [200, {
            status: 'success',
            code: 200,
            data: { status: body.status || 'passed' },
            message: 'Placement test status updated',
        }];
    });

    mock.onGet(/\/admin\/placement-tests\/\d+/).reply(() => {
        return [200, FIXTURES.fetchAdminDetailPlacementTest || { status: 'success', code: 200, data: {} }];
    });

    // ==========================================
    // 4. STUDENTS (ADMIN DASHBOARD & DETAIL)
    // ==========================================
    mock.onGet('/admin/students').reply(config => {
        const students = mockDb.getCollection('students');
        const params = config.params || {};
        let result = [...students];

        if (params.studentName) {
            result = result.filter(s =>
                (s.studentName || s.name || '').toLowerCase().includes(String(params.studentName).toLowerCase())
            );
        }
        if (params.isContacted !== undefined) {
            const isContactedBool = params.isContacted === true || params.isContacted === 'true';
            result = result.filter(s => Boolean(s.isContacted) === isContactedBool);
        }

        return [200, {
            status: 'success',
            code: 200,
            data: result,
            meta: {
                currentPage: Number(params.currentPage) || 1,
                itemsPerPage: 10,
                totalItems: result.length,
                totalPages: Math.ceil(result.length / 10) || 1,
            },
            message: 'Success',
        }];
    });

    mock.onGet(/\/admin\/students\/\d+$/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        const student = mockDb.findById('students', id) || FIXTURES.fetchAdminStudentById?.data;
        return [200, {
            status: 'success',
            code: 200,
            data: student,
            message: 'Success',
        }];
    });

    mock.onPatch(/\/admin\/students\/\d+\/contacted/).reply(config => {
        const parts = config.url?.split('/') || [];
        const id = parts[parts.length - 2];
        const updated = mockDb.update('students', id, { isContacted: true });
        return [200, {
            status: 'success',
            code: 200,
            data: updated,
            message: 'Contacted status updated',
        }];
    });

    mock.onPatch(/\/admin\/students\/\d+\/notes/).reply(config => {
        const parts = config.url?.split('/') || [];
        const id = parts[parts.length - 2];
        const body = config.data ? JSON.parse(config.data) : {};
        const updated = mockDb.update('students', id, { notes: body.notes });
        return [200, {
            status: 'success',
            code: 200,
            data: updated,
            message: 'Notes updated',
        }];
    });

    mock.onPatch(/\/admin\/students\/\d+$/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        const body = config.data ? JSON.parse(config.data) : {};
        const updated = mockDb.update('students', id, body);
        return [200, {
            status: 'success',
            code: 200,
            data: updated,
            message: 'Student updated successfully',
        }];
    });

    // ==========================================
    // 5. STUDY GROUPS & SCHEDULING (STATEFUL CRUD)
    // ==========================================
    mock.onPost('/admin/study-groups').reply(config => {
        const body = config.data ? JSON.parse(config.data) : {};
        const newGroup = mockDb.insert('studyGroups', {
            name: body.name || `Study Group ${Date.now()}`,
            ...body,
            assignedStudents: [],
        });
        return [201, {
            status: 'success',
            code: 201,
            data: newGroup,
            message: 'Study group created',
        }];
    });

    mock.onGet(/\/admin\/study-groups\/\d+$/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        const group = mockDb.findById('studyGroups', id) || FIXTURES.fetchStudyGroupDetail?.data;
        return [200, {
            status: 'success',
            code: 200,
            data: group,
            message: 'Success',
        }];
    });

    mock.onGet(/\/admin\/study-groups\/\d+\/assigned-students/).reply(config => {
        const parts = config.url?.split('/') || [];
        const studyGroupId = parts[parts.length - 2];
        const students = mockDb.getCollection('students');
        const assigned = students.filter(s => String(s.studyGroupId) === String(studyGroupId));
        return [200, {
            status: 'success',
            code: 200,
            data: assigned.length > 0 ? assigned : (FIXTURES.fetchStudentOfStudyGroup?.data || []),
            message: 'Success',
        }];
    });

    mock.onGet(/\/admin\/study-groups\/\d+\/available-students/).reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('students'),
            message: 'Success',
        }];
    });

    mock.onPost('/admin/study-groups/assign-students').reply(config => {
        const body = config.data ? JSON.parse(config.data) : {};
        if (body.studentId && body.studyGroupId) {
            mockDb.update('students', body.studentId, { studyGroupId: body.studyGroupId });
        }
        return [200, {
            status: 'success',
            code: 200,
            data: body,
            message: 'Student assigned to study group',
        }];
    });

    mock.onPost(/\/admin\/study-groups\/\d+\/unassign-students/).reply(config => {
        const parts = config.url?.split('/') || [];
        const studyGroupId = parts[parts.length - 2];
        const body = config.data ? JSON.parse(config.data) : {};
        if (body.studentId) {
            mockDb.update('students', body.studentId, { studyGroupId: null });
        }
        return [200, {
            status: 'success',
            code: 200,
            data: { studyGroupId, ...body },
            message: 'Student unassigned from study group',
        }];
    });

    mock.onPatch(/\/admin\/study-groups\/\d+\/priority/).reply(config => {
        const parts = config.url?.split('/') || [];
        const studyGroupId = parts[parts.length - 2];
        const body = config.data ? JSON.parse(config.data) : {};
        const updated = mockDb.update('studyGroups', studyGroupId, { isPriority: body.isPriority });
        return [200, {
            status: 'success',
            code: 200,
            data: updated,
            message: 'Priority updated',
        }];
    });

    mock.onGet(/\/admin\/teacher-schedules\/location\/\d+/).reply(() => {
        return [200, FIXTURES.fetchTeacherSchedule || { status: 'success', code: 200, data: [] }];
    });

    // ==========================================
    // 6. TEACHERS & STAFF (STATEFUL CRUD)
    // ==========================================
    mock.onGet(/\/admin\/teacher-team-members\/all|\/teacher-team-members\/all/).reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('teachers'),
            message: 'Success',
        }];
    });

    mock.onGet('/admin/teacher-team-members').reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('teachers'),
            message: 'Success',
        }];
    });

    mock.onPost('/admin/teacher-team-members').reply(config => {
        const body = config.data ? JSON.parse(config.data) : {};
        const newTeacher = mockDb.insert('teachers', body);
        return [201, {
            status: 'success',
            code: 201,
            data: newTeacher,
            message: 'Teacher added',
        }];
    });

    mock.onGet(/\/admin\/teacher-team-members\/\d+$/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        const teacher = mockDb.findById('teachers', id) || FIXTURES.fetchTeachersById_get?.data;
        return [200, {
            status: 'success',
            code: 200,
            data: teacher,
            message: 'Success',
        }];
    });

    mock.onPatch(/\/admin\/teacher-team-members\/\d+$/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        const body = config.data ? JSON.parse(config.data) : {};
        const updated = mockDb.update('teachers', id, body);
        return [200, {
            status: 'success',
            code: 200,
            data: updated,
            message: 'Teacher updated',
        }];
    });

    mock.onDelete(/\/admin\/teacher-team-members\/\d+$/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        mockDb.delete('teachers', id);
        return [200, {
            status: 'success',
            code: 200,
            success: true,
            data: { id: Number(id), success: true },
            message: 'Teacher deleted',
        }];
    });

    mock.onGet(/\/admin\/teacher-team-members\/\d+\/schedules/).reply(() => {
        return [200, FIXTURES.fetchTeachersScheduleById || { status: 'success', code: 200, data: [] }];
    });

    mock.onGet('/admin/teachers').reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('teachers'),
            message: 'Success',
        }];
    });

    // Staff
    mock.onGet(/\/admin\/staff.*/).reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('staffs'),
            message: 'Success',
        }];
    });

    mock.onPost('/admin/staff').reply(config => {
        const body = config.data ? JSON.parse(config.data) : {};
        const newStaff = mockDb.insert('staffs', body);
        return [201, {
            status: 'success',
            code: 201,
            data: newStaff,
            message: 'Staff created',
        }];
    });

    mock.onGet(/\/admin\/staff\/\d+$/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        const staff = mockDb.findById('staffs', id) || FIXTURES.staffById_get?.data;
        return [200, {
            status: 'success',
            code: 200,
            data: staff,
            message: 'Success',
        }];
    });

    mock.onPatch(/\/admin\/staff\/\d+$/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        const body = config.data ? JSON.parse(config.data) : {};
        const updated = mockDb.update('staffs', id, body);
        return [200, {
            status: 'success',
            code: 200,
            data: updated,
            message: 'Staff updated',
        }];
    });

    mock.onDelete(/\/admin\/staff\/\d+$/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        mockDb.delete('staffs', id);
        return [200, {
            status: 'success',
            code: 200,
            data: { id: Number(id) },
            message: 'Staff deleted',
        }];
    });

    // ==========================================
    // 7. NON-USERS
    // ==========================================
    mock.onGet(/\/admin\/non-users\/\d+/).reply(config => {
        const id = config.url?.split('/').pop() || '1';
        const nonUser = mockDb.findById('nonUsers', id) || FIXTURES.nonUserById?.data;
        return [200, {
            status: 'success',
            code: 200,
            data: nonUser,
            message: 'Success',
        }];
    });

    mock.onGet(/\/admin\/non-users.*/).reply(() => {
        return [200, {
            status: 'success',
            code: 200,
            data: mockDb.getCollection('nonUsers'),
            message: 'Success',
        }];
    });

    // ==========================================
    // 8. FALLBACK PASS-THROUGH
    // ==========================================
    // Biarkan request lain (misal static assets) tetap lolos
    mock.onAny().passThrough();
}
