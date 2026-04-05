# Student Detail Page API Recommendations

Based on the recent UI and functionality changes made to the Student Detail page, here is a summary of the recommended APIs needed to support the new features. We've consolidated the edits into logical endpoints to simplify the backend implementation.

---

## 1. Update Student Profile (General Update API)

To handle all the "Edit Bagian Ini" (Edit This Section) actions efficiently across different user statuses, it is recommended to use a single `PATCH` endpoint that accepts partial updates. The frontend uses `react-hook-form` to isolate field changes and will send only the modifications from the specific form section.

**Endpoint:** `PATCH /api/admin/students/:id`

**Payload Options (Partial updates allowed based on section):**

```json
{
    // --- Active User: Program Detail ---
    "program": "string",
    "group": "string",
    "level": "string",
    "gradeLabel": "string",

    // --- Active User: Subscription Detail ---
    // Using ISO 8601 strings from the new datetime-picker
    "activeFrom": "2023-10-27T10:00",
    "activeUntil": "2023-11-27T10:00",
    "selectedPeriod": "string", // e.g., "3", "6", "12"

    // --- Non-User: Marketing Funnel Detail ---
    "statusLead": "string", // Maps to LeadStatus Enum
    "sourceLead": "string", // Maps to SourceLead Enum
    "funnelStage": "string", // Maps to FunnelStage Enum
    "picRole": "string", // Maps to Role Enum
    "picPerson": "string",
    "lastUpdate": "2023-10-27T10:00",

    // --- Non-User: Program & Paket yang ditawarkan ---
    "offeredProgram": "string",
    "offeredPackage": "string",
    "offeredDuration": "string",
    "offeredPrice": "string", // Or number depending on DB

    // --- Non-User: Program Recommendation ---
    "recommendedProgram": "string",
    "recommendedGroup": "string",
    "recommendedLevel": "string",
    "recommendedGrade": "string", // Maps to Grades Enum

    // --- Non-User: Trial Class Detail ---
    "trialBranch": "string",
    "trialStudyGroup": "string"
}
```

**Expected Response:**
Should return the complete, updated student object mapping to the existing `ResponseUserDetail` type.

```json
{
    "status": "success",
    "data": {
        "id": 1,
        "name": "Student Name",
        "status": "active"
        // ... all other updated fields
    }
}
```

---

## 2. Quick Actions & Status Changes

These are specific buttons (often at the top/bottom of sections) that trigger immediate status modifications without a complex form.

### A. Assign to Program & Study Group (Mark Non-User as Active)

Triggered by the top warning banner button for Non-Users.

- **Endpoint:** `POST /api/admin/students/:id/activate`
- **Payload:** None required unless specific assignment details are sent along.
- **Response:** Success message and updated profile data (status changed to `active`).

### B. Make Active Again (From Lapsed)

Triggered by the top warning banner button for Lapsed Users.

- **Endpoint:** `POST /api/admin/students/:id/reactivate`
- **Payload:** None required.
- **Response:** Success message and updated profile data.

### C. Mark Trial as Done

Triggered by the "Tandai Sudah Trial" button in the Trial Class Detail section.
_(Alternatively, this could just use the `PATCH` endpoint above by sending `{"isTrialDone": true}`)_.

- **Endpoint:** `PATCH /api/admin/students/:id/trial/complete`
- **Payload:** None required.
- **Response:** Success message and updated profile indicating `isTrialDone`.

---

## 3. Notes Management Update

We changed the single `notes` string into a chronological list.

### A. Get Notes List

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

### B. Add New Note

- **Endpoint:** `POST /api/admin/students/:id/notes`
- **Payload:**

```json
{
    "notes": "The actual text content of the note",
    "role": "Admin",
    "name": "Admin Firstname"
}
```

_(Note: The backend should automatically infer and attach the acting user's `role`, `name`, and the exact `timestamp` during creation.)_
