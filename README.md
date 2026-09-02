# UNLOCK — AI-Powered Student Digital Twin SaaS Platform

> **Not scattered data. An AI-powered student digital twin.**

UNLOCK converts a student's academic record, verified competencies, GitHub artifacts, hackathon rankings, project metrics, interests, and career ambitions into a living digital twin. This continuously synchronized model generates real-time internship readiness scores, multi-dimensional skill-gap diagnostics, guided weekly career roadmaps, and cohort-level faculty intelligence.

---

## 🌟 Visual Identity & Design Philosophy

UNLOCK is crafted as a premium AI SaaS product for high-velocity engineering talent and university departments.

- **Palette**: Pure black/near-black surfaces (`#09090B`, `#111115`, `#18181C`), crisp typography, with **Signal Orange** (`#FF5500`, `#FF6B1A`) reserved strictly for primary actions, progress indicators, AI-generated components, and key highlights.
- **Typography**: Modern geometric sans-serif (Geist / Inter) with strong 3-tier hierarchy and minimal body fluff. The interface communicates primarily through numbers, charts, cards, and whitespace.
- **Zero Emoji Policy**: Exclusively uses stroke-consistent **Lucide React** icons.
- **Imagery**: Real high-quality photography sourced from Unsplash with rounded containers and subtle dark gradient overlays.
- **Motion Language**: Powered by **Framer Motion** — staggered card entrances, real-time count-ups for readiness scores, animated SVG circular progress rings, smooth sidebar collapses, and shimmer typing indicators for AI queries.

---

## 🏗️ Architecture & Decoupled Data Layer

The platform is designed with a strict **3-Layer Architecture** so the frontend client never connects directly to a database, and the backend data-fetching mechanism is fully swappable behind an Adapter interface.

```
┌────────────────────────────────────────────────────────┐
│                   UNLOCK Frontend                      │
│        React (Vite) + TypeScript + Tailwind CSS        │
│          Framer Motion + Recharts + Lucide             │
└───────────────────────────┬────────────────────────────┘
                            │ REST API (JSON)
┌───────────────────────────▼────────────────────────────┐
│                    API Service Layer                   │
│                     Node.js / Express                  │
│       Routes: /api/student/*   /api/faculty/*          │
└───────────────────────────┬────────────────────────────┘
                            │ Typed Contract
┌───────────────────────────▼────────────────────────────┐
│              Data Source Adapter Interface             │
│            server/src/adapters/dataSource.ts           │
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
   [Local Mock Fixtures]         [Databricks Lakehouse + Genie]
  High-fidelity JSON dataset      Delta Lake Gold Tables +
  18+ Students, Internships,      Mosaic AI Model Serving
  Roadmaps & Cohort Analytics     (Zero frontend code changes)
```

---

## ⚡ Databricks + Genie Migration Path

The data layer is completely abstracted behind `IDataSource` in `server/src/adapters/dataSource.ts`. 

To migrate from local JSON fixtures to production **Databricks Lakehouse SQL** and **Databricks Genie / Mosaic AI**:

1. **Implement `DatabricksDataSource`**:
   Create `server/src/adapters/databricksDataSource.ts` implementing `IDataSource` using the `@databricks/sql` SDK.
2. **Configure Delta Lake Gold Tables**:
   - `gold.student_digital_twins`: Academic records, verified competencies, project embeddings, and portfolio metrics.
   - `gold.internship_postings`: Recruiter requirements and vector embeddings of production skill criteria.
   - `gold.cohort_readiness_metrics`: Cohort aggregations for faculty dashboards.
3. **Connect Databricks Genie / Mosaic AI**:
   Wire `askUnlockAI(studentId, query)` to the Databricks Genie Space API or Mosaic AI Model Serving endpoint (`DATABRICKS_MODEL_SERVING_ENDPOINT`), passing the student's digital twin context into the conversation prompt.
4. **Flip the Environment Flag**:
   In `.env`, set `USE_DATABRICKS=true`.

*Result:* **Zero changes** required in any Express route handlers, React components, or domain types.

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### 1. Installation
Install all root, client, and server dependencies with a single command:
```bash
npm run install:all
```

### 2. Run Development Server
Start both the Express API backend (`http://localhost:3001`) and Vite frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 📱 Dual Experience: Screen Breakdown

### Student Experience
1. **Student Dashboard (`/dashboard`)**:
   - Real-time readiness circular gauge (e.g. `78% Almost Ready`) with reassuring diagnostic text.
   - KPI cards (Internship matches, almost-ready count, critical skill gaps, weekly growth delta).
   - Prominent **"Your Next Move"** AI recommendation card with direct CTAs to roadmap sprints.
   - Top matched internship opportunities with matched & missing skill tags.
2. **My Profile (`/profile`)**:
   - Verified digital twin overview with GPA, cohort rank percentile, verified skill badges, production projects with GitHub/live links, certifications, and milestone history.
3. **Internship Match (`/internships`)**:
   - Search by company, role, or skill.
   - Match readiness percentages, recruiter requirement tags, and AI explanations ("Why it matches", "Key blocker").
4. **Skill Gap Analysis (`/skill-gap`)**:
   - Interactive Target Role selector (AI/ML Systems, Full Stack Product, Cloud Infra, Distributed DB).
   - 3-column visual flow: *Verified Skills* → *Active Skill Gaps* → *Target Benchmark*.
   - Single biggest blocker spotlight + estimated hours to close.
5. **Career Roadmap (`/roadmap`)**:
   - 4-week structured sprint journey with completed/current/upcoming statuses, progress bar, interactive deliverables, and curated labs.
6. **Ask UNLOCK AI (`/ask`)**:
   - Interactive chat connected to the student's digital twin model.
   - Returns structured AI responses: concise analysis + highlighted skill pills + readiness delta + visual percentage bars + recommendation cards.

### Faculty Experience
1. **Faculty Dashboard (`/faculty/dashboard`)**:
   - Class headcount, cohort average readiness score, and 3-tier distribution (Ready, Almost Ready, Needs Support).
   - Top hiring role demand indexes.
   - Ranked curriculum skill-gap matrix.
   - AI cohort insight card with interactive **"Generate Training Plan"** modal.
2. **Students Directory (`/faculty/students`)**:
   - Searchable and filterable roster of all 18+ students with digital twin readiness gauges, GPA, target roles, and drill-down to Student 360.
3. **Student 360 View (`/faculty/student/:id/360`)**:
   - Comprehensive faculty diagnostic view: academic record, verified skills, active blockers, advisor notes timeline, and AI mentor recommendations.
4. **Readiness Analytics (`/faculty/analytics`)**:
   - Macro cohort analytics, department benchmarks, and readiness growth trends.
5. **Class Skill Gaps (`/faculty/skill-gaps`)**:
   - Cohort deficiency percentages across key technical competencies with prioritized curriculum intervention proposals.
6. **AI Faculty Insights (`/faculty/ai-insights`)**:
   - Automated cohort diagnostic alerts, placement velocity projections, and 3-week accelerated syllabus generator.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and active adapter indicator |
| `GET` | `/api/students` | List all student digital twin summaries |
| `GET` | `/api/student/:id/dashboard` | Student dashboard data, readiness scores, and AI recommendations |
| `GET` | `/api/student/:id/profile` | Full student profile including academic, projects, and certifications |
| `GET` | `/api/student/:id/internship-matches` | Internship postings scored against the student's verified skills |
| `GET` | `/api/student/:id/skill-gap` | Skill gap analysis against a selected target role |
| `GET` | `/api/student/:id/roadmap` | 4-week guided career roadmap with weekly tasks and milestones |
| `POST` | `/api/student/:id/ask` | Ask UNLOCK AI — returns structured text + skills + metrics + action cards |
| `GET` | `/api/faculty/:classId/dashboard` | Faculty cohort analytics, readiness distribution, and AI insights |
| `GET` | `/api/faculty/:classId/students` | Roster of students enrolled in the faculty class |
| `GET` | `/api/faculty/student/:id/360` | Deep Student 360 diagnostic profile for faculty advisors |
| `GET` | `/api/faculty/:classId/skill-gaps` | Ranked cohort skill bottlenecks and suggested interventions |
| `GET` | `/api/faculty/:classId/ai-insights` | Automated cohort diagnostic alerts and syllabus adjustment plans |

---

## 🛠️ Project Structure

```
unlock/
├── client/                     # Vite + React 18 + TypeScript Frontend
│   ├── src/
│   │   ├── api/                # TanStack React Query Hooks & API fetcher
│   │   ├── components/         # Modular UI Components
│   │   │   ├── chat/           # ChatMessageItem, QuickPrompts
│   │   │   ├── common/         # AIBadge, Card, Header, Logo, ReadinessGauge, Sidebar, SkillBar, StatCard
│   │   │   ├── faculty/        # ClassDistributionChart, SkillGapMatrix, TrainingPlanModal
│   │   │   └── student/        # InternshipCard, NextMoveCard, RoadmapWeek, SkillFlowDiagram
│   │   ├── context/            # AppContext (Mode switcher, Active Student twin switcher)
│   │   ├── pages/              # Student & Faculty Route Pages
│   │   │   ├── faculty/        # FacultyDashboard, Student360View, StudentsDirectory, etc.
│   │   │   └── student/        # StudentDashboard, StudentProfile, InternshipMatches, etc.
│   │   ├── types/              # Comprehensive TypeScript Domain Interfaces
│   │   ├── App.tsx             # Root Application Shell & Framer Motion Transitions
│   │   ├── index.css           # Custom Tailwind Styling & Dark Theme Design Tokens
│   │   └── main.tsx            # React Bootstrap Entrypoint
│   ├── index.html              # HTML shell with Geist font preconnects
│   ├── package.json
│   ├── tailwind.config.js      # Custom theme colors, shadows, and animations
│   └── vite.config.ts          # Vite configuration with API reverse proxy
│
├── server/                     # Express API Service
│   ├── src/
│   │   ├── adapters/           # Adapter Pattern (dataSource.ts & mockDataSource.ts)
│   │   ├── data/               # High-Fidelity JSON Fixtures (18+ students, internships, etc.)
│   │   ├── routes/             # Express Route Handlers (studentRoutes, facultyRoutes)
│   │   ├── types/              # Server-side TypeScript Type Definitions
│   │   └── server.ts           # Express Application Server & Healthcheck
│   ├── package.json
│   └── tsconfig.json
│
├── .env.example                # Databricks & Environment template
├── .gitignore                  # Git exclusions
├── package.json                # Monorepo task orchestration scripts
└── README.md                   # Platform documentation
```

---

## 🔒 License
Proprietary — UNLOCK Technologies Inc.
