Tampilan untuk Active User

1. Status → Field is editable
2. Student Detail
    1. Section Name: Student Detail
    2. Field:
        1. Nama
        2. No HP
        3. Instagram
3. Program Detail
    1. Is Editable: True
    2. Section Name: Program Detail
    3. Field
        1. Program → Dropdown when edit flag is active
        2. Group → Dropdown when edit flag is active
        3. Level → Dropdown when edit flag is active
        4. Grade → Dropdown when edit flag is active
4. Subscription Detail
    1. Is Editable: True
    2. Section Name: Subscription Detail
    3. Field: → Field Editable
        1. Active From → Date and Time Picker when edit flag is active
        2. Active Until → Date and Time Picker when edit flag is active
        3. Selected Period → Dropdow (3,6,12)
5. Study Group Detail
    1. Section Name: Nama Study Group
    2. Field:
        1. Teacher
        2. Jadwal 1
        3. Jadwal 2
        4. Lokasi
        5. Button to edit study group → Will display popup when clicked
            1. Popup is form that contains dropdown of list study group and submit button
            2. Submit will display a confirmation dialog with cancel and confirm button
6. Notes
    1. List of notes
    2. Text area untuk input notes
    3. Submit Button
7. Ada button untuk membuat user menjadi lapsed user (ada dialog confirmation)
8. Ada warning jika selected period sudah habis

Non User

1. Status → Not Editable
2. Student Detail
    1. Section Name: Student Detail
    2. Field:
        1. Nama
        2. No HP
        3. Instagram
3. Marketing Funnel Detail
    1. Is Editable → True
    2. Section Name: Marketing Funnel Detail
    3. Field:
        1. Lead Status → Dropdown when edit flag is active. A div and highlighted if edit flag is not active
        2. Source Lead → Dropdown when edit flag is active. A div and highlighted if edit flag is not active
        3. Funnel Stage → Dropdown when edit flag is active. A div and highlighted if edit flag is not active
        4. PIC Role → Dropdown when edit flag is active
        5. PIC Person → Dropwodn when edit flag is active → Only can be edited if role is Admin or Super Admin
        6. Last Follow Up → Date and time picker
4. Program & Paket yang ditawarkan
    1. Is Editable → True
    2. Section Name: Program & Paket yang ditawarkan
    3. Field:
        1. Program → Dropdown when edit flag is active.
        2. Paket → Dropdown when edit flag is active.
        3. Durasi → Dropdown when edit flag is active.
5. Program Rekomendasi → Editable
    1. Is Editable → True
    2. Section Name: Program Recomendation
    3. Field:
        1. Program → Dropdown when edit flag is active.
        2. Group → Dropdown when edit flag is active.
        3. Level → Dropdown when edit flag is active.
        4. Grade → Dropdown when edit flag is active.
6. Trial Class Detail
    1. Is Editable: True if Sudah Trial === true, else false
    2. Section Name: Trial Class Detail
    3. Field:
        1. Cabang → Dropdown when edit flag is active.
        2. Nama Study Group → Dropdown when edit flag is active.
        3. Jadwal Trial Class
        4. Sudah/Belum Trial → Add a button to change in to Sudah Trial
7. Assign Ke Program & Study Group dan Tandai Sebagai Active Student
    1. Button
        1. Munculin popup yang isinya gabungan dari program rekomendasi, cabang, nama study group, jadwal study group, teacher,
        2. Ada confirmation button
8. Notes
    1. List of notes
    2. Text area untuk input notes
    3. Submit Button
9. Ada pemberitahun tentang placement test yang belum dinilai kalo ternyata ada placement test yang belum dinilai
10. Ada warning jika studen belum dihubungi dalam waktu 5 hari.

Lapsed User

1. Status → Not Editable
2. Student Detail
    1. Section Name: Student Detail
    2. Field:
        1. Nama
        2. No HP
        3. Instagram
3. Program Terakhir Detail
    1. Section Name: Last Program
    2. Field:
        1. Program
        2. Group
        3. Level
        4. Grade
4. History Subscription
    1. Section Name: History Subscription
    2. Field:
        1. Active From
        2. Active Until
        3. Selected Period
5. Study Group Terakhir
    1. Section Name: Last Study Group
    2. Field:
        1. Nama Study Group
        2. Teacher
        3. Jadwal 1
        4. Jadwal 2
        5. Lokasi
6. Button Untuk buat menjadi aktif kembali.
7. Notes
    1. List of notes
    2. Text area untuk input notes

Requirement untuk Active User

1. Jika user diubah menjadi lapsed user, maka dia akan otomatis terunassign dari study group dan status berubah menjadi lapsed user, tampilan juga akan menjadi tampilan dari lapsed user
2. Jika program diubah, maka dia akan terunassign dari study group
3. Jika ingin mengubah study group, pilihan study group hanya akan muncul yang sesuai dengan kriteria programnya.

Requirement untuk Non User

1. Perubahan Lead Status dan Funnel Stage mengikuti kebijakan ini. Lead Status akan berubah otomatis sesuai funnel stage
2. PIC Person editable hanya untuk role Lead (Admin atau Marketing) dan Superadmin
3. Sisanya bisa diubah oleh Lead ataupun Staff

Requirement untuk Lapsed User

1. Jika akan dibuat menjadi aktif kembali, admin akan diminta untuk mengisi kembali program detail dan detail study group tempat dia akan diassign.

General Notes;

1. If edit flag is not active, it is a div that only display the information
