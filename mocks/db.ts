import { FIXTURES, FixtureEnvelope } from '@/fixtures';

const STORAGE_KEY = '__mock_db_state__';

export interface MockDBState {
    programs: any[];
    groups: any[];
    levels: any[];
    grades: any[];
    packages: any[];
    locations: any[];
    studyGroups: any[];
    students: any[];
    staffs: any[];
    teachers: any[];
    placementTests: any[];
    nonUsers: any[];
    prices: any[];
    [key: string]: any[];
}

function getInitialState(): MockDBState {
    return {
        programs: (FIXTURES.fetchPrograms?.data as any[]) || [],
        groups: (FIXTURES.fetchGroups?.data as any[]) || [],
        levels: (FIXTURES.fetchLevels?.data as any[]) || [],
        grades: (FIXTURES.fetchGrades?.data as any[]) || [],
        packages: (FIXTURES.fetchPackages?.data as any[]) || [],
        locations: (FIXTURES.fetchLocations?.data as any[]) || (FIXTURES.fetchAdminLocations?.data as any[]) || [],
        studyGroups: (FIXTURES.fetchStudyGroups?.data as any[]) || [],
        students: (FIXTURES.fetchStudentOfStudyGroup?.data as any[]) || [],
        staffs: (FIXTURES.fetchStaffs?.data as any[]) || (FIXTURES.baseStaff_get?.data as any[]) || [],
        teachers: (FIXTURES.fetchTeachers?.data as any[]) || (FIXTURES.fetchTeachersNoPage?.data as any[]) || [],
        placementTests: FIXTURES.fetchDetailPlacementTest?.data ? [FIXTURES.fetchDetailPlacementTest.data] : [],
        nonUsers: (FIXTURES.fetchNonUsers?.data as any[]) || (FIXTURES.baseNonUser?.data as any[]) || [],
        prices: (FIXTURES.fetchPrices?.data as any[]) || [],
    };
}

class MockDatabase {
    private state: MockDBState;

    constructor() {
        this.state = this.loadState();
    }

    private loadState(): MockDBState {
        if (typeof window === 'undefined') {
            return getInitialState();
        }
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                return { ...getInitialState(), ...parsed };
            }
        } catch (e) {
            console.warn('[MockDB] Failed to load from localStorage:', e);
        }
        const initial = getInitialState();
        this.saveState(initial);
        return initial;
    }

    private saveState(state: MockDBState): void {
        this.state = state;
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (e) {
                console.warn('[MockDB] Failed to save to localStorage:', e);
            }
        }
    }

    public getCollection<T = any>(collectionName: keyof MockDBState): T[] {
        if (!this.state[collectionName]) {
            this.state[collectionName] = [];
        }
        return [...(this.state[collectionName] as T[])];
    }

    public findById<T = any>(collectionName: keyof MockDBState, id: string | number): T | undefined {
        const items = this.getCollection<any>(collectionName);
        return items.find(item => String(item.id) === String(id) || String(item._id) === String(id));
    }

    public insert<T = any>(collectionName: keyof MockDBState, item: any): T {
        const items = this.getCollection<any>(collectionName);
        const newItem = {
            id: item.id || Date.now(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...item,
        };
        items.unshift(newItem);
        this.state[collectionName] = items;
        this.saveState(this.state);
        return newItem as T;
    }

    public update<T = any>(collectionName: keyof MockDBState, id: string | number, delta: any): T | null {
        const items = this.getCollection<any>(collectionName);
        const index = items.findIndex(item => String(item.id) === String(id) || String(item._id) === String(id));
        if (index === -1) {
            // Jika belum ada, buat atau update target
            const created = { id, ...delta, updated_at: new Date().toISOString() };
            items.unshift(created);
            this.state[collectionName] = items;
            this.saveState(this.state);
            return created as T;
        }
        const updated = {
            ...items[index],
            ...delta,
            updated_at: new Date().toISOString(),
        };
        items[index] = updated;
        this.state[collectionName] = items;
        this.saveState(this.state);
        return updated as T;
    }

    public delete(collectionName: keyof MockDBState, id: string | number): boolean {
        const items = this.getCollection<any>(collectionName);
        const filtered = items.filter(item => String(item.id) !== String(id) && String(item._id) !== String(id));
        this.state[collectionName] = filtered;
        this.saveState(this.state);
        return filtered.length < items.length;
    }

    public reset(): void {
        const initial = getInitialState();
        this.saveState(initial);
        if (typeof window !== 'undefined') {
            console.log('[MockDB] State successfully reset to initial fixtures.');
        }
    }
}

export const mockDb = new MockDatabase();

// Expose reset helper di window console saat development
if (typeof window !== 'undefined') {
    (window as any).__resetMockDb = () => mockDb.reset();
    (window as any).__mockDb = mockDb;
}
