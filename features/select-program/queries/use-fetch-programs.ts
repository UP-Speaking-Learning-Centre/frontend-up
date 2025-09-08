import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { ProgramType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const dummyData = [
    {
        id: 1,
        name: 'School Program',
        description:
            'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
        groups: [
            {
                id: 1,
                name: 'Kindergarten',
                materi: 'Mengenalkan bahasa Inggris lewat aktivitas seru seperti games, lagu, dan roleplay\r\nMengembangkan 4 skills (Listening, Reading, Speaking, Writing) secara bertahap\r\nLatihan simple conversation yang dekat dengan dunia anak\r\nMendorong keberanian untuk berbicara sejak dini\r\nMenanamkan pola pikir kritis lewat pertanyaan ringan dan cerita sederhana',
                capaian:
                    'Anak mulai berani ngomong bahasa Inggris, walau dengan kalimat sederhana\r\nMampu menggunakan kosakata yang dipelajari dalam konteks sehari-hari\r\nMulai bisa mengenal struktur kalimat sederhana dalam bentuk lisan dan tulisan\r\nMeningkatkan rasa percaya diri dan menjadikan belajar bahasa Inggris sesuatu yang menyenangkan\r\nSiap melakukan show and tell atau storytelling dengan ekspresi yang natural',
            },
            {
                id: 2,
                name: 'Elementary School',
                materi: 'Menguasai vocabulary dasar untuk aktivitas sehari-hari\r\nBelajar membaca teks sederhana dengan pemahaman dasar\r\nLatihan menulis kalimat sederhana dan deskripsi pendek\r\nMengenal grammar dasar (present tense, plural, pronouns, adjectives)\r\nBerlatih percakapan sederhana dalam konteks sehari-hari',
                capaian:
                    'Siswa mampu membaca dan memahami teks sederhana\r\nMampu menulis kalimat dan paragraf sederhana\r\nBerani berbicara dengan kalimat sederhana\r\nMenggunakan grammar dasar dengan cukup baik',
            },
            {
                id: 3,
                name: 'Junior High School',
                materi: 'Latihan percakapan sehari-hari dengan berbagai situasi yang dekat dengan dunia remaja\r\nMenggabungkan diskusi ringan, roleplay, dan mini presentation\r\nBelajar struktur kalimat lebih kompleks dan ekspresi umum dalam speaking\r\nMenumbuhkan kebiasaan belajar mandiri dan critical thinking sederhana\r\nMenulis dan memahami teks pendek, email, dan chat formal/informal',
                capaian:
                    'Siswa menjadi lebih percaya diri berbicara dalam berbagai situasi\r\nMampu menyampaikan pendapat dengan logis dan runtut\r\nBisa berinteraksi dalam diskusi ringan dan interview dengan ekspresi yang sesuai\r\nMampu memahami struktur grammar yang umum dan menggunakannya dalam percakapan\r\nSiap membuat video vlog atau interview dalam bahasa Inggris',
            },
            {
                id: 4,
                name: 'Senior High School',
                materi: 'Topik-topik aktual dan meaningful untuk diskusi dan presentasi\r\nLatihan berpikir kritis, berpendapat, dan menyampaikan ide dalam bahasa Inggris\r\nTeknik speaking untuk academic presentation, pitch, dan debat\r\nLatihan grammar in use, bukan sekadar menghafal rumus\r\nMenulis teks formal (email, artikel singkat, opini)',
                capaian:
                    'Siswa dapat berpendapat dengan percaya diri dan logis dalam forum formal dan nonformal\r\nMampu menyusun dan menyampaikan presentasi akademik atau debat dalam bahasa Inggris\r\nTerbiasa menggunakan grammar secara alami dalam speaking dan writing\r\nSiap menghadapi situasi nyata seperti interview beasiswa, kuliah luar negeri, atau pitching ide\r\nMampu menjadi bintang di kelas dengan keahlian speaking yang keren dan powerful',
            },
        ],
    },
    {
        id: 2,
        name: 'Regular / Adults Program',
        description:
            'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
        groups: [
            {
                id: 5,
                name: 'Grammar Program',
                materi: 'Program fokus ke grammar dan writing\r\nLatihan berbagai bentuk grammar: tenses, passive, conditionals\r\nMembuat kalimat formal dan akademik\r\nLatihan menulis essay singkat\r\nLatihan translation grammar',
                capaian:
                    'Peserta mampu memahami grammar dengan benar\r\nMampu menulis essay sederhana dengan struktur grammar tepat\r\nMengurangi kesalahan grammar saat speaking dan writing',
            },
            {
                id: 6,
                name: 'Speaking Program',
                materi: 'Program fokus pada speaking dan pronunciation\r\nLatihan public speaking, roleplay, debate\r\nBelajar intonasi dan accent reduction\r\nDiskusi topik-topik aktual\r\nLatihan presentasi akademik dan professional',
                capaian:
                    'Peserta mampu berbicara lancar dalam forum formal maupun nonformal\r\nLebih percaya diri dalam speaking di depan umum\r\nMampu menyampaikan ide kompleks dengan jelas',
            },
            {
                id: 7,
                name: 'TOEFL Preparation',
                materi: 'Persiapan khusus untuk TOEFL\r\nLatihan Reading, Listening, Speaking, Writing sesuai format TOEFL\r\nStrategi menjawab soal dengan cepat dan tepat\r\nLatihan mock test dengan evaluasi\r\nPembahasan grammar untuk TOEFL',
                capaian:
                    'Peserta memahami format TOEFL\r\nMampu menjawab soal TOEFL dengan strategi yang tepat\r\nMeningkatkan skor TOEFL sesuai target',
            },
        ],
    },
];

const fetchPrograms = async (): Promise<ProgramType[]> => {
    const res = await api.get<ProgramType[]>(ENDPOINTS.fetchPrograms);
    return res.data;
};

const useFetchProgramsQuery = (): UseQueryResult<ProgramType[]> => {
    const res = useQuery({
        queryKey: ['programs'],
        queryFn: fetchPrograms,
        refetchOnWindowFocus: false,
        retry: false,
    });

    return res;
};

export default useFetchProgramsQuery;
