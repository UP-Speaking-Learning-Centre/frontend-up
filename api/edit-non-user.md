Endpoint ini sekarang mendukung patch parsial untuk beberapa section:

- `status`
- `marketing`
- `activePeriod`
- `offer`
- `trialClass`

base payload adalah data dari detail student, kemudian akan ditambahkan beberapa data sesuai kebutuhan dibawah ini.

Contoh patch status:

```json
{
    "status": "active"
}
```

Contoh patch marketing:

```json
{
  "marketing": {
    "statusLead": "Cold",
    "funnelStage": "Asking",
    "lastUpdate": "2026-03-28T10:00:00Z"
  }
}

Response
{
...
"marketing": {
        "studentId": 113,
        "sourceLead": "WA",
        "funnelStage": "Asking",
        "statusLead": "Cold",
        "programId": 1,
        "programName": "School Program",
        "adminPicId": 2,
        "picRole": "Staff Admin Papa Bear",
        "picStaff": "Zaki",
        "legacyPicRole": null,
        "legacyPicStaff": null,
        "lastUpdate": "2026-03-28T10:00:00.000Z",
        "tanggalTrialClass": "2026-03-20T02:00:00.000Z",
        "teacherTrialClass": "Miss putri",
        "grupTrialClass": "Elementary A",
        "datangTrialClass": false,
        "notesTerbaru": "Prospek dari WhatsApp"
    },
...
}
```

Contoh patch active period:

```json
{
    "activePeriod": {
        "activeFrom": "2026-04-01",
        "activeUntil": "2026-09-30",
        "selectedPeriod": 6
    }
}
```

Contoh patch offer:

```json
{
    "offer": {
        "programId": 1,
        "groupId": 2,
        "levelId": 3,
        "gradeId": 4,
        "packageId": 1,
        "duration": 3,
        "price": 5000000
    }
}
```

Contoh patch trial class:

```json
{
    "trialClass": {
        "schedule": "2026-04-05T10:00:00+07:00",
        "studyGroupId": 33,
        "isDone": false
    }
}
```
