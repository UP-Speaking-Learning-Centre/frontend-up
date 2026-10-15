/**
 * Auto-generated Frontend Fixtures from backend seeder-new.sql
 * Generated on: 2026-10-14T17:48:15.723Z
 */

export interface FixtureEnvelope<T = any> {
  status: string;
  code: number;
  message?: string;
  data: T;
  meta?: {
    totalItems?: number;
    itemCount?: number;
    itemsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    [key: string]: any;
  };
}

export const FIXTURES: Record<string, FixtureEnvelope> = {
  "fetchPrograms": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "name": "School Program",
        "description": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos",
        "id": 1,
        "image_url": null
      },
      {
        "name": "Regular / Adults Program",
        "description": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos",
        "id": 2,
        "image_url": null
      }
    ],
    "message": "Success"
  },
  "fetchGroups": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "name": "Grammar Program",
        "materi": "Topik-topik aktual dan meaningful untuk diskusi dan presentasi\nLatihan berpikir kritis, berpendapat, dan menyampaikan ide dalam bahasa Inggris\nTeknik speaking untuk academic presentation, pitch, dan debat\nLatihan grammar in use, bukan sekadar menghafal rumus\nMenulis teks formal (email, artikel singkat, opini)",
        "capaian": "Siswa dapat berpendapat dengan percaya diri dan logis dalam forum formal dan nonformal\nMampu menyusun dan menyampaikan presentasi akademik atau debat dalam bahasa Inggris\nTerbiasa menggunakan grammar secara alami dalam speaking dan writing\nSiap menghadapi situasi nyata seperti interview beasiswa, kuliah luar negeri, atau pitching ide\nMampu menjadi bintang di kelas dengan keahlian speaking yang keren dan powerful",
        "id": 5,
        "program_id": 2,
        "image_url": null
      },
      {
        "name": "Kindergarten",
        "materi": "Mengenalkan bahasa Inggris lewat aktivitas seru seperti games, lagu, dan roleplay\nMengembangkan 4 skills (Listening, Reading, Speaking, Writing) secara bertahap\nLatihan simple conversation yang dekat dengan dunia anak\nMendorong keberanian untuk berbicara sejak dini\nMenanamkan pola pikir kritis lewat pertanyaan ringan dan cerita sederhana",
        "capaian": "Anak mulai berani ngomong bahasa Inggris, walau dengan kalimat sederhana\nMampu menggunakan kosakata yang dipelajari dalam konteks sehari-hari\nMulai bisa mengenal struktur kalimat sederhana dalam bentuk lisan dan tulisan\nMeningkatkan rasa percaya diri dan menjadikan belajar bahasa Inggris sesuatu yang menyenangkan\nSiap melakukan show and tell atau storytelling dengan ekspresi yang natural",
        "id": 1,
        "program_id": 1,
        "image_url": null
      },
      {
        "name": "Elementary School",
        "materi": "Mengenalkan bahasa Inggris lewat aktivitas seru seperti games, lagu, dan roleplay\nMengembangkan 4 skills (Listening, Reading, Speaking, Writing) secara bertahap\nLatihan simple conversation yang dekat dengan dunia anak\nMendorong keberanian untuk berbicara sejak dini\nMenanamkan pola pikir kritis lewat pertanyaan ringan dan cerita sederhana",
        "capaian": "Anak mulai berani ngomong bahasa Inggris, walau dengan kalimat sederhana\nMampu menggunakan kosakata yang dipelajari dalam konteks sehari-hari\nMulai bisa mengenal struktur kalimat sederhana dalam bentuk lisan dan tulisan\nMeningkatkan rasa percaya diri dan menjadikan belajar bahasa Inggris sesuatu yang menyenangkan\nSiap melakukan show and tell atau storytelling dengan ekspresi yang natural",
        "id": 2,
        "program_id": 1,
        "image_url": null
      },
      {
        "name": "Junior High School",
        "materi": "Latihan percakapan sehari-hari dengan berbagai situasi yang dekat dengan dunia remaja\nMenggabungkan diskusi ringan, roleplay, dan mini presentation\nBelajar struktur kalimat lebih kompleks dan ekspresi umum dalam speaking\nMenumbuhkan kebiasaan belajar mandiri dan critical thinking sederhana\nMenulis dan memahami teks pendek, email, dan chat formal/informal",
        "capaian": "Siswa menjadi lebih percaya diri berbicara dalam berbagai situasi\nMampu menyampaikan pendapat dengan logis dan runtut\nBisa berinteraksi dalam diskusi ringan dan interview dengan ekspresi yang sesuai\nMampu memahami struktur grammar yang umum dan menggunakannya dalam percakapan\nSiap membuat video vlog atau interview dalam bahasa Inggris",
        "id": 3,
        "program_id": 1,
        "image_url": null
      },
      {
        "name": "Senior High School",
        "materi": "Topik-topik aktual dan meaningful untuk diskusi dan presentasi\nLatihan berpikir kritis, berpendapat, dan menyampaikan ide dalam bahasa Inggris\nTeknik speaking untuk academic presentation, pitch, dan debat\nLatihan grammar in use, bukan sekadar menghafal rumus\nMenulis teks formal (email, artikel singkat, opini)",
        "capaian": "Siswa dapat berpendapat dengan percaya diri dan logis dalam forum formal dan nonformal\nMampu menyusun dan menyampaikan presentasi akademik atau debat dalam bahasa Inggris\nTerbiasa menggunakan grammar secara alami dalam speaking dan writing\nSiap menghadapi situasi nyata seperti interview beasiswa, kuliah luar negeri, atau pitching ide\nMampu menjadi bintang di kelas dengan keahlian speaking yang keren dan powerful",
        "id": 4,
        "program_id": 1,
        "image_url": null
      },
      {
        "name": "Speaking Program",
        "materi": "Topik-topik aktual dan meaningful untuk diskusi dan presentasi\nLatihan berpikir kritis, berpendapat, dan menyampaikan ide dalam bahasa Inggris\nTeknik speaking untuk academic presentation, pitch, dan debat\nLatihan grammar in use, bukan sekadar menghafal rumus\nMenulis teks formal (email, artikel singkat, opini)",
        "capaian": "Siswa dapat berpendapat dengan percaya diri dan logis dalam forum formal dan nonformal\nMampu menyusun dan menyampaikan presentasi akademik atau debat dalam bahasa Inggris\nTerbiasa menggunakan grammar secara alami dalam speaking dan writing\nSiap menghadapi situasi nyata seperti interview beasiswa, kuliah luar negeri, atau pitching ide\nMampu menjadi bintang di kelas dengan keahlian speaking yang keren dan powerful",
        "id": 6,
        "program_id": 2,
        "image_url": null
      },
      {
        "name": "TOEFL Preparation",
        "materi": "Topik-topik aktual dan meaningful untuk diskusi dan presentasi\nLatihan berpikir kritis, berpendapat, dan menyampaikan ide dalam bahasa Inggris\nTeknik speaking untuk academic presentation, pitch, dan debat\nLatihan grammar in use, bukan sekadar menghafal rumus\nMenulis teks formal (email, artikel singkat, opini)",
        "capaian": "Siswa dapat berpendapat dengan percaya diri dan logis dalam forum formal dan nonformal\nMampu menyusun dan menyampaikan presentasi akademik atau debat dalam bahasa Inggris\nTerbiasa menggunakan grammar secara alami dalam speaking dan writing\nSiap menghadapi situasi nyata seperti interview beasiswa, kuliah luar negeri, atau pitching ide\nMampu menjadi bintang di kelas dengan keahlian speaking yang keren dan powerful",
        "id": 7,
        "program_id": 2,
        "image_url": null
      }
    ],
    "message": "Success"
  },
  "fetchLevels": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "name": "New Star",
        "prerequisites": "No prerequisites required. Open for beginners.",
        "id": 1,
        "group_id": 1,
        "image_url": null,
        "description": "Standard course curriculum for this level."
      },
      {
        "name": "Novice",
        "prerequisites": "Completed New Star 2 or equivalent",
        "id": 2,
        "group_id": 2,
        "image_url": null,
        "description": "Focuses on foundational vocabulary and basic sentence construction for daily topics."
      },
      {
        "name": "Elementary",
        "prerequisites": null,
        "id": 3,
        "group_id": 2,
        "image_url": null,
        "description": "Builds on simple sentence structures to describe activities and express needs."
      },
      {
        "name": "Talented",
        "prerequisites": null,
        "id": 4,
        "group_id": 2,
        "image_url": null,
        "description": "Develops skills to describe people and places using various adjectives and tenses."
      },
      {
        "name": "Super",
        "prerequisites": null,
        "id": 5,
        "group_id": 2,
        "image_url": null,
        "description": "Aims to build confidence in holding simple conversations and expressing opinions."
      },
      {
        "name": "Intersection",
        "prerequisites": null,
        "id": 6,
        "group_id": 2,
        "image_url": null,
        "description": "Prepares students for more complex topics by reinforcing foundational skills."
      },
      {
        "name": "Beginners",
        "prerequisites": "Completed Novice 4 or equivalent",
        "id": 7,
        "group_id": 3,
        "image_url": null,
        "description": "Introduces vocabulary and grammar for everyday objects and simple storytelling."
      },
      {
        "name": "Interchange",
        "prerequisites": null,
        "id": 8,
        "group_id": 3,
        "image_url": null,
        "description": "Focuses on constructing sentences for daily activities and expressing needs with more detail."
      },
      {
        "name": "Competent",
        "prerequisites": null,
        "id": 9,
        "group_id": 3,
        "image_url": null,
        "description": "Emphasizes describing people and places with a wider range of vocabulary."
      },
      {
        "name": "Rookie",
        "prerequisites": "Completed Elementary School or equivalent",
        "id": 10,
        "group_id": 4,
        "image_url": null,
        "description": "Strengthens grammar and conversational skills for daily life discussions."
      },
      {
        "name": "Movers",
        "prerequisites": "Completed Rookie 2 or equivalent",
        "id": 11,
        "group_id": 4,
        "image_url": null,
        "description": "Develops the ability to express detailed ideas and analyze various topics."
      },
      {
        "name": "Flyers",
        "prerequisites": "Completed Movers 4 or equivalent",
        "id": 12,
        "group_id": 4,
        "image_url": null,
        "description": "Focuses on presenting complex academic arguments and engaging in sophisticated discussions."
      },
      {
        "name": "Grammar",
        "prerequisites": "No prerequisites required. Open for beginners.",
        "id": 13,
        "group_id": 5,
        "image_url": null,
        "description": "Deepens understanding of core grammar structures and sentence patterns."
      },
      {
        "name": "Speaking",
        "prerequisites": "No prerequisites required. Open for beginners.",
        "id": 14,
        "group_id": 6,
        "image_url": null,
        "description": "Builds fluency and confidence for holding conversations and expressing ideas clearly."
      },
      {
        "name": "TOEFL Preparation",
        "prerequisites": "Completed Speaking Program or equivalent",
        "id": 15,
        "group_id": 7,
        "image_url": null,
        "description": "Prepares students for academic discussions and presenting complex arguments."
      }
    ],
    "message": "Success"
  },
  "fetchGrades": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "grade_number": 1,
        "prerequisites": "No prerequisites required. Open for beginners.",
        "id": 1,
        "level_id": 1,
        "image_url": null
      },
      {
        "grade_number": 2,
        "prerequisites": "Should be able to understand and use basic greetings, simple introductions, and respond to simple questions.",
        "id": 2,
        "level_id": 1,
        "image_url": null
      },
      {
        "grade_number": 1,
        "prerequisites": "Completed New Star 2 or equivalent",
        "id": 3,
        "level_id": 2,
        "image_url": null
      },
      {
        "grade_number": 2,
        "prerequisites": "Completed Novice 1 or equivalent",
        "id": 4,
        "level_id": 2,
        "image_url": null
      },
      {
        "grade_number": 3,
        "prerequisites": "Completed Novice 2 or equivalent",
        "id": 5,
        "level_id": 2,
        "image_url": null
      },
      {
        "grade_number": 4,
        "prerequisites": "Completed Novice 3 or equivalent",
        "id": 6,
        "level_id": 2,
        "image_url": null
      },
      {
        "grade_number": 1,
        "prerequisites": "Should be able to understand and use basic vocabulary and simple sentence structures.",
        "id": 7,
        "level_id": 8,
        "image_url": null
      },
      {
        "grade_number": 2,
        "prerequisites": "Should be able to construct simple sentences about daily activities and express basic needs.",
        "id": 8,
        "level_id": 8,
        "image_url": null
      },
      {
        "grade_number": 1,
        "prerequisites": "Should be able to understand and use basic vocabulary for everyday objects, numbers, and simple sentences.",
        "id": 9,
        "level_id": 7,
        "image_url": null
      },
      {
        "grade_number": 2,
        "prerequisites": "Should be able to construct simple sentences about daily activities and express basic needs.",
        "id": 10,
        "level_id": 7,
        "image_url": null
      },
      {
        "grade_number": 3,
        "prerequisites": "Should be able to describe people, places, and things using simple adjectives and basic verb tenses.",
        "id": 11,
        "level_id": 7,
        "image_url": null
      },
      {
        "grade_number": 4,
        "prerequisites": "Should be able to hold simple conversations about daily life and express opinions using basic vocabulary.",
        "id": 12,
        "level_id": 7,
        "image_url": null
      },
      {
        "grade_number": 1,
        "prerequisites": "Should be able to understand and use basic grammar structures and hold simple conversations about daily life.",
        "id": 13,
        "level_id": 10,
        "image_url": null
      },
      {
        "grade_number": 2,
        "prerequisites": "Should be able to express opinions, describe experiences, and participate in simple discussions using appropriate vocabulary.",
        "id": 14,
        "level_id": 10,
        "image_url": null
      }
    ],
    "message": "Success"
  },
  "fetchPackages": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "name": "Basic",
        "description": "Paket dasar kursus",
        "total_sessions": 12
      },
      {
        "id": 2,
        "name": "Intensive",
        "description": "Paket intensif percepatan",
        "total_sessions": 24
      },
      {
        "id": 3,
        "name": "Private",
        "description": "Paket tatap muka 1-on-1",
        "total_sessions": 16
      }
    ],
    "message": "Success"
  },
  "fetchLocations": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "name": "Stadion",
        "status": "active"
      },
      {
        "id": 2,
        "name": "Luragung",
        "status": "active"
      },
      {
        "id": 3,
        "name": "Alam Asri",
        "status": "active"
      }
    ],
    "message": "Success"
  },
  "fetchAvailableSchedule": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "teacher_team_member_id": 2,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 2,
        "teacher_team_member_id": 2,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 3,
        "teacher_team_member_id": 2,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 7,
        "teacher_team_member_id": 2,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 8,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 10,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 12,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 13,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 14,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 15,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 16,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 17,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 20,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 21,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 22,
        "teacher_team_member_id": 2,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 24,
        "teacher_team_member_id": 2,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 25,
        "teacher_team_member_id": 2,
        "day_of_week": "THU",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 28,
        "teacher_team_member_id": 2,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 29,
        "teacher_team_member_id": 2,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 31,
        "teacher_team_member_id": 2,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 33,
        "teacher_team_member_id": 2,
        "day_of_week": "FRI",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 35,
        "teacher_team_member_id": 2,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 38,
        "teacher_team_member_id": 2,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 41,
        "teacher_team_member_id": 2,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 42,
        "teacher_team_member_id": 2,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 43,
        "teacher_team_member_id": 3,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 44,
        "teacher_team_member_id": 3,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 45,
        "teacher_team_member_id": 3,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 50,
        "teacher_team_member_id": 3,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 51,
        "teacher_team_member_id": 3,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 52,
        "teacher_team_member_id": 3,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 56,
        "teacher_team_member_id": 3,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 57,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 58,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 59,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 62,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 63,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 64,
        "teacher_team_member_id": 3,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 65,
        "teacher_team_member_id": 3,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 66,
        "teacher_team_member_id": 3,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 71,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 72,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 73,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 76,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 77,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 80,
        "teacher_team_member_id": 3,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 82,
        "teacher_team_member_id": 3,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 83,
        "teacher_team_member_id": 3,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 84,
        "teacher_team_member_id": 3,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 85,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 86,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 87,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 88,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 91,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 92,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 93,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 94,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 95,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 98,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 99,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 100,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 101,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 102,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 105,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 106,
        "teacher_team_member_id": 5,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 107,
        "teacher_team_member_id": 5,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 108,
        "teacher_team_member_id": 5,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 112,
        "teacher_team_member_id": 5,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 113,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 114,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 115,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 116,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 119,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 120,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 122,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 124,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 125,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 126,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 127,
        "teacher_team_member_id": 7,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 128,
        "teacher_team_member_id": 7,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 129,
        "teacher_team_member_id": 7,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 133,
        "teacher_team_member_id": 7,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 134,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 135,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 136,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 137,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 140,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 141,
        "teacher_team_member_id": 7,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 142,
        "teacher_team_member_id": 7,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 143,
        "teacher_team_member_id": 7,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 147,
        "teacher_team_member_id": 7,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 148,
        "teacher_team_member_id": 7,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 149,
        "teacher_team_member_id": 7,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 150,
        "teacher_team_member_id": 7,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 154,
        "teacher_team_member_id": 7,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 155,
        "teacher_team_member_id": 7,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 156,
        "teacher_team_member_id": 7,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 157,
        "teacher_team_member_id": 7,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 161,
        "teacher_team_member_id": 7,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 162,
        "teacher_team_member_id": 7,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 167,
        "teacher_team_member_id": 7,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 168,
        "teacher_team_member_id": 7,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 169,
        "teacher_team_member_id": 9,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 170,
        "teacher_team_member_id": 9,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 171,
        "teacher_team_member_id": 9,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 175,
        "teacher_team_member_id": 9,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 176,
        "teacher_team_member_id": 9,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 177,
        "teacher_team_member_id": 9,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 178,
        "teacher_team_member_id": 9,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 182,
        "teacher_team_member_id": 9,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 183,
        "teacher_team_member_id": 9,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 184,
        "teacher_team_member_id": 9,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 185,
        "teacher_team_member_id": 9,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 189,
        "teacher_team_member_id": 9,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 190,
        "teacher_team_member_id": 9,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 191,
        "teacher_team_member_id": 9,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 192,
        "teacher_team_member_id": 9,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 196,
        "teacher_team_member_id": 9,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 197,
        "teacher_team_member_id": 9,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 198,
        "teacher_team_member_id": 9,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 199,
        "teacher_team_member_id": 9,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 203,
        "teacher_team_member_id": 9,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 204,
        "teacher_team_member_id": 9,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 209,
        "teacher_team_member_id": 9,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 210,
        "teacher_team_member_id": 9,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 211,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 212,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 213,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 214,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 215,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 217,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 218,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 220,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 221,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 223,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 224,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 225,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 226,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 227,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 228,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 229,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 231,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 232,
        "teacher_team_member_id": 10,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 234,
        "teacher_team_member_id": 10,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 235,
        "teacher_team_member_id": 10,
        "day_of_week": "THU",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 238,
        "teacher_team_member_id": 10,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 239,
        "teacher_team_member_id": 10,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 241,
        "teacher_team_member_id": 10,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 243,
        "teacher_team_member_id": 10,
        "day_of_week": "FRI",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 245,
        "teacher_team_member_id": 10,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 248,
        "teacher_team_member_id": 10,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 251,
        "teacher_team_member_id": 10,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 252,
        "teacher_team_member_id": 10,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 253,
        "teacher_team_member_id": 11,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 254,
        "teacher_team_member_id": 11,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 255,
        "teacher_team_member_id": 11,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 259,
        "teacher_team_member_id": 11,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 260,
        "teacher_team_member_id": 11,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 261,
        "teacher_team_member_id": 11,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 262,
        "teacher_team_member_id": 11,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 266,
        "teacher_team_member_id": 11,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 267,
        "teacher_team_member_id": 11,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 268,
        "teacher_team_member_id": 11,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 269,
        "teacher_team_member_id": 11,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 273,
        "teacher_team_member_id": 11,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 274,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 275,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 276,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 278,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 280,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 281,
        "teacher_team_member_id": 11,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 282,
        "teacher_team_member_id": 11,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 283,
        "teacher_team_member_id": 11,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 287,
        "teacher_team_member_id": 11,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 291,
        "teacher_team_member_id": 11,
        "day_of_week": "SAT",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 292,
        "teacher_team_member_id": 11,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 293,
        "teacher_team_member_id": 11,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 294,
        "teacher_team_member_id": 11,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 295,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 296,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 297,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 300,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 301,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 302,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 303,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 304,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 306,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 307,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 308,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 309,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 310,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 311,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 314,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 315,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 316,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 317,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 318,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 320,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 321,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 322,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 323,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 324,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 325,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 326,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 327,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 328,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 329,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 330,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 331,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 332,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 333,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 334,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 335,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 336,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      }
    ],
    "message": "Success"
  },
  "fetchStudyGroups": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "name": "Study Group - Kids Level 1 A",
        "locationId": 1,
        "programId": 1,
        "groupId": 1,
        "levelId": 1,
        "packageId": 1,
        "teacherTeamMemberId": 1,
        "teacherName": "Miss Sarah",
        "dayOfWeek": "MON",
        "startTime": "08:00",
        "endTime": "09:30",
        "room": "Room A-101",
        "maxCapacity": 6,
        "currentStudentsCount": 2,
        "isPriority": false
      },
      {
        "id": 2,
        "name": "Study Group - Speaking Teens B",
        "locationId": 1,
        "programId": 2,
        "groupId": 6,
        "levelId": 10,
        "packageId": 2,
        "teacherTeamMemberId": 2,
        "teacherName": "Mr. David",
        "dayOfWeek": "WED",
        "startTime": "13:45",
        "endTime": "15:15",
        "room": "Room B-202",
        "maxCapacity": 8,
        "currentStudentsCount": 3,
        "isPriority": true
      }
    ],
    "message": "Success"
  },
  "fetchAvailableStudyGroup": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "name": "Study Group - Kids Level 1 A",
        "locationId": 1,
        "programId": 1,
        "groupId": 1,
        "levelId": 1,
        "packageId": 1,
        "teacherTeamMemberId": 1,
        "teacherName": "Miss Sarah",
        "dayOfWeek": "MON",
        "startTime": "08:00",
        "endTime": "09:30",
        "room": "Room A-101",
        "maxCapacity": 6,
        "currentStudentsCount": 2,
        "isPriority": false
      },
      {
        "id": 2,
        "name": "Study Group - Speaking Teens B",
        "locationId": 1,
        "programId": 2,
        "groupId": 6,
        "levelId": 10,
        "packageId": 2,
        "teacherTeamMemberId": 2,
        "teacherName": "Mr. David",
        "dayOfWeek": "WED",
        "startTime": "13:45",
        "endTime": "15:15",
        "room": "Room B-202",
        "maxCapacity": 8,
        "currentStudentsCount": 3,
        "isPriority": true
      }
    ],
    "message": "Success"
  },
  "fetchDetailPlacementTest": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "student": {
        "id": 1,
        "name": "Siswa Dengan Jadwal 2",
        "date_of_birth": null,
        "registration_date": "2025-09-05 18:50:31.716521",
        "placement_status": "not_taken",
        "dashboard_access": false,
        "otp_code": null,
        "created_at": "2025-09-05 18:50:31.716521",
        "updated_at": "2025-09-05 18:50:31.716521",
        "user_id": 21,
        "phone_number": "+6281288889999",
        "status": "active",
        "isContacted": true,
        "user": {
          "phone_number": "+6281288889999",
          "is_verified": true,
          "created_at": "2025-09-05 18:50:31.121367",
          "updated_at": "2025-09-05 18:51:27.365526",
          "id": 21,
          "username": null,
          "role": "parent",
          "password": "[REDACTED]"
        }
      },
      "test": {
        "id": 1,
        "name": "Placement Test - Elementary",
        "description": "A test focusing on basic language concepts for elementary students.",
        "level_id": 2
      },
      "score": 85,
      "status": "completed",
      "answers": [
        {
          "id": 1,
          "answer_text": "should",
          "placement_test_id": 1,
          "question_id": 1
        },
        {
          "id": 2,
          "answer_text": "was",
          "placement_test_id": 1,
          "question_id": 7
        },
        {
          "id": 3,
          "answer_text": "swimming",
          "placement_test_id": 1,
          "question_id": 27
        },
        {
          "id": 4,
          "answer_text": "any",
          "placement_test_id": 1,
          "question_id": 30
        },
        {
          "id": 5,
          "answer_text": "should",
          "placement_test_id": 2,
          "question_id": 1
        },
        {
          "id": 6,
          "answer_text": "was",
          "placement_test_id": 2,
          "question_id": 7
        },
        {
          "id": 7,
          "answer_text": "swimming",
          "placement_test_id": 2,
          "question_id": 27
        },
        {
          "id": 8,
          "answer_text": "any",
          "placement_test_id": 2,
          "question_id": 30
        }
      ],
      "questions": [
        {
          "id": 1,
          "question_text": "She likes ____ (swim) in the ocean during summer.",
          "options": null,
          "correct_answer": "swimming",
          "question_type": "fill_in_the_blank",
          "test_id": 1,
          "instruction": "Complete the sentences with the correct form of the verb."
        },
        {
          "id": 2,
          "question_text": "They ____ (not like) ____ (eat) spicy food.",
          "options": null,
          "correct_answer": "don't like eating",
          "question_type": "fill_in_the_blank",
          "test_id": 1,
          "instruction": null
        },
        {
          "id": 3,
          "question_text": "There are ____ apples in the fridge. Would you like one?",
          "options": [
            "some",
            "any"
          ],
          "correct_answer": "some",
          "question_type": "multiple_choice",
          "test_id": 1,
          "instruction": "Choose the correct word (some/any)."
        },
        {
          "id": 4,
          "question_text": "She doesn't have ____ money left in her wallet.",
          "options": [
            "some",
            "any"
          ],
          "correct_answer": "any",
          "question_type": "multiple_choice",
          "test_id": 1,
          "instruction": null
        },
        {
          "id": 5,
          "question_text": "The movie begins at 7:20 pm. It's ____ seven.",
          "options": [
            "twenty past",
            "twenty to"
          ],
          "correct_answer": "twenty past",
          "question_type": "multiple_choice",
          "test_id": 1,
          "instruction": "Tell the time."
        }
      ]
    },
    "message": "Success"
  },
  "fetchPlacementTest": {
    "status": "success",
    "code": 200,
    "data": {
      "placementTestId": 10,
      "guestName": "Tamu Calon Siswa",
      "questions": [
        {
          "id": 1,
          "question_text": "She likes ____ (swim) in the ocean during summer.",
          "options": null,
          "question_type": "fill_in_the_blank",
          "instruction": "Complete the sentences with the correct form of the verb."
        },
        {
          "id": 2,
          "question_text": "They ____ (not like) ____ (eat) spicy food.",
          "options": null,
          "question_type": "fill_in_the_blank",
          "instruction": null
        },
        {
          "id": 3,
          "question_text": "There are ____ apples in the fridge. Would you like one?",
          "options": [
            "some",
            "any"
          ],
          "question_type": "multiple_choice",
          "instruction": "Choose the correct word (some/any)."
        },
        {
          "id": 4,
          "question_text": "She doesn't have ____ money left in her wallet.",
          "options": [
            "some",
            "any"
          ],
          "question_type": "multiple_choice",
          "instruction": null
        },
        {
          "id": 5,
          "question_text": "The movie begins at 7:20 pm. It's ____ seven.",
          "options": [
            "twenty past",
            "twenty to"
          ],
          "question_type": "multiple_choice",
          "instruction": "Tell the time."
        },
        {
          "id": 6,
          "question_text": "He goes to bed at 11:45. It's ____ twelve.",
          "options": [
            "quarter past",
            "quarter to"
          ],
          "question_type": "multiple_choice",
          "instruction": null
        },
        {
          "id": 7,
          "question_text": "They are going to the gym ____ (work out) this evening.",
          "options": null,
          "question_type": "fill_in_the_blank",
          "instruction": "Complete the sentences with the infinitive form of the verb."
        },
        {
          "id": 8,
          "question_text": "She is going to the library ____ (study) for her exams.",
          "options": null,
          "question_type": "fill_in_the_blank",
          "instruction": null
        },
        {
          "id": 9,
          "question_text": "The children ____ excited about the trip.",
          "options": [
            "was",
            "were"
          ],
          "question_type": "multiple_choice",
          "instruction": "Choose the correct verb (was/were)."
        },
        {
          "id": 10,
          "question_text": "It ____ cold outside yesterday.",
          "options": [
            "was",
            "were"
          ],
          "question_type": "multiple_choice",
          "instruction": null
        }
      ]
    },
    "message": "Success"
  },
  "submitPlacementTest": {
    "status": "success",
    "code": 200,
    "data": {
      "placementTestId": 10,
      "score": 80,
      "status": "completed",
      "recommendedLevel": "Novice",
      "message": "Placement test submitted successfully"
    },
    "message": "Success"
  },
  "fetchAdminDetailPlacementTest": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "student": {
        "id": 1,
        "name": "Siswa Dengan Jadwal 2",
        "date_of_birth": null,
        "registration_date": "2025-09-05 18:50:31.716521",
        "placement_status": "not_taken",
        "dashboard_access": false,
        "otp_code": null,
        "created_at": "2025-09-05 18:50:31.716521",
        "updated_at": "2025-09-05 18:50:31.716521",
        "user_id": 21,
        "phone_number": "+6281288889999",
        "status": "active",
        "isContacted": true,
        "user": {
          "phone_number": "+6281288889999",
          "is_verified": true,
          "created_at": "2025-09-05 18:50:31.121367",
          "updated_at": "2025-09-05 18:51:27.365526",
          "id": 21,
          "username": null,
          "role": "parent",
          "password": "[REDACTED]"
        }
      },
      "test": {
        "id": 1,
        "name": "Placement Test - Elementary",
        "description": "A test focusing on basic language concepts for elementary students.",
        "level_id": 2
      },
      "score": 85,
      "status": "completed",
      "answers": [
        {
          "id": 1,
          "answer_text": "should",
          "placement_test_id": 1,
          "question_id": 1
        },
        {
          "id": 2,
          "answer_text": "was",
          "placement_test_id": 1,
          "question_id": 7
        },
        {
          "id": 3,
          "answer_text": "swimming",
          "placement_test_id": 1,
          "question_id": 27
        },
        {
          "id": 4,
          "answer_text": "any",
          "placement_test_id": 1,
          "question_id": 30
        },
        {
          "id": 5,
          "answer_text": "should",
          "placement_test_id": 2,
          "question_id": 1
        },
        {
          "id": 6,
          "answer_text": "was",
          "placement_test_id": 2,
          "question_id": 7
        },
        {
          "id": 7,
          "answer_text": "swimming",
          "placement_test_id": 2,
          "question_id": 27
        },
        {
          "id": 8,
          "answer_text": "any",
          "placement_test_id": 2,
          "question_id": 30
        }
      ],
      "questions": [
        {
          "id": 1,
          "question_text": "She likes ____ (swim) in the ocean during summer.",
          "options": null,
          "correct_answer": "swimming",
          "question_type": "fill_in_the_blank",
          "test_id": 1,
          "instruction": "Complete the sentences with the correct form of the verb."
        },
        {
          "id": 2,
          "question_text": "They ____ (not like) ____ (eat) spicy food.",
          "options": null,
          "correct_answer": "don't like eating",
          "question_type": "fill_in_the_blank",
          "test_id": 1,
          "instruction": null
        },
        {
          "id": 3,
          "question_text": "There are ____ apples in the fridge. Would you like one?",
          "options": [
            "some",
            "any"
          ],
          "correct_answer": "some",
          "question_type": "multiple_choice",
          "test_id": 1,
          "instruction": "Choose the correct word (some/any)."
        },
        {
          "id": 4,
          "question_text": "She doesn't have ____ money left in her wallet.",
          "options": [
            "some",
            "any"
          ],
          "correct_answer": "any",
          "question_type": "multiple_choice",
          "test_id": 1,
          "instruction": null
        },
        {
          "id": 5,
          "question_text": "The movie begins at 7:20 pm. It's ____ seven.",
          "options": [
            "twenty past",
            "twenty to"
          ],
          "correct_answer": "twenty past",
          "question_type": "multiple_choice",
          "test_id": 1,
          "instruction": "Tell the time."
        }
      ]
    },
    "message": "Success"
  },
  "fetchAdminDetailPlacementTestStatus": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "status": "reviewed",
      "message": "Placement test status updated successfully"
    },
    "message": "Success"
  },
  "submitRegistration": {
    "status": "success",
    "code": 200,
    "data": {
      "studentId": 10,
      "userId": 30,
      "name": "Siswa Terdaftar",
      "phone_number": "+6281299990000",
      "registrationStatus": "registered",
      "message": "Registration successful"
    },
    "message": "Success"
  },
  "submitRegistrationFromPlacement": {
    "status": "success",
    "code": 200,
    "data": {
      "studentId": 10,
      "userId": 30,
      "name": "Siswa Terdaftar",
      "phone_number": "+6281299990000",
      "registrationStatus": "registered",
      "message": "Registration successful"
    },
    "message": "Success"
  },
  "createNewStudyGroup": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 3,
      "name": "Study Group - Elementary C",
      "locationId": 1,
      "programId": 1,
      "groupId": 2,
      "levelId": 2,
      "created": true
    },
    "message": "Success"
  },
  "fetchStudyGroupDetail": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "name": "Study Group - Kids Level 1 A",
      "locationId": 1,
      "programId": 1,
      "groupId": 1,
      "levelId": 1,
      "packageId": 1,
      "teacherTeamMemberId": 1,
      "teacherName": "Miss Sarah",
      "dayOfWeek": "MON",
      "startTime": "08:00",
      "endTime": "09:30",
      "room": "Room A-101",
      "maxCapacity": 6,
      "currentStudentsCount": 2,
      "isPriority": false
    },
    "message": "Success"
  },
  "fetchStudentOfStudyGroup": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "name": "Siswa Dengan Jadwal 2",
        "date_of_birth": null,
        "registration_date": "2025-09-05 18:50:31.716521",
        "placement_status": "not_taken",
        "dashboard_access": false,
        "otp_code": null,
        "created_at": "2025-09-05 18:50:31.716521",
        "updated_at": "2025-09-05 18:50:31.716521",
        "user_id": 21,
        "phone_number": "+6281288889999",
        "status": "active",
        "isContacted": true,
        "user": {
          "phone_number": "+6281288889999",
          "is_verified": true,
          "created_at": "2025-09-05 18:50:31.121367",
          "updated_at": "2025-09-05 18:51:27.365526",
          "id": 21,
          "username": null,
          "role": "parent",
          "password": "[REDACTED]"
        }
      },
      {
        "id": 2,
        "name": "radit 21.22",
        "date_of_birth": null,
        "registration_date": "2025-09-05 18:52:25.732338",
        "placement_status": "not_taken",
        "dashboard_access": false,
        "otp_code": null,
        "created_at": "2025-09-05 18:52:25.732338",
        "updated_at": "2025-09-05 18:52:25.732338",
        "user_id": 22,
        "phone_number": "+6281211112210122",
        "status": "active",
        "isContacted": true,
        "user": {
          "phone_number": "+6281211112210122",
          "is_verified": true,
          "created_at": "2025-09-05 18:52:25.728967",
          "updated_at": "2025-09-05 18:52:45.845061",
          "id": 22,
          "username": "radit2122",
          "role": "parent",
          "password": "[REDACTED]"
        }
      }
    ],
    "message": "Success"
  },
  "fetchAvailableStudent": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 3,
        "name": "Cinta Lestari",
        "date_of_birth": null,
        "registration_date": "2025-09-07 20:06:58.318457",
        "placement_status": "not_taken",
        "dashboard_access": false,
        "otp_code": null,
        "created_at": "2025-09-07 20:06:58.318457",
        "updated_at": "2025-09-07 20:06:58.318457",
        "user_id": 23,
        "phone_number": "+6281211112210",
        "status": "active",
        "isContacted": true,
        "user": {
          "phone_number": "+6281211112210",
          "is_verified": true,
          "created_at": "2025-09-07 20:06:58.277485",
          "updated_at": "2025-09-07 20:07:54.158892",
          "id": 23,
          "username": "cintalestari.dev",
          "role": "parent",
          "password": "[REDACTED]"
        }
      }
    ],
    "message": "Success"
  },
  "assignStudentToStudyGroup": {
    "status": "success",
    "code": 200,
    "data": {
      "success": true,
      "studyGroupId": 1,
      "assignedStudentIds": [
        1
      ],
      "message": "Student assigned to study group successfully"
    },
    "message": "Success"
  },
  "unassignStudentFromStudyGroup": {
    "status": "success",
    "code": 200,
    "data": {
      "success": true,
      "studyGroupId": 1,
      "unassignedStudentIds": [
        1
      ],
      "message": "Student unassigned successfully"
    },
    "message": "Success"
  },
  "fetchUnassignStudent": {
    "status": "success",
    "code": 200,
    "data": {
      "success": true,
      "studyGroupId": 1,
      "unassignedStudentIds": [
        1
      ],
      "message": "Student unassigned successfully"
    },
    "message": "Success"
  },
  "updatePriority": {
    "status": "success",
    "code": 200,
    "data": {
      "studyGroupId": 1,
      "isPriority": true,
      "message": "Priority status updated"
    },
    "message": "Success"
  },
  "fetchTeacherSchedule": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "teacher_team_member_id": 2,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 2,
        "teacher_team_member_id": 2,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 3,
        "teacher_team_member_id": 2,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 4,
        "teacher_team_member_id": 2,
        "day_of_week": "MON",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 5,
        "teacher_team_member_id": 2,
        "day_of_week": "MON",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 6,
        "teacher_team_member_id": 2,
        "day_of_week": "MON",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 7,
        "teacher_team_member_id": 2,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 8,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 9,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 10,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 11,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 12,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 13,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 14,
        "teacher_team_member_id": 2,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 15,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 16,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 17,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 18,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 19,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 20,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 21,
        "teacher_team_member_id": 2,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 22,
        "teacher_team_member_id": 2,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 23,
        "teacher_team_member_id": 2,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 24,
        "teacher_team_member_id": 2,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 25,
        "teacher_team_member_id": 2,
        "day_of_week": "THU",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 26,
        "teacher_team_member_id": 2,
        "day_of_week": "THU",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 27,
        "teacher_team_member_id": 2,
        "day_of_week": "THU",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 28,
        "teacher_team_member_id": 2,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 29,
        "teacher_team_member_id": 2,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 30,
        "teacher_team_member_id": 2,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 31,
        "teacher_team_member_id": 2,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 32,
        "teacher_team_member_id": 2,
        "day_of_week": "FRI",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 33,
        "teacher_team_member_id": 2,
        "day_of_week": "FRI",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 34,
        "teacher_team_member_id": 2,
        "day_of_week": "FRI",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 35,
        "teacher_team_member_id": 2,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 36,
        "teacher_team_member_id": 2,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 37,
        "teacher_team_member_id": 2,
        "day_of_week": "SAT",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 38,
        "teacher_team_member_id": 2,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 39,
        "teacher_team_member_id": 2,
        "day_of_week": "SAT",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 40,
        "teacher_team_member_id": 2,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 41,
        "teacher_team_member_id": 2,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 42,
        "teacher_team_member_id": 2,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 43,
        "teacher_team_member_id": 3,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 44,
        "teacher_team_member_id": 3,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 45,
        "teacher_team_member_id": 3,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 46,
        "teacher_team_member_id": 3,
        "day_of_week": "MON",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 47,
        "teacher_team_member_id": 3,
        "day_of_week": "MON",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 48,
        "teacher_team_member_id": 3,
        "day_of_week": "MON",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 49,
        "teacher_team_member_id": 3,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 50,
        "teacher_team_member_id": 3,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 51,
        "teacher_team_member_id": 3,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 52,
        "teacher_team_member_id": 3,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 53,
        "teacher_team_member_id": 3,
        "day_of_week": "TUE",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 54,
        "teacher_team_member_id": 3,
        "day_of_week": "TUE",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 55,
        "teacher_team_member_id": 3,
        "day_of_week": "TUE",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 56,
        "teacher_team_member_id": 3,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 57,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 58,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 59,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 60,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 61,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 62,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 63,
        "teacher_team_member_id": 3,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 64,
        "teacher_team_member_id": 3,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 65,
        "teacher_team_member_id": 3,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 66,
        "teacher_team_member_id": 3,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 67,
        "teacher_team_member_id": 3,
        "day_of_week": "THU",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 68,
        "teacher_team_member_id": 3,
        "day_of_week": "THU",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 69,
        "teacher_team_member_id": 3,
        "day_of_week": "THU",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 70,
        "teacher_team_member_id": 3,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 71,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 72,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 73,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 74,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 75,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 76,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 77,
        "teacher_team_member_id": 3,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 78,
        "teacher_team_member_id": 3,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 79,
        "teacher_team_member_id": 3,
        "day_of_week": "SAT",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 80,
        "teacher_team_member_id": 3,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 81,
        "teacher_team_member_id": 3,
        "day_of_week": "SAT",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 82,
        "teacher_team_member_id": 3,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 83,
        "teacher_team_member_id": 3,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 84,
        "teacher_team_member_id": 3,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 85,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 86,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 87,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 88,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 89,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 90,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 91,
        "teacher_team_member_id": 5,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 92,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 93,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 94,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 95,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 96,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 97,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 98,
        "teacher_team_member_id": 5,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 99,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 100,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 101,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 102,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 103,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 104,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 105,
        "teacher_team_member_id": 5,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 106,
        "teacher_team_member_id": 5,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 107,
        "teacher_team_member_id": 5,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 108,
        "teacher_team_member_id": 5,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 109,
        "teacher_team_member_id": 5,
        "day_of_week": "THU",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 110,
        "teacher_team_member_id": 5,
        "day_of_week": "THU",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 111,
        "teacher_team_member_id": 5,
        "day_of_week": "THU",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 112,
        "teacher_team_member_id": 5,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 113,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 114,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 115,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 116,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 117,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 118,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 119,
        "teacher_team_member_id": 5,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 120,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 121,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 122,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 123,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 124,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 125,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 126,
        "teacher_team_member_id": 5,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 127,
        "teacher_team_member_id": 7,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 128,
        "teacher_team_member_id": 7,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 129,
        "teacher_team_member_id": 7,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 130,
        "teacher_team_member_id": 7,
        "day_of_week": "MON",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 131,
        "teacher_team_member_id": 7,
        "day_of_week": "MON",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 132,
        "teacher_team_member_id": 7,
        "day_of_week": "MON",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 133,
        "teacher_team_member_id": 7,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 134,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 135,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 136,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 137,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 138,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 139,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 140,
        "teacher_team_member_id": 7,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 141,
        "teacher_team_member_id": 7,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 142,
        "teacher_team_member_id": 7,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 143,
        "teacher_team_member_id": 7,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 144,
        "teacher_team_member_id": 7,
        "day_of_week": "WED",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 145,
        "teacher_team_member_id": 7,
        "day_of_week": "WED",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 146,
        "teacher_team_member_id": 7,
        "day_of_week": "WED",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 147,
        "teacher_team_member_id": 7,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 148,
        "teacher_team_member_id": 7,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 149,
        "teacher_team_member_id": 7,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 150,
        "teacher_team_member_id": 7,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 151,
        "teacher_team_member_id": 7,
        "day_of_week": "THU",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 152,
        "teacher_team_member_id": 7,
        "day_of_week": "THU",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 153,
        "teacher_team_member_id": 7,
        "day_of_week": "THU",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 154,
        "teacher_team_member_id": 7,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 155,
        "teacher_team_member_id": 7,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 156,
        "teacher_team_member_id": 7,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 157,
        "teacher_team_member_id": 7,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 158,
        "teacher_team_member_id": 7,
        "day_of_week": "FRI",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 159,
        "teacher_team_member_id": 7,
        "day_of_week": "FRI",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 160,
        "teacher_team_member_id": 7,
        "day_of_week": "FRI",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 161,
        "teacher_team_member_id": 7,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 162,
        "teacher_team_member_id": 7,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 163,
        "teacher_team_member_id": 7,
        "day_of_week": "SAT",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 164,
        "teacher_team_member_id": 7,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 165,
        "teacher_team_member_id": 7,
        "day_of_week": "SAT",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 166,
        "teacher_team_member_id": 7,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 167,
        "teacher_team_member_id": 7,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 168,
        "teacher_team_member_id": 7,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 169,
        "teacher_team_member_id": 9,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 170,
        "teacher_team_member_id": 9,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 171,
        "teacher_team_member_id": 9,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 172,
        "teacher_team_member_id": 9,
        "day_of_week": "MON",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 173,
        "teacher_team_member_id": 9,
        "day_of_week": "MON",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 174,
        "teacher_team_member_id": 9,
        "day_of_week": "MON",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 175,
        "teacher_team_member_id": 9,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 176,
        "teacher_team_member_id": 9,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 177,
        "teacher_team_member_id": 9,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 178,
        "teacher_team_member_id": 9,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 179,
        "teacher_team_member_id": 9,
        "day_of_week": "TUE",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 180,
        "teacher_team_member_id": 9,
        "day_of_week": "TUE",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 181,
        "teacher_team_member_id": 9,
        "day_of_week": "TUE",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 182,
        "teacher_team_member_id": 9,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 183,
        "teacher_team_member_id": 9,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 184,
        "teacher_team_member_id": 9,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 185,
        "teacher_team_member_id": 9,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 186,
        "teacher_team_member_id": 9,
        "day_of_week": "WED",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 187,
        "teacher_team_member_id": 9,
        "day_of_week": "WED",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 188,
        "teacher_team_member_id": 9,
        "day_of_week": "WED",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 189,
        "teacher_team_member_id": 9,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 190,
        "teacher_team_member_id": 9,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 191,
        "teacher_team_member_id": 9,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 192,
        "teacher_team_member_id": 9,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 193,
        "teacher_team_member_id": 9,
        "day_of_week": "THU",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 194,
        "teacher_team_member_id": 9,
        "day_of_week": "THU",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 195,
        "teacher_team_member_id": 9,
        "day_of_week": "THU",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 196,
        "teacher_team_member_id": 9,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 197,
        "teacher_team_member_id": 9,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 198,
        "teacher_team_member_id": 9,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 199,
        "teacher_team_member_id": 9,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 200,
        "teacher_team_member_id": 9,
        "day_of_week": "FRI",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 201,
        "teacher_team_member_id": 9,
        "day_of_week": "FRI",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 202,
        "teacher_team_member_id": 9,
        "day_of_week": "FRI",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 203,
        "teacher_team_member_id": 9,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 204,
        "teacher_team_member_id": 9,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 205,
        "teacher_team_member_id": 9,
        "day_of_week": "SAT",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 206,
        "teacher_team_member_id": 9,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 207,
        "teacher_team_member_id": 9,
        "day_of_week": "SAT",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 208,
        "teacher_team_member_id": 9,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 209,
        "teacher_team_member_id": 9,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 210,
        "teacher_team_member_id": 9,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 211,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 212,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 213,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 214,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 215,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 216,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 217,
        "teacher_team_member_id": 10,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 218,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 219,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 220,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 221,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 222,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 223,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 224,
        "teacher_team_member_id": 10,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 225,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 226,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 227,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 228,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 229,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 230,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 231,
        "teacher_team_member_id": 10,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 232,
        "teacher_team_member_id": 10,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 233,
        "teacher_team_member_id": 10,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 234,
        "teacher_team_member_id": 10,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 235,
        "teacher_team_member_id": 10,
        "day_of_week": "THU",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 236,
        "teacher_team_member_id": 10,
        "day_of_week": "THU",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 237,
        "teacher_team_member_id": 10,
        "day_of_week": "THU",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 238,
        "teacher_team_member_id": 10,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 239,
        "teacher_team_member_id": 10,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 240,
        "teacher_team_member_id": 10,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 241,
        "teacher_team_member_id": 10,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 242,
        "teacher_team_member_id": 10,
        "day_of_week": "FRI",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 243,
        "teacher_team_member_id": 10,
        "day_of_week": "FRI",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 244,
        "teacher_team_member_id": 10,
        "day_of_week": "FRI",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 245,
        "teacher_team_member_id": 10,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 246,
        "teacher_team_member_id": 10,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 247,
        "teacher_team_member_id": 10,
        "day_of_week": "SAT",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 248,
        "teacher_team_member_id": 10,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 249,
        "teacher_team_member_id": 10,
        "day_of_week": "SAT",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 250,
        "teacher_team_member_id": 10,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 251,
        "teacher_team_member_id": 10,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 252,
        "teacher_team_member_id": 10,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 253,
        "teacher_team_member_id": 11,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 254,
        "teacher_team_member_id": 11,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 255,
        "teacher_team_member_id": 11,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 256,
        "teacher_team_member_id": 11,
        "day_of_week": "MON",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 257,
        "teacher_team_member_id": 11,
        "day_of_week": "MON",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 258,
        "teacher_team_member_id": 11,
        "day_of_week": "MON",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 259,
        "teacher_team_member_id": 11,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 260,
        "teacher_team_member_id": 11,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 261,
        "teacher_team_member_id": 11,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 262,
        "teacher_team_member_id": 11,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 263,
        "teacher_team_member_id": 11,
        "day_of_week": "TUE",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 264,
        "teacher_team_member_id": 11,
        "day_of_week": "TUE",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 265,
        "teacher_team_member_id": 11,
        "day_of_week": "TUE",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 266,
        "teacher_team_member_id": 11,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 267,
        "teacher_team_member_id": 11,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 268,
        "teacher_team_member_id": 11,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 269,
        "teacher_team_member_id": 11,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 270,
        "teacher_team_member_id": 11,
        "day_of_week": "WED",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 271,
        "teacher_team_member_id": 11,
        "day_of_week": "WED",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 272,
        "teacher_team_member_id": 11,
        "day_of_week": "WED",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 273,
        "teacher_team_member_id": 11,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 274,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 275,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 276,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 277,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 278,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 279,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 280,
        "teacher_team_member_id": 11,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 281,
        "teacher_team_member_id": 11,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 282,
        "teacher_team_member_id": 11,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 283,
        "teacher_team_member_id": 11,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 284,
        "teacher_team_member_id": 11,
        "day_of_week": "FRI",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 285,
        "teacher_team_member_id": 11,
        "day_of_week": "FRI",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 286,
        "teacher_team_member_id": 11,
        "day_of_week": "FRI",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 287,
        "teacher_team_member_id": 11,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 288,
        "teacher_team_member_id": 11,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 289,
        "teacher_team_member_id": 11,
        "day_of_week": "SAT",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 290,
        "teacher_team_member_id": 11,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 291,
        "teacher_team_member_id": 11,
        "day_of_week": "SAT",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 292,
        "teacher_team_member_id": 11,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 293,
        "teacher_team_member_id": 11,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 294,
        "teacher_team_member_id": 11,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 295,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 296,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 297,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 298,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 299,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 300,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 301,
        "teacher_team_member_id": 12,
        "day_of_week": "MON",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 302,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 303,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 304,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 305,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 306,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 307,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 308,
        "teacher_team_member_id": 12,
        "day_of_week": "TUE",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 309,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 310,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 311,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 312,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 313,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 314,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 315,
        "teacher_team_member_id": 12,
        "day_of_week": "WED",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 316,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 317,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 318,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 319,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": true,
        "location_id": 1
      },
      {
        "id": 320,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 321,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 322,
        "teacher_team_member_id": 12,
        "day_of_week": "THU",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 323,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 324,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 325,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 326,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 327,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 328,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 329,
        "teacher_team_member_id": 12,
        "day_of_week": "FRI",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 330,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 331,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 332,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "11:00:00",
        "end_time": "12:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 333,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "13:45:00",
        "end_time": "15:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 334,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "15:15:00",
        "end_time": "16:45:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 335,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "16:45:00",
        "end_time": "18:15:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      },
      {
        "id": 336,
        "teacher_team_member_id": 12,
        "day_of_week": "SAT",
        "start_time": "19:00:00",
        "end_time": "20:30:00",
        "duration_minutes": 90,
        "is_full": false,
        "location_id": 1
      }
    ],
    "message": "Success"
  },
  "fetchTeachers": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "member_name": "Mr. Yayat",
        "is_coordinator": true,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 2,
        "member_name": "Ms. Nuraeni",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 3,
        "member_name": "Mr. Rafif",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 4,
        "member_name": "Mr. Wildan",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 5,
        "member_name": "Ms. Lieken",
        "is_coordinator": true,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 6,
        "member_name": "Ms. Binti",
        "is_coordinator": false,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 7,
        "member_name": "Mr. Noval",
        "is_coordinator": false,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 8,
        "member_name": "Ms. May",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 9,
        "member_name": "Mr. Firdan",
        "is_coordinator": true,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 10,
        "member_name": "Ms. Feby",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 11,
        "member_name": "Ms. Puji",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 12,
        "member_name": "Ms. Ica",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      }
    ],
    "meta": {
      "totalItems": 12,
      "itemCount": 12,
      "itemsPerPage": 20,
      "totalPages": 1,
      "currentPage": 1
    },
    "message": "Success"
  },
  "fetchTeachers_create": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 99,
      "member_name": "Teacher Baru",
      "is_coordinator": false,
      "teacher_id": 1,
      "image_url": null
    },
    "message": "Success"
  },
  "fetchTeachersNoPage": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "member_name": "Mr. Yayat",
        "is_coordinator": true,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 2,
        "member_name": "Ms. Nuraeni",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 3,
        "member_name": "Mr. Rafif",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 4,
        "member_name": "Mr. Wildan",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 5,
        "member_name": "Ms. Lieken",
        "is_coordinator": true,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 6,
        "member_name": "Ms. Binti",
        "is_coordinator": false,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 7,
        "member_name": "Mr. Noval",
        "is_coordinator": false,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 8,
        "member_name": "Ms. May",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 9,
        "member_name": "Mr. Firdan",
        "is_coordinator": true,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 10,
        "member_name": "Ms. Feby",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 11,
        "member_name": "Ms. Puji",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 12,
        "member_name": "Ms. Ica",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      }
    ],
    "message": "Success"
  },
  "allTeacher": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "member_name": "Mr. Yayat",
        "is_coordinator": true,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 2,
        "member_name": "Ms. Nuraeni",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 3,
        "member_name": "Mr. Rafif",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 4,
        "member_name": "Mr. Wildan",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 5,
        "member_name": "Ms. Lieken",
        "is_coordinator": true,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 6,
        "member_name": "Ms. Binti",
        "is_coordinator": false,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 7,
        "member_name": "Mr. Noval",
        "is_coordinator": false,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 8,
        "member_name": "Ms. May",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 9,
        "member_name": "Mr. Firdan",
        "is_coordinator": true,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 10,
        "member_name": "Ms. Feby",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 11,
        "member_name": "Ms. Puji",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 12,
        "member_name": "Ms. Ica",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      }
    ],
    "message": "Success"
  },
  "fetchTeachersById_get": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "member_name": "Mr. Yayat",
      "is_coordinator": true,
      "teacher_id": 1,
      "image_url": null
    },
    "message": "Success"
  },
  "fetchTeachersById_patch": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "member_name": "Mr. Yayat",
      "is_coordinator": true,
      "teacher_id": 1,
      "image_url": null
    },
    "message": "Success"
  },
  "fetchTeachersById_delete": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "member_name": "Mr. Yayat",
      "is_coordinator": true,
      "teacher_id": 1,
      "image_url": null
    },
    "message": "Success"
  },
  "fetchTeachersScheduleById": {
    "status": "success",
    "code": 200,
    "data": [],
    "message": "Success"
  },
  "fetchPrices": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "program_id": 1,
        "package_id": 1,
        "timeframe": "1_month",
        "amount": 350000
      },
      {
        "id": 2,
        "program_id": 1,
        "package_id": 2,
        "timeframe": "3_months",
        "amount": 950000
      },
      {
        "id": 3,
        "program_id": 2,
        "package_id": 1,
        "timeframe": "1_month",
        "amount": 450000
      },
      {
        "id": 4,
        "program_id": 2,
        "package_id": 3,
        "timeframe": "3_months",
        "amount": 1500000
      }
    ],
    "message": "Success"
  },
  "patchpricesByProgram": {
    "status": "success",
    "code": 200,
    "data": {
      "success": true,
      "programId": 1,
      "packageId": 1,
      "prices": [
        {
          "timeframe": "1_month",
          "amount": 375000
        }
      ]
    },
    "message": "Success"
  },
  "patchNoteByUserId": {
    "status": "success",
    "code": 200,
    "data": {
      "studentId": 1,
      "notes": "Catatan siswa telah diperbarui via admin",
      "updatedAt": "2026-10-14T17:48:15.718Z"
    },
    "message": "Success"
  },
  "fetchAlias": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "member_name": "Mr. Yayat",
        "is_coordinator": true,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 2,
        "member_name": "Ms. Nuraeni",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 3,
        "member_name": "Mr. Rafif",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 4,
        "member_name": "Mr. Wildan",
        "is_coordinator": false,
        "teacher_id": 1,
        "image_url": null
      },
      {
        "id": 5,
        "member_name": "Ms. Lieken",
        "is_coordinator": true,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 6,
        "member_name": "Ms. Binti",
        "is_coordinator": false,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 7,
        "member_name": "Mr. Noval",
        "is_coordinator": false,
        "teacher_id": 2,
        "image_url": null
      },
      {
        "id": 8,
        "member_name": "Ms. May",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 9,
        "member_name": "Mr. Firdan",
        "is_coordinator": true,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 10,
        "member_name": "Ms. Feby",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 11,
        "member_name": "Ms. Puji",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      },
      {
        "id": 12,
        "member_name": "Ms. Ica",
        "is_coordinator": false,
        "teacher_id": 3,
        "image_url": null
      }
    ],
    "message": "Success"
  },
  "fetchAdminLocations": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "name": "Stadion",
        "status": "active"
      },
      {
        "id": 2,
        "name": "Luragung",
        "status": "active"
      },
      {
        "id": 3,
        "name": "Alam Asri",
        "status": "active"
      }
    ],
    "message": "Success"
  },
  "fetchAdminLocationsById_patch": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "name": "Stadion Updated",
      "status": "active",
      "message": "Location modified successfully"
    },
    "message": "Success"
  },
  "fetchAdminLocationsById_delete": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "name": "Stadion Updated",
      "status": "active",
      "message": "Location modified successfully"
    },
    "message": "Success"
  },
  "fetchAdminStudentById": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "name": "Siswa Dengan Jadwal 2",
      "date_of_birth": null,
      "registration_date": "2025-09-05 18:50:31.716521",
      "placement_status": "not_taken",
      "dashboard_access": false,
      "otp_code": null,
      "created_at": "2025-09-05 18:50:31.716521",
      "updated_at": "2025-09-05 18:50:31.716521",
      "user_id": 21,
      "phone_number": "+6281288889999",
      "status": "active",
      "isContacted": true,
      "user": {
        "phone_number": "+6281288889999",
        "is_verified": true,
        "created_at": "2025-09-05 18:50:31.121367",
        "updated_at": "2025-09-05 18:51:27.365526",
        "id": 21,
        "username": null,
        "role": "parent",
        "password": "[REDACTED]"
      }
    },
    "message": "Success"
  },
  "studentById": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "name": "Siswa Dengan Jadwal 2",
      "date_of_birth": null,
      "registration_date": "2025-09-05 18:50:31.716521",
      "placement_status": "not_taken",
      "dashboard_access": false,
      "otp_code": null,
      "created_at": "2025-09-05 18:50:31.716521",
      "updated_at": "2025-09-05 18:50:31.716521",
      "user_id": 21,
      "phone_number": "+6281288889999",
      "status": "active",
      "isContacted": true,
      "user": {
        "phone_number": "+6281288889999",
        "is_verified": true,
        "created_at": "2025-09-05 18:50:31.121367",
        "updated_at": "2025-09-05 18:51:27.365526",
        "id": 21,
        "username": null,
        "role": "parent",
        "password": "[REDACTED]"
      }
    },
    "message": "Success"
  },
  "updateContactedStatus": {
    "status": "success",
    "code": 200,
    "data": {
      "studentId": 1,
      "isContacted": true,
      "message": "Status contacted updated"
    },
    "message": "Success"
  },
  "baseStaff_get": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "name": "Admin Utama",
        "email": "admin@uplearning.com",
        "role": "admin",
        "phone_number": "08123456789",
        "status": "active",
        "user_id": 1
      },
      {
        "id": 2,
        "name": "Staff CS & Marketing",
        "email": "cs@uplearning.com",
        "role": "marketing",
        "phone_number": "081288889999",
        "status": "active",
        "user_id": 21
      }
    ],
    "meta": {
      "totalItems": 2,
      "itemCount": 2,
      "itemsPerPage": 10,
      "totalPages": 1,
      "currentPage": 1
    },
    "message": "Success"
  },
  "baseStaff_post": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 3,
      "name": "Staff Baru",
      "email": "baru@uplearning.com",
      "role": "admin",
      "status": "active"
    },
    "message": "Success"
  },
  "fetchStaffs": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "name": "Admin Utama",
        "email": "admin@uplearning.com",
        "role": "admin",
        "phone_number": "08123456789",
        "status": "active",
        "user_id": 1
      },
      {
        "id": 2,
        "name": "Staff CS & Marketing",
        "email": "cs@uplearning.com",
        "role": "marketing",
        "phone_number": "081288889999",
        "status": "active",
        "user_id": 21
      }
    ],
    "meta": {
      "totalItems": 2,
      "itemCount": 2,
      "itemsPerPage": 10,
      "totalPages": 1,
      "currentPage": 1
    },
    "message": "Success"
  },
  "staffById_get": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "name": "Admin Utama",
      "email": "admin@uplearning.com",
      "role": "admin",
      "phone_number": "08123456789",
      "status": "active",
      "user_id": 1
    },
    "message": "Success"
  },
  "staffById_patch": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "name": "Admin Utama",
      "email": "admin@uplearning.com",
      "role": "admin",
      "phone_number": "08123456789",
      "status": "active",
      "user_id": 1
    },
    "message": "Success"
  },
  "staffById_delete": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "name": "Admin Utama",
      "email": "admin@uplearning.com",
      "role": "admin",
      "phone_number": "08123456789",
      "status": "active",
      "user_id": 1
    },
    "message": "Success"
  },
  "staffByRole": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "name": "Admin Utama",
        "email": "admin@uplearning.com",
        "role": "admin",
        "phone_number": "08123456789",
        "status": "active",
        "user_id": 1
      },
      {
        "id": 2,
        "name": "Staff CS & Marketing",
        "email": "cs@uplearning.com",
        "role": "marketing",
        "phone_number": "081288889999",
        "status": "active",
        "user_id": 21
      }
    ],
    "meta": {
      "totalItems": 2,
      "itemCount": 2,
      "itemsPerPage": 10,
      "totalPages": 1,
      "currentPage": 1
    },
    "message": "Success"
  },
  "baseNonUser": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "studentId": 101,
        "name": "Calon Murid Dimas",
        "parentName": "Ibu Ratna",
        "phone": "+628123445566",
        "sourceLead": "Instagram",
        "funnelStage": "Trial Class",
        "statusLead": "Follow Up",
        "programId": 1,
        "preferredGroup": "Kindergarten",
        "adminPicId": 2,
        "notesTerbaru": "Tertarik kelas weekend pagi.",
        "tanggalTrialClass": "2026-10-20T10:00:00.000Z"
      },
      {
        "id": 2,
        "studentId": 102,
        "name": "Calon Siswa Jessica",
        "parentName": "Bapak Andy",
        "phone": "+628129988776",
        "sourceLead": "Walk-in",
        "funnelStage": "Contacted",
        "statusLead": "New",
        "programId": 2,
        "preferredGroup": "Speaking Program",
        "adminPicId": 1,
        "notesTerbaru": "Minta info jadwal dan biaya promo.",
        "tanggalTrialClass": null
      }
    ],
    "meta": {
      "totalItems": 2,
      "itemCount": 2,
      "itemsPerPage": 10,
      "totalPages": 1,
      "currentPage": 1
    },
    "message": "Success"
  },
  "fetchNonUsers": {
    "status": "success",
    "code": 200,
    "data": [
      {
        "id": 1,
        "studentId": 101,
        "name": "Calon Murid Dimas",
        "parentName": "Ibu Ratna",
        "phone": "+628123445566",
        "sourceLead": "Instagram",
        "funnelStage": "Trial Class",
        "statusLead": "Follow Up",
        "programId": 1,
        "preferredGroup": "Kindergarten",
        "adminPicId": 2,
        "notesTerbaru": "Tertarik kelas weekend pagi.",
        "tanggalTrialClass": "2026-10-20T10:00:00.000Z"
      },
      {
        "id": 2,
        "studentId": 102,
        "name": "Calon Siswa Jessica",
        "parentName": "Bapak Andy",
        "phone": "+628129988776",
        "sourceLead": "Walk-in",
        "funnelStage": "Contacted",
        "statusLead": "New",
        "programId": 2,
        "preferredGroup": "Speaking Program",
        "adminPicId": 1,
        "notesTerbaru": "Minta info jadwal dan biaya promo.",
        "tanggalTrialClass": null
      }
    ],
    "meta": {
      "totalItems": 2,
      "itemCount": 2,
      "itemsPerPage": 10,
      "totalPages": 1,
      "currentPage": 1
    },
    "message": "Success"
  },
  "nonUserById": {
    "status": "success",
    "code": 200,
    "data": {
      "id": 1,
      "studentId": 101,
      "name": "Calon Murid Dimas",
      "parentName": "Ibu Ratna",
      "phone": "+628123445566",
      "sourceLead": "Instagram",
      "funnelStage": "Trial Class",
      "statusLead": "Follow Up",
      "programId": 1,
      "preferredGroup": "Kindergarten",
      "adminPicId": 2,
      "notesTerbaru": "Tertarik kelas weekend pagi.",
      "tanggalTrialClass": "2026-10-20T10:00:00.000Z"
    },
    "message": "Success"
  }
};

export default FIXTURES;
