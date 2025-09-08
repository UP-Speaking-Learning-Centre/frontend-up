import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { PackageType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';

const dummy = [
    {
        id: 1,
        name: 'Semi Private',
        description: 'Yang mau belajar dengan biaya lebih terjangkau tapi tetap intensif',
        points: `Jumlah murid: 5–10 orang\nFokus belajar: Dinamis mengikuti kurikulum, ada diskusi kelompok kecil
\nFleksibilitas waktu: Relatif tetap (disesuaikan dengan jadwal kelompok)\nKelas ganti: Bisa sit-in di grup lain pada minggu sama / ikut kelas tambahan
\nUjian: Shooting 1x/semester
`,
    },
    {
        id: 2,
        name: 'Private',
        description: 'Siswa dengan target spesifik (misal interview, TOEFL/IELTS, presentasi)',
        points: `Jumlah murid: 5–10 orang\nFokus belajar: Dinamis mengikuti kurikulum, ada diskusi kelompok kecil
\nFleksibilitas waktu: Relatif tetap (disesuaikan dengan jadwal kelompok)\nKelas ganti: Bisa sit-in di grup lain pada minggu sama / ikut kelas tambahan
\nUjian: Shooting 1x/semester
`,
    },
    {
        id: 3,
        name: 'Exclusive',
        description: ' Yang butuh hasil cepat, layanan premium, atau eksekutif yang sibuk',
        points: `Jumlah murid: 5–10 orang\nFokus belajar: Dinamis mengikuti kurikulum, ada diskusi kelompok kecil
\nFleksibilitas waktu: Relatif tetap (disesuaikan dengan jadwal kelompok)\nKelas ganti: Bisa sit-in di grup lain pada minggu sama / ikut kelas tambahan
\nUjian: Shooting 1x/semester
`,
    },
];

const fetchPackages = async (): Promise<PackageType[]> => {
    // const res = await api.get<PackageType[]>(ENDPOINTS.fetchPackages.expand({}));
    // return res.data;

    return dummy;
};

const useFetchPackagesQuery = (): UseQueryResult<PackageType[], Error> => {
    const {
        programId: programIdFromStore,
        groupId: groupIdFromStore,
        levelId: levelIdFromStore,
        gradeId: gradeIdFromStore,
    } = useProgramSelectionStore(s => s.formValue);

    const res = useQuery({
        queryKey: [
            'packages',
            programIdFromStore,
            groupIdFromStore,
            levelIdFromStore,
            gradeIdFromStore,
        ],
        queryFn: () => fetchPackages(),
        enabled:
            !!programIdFromStore && !!groupIdFromStore && !!levelIdFromStore && !!gradeIdFromStore,
    });

    return res;
};

export default useFetchPackagesQuery;
