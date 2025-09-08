import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { GroupType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';

const dummyData = [
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
];

const fetchGroups = async (programId: string): Promise<GroupType[]> => {
    const res = await api.get<GroupType[]>(ENDPOINTS.fetchGroups.expand({ programId }));
    return res.data;
};

const useFetchGroupsQuery = (): UseQueryResult<GroupType[], Error> => {
    const { programId: programIdFromStore } = useProgramSelectionStore(s => s.formValue);
    const res = useQuery({
        queryKey: ['groups', programIdFromStore],
        queryFn: () => fetchGroups(programIdFromStore as string),
        enabled: !!programIdFromStore,
    });

    return res;
};

export default useFetchGroupsQuery;
