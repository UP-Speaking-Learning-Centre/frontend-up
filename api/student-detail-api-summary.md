# Student Detail API Summary

This document provides a summary of the required API endpoints, request payloads, and response structures for the Student Detail page refactoring. The API uses a nested structure to group related data logically.

## 1. Retrieve Student Detail

**GET** `/api/students/{id}`

Retrieves the full details of a student. The response structure varies slightly based on the student's status (`active`, `non_user`, `lapsed`).

### Unified Response Structure

```json
{
    "id": 106,
    "name": "Jane Doe",
    "phoneNumber": "08123456789",
    "isContacted": true,
    "status": "active", // "active" | "non_user" | "lapsed"
    "notesList": [
        {
            "notes": "Follow up scheduled for tomorrow.",
            "role": "CS",
            "name": "Admin Jane",
            "timestamp": "2023-11-01T10:00:00Z"
        }
    ],
    "program": "Program Name",
    "group": "Group Name",
    "level": "Level Name",
    "gradeLabel": "Grade Label",
    "instagram": "@johndoe",

    // Conditionally present based on status:

    // 1. For Active Users
    "subscription": {
        "activeFrom": "2023-01-01",
        "activeUntil": "2023-12-31",
        "selectedPeriod": 12
    },
    "studyGroup": {
        "teacher": "Mr. Smith",
        "location": "Cabang Kuningan",
        "schedules": ["Senin 10:00", "Kamis 10:00"]
    },

    // 2. For Non Users
    "marketing": {
        "leadStatus": "Hot",
        "sourceLead": "Instagram",
        "funnelStage": "Engaged",
        "picRole": "Sales",
        "picPerson": "John",
        "lastFollowUp": "2023-10-30T15:00:00Z"
    },
    "offer": {
        "program": "Program A",
        "package": "Private",
        "duration": "3 Bulan",
        "price": "5.000.000"
    },
    "recommendation": {
        "program": "Program B",
        "group": "Group 2",
        "level": "Intermediate",
        "grade": "B"
    },
    "trial": {
        "branch": "Cabang Utama",
        "studyGroup": "Kelas Coba B",
        "schedule": "Rabu 15:00",
        "isDone": false
    },
    "selection": {
        "branch": "Cabang Kuningan",
        "studyGroup": "Kelompok Alpha",
        "teacher": "Mr. Smith",
        "schedules": ["Sabtu 11:00"],
        "isSelfSchedule": false
    },

    // 3. For Lapsed Users
    "history": {
        "activeFrom": "2022-01-01",
        "activeUntil": "2022-12-31",
        "selectedPeriod": 12
    },
    "lastProgram": {
        "name": "Previous Program",
        "group": "Previous Group",
        "level": "Previous Level",
        "grade": "A"
    },
    "lastStudyGroup": {
        "name": "Old Group Name",
        "teacher": "Old Teacher",
        "location": "Old Branch",
        "schedules": ["Senin 10:00"]
    }
}
```

---

## 2. Update Student Sections

**PATCH** `/api/students/{id}`

Used to update specific sections of the student detail. The UI is designed to send only the nested object relevant to the edited section.

### Payload Examples:

#### Update Subscription (Active User)

```json
{
    "subscription": {
        "activeFrom": "2023-01-01",
        "activeUntil": "2023-12-31",
        "selectedPeriod": 12
    }
}
```

#### Update Marketing Details (Non User)

```json
{
    "marketing": {
        "leadStatus": "Closed",
        "funnelStage": "Converted",
        "lastFollowUp": "2023-11-01T10:00:00Z"
    }
}
```

#### Update Offer Details (Non User)

```json
{
    "offer": {
        "program": "New Program",
        "price": "4.500.000"
    }
}
```

---

## 3. Manage Student Notes

**POST** `/api/students/{id}/notes`

Adds a new note to the student's record.

### Request Payload:

```json
{
    "notes": "This is a new note.",
    "role": "CS",
    "name": "Admin Name"
}
```

---

## 4. Change Study Group (Quick Action)

**POST** `/api/students/{id}/change-study-group`

Updates the student's assigned study group.

### Request Payload:

```json
{
    "studyGroupId": 123,
    "trialClassAt": "2023-11-10T09:00:00Z" // Optional, for trial assignments
}
```

---

## 5. Change Student Status

**PATCH** `/api/students/{id}/status`

Changes the status of a student (e.g., from `non_user` to `active`).

### Request Payload:

```json
{
    "status": "active"
}
```

---

## 6. Get Notes List

- **Endpoint:** `GET /api/admin/students/:id/notes`
- **Response:**

```json
{
    "status": "success",
    "data": [
        {
            "id": 101,
            "notes": "Student decided to join the Intensive Program.",
            "role": "Admin",
            "name": "Admin Firstname",
            "timestamp": "2023-10-28T14:30:00Z"
        }
        // ... ordered by newest first
    ]
}
```

---

## 7. Mark Trial as Done

Triggered by the "Tandai Sudah Trial" button in the Trial Class Detail section.
_(Alternatively, this could just use the `PATCH` endpoint above by sending `{"isTrialDone": true}`)_.

- **Endpoint:** `PATCH /api/admin/students/:id/trial/complete`
- **Payload:** None required.
- **Response:** Success message and updated profile indicating `isTrialDone`.

---

## Implementation Notes for BE:

- **Nested Objects**: The frontend expects data to be grouped into objects (`subscription`, `marketing`, `offer`, etc.) to match the TypeScript interfaces.
- **Dynamic Schedules**: Properties like `lastStudyGroupSchedule1` and `lastStudyGroupSchedule2` have been refactored into a `schedules` array of strings to accommodate any number of sessions.
- **Date Formats**: Use ISO 8601 strings for timestamps (`lastFollowUp`, `activeFrom`, etc.).
