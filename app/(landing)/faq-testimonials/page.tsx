import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import testimonials from '@/data/testimonials.json';

const faqs = [
    {
        question: 'Berapa jumlah siswa per kelas?',
        answer: 'Kelas reguler berisi 5–10 siswa supaya tetap interaktif. Ada juga pilihan Semi-Private (2–3 siswa), Private (2 siswa), dan Executive (1 siswa) untuk kebutuhan lebih personal.',
    },
    {
        question: 'Apakah ada placement test sebelum mulai?',
        answer: 'Ya. Semua siswa mengikuti placement test supaya ditempatkan di level CEFR (Pre-A1 sampai C1) sesuai kemampuan.',
    },
    {
        question: 'Metode belajarnya seperti apa?',
        answer: 'Kami pakai metode 90 Minutes of Happiness: Harmony Hour, UP Quest, UP Yourself, dan Chill-Chat. Belajar jadi fun, interaktif, dan fokus ke confidence.',
    },
    {
        question: 'Apakah kelas bisa di-reschedule?',
        answer: 'Bisa. Untuk Private & Executive, jadwal fleksibel bisa reschedule. Untuk Semi-Private, bisa sit-in di grup lain pada minggu yang sama.',
    },
    {
        question: 'Apakah ada ujian di setiap level?',
        answer: 'Ada. Siswa mengikuti Shooting Examination (1–3x/semester tergantung paket) untuk melatih percaya diri & jadi portofolio speaking.',
    },
    {
        question: 'Apakah tersedia program untuk orang dewasa?',
        answer: 'Tersedia. Regular/Adults Program cocok untuk mahasiswa, pekerja, maupun profesional yang ingin upgrade English untuk kerja atau studi.',
    },
    {
        question: 'Bagaimana cara mendaftar?',
        answer: 'Cukup isi form online / hubungi admin, ikuti placement test, pilih program & paket, lalu mulai kelas pertama. Simple & cepat!',
    },
    {
        question: 'Berapa biaya program di UP SLC?',
        answer: 'Biaya mulai dari 30 ribuan per pertemuan, tergantung program & paket yang dipilih (School / Regular, Semi-Private / Private / Executive).',
    },
    {
        question: 'Apakah ada kelas online?',
        answer: 'Saat ini fokus utama UP SLC adalah offline untuk membangun confidence, tapi akan ada opsi online di cabang tertentu ke depannya.',
    },
    {
        question: 'Apa kurikulum yang digunakan?',
        answer: 'Kami pakai Cambridge Curriculum sejak 2023, dengan standar internasional & sistem leveling CEFR.',
    },
    {
        question: 'Apakah ada laporan perkembangan siswa?',
        answer: 'Ya. Untuk paket Executive siswa dapat laporan kemajuan rutin, sementara di paket lain progress diinformasikan langsung oleh mentor kepada orang tua.',
    },
    {
        question: 'Apa keunggulan UP SLC dibanding kursus lain?',
        answer: 'UP SLC fokus ke percaya diri + English, dengan kelas kecil, Shooting Exam, dan komunitas aktif (UP Club) yang bikin belajar jadi menyenangkan & aplikatif.',
    },
    {
        question: 'Apakah ada kegiatan di luar kelas?',
        answer: 'Ada. Siswa bisa ikut berbagai UP Club (UPWatchClub, ReadingUpClub, SocioUp, CookingUpClub, dll) biar English makin kepake di aktivitas sehari-hari.',
    },
    {
        question: 'Apakah tutor UP SLC berpengalaman?',
        answer: 'Semua tutor adalah lulusan pendidikan bahasa Inggris / berpengalaman mengajar, serta dilatih dengan metode UP untuk memastikan suasana fun & efektif.',
    },
];

export default function FAQTestimonialsPage() {
    return (
        <>
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-secondary py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-5xl lg:mx-0">
                        <h1 className="text-4xl font-rubik uppercase font-semibold tracking-wide text-white sm:text-5xl">
                            FAQ & Testimonials
                        </h1>
                        <p className="mt-6 text-lg leading-8 w-2/3 text-gray-300">
                            Find answers to common questions and hear from our students about their
                            experiences at UP SLC.
                        </p>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary">
                            Testimonials
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Hear From Our Students
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Don't just take our word for it. See what our graduates have to say
                            about their experience with UP SLC.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
                            >
                                <div className="flex flex-col flex-1 gap-2">
                                    <p className="text-left w-full text-5xl">&ldquo;</p>
                                    <blockquote
                                        className="text-gray-700 leading-relaxed italic"
                                        dangerouslySetInnerHTML={{ __html: testimonial.review }}
                                    />
                                    <p className="text-right w-full text-5xl">&rdquo;</p>
                                </div>
                                <div className="mt-6 flex items-center gap-x-4">
                                    <div>
                                        <div className="font-medium text-xl text-gray-900">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {testimonial.program}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary">
                            “No worries, we’ve got the answers.”
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Frequently Asked Questions
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Beberapa pertanyaan yang sering ditanyakan orang tua & siswa sebelum
                            bergabung di UP SLC. Kalau masih ada yang bikin penasaran, feel free to
                            contact us.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-3xl">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`}>
                                    <AccordionTrigger className="text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-primary px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to transform your future?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/90">
                            Gabung dengan ribuan siswa yang sudah berhasil maju bareng UP SLC.
                            Daftar sekarang dan mulai langkah pertama menuju tujuanmu.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href={ROUTES.programs}>
                                <Button variant="secondary">Explore Programs</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
