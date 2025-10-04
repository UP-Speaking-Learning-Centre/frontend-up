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
        prices: [
            {
                program: 1,
                price: [
                    { price: 349000, duration: 1 },
                    { price: 1999000, duration: 6 },
                ],
            },
            {
                program: 2,
                price: [
                    { price: 499000, duration: 1 },
                    { price: 899000, duration: 2 },
                ],
            },
        ],
    },
    {
        id: 2,
        name: 'Private',
        description: 'Siswa dengan target spesifik (misal interview, TOEFL/IELTS, presentasi)',
        points: `Jumlah murid: 2 orang\nFokus belajar: Fokus penuh ke kebutuhan siswa\nFleksibilitas waktu: Relatif tetap (disesuaikan dengan kelompok kecil)\nKelas ganti: Bebas reschedule + bisa sit-in\nUjian: Shooting 2x/semester
`,
        prices: [
            {
                program: 1,
                price: [
                    { price: 799000, duration: 1 },
                    { price: 4499000, duration: 6 },
                ],
            },
            {
                program: 2,
                price: [
                    { price: 1049000, duration: 1 },
                    { price: 1899000, duration: 2 },
                ],
            },
        ],
    },
    {
        id: 3,
        name: 'Exclusive',
        description: 'Yang butuh hasil cepat, layanan premium, atau eksekutif yang sibuk',
        points: `Jumlah murid: 1 orang\nFokus belajar: Sangat personal, kurikulum bisa customized\nFleksibilitas waktu: Sangat fleksibel sesuai permintaan siswa & kesepakatan pengajar\nKelas ganti: Bebas reschedule + bisa sit-in\nUjian: Shooting 3x/semester
`,
        prices: [
            {
                program: 1,
                price: [
                    { price: 999000, duration: 1 },
                    { price: 5299000, duration: 6 },
                ],
            },
            {
                program: 2,
                price: [
                    { price: 1499000, duration: 1 },
                    { price: 2599000, duration: 2 },
                ],
            },
        ],
    },
];

const fetchPackages = async (): Promise<PackageType[]> => {
    // const res = await api.get<PackageType[]>(ENDPOINTS.fetchPackages);
    // return res.data;

    return dummy;
};

const useFetchPackagesQuery = (): UseQueryResult<PackageType[], Error> => {
    const res = useQuery({
        queryKey: ['packages'],
        queryFn: () => fetchPackages(),
    });

    return res;
};

export default useFetchPackagesQuery;
